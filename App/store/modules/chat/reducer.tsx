import {createSlice} from '@reduxjs/toolkit';

export const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
  },
  reducers: {
    setChats: (state, {payload}) => {
      state.chats = payload;
    },
    deleteChats: state => {
      state.chats = [];
    },
  },
});
export const chatActions = chatReducer.actions;
export default chatReducer.reducer;
