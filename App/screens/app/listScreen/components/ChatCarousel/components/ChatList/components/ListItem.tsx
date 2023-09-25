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
  UnreadMessages,
  UnreadMessagesText,
} from './styled';
import {AppNavigationProp} from '@/navigation';
import {TChatWithReceiverData} from '@/types/chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import useFormattedDate from '@/hooks/useFormattedDate';
import {getUserSelector, useAppSelector} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';

const ListItem = ({chatObj}: {chatObj: TChatWithReceiverData}) => {
  const navigation = useNavigation<AppNavigationProp>();
  const {chats} = useAppSelector(getChatSelector);
  const {userId} = useAppSelector(getUserSelector);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const chatsStateRef = useRef(null);
  const [lastMessage, setLastMessage] = useState({
    id: '',
    timestamp: new Date(),
    text: '',
    sender: '',
  });
  chatsStateRef.current = chats;
  if (!chatObj) {
    return;
  }

  const {receiver, chat} = chatObj;
  useEffect(() => {
    setLastMessage(chat.messages.at(-1));
    setUnreadMessages(
      chatObj.chat.messages
        .filter(el => el.sender !== userId)
        .filter(el => el.messageStatus === 'sent').length,
    );
  }, [chat.messages, chatsStateRef.length]);

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
      {unreadMessages !== 0 ? (
        <UnreadMessages>
          <UnreadMessagesText>{unreadMessages}</UnreadMessagesText>
        </UnreadMessages>
      ) : null}
    </PressableChatItem>
  );
};

export default ListItem;
