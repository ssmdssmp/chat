import React, {useEffect, useState, useRef} from 'react';
import {ScreenWrapper} from '@/styles';
import {ChatCarousel} from './components';
import io from 'socket.io-client';
import {Search} from '@/components';
import {chatActions, getUserSelector, useAppSelector} from '@/store';
import {useAppDispatch} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';
import {RTDatabase} from '@/services';
import {TChatWithReceiverData} from '@/types';

const ListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const {userId} = useAppSelector(getUserSelector);
  const {chats} = useAppSelector(getChatSelector);
  const dispatch = useAppDispatch();
  const chatsStateRef = useRef(null);
  chatsStateRef.current = chats;
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      query: {userId},
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('getChats', data => {
      const chatsWithReceiverData: TChatWithReceiverData[] = [
        ...JSON.parse(data),
      ];
      if (chatsWithReceiverData) {
        if (chatsWithReceiverData.length === 0) {
          dispatch(chatActions.setChats([]));
        }
        if (chatsWithReceiverData.length === 1) {
          dispatch(chatActions.setChats(chatsWithReceiverData));
        } else {
          dispatch(chatActions.setChats(chatsWithReceiverData));
          dispatch(chatActions.sortChats());
        }
        chatsWithReceiverData.forEach(item => {
          const chatRef = RTDatabase.ref(`chats/${item.chat.id}`);
          chatRef.child('messages').on('child_added', newMessage => {
            if (
              !chatsStateRef.current
                .find(el => el.chat.id === item.chat.id)
                .chat.messages.some(el => el.id === newMessage.key) &&
              newMessage.key
            ) {
              dispatch(
                chatActions.addMessage({
                  id: item.chat.id,
                  message: {...newMessage.val(), id: newMessage.key},
                }),
              );

              dispatch(chatActions.sortChats());
            }
          });
        });
      } else {
        dispatch(chatActions.setChats([]));
      }
    });
    socket.on('new', data => {
      const newChatWithReceiverData = JSON.parse(data);
      const chatRef = RTDatabase.ref(
        `chats/${newChatWithReceiverData.chat.id}`,
      );

      if (
        !chatsStateRef.current.some(
          chat => chat.chat.id === newChatWithReceiverData.chat.id,
        )
      ) {
        if (chatsStateRef.current.length === 0) {
          dispatch(chatActions.setChats([newChatWithReceiverData]));
          console.log(chatsStateRef.current[0].chat.messages);
        } else {
          dispatch(chatActions.addChat(newChatWithReceiverData));
        }
        chatRef.child('messages').on('child_added', newMessage => {
          if (
            !chatsStateRef.current
              .find(el => el.chat.id === newChatWithReceiverData.chat.id)
              .chat.messages.some(el => el.id === newMessage.key) &&
            newMessage.key
          ) {
            dispatch(
              chatActions.addMessage({
                id: newChatWithReceiverData.chat.id,
                message: {...newMessage.val(), id: newMessage.key},
              }),
            );
            dispatch(chatActions.sortChats());
          }
        });
      }
    });

    socket.on('deleted', data => {
      dispatch(
        chatActions.setChats([
          ...chatsStateRef.current.filter(
            el => el.chat.id !== JSON.parse(data),
          ),
        ]),
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
      <ChatCarousel chats={chatsStateRef.current} />
    </ScreenWrapper>
  );
};

export default ListScreen;
