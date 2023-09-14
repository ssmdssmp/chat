import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsScreen} from '@/screens';

const SettingsNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen name="Option" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
