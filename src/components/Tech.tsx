import React from 'react';
import { Flex } from '../ui/Flex';
import { StyledHeading } from '../ui/Heading';
import { TechIcon } from './TechIcon';

import { TechMetadata } from '../models/tech';

interface Props {
  className?: string;
}

export const Tech: React.FC<Props> = ({
  className = 'tools',
}: Props) => (
  <>
    <StyledHeading>
      Tech I like:
    </StyledHeading>
    <Flex
      className={className}
      justifyContent="space-evenly"
      alignContent="space-evenly"
      alignItems="center"
      width="380px"
    >
      {TechMetadata.map((meta) => (
        <TechIcon
          key={meta.type}
          meta={meta}
        />
      ))}
    </Flex>
  </>
);