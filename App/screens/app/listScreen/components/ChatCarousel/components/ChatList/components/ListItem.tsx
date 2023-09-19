import {Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
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
import {useAppSelector} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';

const ListItem = ({chatObj}: {chatObj: TChatWithReceiverData}) => {
  const navigation = useNavigation<AppNavigationProp>();
  const {chats} = useAppSelector(getChatSelector);
  const chatsStateRef = useRef(null);
  chatsStateRef.current = chats;

  const [lastMessage, setLastMessage] = useState({
    id: '',
    timestamp: new Date(),
    text: '',
    sender: '',
  });

  if (!chatObj) {
    // Handle the case when chatObj is undefined
    return (
      <PressableChatItem
        onPress={() => {
          /* Handle the press event for undefined chatObj */
        }}></PressableChatItem>
    );
  }
  const {receiver, chat} = chatObj;
  useEffect(() => {
    setLastMessage(chat.messages.at(-1));
    console.log(lastMessage);
  }, [chat.messages.length, chatsStateRef.length]);

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
          source={
            receiver
              ? {
                  uri: receiver.avatar,
                }
              : noAvatar
          }
        />
        <TextWrapper>
          <Name>{receiver ? receiver.username : ''}</Name>
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
