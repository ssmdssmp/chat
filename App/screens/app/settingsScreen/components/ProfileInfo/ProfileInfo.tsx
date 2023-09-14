import React from 'react';
import {cameraIcon, mokAvatar} from '@/assets';
import {Avatar, UserName, Wrapper, UserInfo} from './styled';
import {ActionButton} from '@/components';

const ProfileInfo = () => {
  const handlePress = () => {
    console.log('ProfileInfo');
  };
  return (
    <Wrapper>
      <Avatar source={mokAvatar} />
      <UserName>Ssmd</UserName>
      <UserInfo>dmitryy.volov @ssmdssmp</UserInfo>
      <ActionButton
        bgColor="white"
        xml={cameraIcon}
        onPress={handlePress}
        iconBgColor="transparent"
        textColor="#409e40"
        text={'Change avatar'}
        iconColor="#409e40"
      />
    </Wrapper>
  );
};

export default ProfileInfo;
