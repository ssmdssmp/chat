import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppSelector, getUserSelector} from '@/store';
import AppNavigator from './app/AppNavigator';
import {AuthNavigator} from './auth';

const RootNavigator = () => {
  const {userId} = useAppSelector(getUserSelector);
  return (
    <NavigationContainer>
      {userId ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
