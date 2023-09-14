import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import {rootReducer} from './reducer';
import rootSaga from './saga';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
  },
  rootReducer,
);

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const store = configureStore({reducer: persistedReducer, middleware});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
