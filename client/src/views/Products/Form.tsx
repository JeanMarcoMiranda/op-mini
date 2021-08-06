import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setToastData } from '../../store/actions';

import {
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  SelectComponent as Select,
  TextAreaComponent as TextArea,
} from '../../components/common';
import { RootState } from '../../store/store';
import { toHoverStyle } from '../../components/utils';

const activeOptions: ISelectOption[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const urlPro: RequestInfo = 'http://localhost:8000/products'
const urlCat: RequestInfo = 'http://localhost:8000/categories'

const ProductForm: React.FC = () => {

  const [show, setShow] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState<ISelectOption[]>([])
  const [selActive, setSelActive] = useState<ISelectOption>(activeOptions[0])
  const [selCategory, setSelCategory] = useState<ISelectOption>()
  const { control, handleSubmit, setValue } = useForm<TFormValues<IFormProduct>>({
    defaultValues: {
      values: {
        barcode: '0',
        name: '',
        stock: '0',
        pricebuy: '0',
        pricesell: '0',
        description: '',
        active: activeOptions[0],
      }
    }
  })
  const { id } = useParams<IParamTypes>();
  const { access_token } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const initialRender = async () => {
      const catData = await getCategories()
      prepareCatOptions(catData)
    }
    initialRender()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (categoryOptions.length === 0) return
    id ? getProduct() : setShow(true)
    // eslint-disable-next-line
  }, [categoryOptions])

  const getProduct = async () => {
    const urlReq: RequestInfo = urlPro + `/${id}`;
    const response = await fetch(urlReq);
    const { name, barcode, stock, pricebuy, pricesell, description, active, category }: IProductResponse = await response.json();
    const activeOption = active ? activeOptions[0] : activeOptions[1];
    const categoryOption = categoryOptions.find(cat => cat.value === category)
    const dateNow = new Date()
    if (response.ok) {
      setValue('values', {
        barcode,
        name,
        stock,
        pricebuy,
        pricesell,
        description,
        date: dateNow.toString(),
        active: activeOption,
        category: categoryOption,
      });
      setSelCategory(categoryOption)
      setSelActive(activeOption)
      setShow(true)
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method: Get, Error${response.status} : ${response.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const prepareCatOptions = (data: ICategory[]) => {
    const catOptions: ISelectOption[] = []
    // eslint-disable-next-line
    data.map((cat) => {
      if (cat.active) {
        const newObject: ISelectOption = {
          label: cat.name,
          value: cat._id,
        }
        catOptions.push(newObject)
      }
    })
    setCategoryOptions(catOptions)
  }

  const getCategories = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlCat, requestInit)
    const data: ICategory[] = await res.json()
    return data
  }

  const onSubmit: SubmitHandler<TFormValues<IFormProduct>> = ({ values }) => {
    if (id) {
      updateProduct(values)
    } else {
      createProduct(values)
    }
    console.log('onsubmit', values)
  }

  const updateProduct = async (data: IFormProduct) => {
    const dateNow = new Date()
    const url: RequestInfo = urlPro + `/${id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'date': dateNow.toString(),
        'active': data.active.value,
        'category': data.category?.value,
      }),
    }
    const res = await fetch(url, requestInit);
    console.log(res)
    //const dataRes: IProductResponse = await res.json()
    if (res.ok) {
      //console.log('Product Updated', dataRes)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El producto ha sido actualizado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/product')
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Update, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const createProduct = async (data: IFormProduct) => {
    const dateNow = new Date()
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'date': dateNow.toString(),
        'active': data.active.value,
        'category': data.category?.value,
      }),
    }
    const res = await fetch(urlPro, requestInit);
    //const dataRes: IProductResponse = await res.json()
    if (res.ok) {
      //console.log('Product Created', dataRes)
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El producto se ha creado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/product')
    } else {
      //console.log('Error: Unknow error || Server error');
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Productos</h6>
                <Link to="/product">
                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-blue-500 to-blue-600')}
                  />
                </Link>
              </div>
            </div>
            <div className="flex-auto">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-2 py-3 px-6"
              >
                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion del producto
                </h6>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.name"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Nombre"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.barcode"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Código de Barra"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.stock"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Stock"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.category"
                      render={({ field: { onChange, name } }) => (
                        <Select
                          label="Categoría"
                          name={name}
                          value={selCategory}
                          options={categoryOptions}
                          onChange={onChange}
                          handleChange={setSelCategory}
                        />
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-3 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Informacion de Precios
                </h6>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.pricebuy"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Precio de Compra"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.pricesell"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Precio de Venta"
                          name={name}
                          value={value}
                          onChange={onChange}
                          focus
                        />
                      )}
                    />
                  </div>
                </div>

                <hr className="mt-3 border-b-1 border-gray-300" />

                <h6 className="text-left text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Otros
                </h6>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.description"
                      render={({ field: { onChange, value, name } }) => (
                        <TextArea
                          label="Notas"
                          rows={5}
                          name={name}
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.active"
                      render={({ field: { onChange, name } }) => (
                        <Select
                          label="Estado"
                          name={name}
                          value={selActive}
                          options={activeOptions}
                          onChange={onChange}
                          handleChange={setSelActive}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <Button
                    label={ id ? 'Actualizar Producto' : 'Crear Producto' }
                    bgColor={'bg-gradient-to-r from-blue-400 to-blue-500'}
                    textColor={'white'}
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-blue-500 to-blue-600')}
                    submit
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Load/>
}

export default ProductForm
