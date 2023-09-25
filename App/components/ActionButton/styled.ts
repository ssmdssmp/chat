import styled from 'styled-components/native';
import {TActionIconWrapper, TActionPressable, TActionText} from './types';

export const StyledPressable = styled.Pressable<TActionPressable>`
  width: 90%;
  height: 45px;
  flex-direction: row;
  background-color: ${({bgColor}) => bgColor};
  align-items: center;
  padding: 0px 30px;
  border-radius: 8px;
  margin: 5px 0px;
`;

export const ActionText = styled.Text<TActionText>`
  font-size: 18px;
  color: ${({textColor}) => textColor};
  margin-left: 15px;
`;

export const IconWrapper = styled.View<TActionIconWrapper>`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({iconBgColor}) => iconBgColor};
  height: 30px;
  width: 30px;
`;
