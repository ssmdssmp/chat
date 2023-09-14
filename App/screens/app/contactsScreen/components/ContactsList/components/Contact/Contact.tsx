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

const Contact = ({settings}: {settings: TUser}) => {
  const navigation = useNavigation<AppNavigationProp>();
  const handlePress = () => {
    navigation.navigate('Chat', {
      id: null,
      receiver: settings,
      prevScreen: 'ContactsScreen',
    });
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
