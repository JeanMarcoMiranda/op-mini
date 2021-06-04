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
  active: boolean;
};

interface IFormSupplierIOptions {
  id: number;
  label: string;
  value: string | number | boolena ;
};

interface IFormSupplierOptions extends Array<IFormSupplierIOptions>{}

