import {firebase} from '@react-native-firebase/database';

export const RTDatabase = firebase
  .app()
  .database(
    'https://chatnew-b6476-default-rtdb.europe-west1.firebasedatabase.app',
  );
