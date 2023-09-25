import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNavigationProp, ChatRouteProp} from '@/navigation';
import {SvgXml} from 'react-native-svg';
import {leftArrow, optionsIcon, searchIcon} from '@/assets';
import {
  ChatHeaderWrapper,
  Options,
  ReceiverProfileText,
  ReceiverProfileWrapper,
} from './styled';

const ChatHeader = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<ChatRouteProp>();
  return (
    <ChatHeaderWrapper>
      <Pressable onPress={() => navigation.navigate(route.params.prevScreen)}>
        <SvgXml xml={leftArrow} height={25} width={25} fill={'blue'} />
      </Pressable>
      <ReceiverProfileWrapper>
        <Image
          style={{height: 45, width: 45, borderRadius: 40}}
          source={{uri: route.params.receiver.avatar}}
        />
        <ReceiverProfileText>
          <Text>{route.params.receiver.username}</Text>
          <Text>last seen 17 minutes ago</Text>
        </ReceiverProfileText>
      </ReceiverProfileWrapper>
      {/* <SvgXml xml={searchIcon} height={35} width={35} fill={'blue'} /> */}
      <Options>
        <SvgXml xml={optionsIcon} height={30} width={30} fill={'blue'} />
      </Options>
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
