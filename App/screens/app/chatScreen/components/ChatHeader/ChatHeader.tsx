import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppNavigationProp, ChatRouteProp} from '@/navigation';
import {SvgXml} from 'react-native-svg';
import {leftArrow, optionsIcon, searchIcon} from '@/assets';
import {ChatHeaderWrapper} from './styled';

const ChatHeader = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute<ChatRouteProp>();
  return (
    <ChatHeaderWrapper>
      <Pressable onPress={() => navigation.navigate(route.params.prevScreen)}>
        <SvgXml xml={leftArrow} height={30} width={30} fill={'blue'} />
      </Pressable>
      <Image
        style={{height: 45, width: 45}}
        source={{uri: route.params.receiver.avatar}}
      />
      <View>
        <Text>{route.params.receiver.username}</Text>
        <Text>last seen 17 minutes ago</Text>
      </View>
      <SvgXml xml={searchIcon} height={35} width={35} fill={'blue'} />
      <SvgXml xml={optionsIcon} height={35} width={35} fill={'blue'} />
    </ChatHeaderWrapper>
  );
};

export default ChatHeader;
