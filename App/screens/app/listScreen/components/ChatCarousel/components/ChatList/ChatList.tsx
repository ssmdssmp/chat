import {FlatList} from 'react-native';
import React from 'react';
import {TChatWithReceiverData} from '@/types';
import {ListItem} from './components';

const ChatList = ({chats}: {chats: TChatWithReceiverData[]}) => {
  const renderItem = ({item}: {item: TChatWithReceiverData}) => {
    return <ListItem chatObj={item} />;
  };
  return <FlatList data={chats} renderItem={renderItem} />;
};

export default ChatList;
