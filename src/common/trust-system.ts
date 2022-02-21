import { useMemo } from 'react';

export const TrustTags = [
  'system_avatar_access',
  'system_world_access',
  'system_trust_basic',
  'system_trust_intermediate',
  'system_trust_known',
  'system_trust_trusted',
  'system_trust_veteran',
  'system_trust_legend',
  'system_legend',
  'system_supporter',
  'system_early_adopter',
  'language_deu',
  'language_eng',
] as const;
export type TrustTag = typeof TrustTags[number];

export const TrustRanks = [
  'Visitor',
  'New User',
  'User',
  'Known User',
  'Trusted User',
  'Veteran User',
  'Legendary User',
] as const;
export type TrustRank = typeof TrustRanks[number];

export function useTrustRank(tags: TrustTag[] = []): TrustRank {
  return useMemo<TrustRank>(() => {
    const cleanTags = tags.filter((tag) => TrustTags.includes(tag));
    if (cleanTags.includes('system_legend')) {
      return 'Legendary User';
    }
    if (cleanTags.includes('system_trust_legend')) {
      return 'Veteran User';
    }
    if (cleanTags.includes('system_trust_veteran')) {
      return 'Trusted User';
    }
    if (cleanTags.includes('system_trust_trusted')) {
      return 'Known User';
    }
    if (cleanTags.includes('system_trust_known')) {
      return 'User';
    }
    if (cleanTags.includes('system_trust_intermediate')) {
      return 'New User';
    }
    return 'Visitor';
  }, [tags]);
}
