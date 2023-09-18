import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '@/styles';
import {ChatCarousel} from './components';
import io from 'socket.io-client';
import {Search} from '@/components';
import {chatActions, getUserSelector, useAppSelector} from '@/store';
import {useAppDispatch} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';
import {RTDatabase} from '@/services';
import {TChat, TMessage} from '@/types';
import {DataSnapshot} from '../chatScreen/components/ChatLog/types';

const ListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const {userId} = useAppSelector(getUserSelector);
  const {chats} = useAppSelector(getChatSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      query: {userId},
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('getChats', data => {
      const chatsWithReceiverData = JSON.parse(data);
      if (chatsWithReceiverData.length > 1) {
        const sortedChats = chatsWithReceiverData.sort((a, b) => {
          const dateA = new Date(a.chat.messages.at(-1).timestamp);
          const dateB = new Date(b.chat.messages.at(-1).timestamp);
          return dateB - dateA;
        });
        chatsWithReceiverData.forEach(item => {
          const chatRef = RTDatabase.ref(`chats/${item.chat.id}`);
          const onValueChange = (snapshot: DataSnapshot<TChat>) => {
            if (chats.length !== 0) {
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
              const chatWithNewMessage = {
                chat: {
                  ...chats.filter(el => el.chat.id === item.chat.id)[0].chat,
                  messages: sortedMessages,
                },
                receiver: {
                  ...chats.filter(el => el.chat.id === item.chat.id)[0]
                    .receiver,
                },
              };
              const updatedChats = [
                chatWithNewMessage,
                ...chats.filter(el => el.chat.id !== item.chat.id),
              ].sort((a, b) => {
                const dateA = new Date(a.chat.messages.at(-1).timestamp);
                const dateB = new Date(b.chat.messages.at(-1).timestamp);
                return dateB - dateA;
              });
              dispatch(chatActions.setChats(updatedChats));
            } else {
              dispatch(chatActions.setChats([]));
            }
          };

          chatRef.on('value', onValueChange, {onlyOnce: true});
          return () => {
            chatRef.off('value', onValueChange);
          };
        });
        dispatch(chatActions.setChats(sortedChats));
      } else {
        dispatch(chatActions.setChats([...JSON.parse(data)]));
      }
    });

    socket.on('new', data => {
      if (chats.length !== 0 && chats !== undefined) {
        if (!chats.some(chat => chat.chat.id === JSON.parse(data).id)) {
          const newChatWithReceiverData = JSON.parse(data);
          dispatch(chatActions.setChats([{newChatWithReceiverData, ...chats}]));
          console.log('New Chat Received:', newChatWithReceiverData.chat.id);
        }
      } else {
        console.log(data);

        dispatch(chatActions.setChats([]));
      }
    });
    socket.on('deleted', data => {
      dispatch(
        chatActions.setChats({...chats.filter(el => el.chat.id !== data)}),
      );
    });

    socket.on('error', error => {
      console.error('WebSocket error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <ScreenWrapper padding={8} bgColor="white">
      <Search value={searchText} setValue={setSearchText} />
      <ChatCarousel chats={chats} />
    </ScreenWrapper>
  );
};

export default ListScreen;
