import {RootState} from '@/store';

export const getUserSelector = (state: RootState) => state.user.data;
