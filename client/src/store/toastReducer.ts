import * as actionTypes from './actionTypes';

const initialToastState: IToastProps = {
  isOpen: false,
  setisOpen: (prev => !prev),
  contentText: '',
  color: '',
  delay: 0,
};

const initialState: AlertState = {
  toastData: initialToastState,
};

export const toastReducer = (
  state: AlertState = initialState,
  action: AlertActionTypes,
): AlertState => {
  switch (action.type) {
    case actionTypes.SET_TOAST: {
      return { ...state, toastData: action.toast };
    }
    default:
      return state;
  }
};
