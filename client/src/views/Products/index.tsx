import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import {
  ButtonComponent as Button,
  ChipComponent as Chip,
  IconComponent as Icon,
  TableComponent as Table,
  InputComponent as Input,
} from '../../components/common';
import { RootState } from '../../store/store';

const tableFieldData = [
  { text: 'Codigo de Barras', width: 2, name: 'barcode' },
  { text: 'Nombre', width: 2, name: 'name' },
  { text: 'Categoria', width: 2, name: 'category' },
  { text: 'Stock', width: 1, name: 'stock' },
  { text: 'Precio Compra', width: 1, name: 'pricebuy' },
  { text: 'Precio Venta', width: 1, name: 'pricesell' },
  { text: 'Estado', width: 1, name: 'active' },
  { text: 'Acciones', width: 2, name: 'actions' },
]

const iconValue ={
  isActive: true,
  Icon: SearchIcon
}

const ProductsView: React.FC = () => {

  const [productData, setProductData] = useState<IProduct[]>([])
  const [tableData, setTableData] = useState<IProductTableData[]>([])
  const {  setValue, control } = useForm<TFormValues<ISearch>>({
    defaultValues: { values: { search: '' } },
  });
  const [searchVal, setSearchVal] = useState('')
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = 'http://localhost:8000/products'

  useEffect(() => {
    if (searchVal.length > 2) {
      getSearchProduct(searchVal)
    }else{
      getProductData()
    }
    // eslint-disable-next-line
  }, [searchVal])

  useEffect(() => {
    if (productData.length === 0) return

    const prepareTableData = () => {
      let newTableData: IProductTableData[] = productData.map(
        ({ _id, barcode, name, category, stock, pricebuy, pricesell, date, description, active }: IProduct) => {
          let newData: IProductTableData = {
            _id,
            barcode,
            name,
            category: category.name,
            stock,
            pricebuy,
            pricesell,
            active: renderActiveChip(active),
            actions: renderActions(_id),
          }
          return newData
        })
      setTableData(newTableData)
    }

    prepareTableData()
    // eslint-disable-next-line
  }, [productData])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('values', {
      search: event.target.value,
    })
    setSearchVal(event.target.value,)
  }

  const getSearchProduct = async (search: string) => {
    const urlSearch: RequestInfo = `http://localhost:8000/products/search/${search}`
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlSearch, requestInit)
    const data = await res.json()
    if (res.ok) {
      setProductData(data)
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  const getProductData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(url, requestInit)
    const data = await res.json()
    setProductData(data)
  }

  const deleteProduct = async (idProduct: string) => {
    const urlDelete: RequestInfo = url + '/' + idProduct
    const requestInit: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlDelete, requestInit)
    const data = await res.json()
    console.log('Product Deleted', data)
    getProductData()
  }

  const renderActions = (idProduct: string) => (
    <div className="flex item-center justify-center">
      <Icon
        width={5}
        color="blue"
        Icon={AnnotationIcon}
        hover
      />
      <Link to={`/product/form/${idProduct}`}>
        <Icon
          width={5}
          color="blue"
          Icon={PencilAltIcon}
          hover
        />
      </Link>
      <Icon
        width={5}
        color="red"
        Icon={ArchiveIcon}
        hover
        onClick={() => deleteProduct(idProduct)}
      />
    </div>
  )

  const renderActiveChip = (isActive: boolean) => (
    <Chip
      label={isActive ? 'Activo' : 'Inactivo'}
      bgColor="blue"
      txtColor="blue"
    />
  )

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Productos</h6>
                <Link to={`/product/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                  />
                </Link>
              </div>
            </div>

            <div className="box mx-6 mt-6 mb-3">
              <div className="box-wrapper">
                <div className=" bg-white rounded flex items-center w-full shadow-sm border border-gray-200">
                  <Controller
                    control={control}
                    name="values.search"
                    render={({ field: { value, name} }) =>(
                        <Input
                          type="search"
                          label=""
                          name={name}
                          value={value}
                          onChange={handleChange}
                          placeholder="Buscar producto ..."
                          icon={iconValue}
                        />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Table theadData={tableFieldData} tbodyData={tableData} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsView
