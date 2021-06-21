import * as actionTypes from './actionTypes';

const initialUserRole: IRole = {
  _id: '',
  name: '',
  isActive: false,
  description: '',
};

const initialUserState: IUserData = {
  _id: '',
  name: '',
  email: '',
  documentType: '',
  documentNumber: '',
  isActive: false,
  role: initialUserRole,
};

const initialState: UserState = {
  isAuthUser: !!localStorage.getItem('user'),
  userData: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as IUserData : initialUserState,
  access_token: localStorage.getItem('token') || "",
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA: {
      return { ...state, userData: action.user };
    }
    case actionTypes.SET_LOGGED_IN: {
      return { ...state, access_token: action.access_token };
    }
    default:
      return state;
  }
};
