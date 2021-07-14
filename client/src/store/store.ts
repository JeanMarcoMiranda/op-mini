import { createStore, combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { modalReducer } from './modalReducer';
import { toastReducer } from './toastReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { notificationReducer } from './notificationReducer';

const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  toast: toastReducer,
  notification: notificationReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
