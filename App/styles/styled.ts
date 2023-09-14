import styled from 'styled-components/native';
import {TFlexWrapper, TScreenWrapperProps} from './types';

export const ScreenWrapper = styled.SafeAreaView<TScreenWrapperProps>`
  height: 100%;
  width: 100%;
  background-color: ${({bgColor}) => bgColor};
  flex-direction: column;
  align-items: center;
  padding: ${({padding}) => padding || 0}px;
`;

export const FlexWrapper = styled.View<TFlexWrapper>`
  display: flex;
  position: relative;
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || 'auto'};
  flex-direction: ${({dir}) => dir || 'column'};
  align-items: ${({align}) => align || 'flex-start'};
  justify-content: ${({justify}) => justify || 'flex-start'};
  background-color: ${({bgColor}) => bgColor || 'none'};
`;
