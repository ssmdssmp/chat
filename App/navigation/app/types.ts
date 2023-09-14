import {TUser} from './../../../ios/App/types/user';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackParamsList = {
  List: undefined;
  Chat: {id: string | null; receiver: TUser};
  Settings: undefined;
};
export type AppNavigationProp = StackNavigationProp<AppStackParamsList>;

export type ChatRouteProp = RouteProp<AppStackParamsList, 'Chat'>;
