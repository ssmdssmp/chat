import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatNavigator from './ChatNavigator';
import SettingsNavigator from './SettingsNavigator';
import {ContactsScreen} from '@/screens';
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ChatNavigator">
      <Tab.Screen
        options={{headerShown: false}}
        component={ContactsScreen}
        name="ContactsScreen"
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="ChatNavigator"
        component={ChatNavigator}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
