import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import newsInfoSlice from './newsInfoSlice';

export const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["newsInfo"] //i want to persist useFeeds state
};

const rootReducer = combineReducers({
  newsInfo: newsInfoSlice,
});

export default persistReducer(persistConfig, rootReducer);
