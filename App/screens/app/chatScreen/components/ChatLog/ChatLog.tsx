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
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {readIcon, sendingIcon, sentIcon} from '@/assets';

const ChatLog = ({messages}: {messages: TMessage[]}) => {
  const {userId} = useAppSelector(getUserSelector);
  const [isFlatListReady, SetIsFlatListReady] = useState(0);
  const route = useRoute();
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
    console.log(item);
    return (
      <Message key={item.id} message={item} userId={userId}>
        <MessageText>{item.text}</MessageText>
        <TimeStamp message={item} userId={userId}>
          {moment(item.timestamp).format('HH:mm')}
        </TimeStamp>
        {item.sender === userId ? (
          <View style={{position: 'absolute', bottom: 5, right: 5}}>
            <SvgXml
              width={15}
              height={15}
              xml={
                item.messageStatus === 'received'
                  ? readIcon
                  : item.messageStatus === 'sent'
                  ? sentIcon
                  : sendingIcon
              }
            />
          </View>
        ) : null}
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
