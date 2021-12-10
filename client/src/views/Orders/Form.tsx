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

const initialValues: IFormOrder = {
  createdby: '',
  createdate: '',
  receivedby: '',
  receptiondate: '',
  estimatedamount: '',
  finalamount: '',
  type: 'Local',
  supplier: '',
  products: [],
  status: 'Pendiente',
  ndocument: '',
  tdocument: '',
}

const iconValue = {
  isActive: true,
  Icon: SearchIcon,
};

const tableFieldData = [
  { text: 'Codigo de Barras', width: 2, name: 'barcode' },
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Categoria', width: 2, name: 'category' },
  { text: 'Empresa', width: 1, name: 'company' },
  { text: 'Stock', width: 1, name: 'stock' },
  { text: 'Precio Compra', width: 2, name: 'pricebuy' },
  { text: 'Precio Venta', width: 2, name: 'pricesell' },
];

const OrderForm: React.FC = () => {

  const history = useHistory()
  const { id } = useParams<IParamTypes>();
  const dispatch = useDispatch()
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const { shiftData } = useSelector<RootState, RootState['shift']>(
    (state) => state.shift,
  );
  const [orderData, setOrderData] = useState<IFormOrder>(initialValues)
  const [supplierData, setSupplierData] = useState<ISupplier>()
  const [searchVal, setSearchVal] = useState('')
  const [companyProducts, setCompanyProducts] = useState<IProduct[]>([])
  const [searchTableData, setSearchTableData] = useState<IProductTableData[]>([])
  const [orderListData, setOrderListData] = useState<IProduct[]>([])
  const [orderListObj, setOrderListObj] = useState<IOrderProduct[]>([])

  const [startDate, setStartDate] = useState(new Date())
  const [endDate] = useState(new Date())
  const [estimatedTotal, setEstimatedTotal] = useState('0')

  useEffect(() => {
    setOrderData({ ...orderData, supplier: id })
    getSupplierData(id)
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (companyProducts.length > 0) {
      if (searchVal.length > 2) {
        getSearchProduct(searchVal);
      } else {
        prepareSearchTableData()
      }
    }
    //eslint-disable-next-line
  }, [searchVal])

  useEffect(() => {
    if (companyProducts.length > 0) {
      prepareSearchTableData()
    }
    //eslint-disable-next-line
  }, [companyProducts])

  useEffect(() => {
    let estTotal = 0
    for (let i = 0; i < orderListObj.length; i++) {
      estTotal = estTotal + Number(orderListObj[i].price);
    }
    setEstimatedTotal(roundDecimals(estTotal) + '')
  }, [orderListObj])

  const getSupplierData = async (idSupp: string) => {
    const url: RequestInfo = `http://localhost:8000/suppliers/${idSupp}`;
    const response = await fetch(url);
    const supplierResponse: ISupplier = await response.json();
    if (response.ok) {
      setSupplierData(supplierResponse)
      getProductsCompany(supplierResponse)
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method: Get, Error${response.status} : ${response.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const getProductsCompany = async (supplierResponse: ISupplier) => {
    const urlSearch: RequestInfo = `http://localhost:8000/products/company/${supplierResponse?._id}`;
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
      setCompanyProducts(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const prepareSearchTableData = (productsSearch: IProduct[] = companyProducts) => {
    const std: IProductTableData[] = productsSearch.map((product) => {
      let nobj = { ...product, category: product.category.name, company: product.company.company }
      let { date, description, active, ...tnobj } = nobj
      return tnobj as IProductTableData
    })
    setSearchTableData(std)
  }

  const getSearchProduct = async (search: string) => {
    let regex = new RegExp(["^.*", search, ".*$"].join(""), "i");
    const found = companyProducts.filter(product => product.name.match(regex))
    if (found) {
      prepareSearchTableData(found)
    }
  };

  const addProductOrder = (data: any) => {
    let datap = data as IProductTableData

    let alreadyExist = orderListData.find(product => product.name === datap.name)
    if (alreadyExist) return

    let nprol = companyProducts.find(product => product.name === datap.name)
    if (nprol) {
      let nobjl: IOrderProduct = {
        product: nprol._id,
        quantity: '1',
        note: '',
        price: nprol.pricebuy,
      }

      setOrderListObj([...orderListObj, nobjl])
      setOrderListData([...orderListData, nprol])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  const createOrder = async (data: IOrderProduct[]) => {
    if (shiftData?.inShift) {
      const urlPro = "http://localhost:8000/orders"
      let dateNow: Date = new Date()
      const requestInit: RequestInit = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...orderData,
          products: data,
          estimatedamount: estimatedTotal,
          createdate: dateNow,
          createdby: userData._id,
          receivedby: userData._id,
          receptiondate: startDate,
        }),
      }
      const res = await fetch(urlPro, requestInit);
      console.log('ress', res);
      console.log(res.body);
      if (res.ok) {
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: 'El pedido se ha creado con exito.',
          color: 'success',
          delay: 5
        }))
        history.push('/order')
      } else {
        dispatch(setToastData({
          isOpen: true,
          setisOpen: (prev => !prev),
          contentText: `Method Create, Error${res.status} : ${res.statusText}`,
          color: 'warning',
          delay: 5
        }))
      }
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Necesitas iniciar un turno primero`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const updateQuantity = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nOrderListObj = orderListObj.slice()
    const obj = orderListObj[index]
    obj.quantity = e.target.value
    const price = Number(obj.quantity) * Number(orderListData[index].pricebuy)
    obj.price = price + ''

    let estTotal = 0
    for (let i = 0; i < nOrderListObj.length; i++) {
      estTotal = estTotal + Number(nOrderListObj[i].price);
    }
    setEstimatedTotal(estTotal + '')

    setOrderListObj([...nOrderListObj])
  }

  const updateIndividualPrice = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNumeric(e.target.value)) {
      return
    }

    const nOrderListObj = orderListData.slice()
    const nOrderListObj2 = orderListObj.slice()
    nOrderListObj[index].pricebuy = e.target.value
    const obj = orderListObj[index]
    const price = Number(obj.quantity) * Number(e.target.value)
    obj.price = price + ''

    let estTotal = 0
    for (let i = 0; i < nOrderListObj2.length; i++) {
      estTotal = estTotal + Number(nOrderListObj2[i].price);
    }
    setEstimatedTotal(estTotal + '')
    setOrderListData([...nOrderListObj])
    setOrderListObj([...nOrderListObj2])
  }

  const deleteProductOrder = (index: number) => {
    const nOrderListObj = orderListData.slice()
    const nOrderListObj2 = orderListObj.slice()
    nOrderListObj.splice(index, 1)
    nOrderListObj2.splice(index, 1)

    let estTotal = 0
    for (let i = 0; i < nOrderListObj.length; i++) {
      estTotal = estTotal + Number(nOrderListObj2[i].price);
    }
    setEstimatedTotal(estTotal + '')
    setOrderListData([...nOrderListObj])
    setOrderListObj([...nOrderListObj2])
  }

  const updateOrderNote = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const nOrderListObj2 = orderListObj.slice()
    const obj = nOrderListObj2[index]
    obj.note = e.target.value

    setOrderListObj([...nOrderListObj2])
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Pedidos</h6>
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">{supplierData?.name} - {supplierData?.company}</h6>

                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => history.goBack()}
                  />

              </div>
            </div>

            <div className="flex-auto">
              <div className="col-span-2 py-3 px-6">
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Productos del Pedido
                </h6>
                {orderListData.length > 0 ?
                  orderListData.map((prod, index) => (
                    <div className="flex items-center" key={index}>
                      <div className="flex-initial">
                        <Icon
                          width={8}
                          color="red"
                          Icon={XIcon}
                          hover
                          onClick={() => deleteProductOrder(index)}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Nombre"
                          name={prod.name}
                          value={orderListData[index].name}
                          disabled={true}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="number"
                          label="Cantidad"
                          name={prod.name}
                          value={orderListObj[index].quantity}
                          onChange={e => updateQuantity(index, e)}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Precio Individual"
                          name={prod.name}
                          value={orderListData[index].pricebuy}
                          onChange={e => updateIndividualPrice(index, e)}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Total"
                          name={prod.name}
                          value={roundDecimals(Number(orderListObj[index].price))}
                          disabled={true}
                        />
                      </div>
                      <div className="flex-auto px-3">
                        <Input
                          type="text"
                          label="Nota"
                          name={prod.name}
                          value={orderListObj[index].note}
                          onChange={e => updateOrderNote(index, e)}
                        />
                      </div>
                    </div>
                  )) : '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
                }
              </div>

              <div className="flex items-center">
                <div className="flex-auto my-3 ml-6">
                  <Button
                    label="Crear Pedido"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    onClick={() => createOrder(orderListObj)}
                  />
                </div>
                <div className="flex-auto my-3">
                  <DatePicker
                    text={"Recepción:"}
                    selected={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    handleDateChange={setStartDate}
                  />
                </div>
                <div className="flex-auto my-3 mr-3">
                  <div className="px-3">
                    <Input
                      type="text"
                      label="Total Estimado"
                      name="Total Estimado"
                      value={estimatedTotal}
                      disabled={true}
                    />
                  </div>
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
                        onChange={handleChange}
                        placeholder="Buscar producto..."
                        icon={iconValue}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <Table
                    theadData={tableFieldData}
                    tbodyData={searchTableData}
                    onClick={addProductOrder}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderForm
