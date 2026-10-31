/**
 * The homepage search bar talks to the `ogt-travel-agent` edge function
 * (Claude, with the signed-in traveler's saved memory). The function keeps
 * the conversation server-side; we only carry its session token.
 *
 * If the function errors or takes too long, the turn is marked `offline`
 * and the page answers from local data instead, so search never dead-ends.
 */

import { useCallback, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type OfferCard = {
  type: string;
  title: string;
  subtitle?: string;
  cta_label?: string;
  badge?: string;
};

/** Why an answer did not arrive, when the function told us. */
export type FailReason = 'missing_api_key' | 'upstream' | 'network' | 'empty_reply' | 'unknown';

export type AgentTurn = {
  id: number;
  question: string;
  status: 'loading' | 'done';
  offline: boolean;
  reason: FailReason;
  message: string;
  cards: OfferCard[];
  followUp: string | null;
};

/**
 * supabase-js hands back the raw Response on a non-2xx, and our function puts
 * the cause in its body. Read it so the page can say something true.
 */
async function reasonFrom(error: unknown): Promise<FailReason> {
  const context = (error as { context?: Response } | null)?.context;
  if (!context || typeof context.json !== 'function') return 'unknown';
  try {
    const body = (await context.json()) as { reason?: string };
    const known: FailReason[] = ['missing_api_key', 'upstream', 'network', 'empty_reply'];
    return known.includes(body?.reason as FailReason) ? (body.reason as FailReason) : 'unknown';
  } catch {
    return 'unknown';
  }
}

const TOKEN_KEY = 'ogt:agent-session';
const TIMEOUT_MS = 25_000;

function readToken(): string | undefined {
  try {
    return window.sessionStorage.getItem(TOKEN_KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

function saveToken(token: string) {
  try {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* private mode: the conversation just won't carry over a reload */
  }
}

export function useTravelAgent(userId: string | null) {
  const [turns, setTurns] = useState<AgentTurn[]>([]);
  const nextId = useRef(1);

  const ask = useCallback(
    async (question: string): Promise<AgentTurn> => {
      const id = nextId.current++;
      const pending: AgentTurn = { id, question, status: 'loading', offline: false, reason: 'unknown', message: '', cards: [], followUp: null };
      setTurns((t) => [...t, pending]);

      let done: AgentTurn;
      let reason: FailReason = 'unknown';
      try {
        const call = supabase.functions.invoke('ogt-travel-agent', {
          body: { message: question, session_token: readToken(), user_id: userId, current_page: '/' },
        });
        const timeout = new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS));
        const { data, error } = await Promise.race([call, timeout]);
        if (error || !data || typeof data.message !== 'string' || !data.message.trim()) {
          if (error) reason = await reasonFrom(error);
          throw error ?? new Error('empty reply');
        }
        if (typeof data.session_token === 'string') saveToken(data.session_token);
        const cards: OfferCard[] = Array.isArray(data.offer_cards)
          ? data.offer_cards
              .filter((c: unknown): c is OfferCard => !!c && typeof (c as OfferCard).title === 'string')
              .slice(0, 4)
          : [];
        done = {
          ...pending,
          status: 'done',
          message: data.message.trim(),
          cards,
          followUp: typeof data.follow_up_question === 'string' && data.follow_up_question.trim() ? data.follow_up_question.trim() : null,
        };
      } catch {
        done = { ...pending, status: 'done', offline: true, reason };
      }
      setTurns((t) => t.map((x) => (x.id === id ? done : x)));
      return done;
    },
    [userId],
  );

  const reset = useCallback(() => setTurns([]), []);

  return { turns, ask, reset };
}
