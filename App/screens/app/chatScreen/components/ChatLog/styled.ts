import {Dimensions, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {TStyledMessage} from './types';
const messageListHeight = Dimensions.get('screen').height;

export const MessagesList = styled.FlatList`
  width: 100%;
`;

export const MessageListContainerStyle: ViewStyle = {
  backgroundColor: '#E6F7FF',
  height: 'auto',
  minHeight: '85%',
  padding: 5,
  paddingVertical: 2,
  justifyContent: 'flex-end',
};

export const Message = styled.View<TStyledMessage>`
  padding: 8px;
  align-self: ${({message, userId}) =>
    message.sender === userId ? 'flex-end' : 'flex-start'};

  padding-right: ${({message, userId}) =>
    message.sender === userId
      ? message.text.length < 20
        ? 65
        : 8
      : message.text.length < 20
      ? 50
      : 8}px;
  padding-bottom: ${({message}) => (message.text.length < 20 ? 8 : 28)}px;
  background-color: ${({message, userId}) =>
    message.sender === userId ? '#007BFF' : '#333333'};
  width: auto;
  position: relative;
  flex-direction: row;
  border-radius: 12px;
  max-width: 90%;
  height: auto;
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const TimeStamp = styled.Text<TStyledMessage>`
  position: absolute;
  font-size: 12px;
  bottom: 8px;
  color: white;
  right: ${({message, userId}) => (message.sender === userId ? 23 : 10)}px;
`;

export const MessageText = styled.Text`
  font-size: 16px;
  color: white;
`;
