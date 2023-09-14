import {Text} from 'react-native';
import React from 'react';
import {noAvatar} from '@/assets';
import {FlexWrapper} from '@/styles';
import {
  PressableChatItem,
  Avatar,
  TextWrapper,
  Name,
  LastMessage,
  StatusTextWrapper,
  BorderMask,
} from './styled';
import {AppNavigationProp} from '@/navigation';
import {TChatWithReceiverData} from '@/types/chat';
import {useNavigation} from '@react-navigation/native';
import useFormattedDate from '@/hooks/useFormattedDate';

const ListItem = ({chatObj}: {chatObj: TChatWithReceiverData}) => {
  const {receiver, chat} = chatObj;
  const navigation = useNavigation<AppNavigationProp>();
  const lastMessage = chat.messages[chat.messages.length - 1];
  const handleItemPress = () => {
    navigation.navigate('Chat', {
      id: chat.id,
      receiver,
      prevScreen: 'List',
      messages: chat.messages,
    });
  };
  const formattedTimestamp = useFormattedDate(lastMessage.timestamp);
  return (
    <PressableChatItem onPress={handleItemPress}>
      <FlexWrapper dir="row" align="center">
        <Avatar
          source={{
            uri: receiver.avatar || noAvatar,
          }}
        />
        <TextWrapper>
          <Name>{receiver.username}</Name>
          <LastMessage>{lastMessage.text}</LastMessage>
        </TextWrapper>
        <StatusTextWrapper>
          <Text>{formattedTimestamp}</Text>
        </StatusTextWrapper>
        <BorderMask />
      </FlexWrapper>
    </PressableChatItem>
  );
};

export default ListItem;
