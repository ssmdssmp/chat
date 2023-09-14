import {TUser} from '@/types';
import {RTDatabase} from './config';
import auth from '@react-native-firebase/auth';

export const getCurrentUserData = async (id: string) => {
  try {
    const ref = RTDatabase.ref(`userData/${id}`);
    const snapshot = await ref.once('value');
    const data: TUser = snapshot.val();
    return data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getUserData = async (id: string) => {
  try {
    const ref = RTDatabase.ref(`userData/${id}`);
    const snapshot = await ref.once('value');
    const data: TUser = snapshot.val();
    return data;
  } catch (error) {
    console.error('Error getting chat:', error);
    throw error;
  }
};

export const getListOfUsers = async (ids: string[]) => {
  try {
    const chatDataPromises = ids.map(async id => {
      if (id) {
        const ref = RTDatabase.ref(`userData/${id}/public`);
        const snapshot = await ref.once('value');
        const userData = snapshot.val() as TUser | null; // Add type assertion
        return userData;
      }
    });
    const usersList = await Promise.all(chatDataPromises); // Await outside the map function
    return usersList;
  } catch (error) {
    console.error('Error fetching chat data:', error);
    throw error;
  }
};

export const createNewUser = async (email: string, password: string) =>
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      if (user.email) {
        RTDatabase.ref('userData')
          .child(user.uid)
          .set({
            id: user.uid,
            username: user.email.slice(0, user.email.indexOf('@')),
            email: user.email,
            avatar: '',
          });
      }
      return user;
    });

export const searchUsersByQuery = async (searchQuery: string) =>
  await RTDatabase.ref('userData')
    .orderByChild('username')
    .startAt(searchQuery.toLowerCase())
    .endAt(searchQuery.toLowerCase() + '\uf8ff')
    .once('value')
    .catch(e => console.log(e));
