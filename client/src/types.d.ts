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
  company: string;
  doctype: string;
  docnum: string;
  visitday: string;
  active: boolean;
}

interface ISupplierTableData {
  _id: string;
  name: string;
  phone: string;
  company: string;
  visitday: string;
  active: JSX.Element;
  actions: JSX.Element;
}

interface IFormSupplier {
  name: string;
  phone: string;
  company: string;
  doctype: string;
  docnum: string;
  visitday: string;
  active: ISelectOption;
}

// Orders
interface IOrderProduct {
  product: string;
  quantity: string;
  note: string;
  price: number | string;
}

interface IOrder {
  _id: string;
  createdby: string;
  createdate: string;
  receivedby: string;
  receptiondate: string;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: string;
  products: IOrderProduct[];
  status: string;
}

interface IFormOrder {
  createdby: string;
  createdate: string;
  receivedby: string;
  receptiondate: string;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: string;
  products: IOrderProduct[];
  status: string;
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
  company: string;
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
  company: string;
}

interface IProductTableData {
  _id: string;
  barcode: string;
  name: string;
  category: string;
  stock: string;
  pricebuy: string;
  pricesell: string;
  active?: JSX.Element;
  actions?: JSX.Element;
  company: string;
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
  company: string;
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
  actions: JSX.Element | null;
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
  inpComplete?: boolean,
  contentText?: string,
  contentObj? :any[],
  cancelButton?: boolean,
  defaultButton?: string,
  colorDB?: string,
  onClickDB?: MouseEventHandler<HTMLButtonElement>,
  typeButton?: string,
  colorTYB?: string,
  onClickTYB?: MouseEventHandler<HTMLButtonElement>,
  onClickOrdCompl?: MouseEventHandler<HTMLButtonElement>,
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
  titleContent?: string,
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
