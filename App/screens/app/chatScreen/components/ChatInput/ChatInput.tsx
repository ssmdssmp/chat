import React, {useState} from 'react';
import {arrowUp, paperclipIcon} from '@/assets';
import {InputIcon, InputWrapper, MessageInput, SendButton} from './styled';
import {AppNavigationProp, ChatRouteProp} from '@/navigation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  chatActions,
  getUserSelector,
  useAppDispatch,
  useAppSelector,
} from '@/store';
import {createNewChat, RTDatabase, sendMessage} from '@/services';
import {TMessage} from '@/types';
import {getChatSelector} from '@/store/modules/chat/selector';
const ChatInput = () => {
  const [messageText, setMessageText] = useState<string>('');
  const {userId} = useAppSelector(getUserSelector);
  const {chats} = useAppSelector(getChatSelector);
  const route = useRoute<ChatRouteProp>();
  const navigation = useNavigation<AppNavigationProp>();
  const dispatch = useAppDispatch();
  const handlePress = async () => {
    if (messageText) {
      const newMessage: TMessage = {
        text: messageText,
        timestamp: new Date().toString(),
        sender: userId ? userId : '',
        messageStatus: 'sent',
      };

      if (route.params.id) {
        const newMessageKey = RTDatabase.ref('chats').push().key;
        try {
          dispatch(
            chatActions.addMessage({
              id: route.params.id,
              message: {
                ...newMessage,
                messageStatus: 'sending',
                id: newMessageKey as string,
              },
            }),
          );
          await sendMessage(
            newMessageKey as string,
            route.params.id,
            newMessage,
            userId,
          ).then(() => {
            setTimeout(() => {
              dispatch(
                chatActions.changeMessageStatus({
                  chatId: route.params.id,
                  messageId: newMessageKey,
                  newStatus: 'sent',
                }),
              );
            }, 100);
          });
        } catch (error) {
          console.error('Error sending message:', error);
          dispatch(
            chatActions.changeMessageStatus({
              chatId: route.params.id,
              messageId: newMessageKey,
              newStatus: 'error',
            }),
          );
        }
      } else {
        try {
          const {newChat, newChatId, newMessageKey} = await createNewChat(
            userId as string,
            route.params.receiver.id,
            messageText,
          );
          dispatch(chatActions.setChats([...chats, newChat]));

          setTimeout(() => {
            dispatch(
              chatActions.changeMessageStatus({
                chatId: newChatId,
                messageId: newMessageKey,
                newStatus: 'sent',
              }),
            );
          }, 100);

          navigation.setParams({id: newChatId as string});
        } catch (error) {
          console.error('Error creating chat:', error);
        }
      }
      setMessageText('');
    }
  };
  return (
    <InputWrapper>
      <InputIcon xml={paperclipIcon} fill="black" />
      <MessageInput
        value={messageText}
        onChangeText={e => setMessageText(e)}
        placeholder="Message"
      />
      <SendButton onPress={handlePress}>
        <InputIcon xml={arrowUp} fill="white" />
      </SendButton>
    </InputWrapper>
  );
};

export default ChatInput;
