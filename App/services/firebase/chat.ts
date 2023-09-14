import {TChatWithReceiverData} from './../../types/chat';
import {TChat, TMessage} from '@/types';
import axios from 'axios';
import {RTDatabase} from './config';
import {getUserData} from './users';

export const getChatById = async (id: string) => {
  try {
    const ref = RTDatabase.ref(`chats/${id}`);
    const snapshot = await ref.once('value');
    const data: TChat = snapshot.val();
    return data;
  } catch (error) {
    console.error('Error getting chat:', error);
    throw error;
  }
};

export const sendMessage = async (
  chatId: string,
  message: TMessage,
  userId: string | null,
) => {
  await getChatById(chatId).then(result => {
    if (userId && result.participants && result.participants[userId]) {
      RTDatabase.ref(`chats/${chatId}/messages/`).push(message);
    }
  });
};

export const getUserChats = async (userId: string) => {
  try {
    const {data} = await axios.get(`http://localhost:3000/${userId}`);
    let chatsWithReceiverData: TChatWithReceiverData[] = [];

    const promises = Object.entries(data).map(async ([chatId, chatData]) => {
      if (chatData !== undefined) {
        const receiverPromises = Object.keys(chatData.participants).map(
          async participant => {
            if (participant !== userId) {
              try {
                const receiverData = await getUserData(participant);
                const messagesArray = Object.entries(chatData.messages)
                  .map(([messageId, messageData]) => ({
                    id: messageId,
                    sender: messageData.sender,
                    text: messageData.text,
                    timestamp: messageData.timestamp,
                  }))
                  .sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return dateA - dateB;
                  });
                chatsWithReceiverData.push({
                  receiver: receiverData,
                  chat: {
                    ...chatData,
                    id: chatId,
                    messages: messagesArray,
                  },
                });
              } catch (error) {
                console.error(error);
              }
            }
          },
        );

        await Promise.all(receiverPromises);
      }
    });
    await Promise.all(promises);

    return chatsWithReceiverData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewChat = async (
  senderId: string,
  receiverId: string,
  firstMessage: string,
) => {
  const newChatKey = await RTDatabase.ref('chats').push({
    participants: {
      [senderId]: true,
      [receiverId]: true,
    },
  }).key;
  RTDatabase.ref(`chats/${newChatKey}/messages`).push({
    sender: senderId,
    text: firstMessage,
    timestamp: new Date().toString(),
    status: 'sent',
  });
  const newChat = await getChatById(newChatKey);
  const receiver = await getUserData(receiverId);
  const messagesArray = Object.entries(newChat.messages)
    .map(([messageId, messageData]) => ({
      id: messageId,
      sender: messageData.sender,
      text: messageData.text,
      timestamp: messageData.timestamp,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateA - dateB;
    });
  const newChatEntry = {
    chat: {...newChat, id: newChatKey, messages: messagesArray},
    receiver,
  };
  return {newChat: newChatEntry, newChatId: newChatKey};
};
