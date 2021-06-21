import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  AnnotationIcon,
  PencilAltIcon,
  ArchiveIcon,
} from '@heroicons/react/outline';
import {
  ButtonComponent as Button,
  ChipComponent as Chip,
  IconComponent as Icon,
  TableComponent as Table,
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

const ProductsView: React.FC = () => {

  const [productData, setProductData] = useState<IProduct[]>([])
  const [tableData, setTableData] = useState<IProductTableData[]>([])
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const url: RequestInfo = 'http://localhost:8000/products'

  useEffect(() => {
    getProductData()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (productData.length === 0) return

    const prepareTableData = () => {
      let newTableData: IProductTableData[] = productData.map(
        ({ _id, barcode, name, category, stock, pricebuy, pricesell, date, description, active } : IProduct) => {
        let newData: IProductTableData= {
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
        onClick={ () => deleteProduct(idProduct) }
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
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Productos</h6>
                <Link to={`/product/form`}>
                  <Button
                    label="Agregar"
                    textColor="white"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                  />
                </Link>
              </div>
            </div>
            <Table theadData={tableFieldData} tbodyData={tableData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsView
