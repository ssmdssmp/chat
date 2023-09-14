import {TMessage} from '@/types';
import {Dispatch, SetStateAction} from 'react';

export type TChatInputProps = {
  setMessages: Dispatch<SetStateAction<TMessage[]>>;
  messages: TMessage[];
};
