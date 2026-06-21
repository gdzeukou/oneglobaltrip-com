import { useMemo } from 'react';
import { getVisaInfo, VisaStatus, VISA_STATUS_LABELS } from '@/data/visaRequirements';
import type { TripStop } from '@/hooks/useTrip';
import type { GlobeUserProfile } from '@/hooks/useUserProfile';

export interface SmartRequirementsResult {
  visaStatus: VisaStatus;
  visaInfo: ReturnType<typeof getVisaInfo>;
  alerts: string[];
  hasNationality: boolean;
}

export const useSmartRequirements = (
  destinationSlug: string | undefined,
  profile: GlobeUserProfile,
  stops: TripStop[]
): SmartRequirementsResult => {
  return useMemo(() => {
    const nationality = profile.nationality;
    const hasNationality = Boolean(nationality);

    if (!destinationSlug || !hasNationality) {
      return {
        visaStatus: 'unknown',
        visaInfo: { status: 'unknown' },
        alerts: [],
        hasNationality,
      };
    }

    const visaInfo = getVisaInfo(nationality, destinationSlug);
    const alerts: string[] = [];

    if (visaInfo.status !== 'unknown') {
      const label = VISA_STATUS_LABELS[visaInfo.status];
      alerts.push(
        `Your ${nationality} passport: ${label} for this destination${visaInfo.maxStay ? ` (up to ${visaInfo.maxStay})` : ''}.`
      );
    }

    if (visaInfo.notes) alerts.push(visaInfo.notes);

    // Trip-aware cross-check
    if (stops.length > 0) {
      const otherStops = stops.filter((s) => s.country_slug !== destinationSlug);
      const requiresVisa = otherStops.filter((s) => {
        const info = getVisaInfo(nationality, s.country_slug);
        return info.status === 'required';
      });
      if (requiresVisa.length > 0) {
        alerts.push(
          `Your trip also includes ${requiresVisa.map((s) => s.country).join(', ')} — a visa is required for those stops.`
        );
      }

      // Warn about Cuba/US re-entry pattern
      const slugs = stops.map((s) => s.country_slug);
      if (nationality === 'US' && (slugs.includes('cuba') || destinationSlug === 'cuba')) {
        alerts.push('US passport holders should check current regulations before travelling to Cuba and re-entering the US.');
      }
    }

    return { visaStatus: visaInfo.status, visaInfo, alerts, hasNationality };
  }, [destinationSlug, profile.nationality, stops]);
};
