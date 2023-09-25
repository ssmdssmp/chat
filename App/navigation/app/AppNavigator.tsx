import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatNavigator from './ChatNavigator';
import SettingsNavigator from './SettingsNavigator';
import {ContactsScreen} from '@/screens';
import {SvgXml} from 'react-native-svg';
import {chatsIcon, contactsIcon, ProfileIcon} from '@/assets';
const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="ChatNavigator">
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Contacts',
          tabBarIcon: () => (
            <SvgXml height={25} width={25} xml={contactsIcon} />
          ),
        }}
        component={ContactsScreen}
        name="ContactsScreen"
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Chats',
          tabBarIcon: () => <SvgXml height={25} width={25} xml={chatsIcon} />,
        }}
        name="ChatNavigator"
        component={ChatNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: () => <SvgXml height={25} width={25} xml={ProfileIcon} />,
        }}
        name="SettingsNavigator"
        component={SettingsNavigator}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
