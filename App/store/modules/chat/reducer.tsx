import {createSlice} from '@reduxjs/toolkit';
import {TChatWithReceiverData, TMessage} from '@/types';
const initialState: {
  chats: TChatWithReceiverData[];
} = {
  chats: [],
};
export const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, {payload}) => {
      state.chats = payload;
    },
    addChat: (state, {payload}) => {
      if (state.chats.length >= 2) {
        state.chats = [payload, ...state.chats].sort((a, b) => {
          const dateA = new Date(a.chat.messages.at(-1).timestamp);
          const dateB = new Date(b.chat.messages.at(-1).timestamp);
          return dateA - dateB;
        });
      }
      if (state.chats.length === 0) {
        state.chats = payload;
      } else {
        state.chats = [payload, ...state.chats];
      }
    },
    updateChat: (
      state,
      {payload}: {payload: {id: string; message: TMessage}},
    ) => {
      state.chats
        .filter(el => el.chat.id === payload.id)[0]
        .chat.messages.push(payload.message);
    },
    sortChats: state => {
      if (state.chats.length >= 2) {
        state.chats = state.chats.sort((a, b) => {
          const dateA = new Date(a.chat.messages.at(-1).timestamp);
          const dateB = new Date(b.chat.messages.at(-1).timestamp);
          return dateB - dateA;
        });
      }
    },
    deleteChat: (state, {payload}) => {
      state.chats = state.chats.filter(el => el.chat.id !== payload);
    },
    resetChats: state => {
      state.chats = [];
    },
  },
});
export const chatActions = chatReducer.actions;
export default chatReducer.reducer;
