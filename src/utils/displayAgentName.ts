export const getDisplayAgentName = (agentName?: string | null, prefName?: string | null) => {
  const a = agentName?.trim();
  const p = prefName?.trim();
  if (a && a.toLowerCase() !== 'maya') return a;
  if (p && p.toLowerCase() !== 'maya') return p;
  return 'AI Travel Agent';
};
