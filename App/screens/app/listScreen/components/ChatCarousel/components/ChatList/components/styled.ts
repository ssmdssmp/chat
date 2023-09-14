import {FlexWrapper} from '@/styles';
import styled from 'styled-components/native';

export const PressableChatItem = styled.Pressable`
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: #e2e2e2;
  justify-content: center;
  padding: 0px 2px;
`;

export const Avatar = styled.Image`
  height: 65px;
  width: 65px;
  border-radius: 40px;
`;

export const TextWrapper = styled(FlexWrapper)`
  padding: 0px 30px 0px 10px;
  margin-bottom: 9px;
`;

export const Name = styled.Text`
  font-weight: bold;
`;

export const StatusTextWrapper = styled.View`
  position: absolute;
  top: 5px;
  right: 2px;
`;

export const LastMessage = styled.Text`
  margin-top: 8px;
`;
export const BorderMask = styled.View`
  position: absolute;
  bottom: -10px;

  left: 0;
  height: 5px;
  background: #fff;
  width: 65px;
`;
