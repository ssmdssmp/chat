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
import {createNewChat, sendMessage} from '@/services';
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
      };

      if (route.params.id) {
        try {
          await sendMessage(route.params.id, newMessage, userId);
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        try {
          const {newChat, newChatId} = await createNewChat(
            userId as string,
            route.params.receiver.id,
            messageText,
          );
          dispatch(chatActions.setChats([...chats, newChat]));
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
