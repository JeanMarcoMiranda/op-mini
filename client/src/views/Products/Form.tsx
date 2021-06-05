import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { ButtonComponent, TextInputComponent, SelectInputComponent } from '../../components/common';

interface IFormProduct {
  barcode: number;
  name: string;
  stock: number;
  pricebuy: number;
  pricesell: number;
  date: Date;
  description: string;
  active: boolean;
  category: ICategoryOption;
}

interface ICategory {
  _id: string;
  name: string;
  active: boolean;
}

interface ICategoryOption {
  name: string;
  value: string;
}

const FormProduct = () => {
  const [categoryData, setCategoryData] = useState<ICategory[]>([])
  const [categoryOptions, setCategoryOptions] = useState<ICategoryOption[]>([])
  const { control, handleSubmit } = useForm<IFormProduct>({
    defaultValues: {
      category: {name: 'buenas',
      value: 'cg',}
    }
  })
  const history = useHistory()

  const onSubmit: SubmitHandler<IFormProduct> = data => {
    console.log(data)
  }

  const urlPro: RequestInfo = 'http://localhost:8000/products'
  const urlCat: RequestInfo = 'http://localhost:8000/categories'

  useEffect(() => {
    getCategoriesData()
  }, [])

  useEffect(() => {
    const catOptions: ICategoryOption[] = []
    categoryData.map((cat) => {
      if (cat.active) {
        const newObject: ICategoryOption = {
          name: cat.name,
          value: cat._id,
        }
        catOptions.push(newObject)
      }
    })
    setCategoryOptions(catOptions)
    console.log(catOptions)
  }, [categoryData])

  const getCategoriesData = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjI4MzA3MDAsImV4cCI6MTYyMzY5NDcwMH0.yCww2K-K1TX7P9RvFq96v0y6umyaGge8B0HvsIRA_Ac",
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlCat, requestInit)
    const data = await res.json()
    setCategoryData(data as ICategory[])
  }

  /* async function createFormCallback () {
    const now = new Date()
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7Il9pZCI6IjYwYTMzZTZkZTNhN2Q1MjQwYzE1YzY2MCIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwiZGVzY3JpcHRpb24iOiJSb2wgZGUgYWRtaW5pc3RyYWRvciIsImlzQWN0aXZlIjp0cnVlLCJfX3YiOjB9LCJpYXQiOjE2MjE5NjU4ODQsImV4cCI6MTYyMjgyOTg4NH0.tXAtOmjHsBd_z0DlSYPd-V-rNOqsJSiNiLK0zcJLUgM",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...values, ['date']: now }),
    }
    const res = await fetch(url, requestInit)
    const data = await res.json()
  } */

  const backHistory = () => {
    history.goBack()
  }

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
                  onClick={backHistory}
                >
                  Regresar
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del producto
                </h6>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="px-4">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={""}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Nombre"
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      name="barcode"
                      control={control}
                      defaultValue={0}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Código de Barra"
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      name="stock"
                      control={control}
                      defaultValue={0}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          type="number"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Stock"
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      name="category"
                      control={control}
                      render={({ field: { onChange, onBlur, value, name, ref } }) => (
                        <SelectInputComponent
                          name={name}
                          label="Categoría"
                          onChange={onChange}
                          value={value}
                          options={categoryOptions}
                        />
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Precios
                </h6>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="px-4">
                    <Controller
                      name="pricebuy"
                      control={control}
                      defaultValue={0}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          type="number"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Precio de Compra"
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      name="pricesell"
                      control={control}
                      defaultValue={0}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          type="number"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Precio de Venta"
                        />
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Otros
                </h6>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="px-4">
                    <Controller
                      name="description"
                      control={control}
                      defaultValue={""}
                      render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInputComponent
                          type="textarea"
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          name={name}
                          label="Notas"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mt-16 flex justify-start">
                  <ButtonComponent
                    label="Crear"
                    bgColor={'bg-gradient-to-r from-blue-400 to-blue-500'}
                    bgTransparent={false}
                    textColor={'text-white'}
                    onHoverStyles={''}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormProduct
