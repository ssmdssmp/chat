import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '@/styles';
import {ChatCarousel} from './components';
import io from 'socket.io-client';
import {Search} from '@/components';
import {chatActions, getUserSelector, useAppSelector} from '@/store';
import {useAppDispatch} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';
import {RTDatabase} from '@/services';
import {TChat, TChatWithReceiverData, TMessage} from '@/types';
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
      const chatsWithReceiverData: TChatWithReceiverData[] = [
        ...JSON.parse(data),
      ];
      if (chatsWithReceiverData) {
        if (chatsWithReceiverData.length === 0) {
          dispatch(chatActions.setChats([]));
          return;
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
              !chats
                .find(el => el.chat.id === item.chat.id)
                .chat.messages.some(el => el.id === newMessage.key) &&
              newMessage.key
            ) {
              console.log(newMessage);
              dispatch(
                chatActions.updateChat({
                  id: item.chat.id,
                  message: {...newMessage.val(), id: newMessage.key},
                }),
              );
              console.log(JSON.stringify(chats));
              dispatch(chatActions.sortChats());
            }
          });
        });
      }
    });
    socket.on('new', data => {
      const newChatWithReceiverData = JSON.parse(data);
      if (
        !chats.some(chat => chat.chat.id === newChatWithReceiverData.chat.id)
      ) {
        dispatch(chatActions.addChat(newChatWithReceiverData));
        dispatch(chatActions.sortChats());
      }
      if (chats.length === 0) {
        dispatch(chatActions.addChat(newChatWithReceiverData));
      }
      // if (chats && newChatWithReceiverData !== undefined) {
      //   if (
      //     !chats.some(chat => chat.chat.id === newChatWithReceiverData.chat.id)
      //   ) {
      //     dispatch(chatActions.setChats([newChatWithReceiverData, ...chats]));
      //     const newChatRef = RTDatabase.ref(
      //       `chats/${newChatWithReceiverData.chat.id}`,
      //     );
      //     const onValueChange = (snapshot: DataSnapshot<TChat>) => {
      //       const messagesRef = snapshot.child('messages');
      //       const messagesArray: TMessage[] = [];
      //       messagesRef.forEach(childSnapshot => {
      //         messagesArray.push(childSnapshot.val());
      //       });
      //       const sortedMessages = messagesArray.sort((a, b) => {
      //         const dateA = new Date(a.timestamp);
      //         const dateB = new Date(b.timestamp);
      //         return dateA - dateB;
      //       });
      //       const chatWithNewMessage = {
      //         chat: {
      //           ...chats.filter(
      //             el => el.chat.id === newChatWithReceiverData.chat.id,
      //           )[0].chat,
      //           messages: sortedMessages,
      //         },
      //         receiver: {
      //           ...chats.filter(
      //             el => el.chat.id === newChatWithReceiverData.chat.id,
      //           )[0].receiver,
      //         },
      //       };
      //       const updatedChats =
      //         chats.length >= 2
      //           ? [
      //               chatWithNewMessage,
      //               ...chats.filter(
      //                 el => el.chat.id !== newChatWithReceiverData.chat.id,
      //               ),
      //             ].sort((a, b) => {
      //               const dateA = new Date(a.chat.messages.at(-1).timestamp);
      //               const dateB = new Date(b.chat.messages.at(-1).timestamp);
      //               return dateB - dateA;
      //             })
      //           : [
      //               chatWithNewMessage,
      //               ...chats.filter(
      //                 el => el.chat.id !== newChatWithReceiverData.chat.id,
      //               ),
      //             ];
      //       console.log(updatedChats);
      //       dispatch(chatActions.setChats(updatedChats));
      //       return;
      //     };
      //     newChatRef.on('value', onValueChange, {onlyOnce: true});
      //     console.log('New Chat Received:', newChatWithReceiverData);
      //     return () => {
      //       newChatRef.off('value', onValueChange);
      //     };
      //   }
      // } else {
      //   dispatch(chatActions.setChats([newChatWithReceiverData]));
      // }
    });
    socket.on('deleted', data => {
      dispatch(
        chatActions.setChats([...chats.filter(el => el.chat.id !== data)]),
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
