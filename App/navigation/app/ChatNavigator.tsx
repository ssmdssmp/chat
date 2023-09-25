import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen, ListScreen} from '@/screens';
const ChatNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="List"
        component={ListScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Chat"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
