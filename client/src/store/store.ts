import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';
import { modalReducer } from './reducers/modalReducer';
import { toastReducer } from './reducers/toastReducer';
import { notificationReducer } from './reducers/notificationReducer';
import { shiftReducer } from './reducers/shiftReducer';
import { composeWithDevTools } from 'redux-devtools-extension';


const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  toast: toastReducer,
  notification: notificationReducer,
  shift: shiftReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
