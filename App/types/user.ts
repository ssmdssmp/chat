import {TChat} from './chat';

export type TUser = {
  email: string;
  id: string;
  username: string;
  isOnline?: boolean;
  lastSeen?: string;
  avatar: string;
};
