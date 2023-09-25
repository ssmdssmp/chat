import React, {useEffect, useRef, useState} from 'react';
import {ScreenWrapper, theme} from '@/styles';
import {ChatHeader, ChatInput, ChatLog} from './components';
import {ChatRouteProp} from '@/navigation';
import {RTDatabase, updateMessageStatus} from '@/services';
import {TMessage, TChat} from '@/types';
import {useRoute} from '@react-navigation/native';
import {DataSnapshot} from './components/ChatLog/types';
import {
  chatActions,
  getUserSelector,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';

const ChatScreen = () => {
  const route = useRoute<ChatRouteProp>();
  const {chats} = useAppSelector(getChatSelector);
  const {userId} = useAppSelector(getUserSelector);
  const [currentChat, setCurrentChat] = useState({
    id: '',
    messages: [],
    participants: {},
  });
  const chatsStateRef = useRef(null);
  chatsStateRef.current = chats;
  useEffect(() => {
    if (route.params.id) {
      setCurrentChat(
        chatsStateRef.current.find(el => el.chat.id === route.params.id)?.chat,
      );
    } else {
      setCurrentChat({
        id: '',
        messages: [],
        participants: {},
      });
    }
  }, [route.params.id, chatsStateRef.current]);
  useEffect(() => {
    if (
      currentChat.messages
        .filter(el => el.sender !== userId)
        .some(el => el.messageStatus === 'sent')
    ) {
      currentChat.messages
        .filter(el => el.messageStatus !== userId)
        .filter(el => el.messageStatus === 'sent')
        .forEach(item => {
          updateMessageStatus(currentChat.id, item.id, 'received');
          dispatch(
            chatActions.changeMessageStatus({
              chatId: currentChat.id,
              messageId: item.id,
              newStatus: 'received',
            }),
          );
        });
    }
  }, [currentChat.messages]);
  const dispatch = useAppDispatch();

  const onValueChange = (snapshot: DataSnapshot<TChat>) => {
    if (
      !chatsStateRef.current
        .find(el => el.chat.id === route.params.id)
        .chat.messages.some(el => el.id === snapshot.key)
    ) {
      dispatch(
        chatActions.addMessage({
          id: route.params.id,
          message: snapshot.val(),
        }),
      );
    }
  };

  useEffect(() => {
    if (route.params.id !== null) {
      const chatRef = RTDatabase.ref(`chats/${route.params.id}`);
      const messagesRef = chatRef.child('messages');
      messagesRef.on('child_added', onValueChange);
      messagesRef.on('child_changed', snapshot => {
        const updatedChat = snapshot.val();
        dispatch(
          chatActions.changeMessageStatus({
            chatId: route.params.id,
            messageId: snapshot.key,
            newStatus: updatedChat.messageStatus,
          }),
        );
      });
      return () => {
        messagesRef.off('child_added', onValueChange);
      };
    }
  }, [route.params.id]);

  return (
    <ScreenWrapper bgColor={theme.light.screenBg}>
      <ChatHeader />
      <ChatLog messages={currentChat.messages} />
      <ChatInput />
    </ScreenWrapper>
  );
};

export default ChatScreen;
