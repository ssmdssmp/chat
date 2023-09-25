import {emptyUser} from './config';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: emptyUser,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, {payload}: {payload: typeof emptyUser}) => {
      state.data.userId = payload.userId;
      state.data.userName = payload.userName;
      state.data.email = payload.email;
      state.data.avatar = payload.avatar;
    },
    setUserData: (state, {payload}) => {
      state.data.userId = payload.userId;
      state.data.userName = payload.userName;
      state.data.email = payload.email;
      state.data.avatar = payload.avatar;
    },
    logout: state => {
      state.data = emptyUser;
    },
    changeAvatar: (state, {payload}) => {
      state.data.avatar = payload;
    },
    changeUserName: (state, {payload}) => {
      state.data.userName = payload;
    },
  },
});

export const userActions = userReducer.actions;

export default userReducer.reducer;
