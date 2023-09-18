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
  // Generate a unique key for the new chat entry
  const newChatKey = RTDatabase.ref('chats').push().key;

  // Create the chat entry
  const chatEntry = {
    messages: {
      [newChatKey]: {
        sender: senderId,
        text: firstMessage,
        timestamp: new Date().toString(),
        status: 'sent',
      },
    },
    participants: {
      [senderId]: true,
      [receiverId]: true,
    },
  };

  // Set the chat entry in the Firebase Realtime Database
  await RTDatabase.ref(`chats/${newChatKey}`).set(chatEntry);

  // Fetch the new chat
  const newChat = await getChatById(newChatKey);

  // Fetch receiver data
  const receiver = await getUserData(receiverId);

  // Transform messages into an array and sort them
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

  // Create the newChatEntry object
  const newChatEntry = {
    chat: {...newChat, id: newChatKey, messages: messagesArray},
    receiver,
  };

  // Return the newChatEntry and newChatId
  return {newChat: newChatEntry, newChatId: newChatKey};
};
