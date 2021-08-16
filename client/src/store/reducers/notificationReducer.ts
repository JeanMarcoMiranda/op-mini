import * as actionTypes from '../action/actionTypes';

const initialNotificationState: INotificationProps = {
  isOpen: false,
  setisOpen: (prev => !prev),
  title: '',
  theadData: [],
  tbodyData: '',
  contentObj: {},
  contentText: '',
};

const initialState: AlertState = {
  notificationData: initialNotificationState,
};

export const notificationReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes,
): AlertState => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION: {
      return { ...state, notificationData: action.notification };
    }
    default:
      return state;
  }
};
