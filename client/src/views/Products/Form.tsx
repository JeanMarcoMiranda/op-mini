import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setToastData } from '../../store/action/actions';

import {
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  SelectComponent as Select,
  TextAreaComponent as TextArea,
} from '../../components/common';
import { RootState } from '../../store/store';
import { configUrl, toHoverStyle } from '../../components/utils';

// SETTING OPTIONS FOR STATIC FIELDS
const activeOptions: ISelectOption[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const mesureUnitOptions: ISelectOption[] = [
  { label: 'Unidad', value: "unidad" },
  { label: 'Kg', value: "kg" },
]


// API URLS
const urlPro: RequestInfo = `${configUrl}/products`
const urlCat: RequestInfo = `${configUrl}/categories`
const urlSuppl: RequestInfo = `${configUrl}/suppliers`


const ProductForm: React.FC = () => {

  const [show, setShow] = useState(false)

  // == SELECT DISPLAY OPTIONS STATE
  const [categoryOptions, setCategoryOptions] = useState<ISelectOption[]>([])
  const [supplierOptions, setSupplierOptions] = useState<ISelectOption[]>([])

  // == OPTIONS SELECTED FOR EDITING FORM
  const [selCategory, setSelCategory] = useState<ISelectOption>()
  const [selActive, setSelActive] = useState<ISelectOption>(activeOptions[0])
  const [selectedMesureUnit, setSelectedMesureUnit] = useState<ISelectOption>(mesureUnitOptions[0])
  const [selectedSupplier, setSelectedSupplier] = useState<ISelectOption>()


  const [lastPrice, setLastPrice] = useState<string>('0')
  const [newLastPrice, setNewLastPrice] = useState<string>('0')
  const [lastPriceSell, setLastPriceSell] = useState<string>('0')
  const [newLastPriceSell, setNewLastPriceSell] = useState<string>('0')
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
        mesureUnit: mesureUnitOptions[0]
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
      const supplierData = await getSuppliers()
      prepareSupplOptions(supplierData)
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

    const { name, barcode, stock, pricebuy, pricesell, description, active, category, company, lastpricebuy, lastpricesell, mesureUnit }: IProductResponse = await response.json();
    const activeOption = active ? activeOptions[0] : activeOptions[1];
    const categoryOption = categoryOptions.find(cat => cat.value === category._id)
    const supplierOption = supplierOptions.find(supplier => supplier.value === company._id)
    const mesureUnitOption = mesureUnit === "unidad" ? mesureUnitOptions[0] : mesureUnitOptions[1]
    const dateNow = new Date()
    if (response.ok) {
      lastpricebuy && setLastPrice(lastpricebuy)
      lastpricesell && setLastPriceSell(lastpricesell)
      setNewLastPriceSell(pricesell)
      setNewLastPrice(pricebuy)
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
        company: supplierOption,
        mesureUnit: mesureUnitOption
      });
      setSelCategory(categoryOption)
      setSelActive(activeOption)
      setSelectedSupplier(supplierOption)
      setSelectedMesureUnit(mesureUnitOption)
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




  // == GETTING DATA TO DISPLAY ON SELECTS
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

  const getSuppliers = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlSuppl, requestInit)
    const data: ISupplier[] = await res.json()
    return data
  }



  // == PREPARING DATA TO DISPLAY IN SELECT
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

  const prepareSupplOptions = (data: ISupplier[]) => {
    const supplierOptions: ISelectOption[] = []

    data.forEach(supplier => {
      const newObject: ISelectOption = {
        label: supplier.company,
        value: supplier._id
      }
      supplierOptions.push(newObject)
    })

    setSupplierOptions(supplierOptions)
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
        'mesureUnit': data.mesureUnit?.value,
        'company': data.company?.value,
        'category': data.category?.value,
        'lastpricebuy': (newLastPrice === data.pricebuy) ? lastPrice : newLastPrice,
        'lastpricesell': (newLastPriceSell === data.pricesell) ? lastPriceSell : newLastPriceSell
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
    console.log("this is the data", data)
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
        'mesureUnit': data.mesureUnit?.value,
        'company': data.company?.value,
        'category': data.category?.value,
        'lastpricebuy': '0',
        'lastpricesell': '0',
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
                          min="0"
                          step={selectedMesureUnit.label === 'Unidad' ? '1' : '.01'}
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
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.company"
                      render={({ field: { onChange, value, name } }) => (
                        /*<Input
                          type="text"
                          label="Empresa"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />*/

                        <Select
                          label="Empresa"
                          onChange={onChange}
                          options={supplierOptions}
                          name={name}
                          value={selectedSupplier}
                          handleChange={setSelectedSupplier}
                        />
                      )}
                    />
                  </div>
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.mesureUnit"
                      render={({ field: { onChange, value, name } }) => (
                        /*<Input
                          type="text"
                          label="Empresa"
                          name={name}
                          value={value}
                          onChange={onChange}
                        />*/

                        <Select
                          label="Unidad de Medida"
                          onChange={onChange}
                          options={mesureUnitOptions}
                          name={name}
                          value={selectedMesureUnit}
                          handleChange={setSelectedMesureUnit}
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
                          min="0"
                          step=".01"
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
                          min="0"
                          step=".01"
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
                    bgColor={'bg-gradient-to-r from-green-400 to-green-500'}
                    textColor={'white'}
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-green-500 to-green-600')}
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
