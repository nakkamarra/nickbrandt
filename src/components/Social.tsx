import React from 'react';
import { SocialIcon } from './SocialIcon';
import { Flex } from '../ui/Flex';
import { SocialMetadata } from '../models/social';

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
    {SocialMetadata.map((meta) => (
      <SocialIcon
        key={meta.type}
        meta={meta}
      />
    ))}
  </Flex>
);