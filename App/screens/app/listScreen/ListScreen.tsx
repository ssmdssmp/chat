import React, {useEffect, useState} from 'react';
import {ScreenWrapper} from '@/styles';
import {ChatCarousel} from './components';
import {Search} from '@/components';
import {getUserChats, RTDatabase} from '@/services';
import {chatActions, getUserSelector, useAppSelector} from '@/store';
import {useAppDispatch} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';

const ListScreen = () => {
  const [searchText, setSearchText] = useState('');
  // const [chats, setChats] = useState<TChatWithReceiverData[]>([]);
  const {userId} = useAppSelector(getUserSelector);
  const {chats} = useAppSelector(getChatSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId) {
      console.log(1);
      getUserChats(userId)
        .then(res => {
          dispatch(chatActions.setChats(res));
          res.forEach(({chat, receiver}) => {
            const chatRef = RTDatabase.ref(`chats/${chat.id}`);
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
              const newChats =
                chats.length > 1
                  ? [
                      {
                        chat: {
                          id: chat.id,
                          participants: snapshot.val().participants,
                          messages: sortedMessages,
                        },
                        receiver: {
                          ...chats.filter(el => el.chat.id === chat.id)[0]
                            .receiver,
                        },
                      },
                      ...chats.filter(el => el.chat.id !== chat.id),
                    ].sort((a, b) => {
                      const dateA = new Date(a.chat.messages.at(-1).timestamp);
                      const dateB = new Date(b.chat.messages.at(-1).timestamp);
                      return dateB - dateA;
                    })
                  : [
                      {
                        chat: {
                          id: chat.id,
                          participants: snapshot.val().participants,
                          messages: sortedMessages,
                        },
                        receiver: {
                          ...chats.filter(el => el.chat.id === chat.id)[0]
                            .receiver,
                        },
                      },
                      ...chats.filter(el => el.chat.id !== chat.id),
                    ];
              console.log(newChats);
              dispatch(chatActions.setChats(newChats));
            };
            chatRef.on('value', onValueChange, {onlyOnce: true});
            return () => {
              chatRef.off('value', onValueChange);
            };
          });
        })
        .catch(e => {
          dispatch(chatActions.setChats([]));
          console.log(e);
        });
    }
  }, [userId, chats.length]);
  return (
    <ScreenWrapper padding={8} bgColor="white">
      <Search value={searchText} setValue={setSearchText} />
      <ChatCarousel chats={chats} />
    </ScreenWrapper>
  );
};

export default ListScreen;
