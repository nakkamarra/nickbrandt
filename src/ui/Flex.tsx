/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';

type FlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'

type FlexWrap =
  | 'wrap'
  | 'nowrap'
  | 'wrap-reverse'

type FlexJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'initial'
  | 'inherit'

type FlexAlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'baseline'
  | 'initial'
  | 'inherit'

type FlexAlignItems =
  | 'stretch'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'initial'
  | 'inherit'

interface FlexProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justifyContent?: FlexJustifyContent;
  alignContent?: FlexAlignContent;
  alignItems?: FlexAlignItems;
  width?: string;
  height?: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  flex-wrap: ${({ wrap = 'wrap' }) => wrap};
  justify-content: ${({ justifyContent = 'inherit' }) => justifyContent};
  align-content: ${({ alignContent = 'inherit' }) => alignContent};
  align-items: ${({ alignItems = 'inherit' }) => alignItems};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
`;