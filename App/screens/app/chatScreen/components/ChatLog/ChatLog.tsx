import React, {useEffect, useRef, useState} from 'react';
import {
  Message,
  MessageListContainerStyle,
  MessagesList,
  MessageText,
  TimeStamp,
} from './styled';
import {TMessage} from '@/types';
import moment from 'moment';
import {getUserSelector, useAppSelector} from '@/store';
import {ListRenderItem} from 'react-native';

const ChatLog = ({messages}: {messages: TMessage[]}) => {
  const {userId} = useAppSelector(getUserSelector);
  const [isFlatListReady, SetIsFlatListReady] = useState(0);
  const flatListRef = useRef(null);
  const handleFlatListReady = () => {
    if (isFlatListReady === 0) {
      SetIsFlatListReady(1);
      return;
    }
    if (isFlatListReady === 1) {
      setTimeout(() => {
        SetIsFlatListReady(2);
        flatListRef.current.scrollToEnd({animated: false});
      }, 700);
      return;
    }
  };
  const renderItem: ListRenderItem<TMessage> = ({item}) => {
    return (
      <Message key={item.id} message={item} userId={userId}>
        <MessageText>{item.text}</MessageText>
        <TimeStamp>{moment(item.timestamp).format('HH:mm')}</TimeStamp>
      </Message>
    );
  };

  return (
    <MessagesList
      ref={flatListRef}
      onContentSizeChange={() => {
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({animated: false});
        }
      }}
      onLayout={() => handleFlatListReady()}
      contentContainerStyle={{
        ...MessageListContainerStyle,
        opacity: isFlatListReady === 2 ? 1 : 0,
      }}
      data={messages}
      //@ts-ignore
      renderItem={renderItem}
    />
  );
};
export default ChatLog;
