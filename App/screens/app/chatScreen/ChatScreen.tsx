import React, {useEffect, useState} from 'react';
import {ScreenWrapper, theme} from '@/styles';
import {ChatHeader, ChatInput, ChatLog} from './components';
import {ChatRouteProp} from '@/navigation';
import {RTDatabase} from '@/services';
import {TMessage, TChat} from '@/types';
import {useRoute} from '@react-navigation/native';
import {DataSnapshot} from './components/ChatLog/types';

const ChatScreen = () => {
  const route = useRoute<ChatRouteProp>();
  const [messages, setMessages] = useState<TMessage[]>([]);
  useEffect(() => {
    if (route.params.id !== null) {
      const chatRef = RTDatabase.ref(`chats/${route.params.id}`);
      const onValueChange = (snapshot: DataSnapshot<TChat>) => {
        const messagesRef = snapshot.child('messages');
        const messagesArray: TMessage[] = [];
        messagesRef.forEach(childSnapshot => {
          messagesArray.push(childSnapshot.val());
        });
        const sortedMessages = messagesArray.sort((a, b) => {
          const dateA = new Date(a.timestamp);
          const dateB = new Date(b.timestamp);
          return dateA - dateB;
        });
        setMessages(sortedMessages);
      };
      chatRef.on('value', onValueChange, {onlyOnce: true});
      return () => {
        chatRef.off('value', onValueChange);
      };
    }
  }, [route]);

  return (
    <ScreenWrapper bgColor={theme.light.screenBg}>
      <ChatHeader />
      <ChatLog messages={messages} />
      <ChatInput />
    </ScreenWrapper>
  );
};

export default ChatScreen;
