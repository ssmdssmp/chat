import React from 'react';
import {cameraIcon, mokAvatar} from '@/assets';
import {Avatar, UserName, Wrapper, UserInfo} from './styled';
import {ActionButton} from '@/components';
import {getUserSelector, useAppSelector} from '@/store';

const ProfileInfo = () => {
  const handlePress = () => {
    console.log('ProfileInfo');
  };
  const {userId, userName, avatar, email} = useAppSelector(getUserSelector);
  return (
    <Wrapper>
      <Avatar source={{uri: avatar}} />
      <UserName>
        {userName?.includes('@')
          ? userName.slice(0, userName?.indexOf('@'))
          : userName}
      </UserName>
      <UserInfo>{email}</UserInfo>
      {/* <ActionButton
        bgColor="white"
        xml={cameraIcon}
        onPress={handlePress}
        iconBgColor="transparent"
        textColor="#409e40"
        text={'Change avatar'}
        iconColor="#409e40"
      /> */}
    </Wrapper>
  );
};

export default ProfileInfo;
