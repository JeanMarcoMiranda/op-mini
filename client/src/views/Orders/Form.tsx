import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { RootState } from '../../store/store';
import { setToastData } from '../../store/action/actions';
import { 
  ButtonComponent as Button,
  InputComponent as Input,
  TableComponent as Table,
} from '../../components/common';
import { toHoverStyle } from '../../components/utils';
import { SearchIcon } from '@heroicons/react/solid';

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

  const { id } = useParams<IParamTypes>();
  const dispatch = useDispatch()
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const [orderData, setOrderData] = useState<IFormOrder>(initialValues)
  const [supplierData, setSupplierData] = useState<ISupplier>()
  const [searchVal, setSearchVal] = useState('')
  const [companyProducts, setCompanyProducts] = useState<IProduct[]>([])
  const [searchTableData, setSearchTableData] = useState<IProductTableData[]>([])
  const [orderListData, setOrderListData] = useState<IProduct[]>([])
  const [orderListObj, setOrderListObj] = useState<IOrderProduct[]>([])

  useEffect(() => {
    setOrderData({...orderData, supplier: id})
    getSupplierData(id)
  }, [])

  useEffect( () => {
    if (companyProducts.length > 0) {
      if (searchVal.length > 2) {
        getSearchProduct(searchVal);
      } else {
        prepareSearchTableData()
      }
    }
  }, [searchVal])

  useEffect( () => {
    if (companyProducts.length > 0) {
      prepareSearchTableData()
    }
  }, [companyProducts])

  const getSupplierData = async ( idSupp: string) => {
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
    const urlSearch: RequestInfo = `http://localhost:8000/products/company/${supplierResponse?.company}`;
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
      console.log("data", data)
      setCompanyProducts(data);
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const prepareSearchTableData = (productsSearch: IProduct[] = companyProducts) => {
    const std: IProductTableData[] = productsSearch.map((product) => {
      let nobj = {...product, category: product.category.name}
      let {date, description, active ,...tnobj} = nobj
      return tnobj as IProductTableData
    })
    setSearchTableData(std)
  }

  const getSearchProduct = async (search: string) => {
    let regex = new RegExp(["^.*", search, ".*$"].join(""), "i");
    const found = companyProducts.filter(product => product.name.match(regex))
    if ( found ) {
      prepareSearchTableData(found)
    }
  };

  const addProductOrder = (data: any) => {
    let datap = data as IProductTableData

    let alreadyExist = orderListData.find( product => product.name === datap.name)
    if (alreadyExist) return

    let nprol = companyProducts.find(product => product.name === datap.name)
    if (nprol) {
      let nobjl: IOrderProduct = {
        product: nprol._id,
        quantity: '0',
        note: ''
      }
      setOrderListObj( [...orderListObj, nobjl])
      setOrderListData([...orderListData, nprol])
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Pedidos</h6>
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">{supplierData?.name} - {supplierData?.company}</h6>
                <Link to="/order">
                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                  />
                </Link>
              </div>
            </div>

            <div className="flex-auto">
              <div className="col-span-2 py-3 px-6">
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Productos del Pedido
                </h6>
                {orderListData.length > 0 ?
                  orderListData.map((prod, index) => (
                    <p key={index}>{prod.name}</p>
                  )) : '- - - - - - - - - -'
                }
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

                <div className="my-3">
                  <Button
                    label="Crear Pedido"
                    bgColor="bg-gradient-to-r from-green-400 to-green-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
                    submit
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
