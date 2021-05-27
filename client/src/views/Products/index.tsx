import React, { useEffect, useState } from 'react'
import { AnnotationIcon, PencilAltIcon,ArchiveIcon } from '@heroicons/react/outline';
import { ChipComponent, IconComponent, TableComponent } from '../../components/common';

interface Product {
  _id: string,
  barcode: number,
  name: string,
  stock: number,
  pricebuy: number,
  pricesell: number,
  date: Date,
  description: string,
  active: boolean,
  category: {
    _id: string,
    name: string,
    active: boolean,
  }
}

interface ProductDataTable {
    _id: string;
    barcode: number;
    name: string;
    category: string;
    stock: number;
    pricebuy: number;
    pricesell: number;
    active: JSX.Element;
    actions: JSX.Element;
}

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

const dateFormat = (dateToFormat: Date) => {
  let date = new Date(dateToFormat)
  let day = date.getDay()
  let month = date.getMonth() + 1
  let year = date.getFullYear()

  const lessThanTen = (val: number) => {
    return val > 10 ? val + '' : '0' + val
  }

  return `${ lessThanTen(day) }/${ lessThanTen(month) }/${ year }`
}

const ProductsPage = () => {
  const [tableData, setTableData] = useState<Product[]>([])
  const [tableBodyData, setTableBodyData] = useState<ProductDataTable[]>([])

  const url = 'http://localhost:8000/products'

  useEffect(() => {
    fetch(url,{
      method: 'GET',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjE5NjU4ODQsImV4cCI6MTYyMjgyOTg4NH0.tXAtOmjHsBd_z0DlSYPd-V-rNOqsJSiNiLK0zcJLUgM",
        "Content-Type": "application/json",
      }
    })
      .then( res => res.json() )
      .then( data => setTableData(data) )
  }, [])

  useEffect(() => {
    if (tableData === []) return

    const prepareTableData = () => {
      let newTableData: ProductDataTable[] = tableData.map(({ _id, barcode, name, category, stock, pricebuy, pricesell, date, description, active }: Product) => {
        let newData: ProductDataTable= {
          _id,
          barcode,
          name,
          category: category.name,
          stock,
          pricebuy,
          pricesell,
          active: (
            <ChipComponent
              label={active ? 'Activo' : 'Inactivo'}
              bgColor="purple"
              txtColor="purple"
            />
          ),
          actions: (
            <div className="flex item-center justify-center">
              <IconComponent width={5} color="purple" Icon={AnnotationIcon} hover />
              <IconComponent width={5} color="purple" Icon={PencilAltIcon} hover />
              <IconComponent width={5} color="purple" Icon={ArchiveIcon} hover />
            </div>
          ),
        }
        return newData
      })

      setTableBodyData(newTableData)
    }

    prepareTableData()
  }, [tableData])

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 px-4 py-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-xl font-bold">Productos</h6>
                <button
                  className="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none"
                  type="button"
                >
                  Nuevo Producto
                </button>
              </div>
            </div>
            <TableComponent theadData={tableFieldData} tbodyData={tableBodyData} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductsPage
