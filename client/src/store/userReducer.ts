import * as actionTypes from './actionTypes';

const initialUserRole: IUserRole = {
  _id: '',
  name: '',
  isActive: false,
  description: '',
};

const initialUserState: IUser = {
  _id: '',
  name: '',
  email: '',
  documentType: '',
  documentNumber: '',
  isActive: false,
  role: initialUserRole,
};

const initialState: UserState = {
  user: initialUserState,
  access_token: '',
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case actionTypes.SET_USER_DATA: {
      const { user, access_token } = action.userData;
      return { ...state, user, access_token };
    }
    default:
      return state;
  }
};
