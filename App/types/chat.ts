import {TUser} from './user';

export type TMessage = {
  sender: string;
  id: string;
  text: string;
  status: 'sent' | 'sending' | 'received';
  timestamp: string;
};

export type TChat = {
  messages: TMessage[];
  participants: string[];
  id: string;
};

export interface IChatWithParticipantsData extends Omit<TChat, 'participants'> {
  participants: TUser[];
}

export type TChatWithReceiverData = {
  chat: TChat;
  receiver: TUser;
};
