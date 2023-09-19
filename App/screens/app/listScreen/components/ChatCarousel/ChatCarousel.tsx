import {Dimensions} from 'react-native';
import React, {useRef} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {FlexWrapper} from '@/styles';
import {ChatList, Folders} from './components';
import {TChatWithReceiverData} from '@/types/chat';

const ChatCarousel = ({chats}: {chats: TChatWithReceiverData[]}) => {
  const carouselRef = useRef(null);

  const changeFolder = () => {
    //@ts-ignore
    carouselRef.current?.scrollTo({index: 0, animated: true});
  };
  const renderItem = ({item}: {item: TChatWithReceiverData[]}) => {
    return <ChatList chats={item} />;
  };
  return (
    <FlexWrapper>
      <Folders changeFolder={changeFolder} />
      <Carousel
        ref={carouselRef}
        style={{height: Dimensions.get('window').height - 160}}
        loop={false}
        width={Dimensions.get('screen').width}
        data={chats ? [chats, chats] : [[], []]}
        renderItem={renderItem}
      />
    </FlexWrapper>
  );
};

export default ChatCarousel;
