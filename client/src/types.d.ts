type TFormValues<T> = {
  values: {
    [Key in keyof T]: T[Key]
  }
}

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
};

// Products

interface IProduct {
  _id: string,
  barcode: string,
  name: string,
  stock: string,
  pricebuy: string,
  pricesell: string,
  date: string,
  description: string,
  active: boolean,
  category: ICategory,
}

interface IProductResponse {
  _id: string,
  barcode: string,
  name: string,
  stock: string,
  pricebuy: string,
  pricesell: string,
  date: string,
  description: string,
  active: boolean,
  category: string,
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
  role: string;
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

interface IRole {
  _id: string,
  name: string,
  description: string,
  isActive: boolean,
}

// Others

interface ISelectOption {
  label: string;
  value: string | number | boolean;
};

interface IParamTypes {
  id: string;
}
