import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './auth';
import { lectureReducer, lectureDetailReducer } from './lecture';
import commentReducer from './comment';
import { locationReducer, positionReducer } from './location';
import userInfoReducer from './userInfo';
import userStore from './userStore'; // 민경 추가
import meetStore from './meetStore'; // 민경 추가
import eventReducer from './eventStore'; // 나현 추가

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,
  position: positionReducer,
  userInfo: userInfoReducer,
  lecture: lectureReducer,
  lectureDetail: lectureDetailReducer,
  comment: commentReducer,
  meetStore,
  userStore,
  events: eventReducer,
});
// redux-persist사용
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'location', 'position', 'userInfo', 'lecture', 'lectureDetail'], // 리듀서의 이름이 들어가야함
};
// persistReducer를 사용하여 Redux reducer를 감싸고, configureStore에 전달합니다.
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // reducer객체의 키가 여러개일경우 키는 state의 진입점이 됨
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
