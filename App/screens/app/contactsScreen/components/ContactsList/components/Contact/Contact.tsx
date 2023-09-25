import React from 'react';
import {TUser} from '@/types';
import {
  BorderMask,
  ContactPressableWrapper,
  ContactTextWrapper,
  LastSeenText,
  StyledImage,
  UsernameText,
} from './styled';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '@/navigation';
import {useAppSelector} from '@/store';
import {getChatSelector} from '@/store/modules/chat/selector';

const Contact = ({settings}: {settings: TUser}) => {
  const {chats} = useAppSelector(getChatSelector);

  const navigation = useNavigation<AppNavigationProp>();
  const handlePress = () => {
    const existingChat = chats.find(el => el.receiver.id === settings.id);
    if (existingChat) {
      navigation.navigate('Chat', {
        id: existingChat.chat.id,
        receiver: existingChat.receiver,
        prevScreen: 'ContactsScreen',
      });
    } else {
      navigation.navigate('Chat', {
        id: null,
        receiver: settings,
        prevScreen: 'ContactsScreen',
      });
    }
  };
  return (
    <ContactPressableWrapper onPress={handlePress}>
      <BorderMask />
      <StyledImage source={{uri: settings.avatar}} />
      <ContactTextWrapper>
        <UsernameText>{settings.username}</UsernameText>
        <LastSeenText>last seen 6 months ago</LastSeenText>
      </ContactTextWrapper>
    </ContactPressableWrapper>
  );
};

export default Contact;
