/**
 * Describes the necessary information to populate
 * a social link with an icon.
 */
export interface SocialIconMeta {
  href: string;
  title: string;
  description: string;
  type: SocialIconType;
  fill: string;
}

/**
 * Describes the possible values for the icon names; used
 * to clarify which `.svg` file to import.
 */
export type SocialIconType = 'linkedin' | 'twitter' | 'medium' | 'github';

export const LinkedInMeta: SocialIconMeta = {
  href: 'https://linkedin.com/in/nicholasgeorgebrandt',
  title: 'LinkedIn',
  description: 'Visit Nick\'s LinkedIn profile',
  type: 'linkedin',
  fill: '#0072b1',
};

export const TwitterMeta: SocialIconMeta = {
  href: 'https://twitter.com/nakkamarra',
  title: 'Twitter',
  description: 'Visit Nick\'s Twitter profile',
  type: 'twitter',
  fill: '#1da0f2',
};

export const MediumMeta: SocialIconMeta = {
  href: 'https://medium.com/@nickbrandt64',
  title: 'Medium',
  description: 'Visit Nick\'s Medium blog',
  type: 'medium',
  fill: '#03a87c',
};

export const GitHubMeta: SocialIconMeta = {
  href: 'https://github.com/nakkamarra',
  title: 'GitHub',
  description: 'Visit Nick\'s GitHub profile',
  type: 'github',
  fill: '#000000',
};