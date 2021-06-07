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

// Others

interface ISelectOption {
  label: string;
  value: string | number | boolean;
};

interface IParamTypes {
  id: string;
}
