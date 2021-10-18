import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setToastData } from '../../store/action/actions';
import {
  ButtonComponent as Button,
  InputComponent as Input,
  TableComponent as Table,
  IconComponent as Icon,
  DatePickerComponent as DatePicker,
} from '../../components/common';
import { isNumeric, roundDecimals, toHoverStyle } from '../../components/utils';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import { RadioGroup } from '@headlessui/react';

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};

const tableFieldData = [
  { text: 'Codigo de Barras', width: 2, name: 'barcode' },
  { text: 'Nombre', width: 3, name: 'name' },
  { text: 'Categoria', width: 2, name: 'category' },
  { text: 'Empresa', width: 2, name: 'company' },
  { text: 'Stock', width: 1, name: 'stock' },
  { text: 'Precio Venta', width: 2, name: 'pricesell' },
];

const SaleForm: React.FC = () => {

  //Búsqueda de Productos
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [searchVal, setSearchVal] = useState('')
  const [searchTableShow, setSearchTableShow] = useState(false)
  const [searchTableData, setSearchTableData] = useState<IProductTableData[]>([])

  //Lista de Productos de la Venta
  const [saleProducts, setSaleProducts] = useState<IProductTableData[]>([])
  const [saleList, setSaleList] = useState<ISaleProduct[]>([])

  //Valores de la Carta de Venta
  const [clientName, setClientName] = useState<string>('')
  const [voucherType, setVoucherType] = useState<string>('ticket')
  const [paymentMethod, setPaymentMethod] = useState<string>('efectivo')
  const [paymentCash, setPaymentCash] = useState<string>('')

  //Redux
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  useEffect(() => {
    if (searchVal.length > 2) {
      getSearchProduct(searchVal);
    } else {
      setSearchTableShow(false)
      setProductData([])
    }
    // eslint-disable-next-line
  }, [searchVal]);

  useEffect(() => {
    if (productData.length === 0) {
      setSearchTableData([])
      return
    };

    const prepareTableData = () => {
      let newTableData: IProductTableData[] = productData.map(
        ({
          _id,
          barcode,
          name,
          category,
          stock,
          pricebuy,
          pricesell,
          company = ''
        }: IProduct) => {
          let newData: IProductTableData = {
            _id,
            barcode,
            name,
            category: category.name,
            stock,
            pricebuy,
            pricesell,
            company,
          };
          return newData;
        },
      );
      setSearchTableData(newTableData);
    };

    prepareTableData();
    // eslint-disable-next-line
  }, [productData]);

  const getSearchProduct = async (search: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/products/search/${search}`;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlSearch, requestInit);
    const data = await res.json();
    if (res.ok) {
      setSearchTableShow(true)
      setProductData(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, setState: (value: React.SetStateAction<string>) => void) => {
    setState(event.target.value);
  };

  const addProductSale = (data: any) => {
    let dataS = data as IProductTableData

    let alreadyExist = saleProducts.find( product => product.name === dataS.name)
    if (alreadyExist) return

    let salep: ISaleProduct = {
      product: {
        _id: dataS._id,
        name: dataS.name,
      },
      quantity: '1',
      price: dataS.pricesell,
    }

    setSaleList([...saleList, salep])
    setSaleProducts([...saleProducts, dataS])
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">
              <div className="flex items-center justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">
                  Ventas
                </h6>
                <Link to={`/sale`}>
                  <Button
                    label="Regresar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
              </div>
            </div>

            <div className="flex">
              <div className="col-span-2 py-3 px-6 flex-1">
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Productos del Pedido
                </h6>
                {saleList.length > 0 ?
                  saleList.map((prod, index) => (
                    <div className="flex items-center" key={index}>
                      <div className="flex-initial">
                      <Icon
                        width={8}
                        color="red"
                        Icon={XIcon}
                        hover
                        onClick={() => {}}
                      />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Nombre"
                          name={prod.product.name}
                          value={saleList[index].product.name}
                          disabled={true}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="number"
                          label="Cantidad"
                          name={prod.quantity}
                          value={saleList[index].quantity}
                          onChange={e => {}}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Precio Individual"
                          name={prod.price}
                          value={saleProducts[index].pricesell}
                          onChange={e => {}}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Total"
                          name={prod.product.name}
                          value={roundDecimals(Number(saleList[index].price))}
                          disabled={true}
                        />
                      </div>
                    </div>
                  )) : '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
                }
              </div>

              <div className="col-span-2 py-3 px-6 bg-white flex-initial w-96">
                <Input
                  type="text"
                  label="Nombre de Cliente"
                  name={"cliente"}
                  value={clientName}
                  onChange={e => handleChange(e,setClientName)}
                />

                <hr className="my-3"/>

                <div className="mb-3">
                  <RadioGroup value={voucherType} onChange={setVoucherType} className="flex">
                    <RadioGroup.Option value="ticket"
                      className={({ active, checked }) => `
                      ${ checked ? 'bg-blue-500 text-white' : 'bg-white'}
                      flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                    >
                      {({ checked }) => (
                        <span className="">Ticket</span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="factura"
                      className={({ active, checked }) => `
                      ${ checked ? 'bg-blue-500 text-white' : 'bg-white'}
                      flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                    >
                      {({ checked }) => (
                        <span className="">Factura</span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="boleta"
                      className={({ active, checked }) => `
                      ${ checked ? 'bg-blue-500 text-white' : 'bg-white'}
                      flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                    >
                      {({ checked }) => (
                        <span className="">Boleta</span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>

                <hr className="my-3"/>

                <div className="mb-3">
                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod} className="flex">
                    <RadioGroup.Option value="efectivo"
                      className={({ active, checked }) => `
                      ${ checked ? 'bg-blue-500 text-white' : 'bg-white'}
                      flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                    >
                      {({ checked }) => (
                        <span className="">Efectivo</span>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="tarjeta"
                      className={({ active, checked }) => `
                      ${ checked ? 'bg-blue-500 text-white' : 'bg-white'}
                      flex-auto relative rounded-lg shadow-md mx-3 py-1 cursor-pointer`}
                    >
                      {({ checked }) => (
                        <span className="">Tarjeta</span>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>

                <hr className="my-3"/>

                <Input
                  type="number"
                  label="Pago en Efectivo"
                  name={"cash"}
                  value={paymentCash}
                  onChange={e => handleChange(e,setPaymentCash)}
                />
              </div>
            </div>

            <div className="col-span-2 py-3 px-6">
              <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Seleccionar Productos
              </h6>

              <div className="box mx-6 mt-6 mb-3">
                <div className="box-wrapper">
                  <div className=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
                    <Input
                      type="search"
                      label=""
                      name="search"
                      value={searchVal}
                      onChange={e => handleChange(e, setSearchVal)}
                      placeholder="Buscar producto..."
                      icon={iconValue}
                    />
                  </div>
                </div>
              </div>

              {searchTableShow &&
                <div className="mb-3">
                  <Table
                    theadData={tableFieldData}
                    tbodyData={searchTableData}
                    onClick={addProductSale}
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SaleForm
