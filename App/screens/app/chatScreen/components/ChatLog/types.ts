import {TMessage} from '@/types';
import {FirebaseDatabaseTypes} from '@react-native-firebase/database';

export type TStyledMessage = {
  message: TMessage;
  userId: string | null;
};

export type DataSnapshot<T> = FirebaseDatabaseTypes.DataSnapshot & {
  val: () => T;
};
