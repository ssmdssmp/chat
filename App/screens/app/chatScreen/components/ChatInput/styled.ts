import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

export const InputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0px 10px;
`;

export const MessageInput = styled.TextInput`
  background-color: #f2f2f2;
  height: 40px;
  border-radius: 20px;
  width: 80%;
  margin-left: 10px;
  padding: 10px;
  color: grey;
  font-size: 16px;
`;

export const SendButton = styled.Pressable`
  align-items: center;
  justify-content: center;
  background-color: #409e40;
  height: 30px;
  width: 30px;
  border-radius: 40px;
`;

export const InputIcon = styled(SvgXml)`
  width: 20px;
  height: 20px;
`;
