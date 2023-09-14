import {StackNavigationProp} from '@react-navigation/stack';

export type AuthStackParamsList = {
  SignUp: undefined;
  Login: undefined;
};

export type AuthNavigationProp = StackNavigationProp<AuthStackParamsList>;
