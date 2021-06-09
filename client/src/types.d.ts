type FormValues<T> = {
  values: {
    [Key in keyof T]: T[Key];
  };
};

type LoginFormValues = {
  email: string;
  password: string;
};

// =====================================

interface IUser {
  _id: string;
  name: string;
  email: string;
  documentType: string;
  documentNumber: string;
  isActive: boolean;
  role: IUserRole;
}

interface IUserRole {
  _id: string;
  name: string;
  isActive: boolean;
  description: string;
}

type UserState = {
  user: IUser;
  access_token: string
};

type UserAction = {
  type: string
  userData: UserState
}

type DispatchType = (args: Action) => Action;
