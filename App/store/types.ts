import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {rootReducer} from './reducer';
import store from './store';

export type TPayload<PayloadType> = {
  payload: PayloadType;
};

export type TResponse = {
  [index: string]: any;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
