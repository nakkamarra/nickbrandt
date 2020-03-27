import React from 'react';
import { SocialIcon } from './SocialIcon';
import { Flex } from '../ui/Flex';
import {
  LinkedInMeta,
  TwitterMeta,
  MediumMeta,
  GitHubMeta,
} from '../models/social';

interface Props {
  className?: string;
}

export const Social: React.FC<Props> = ({
  className = 'social',
}: Props) => (
  <Flex
    className={className}
    width="300px"
  >
    <SocialIcon meta={LinkedInMeta} />
    <SocialIcon meta={TwitterMeta} />
    <SocialIcon meta={MediumMeta} />
    <SocialIcon meta={GitHubMeta} />
  </Flex>
);