import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignUpScreen} from '@/screens';
import {AuthStackParamsList} from './types';

const AuthNavigator = () => {
  const Stack = createStackNavigator<AuthStackParamsList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
