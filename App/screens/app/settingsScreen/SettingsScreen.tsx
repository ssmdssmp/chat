import React from 'react';
import {ScreenWrapper} from '@/styles';
import {ProfileInfo} from './components';
import {doorIcon, plusIcon} from '@/assets';
import {ActionButton} from '@/components';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, userActions} from '@/store';
const SettingsScreen = () => {
  const dispatch = useAppDispatch();
  const logout = () => {
    auth()
      .signOut()
      .then(() => dispatch(userActions.logout()))
      .catch(e => {
        console.log(e);
        dispatch(userActions.logout());
      });
  };
  return (
    <ScreenWrapper padding={10} bgColor="#E9ECEF">
      <ProfileInfo />
      {/* <ActionButton
        bgColor="white"
        textColor="#409e40"
        onPress={logout}
        iconBgColor="transparent"
        iconColor="#409e40"
        xml={plusIcon}
        text={'Add Account'}
      /> */}
      <ActionButton
        text="Logout"
        bgColor="white"
        textColor="#e1241e"
        onPress={logout}
        iconBgColor="transparent"
        iconColor="#e1241e"
        xml={doorIcon}
      />
    </ScreenWrapper>
  );
};

export default SettingsScreen;
