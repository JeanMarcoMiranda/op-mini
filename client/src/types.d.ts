type TFormValues<T> = {
  values: {
    [Key in keyof T]: T[Key];
  };
};

type LoginFormValues = {
  email: string;
  password: string;
};

// Supplier

interface ISupplier {
  _id: string;
  name: string;
  phone: string;
  email: string;
  doctype: string;
  docnum: string;
  address: string;
  active: boolean;
}

interface ISupplierTableData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  active: JSX.Element;
  actions: JSX.Element;
}

interface IFormSupplier {
  name: string;
  phone: string;
  email: string;
  doctype: string;
  docnum: string;
  address: string;
  active: ISelectOption;
}

// Products

interface IProduct {
  _id: string;
  barcode: string;
  name: string;
  stock: string;
  pricebuy: string;
  pricesell: string;
  date: string;
  description: string;
  active: boolean;
  category: ICategory;
}

interface IProductResponse {
  _id: string;
  barcode: string;
  name: string;
  stock: string;
  pricebuy: string;
  pricesell: string;
  date: string;
  description: string;
  active: boolean;
  category: string;
}

interface IProductTableData {
  _id: string;
  barcode: string;
  name: string;
  category: string;
  stock: string;
  pricebuy: string;
  pricesell: string;
  active: JSX.Element;
  actions: JSX.Element;
}

interface IFormProduct {
  barcode: string;
  name: string;
  stock: string;
  pricebuy: string;
  pricesell: string;
  date: string;
  description: string;
  active: ISelectOption;
  category: ISelectOption | undefined;
}

interface ICategory {
  _id: string;
  name: string;
  active: boolean;
}

//Users

interface IUserResponse {
  _id: string;
  name: string;
  password: string;
  isActive: boolean;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  currentAddress: string;
  role: IRole;
}

interface IUserTableData {
  _id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  currentAddress: string;
  active: JSX.Element;
  actions: JSX.Element;
}

interface IFormUser {
  name: string;
  password: string;
  isActive: ISelectOption;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  currentAddress: string;
  role: ISelectOption | undefined;
}

// Others

interface ISelectOption {
  label: string;
  value: string | number | boolean;
}

interface IParamTypes {
  id: string;
}

// ========== Redux Alert Types ==========

interface IModalProps {
  isOpen?: boolean,
  setisOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string,
  img?: string,
  contentText?: string,
  cancelButton?: boolean,
  defaultButton?: string,
  colorDB?: string,
  onClickDB?: MouseEventHandler<HTMLButtonElement>,
  typeButton?: string,
  colorTYB?: string,
  onClickTYB?: MouseEventHandler<HTMLButtonElement>,
}

interface IToastProps {
  isOpen?: boolean,
  setisOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  contentText?: string,
  color?: string,
  delay?: number,
}

interface TableHead {
  text: string;
}

interface INotificationProps {
  isOpen?: boolean,
  setisOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  title?: string,
  theadData?: TableHead[],
  tbodyData?: any,
  contentObj?: any,
  contentText?: string,
}

type AlertState = {
  modalData?: IModalProps,
  toastData?: IToastProps,
  notificationData?: INotificationProps,
};

interface SetModalDataAction {
  type: "SET_MODAL";
  modal: IModalProps;
};

interface SetToastDataAction {
  type: "SET_TOAST";
  toast: IToastProps;
};

interface SetNotificationDataAction {
  type: "SET_NOTIFICATION";
  notification: INotificationProps;
};

type AlertActionTypes = SetModalDataAction | SetToastDataAction | SetNotificationDataAction

// ========== Redux User Types ==========
interface IUser {
  _id: string;
  name: string;
  password: string;
  isActive: boolean;
  documentType: string;
  documentNumber: string;
  phone: string;
  email: string;
  currentAddress: string;
  role: IRole;
}

interface IUserData {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  documentType: string;
  documentNumber: string;
  role: IRole;
}

type UserState = {
  isAuthUser: boolean;
  userData: IUserData;
  access_token: string;
};

interface SetUserDataAction {
  type: "SET_USER_DATA";
  user: IUserData;
};

interface SetUserAuthAction {
  type: "SET_AUTH_USER";
  is_auth: boolean;
};

interface SetUserTokenAction {
  type: "SET_TOKEN"
  access_token: string
}

type UserActionTypes = SetUserDataAction | SetUserTokenAction | SetUserAuthAction

interface IRole {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
}

type DispatchType = (args: Action) => Action;


interface RouteData {
  roles?: string[],
  path: string,
  component: React.ComponentType,
  exact: boolean,
  type?: string,
}

interface RouteSideBar {
  label: string;
  Icon: (props: ComponentProps<'svg'>) => JSX.Element;
  path: string;
  roles: string[];
}

interface ISearch {
  search: string;
};

// Common

interface ButtonProps {
  label: string;
  bgColor?: string;
  onHoverStyles?: string;
  textColor: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
}

interface IDate {
  day: string;
  date: number;
  month: string;
  year: number;
  hour: string;
  minutes: string;
  seconds: string;
}

interface IWeatherValues {
  name: string;
  cod: number;
  visibility: number;
  wind: {
    speed: number,
    deg: number
  },
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
}
