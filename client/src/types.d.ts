type TFormValues<T> = {
  values: {
    [Key in keyof T]: T[Key]
  }
}

interface IParamTypes {
  id: string;
}

interface IFormSupplier {
  name: string;
  phone: number;
  email: string;
  doctype: string;
  docnum: number;
  address: string;
  active: IFormSupplierOptions;
};

interface IFormOptions {
  label: string;
  value: string | number | boolean;
};
