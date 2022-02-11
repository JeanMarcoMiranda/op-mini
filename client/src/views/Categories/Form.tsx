import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { setToastData } from '../../store/action/actions';
import {
  LoadingPageComponent as Load,
  ButtonComponent as Button,
  InputComponent as Input,
  SelectComponent as Select,
} from '../../components/common'
import { RootState } from '../../store/store';
import { configUrl, toHoverStyle } from '../../components/utils';

const activeOptions: ISelectOption[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const urlCat: RequestInfo = `${configUrl}/categories`

const CategoryForm: React.FC = () => {
  const [show, setShow] = useState(false)
  const [selActive, setSelActive] = useState<ISelectOption>(activeOptions[0])
  const { control, handleSubmit, setValue } = useForm<TFormValues<IFormCategory>>({
    defaultValues: {
      values: {
        name: '',
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
    id ? getCategory() : setShow(true)
    //eslint-disable-next-line
  }, [])

  const getCategory = async () => {
    const url = `${urlCat}/${id}`
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const {name, active} = await res.json()
    if (res.ok) {
      const activeOption = active ? activeOptions[0] : activeOptions[1];
      setValue('values', {
        name,
        active: activeOption,
      });
      setSelActive(activeOption)
      setShow(true)
    } else{
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method: Get, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const onSubmit: SubmitHandler<TFormValues<IFormCategory>> = ({ values }) => {
    if (id) {
      updateCategory(values)
    } else {
      createCategory(values)
    }
  }

  const updateCategory = async (data: IFormCategory) => {
    const url: RequestInfo = urlCat + `/${id}`;
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value,
      }),
    }
    const res = await fetch(url, requestInit);
    if (res.ok) {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'La categoría ha sido actualizado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/category')
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Update, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  const createCategory = async (data: IFormCategory) => {
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        'active': data.active.value,
      }),
    }
    const res = await fetch(urlCat, requestInit);
    if (res.ok) {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'La categoría se ha creado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/category')
    } else {
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: `Method Create, Error${res.status} : ${res.statusText}`,
        color: 'warning',
        delay: 5
      }))
    }
  }

  return show ? (<>
    <div className="container mx-auto">
      <div className="w-full lg:w-10/12 mx-auto my-8">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-3">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Categorías</h6>

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
                Informacion de la Categoría
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
                  label={ id ? 'Actualizar Categoria' : 'Crear Categoria' }
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
  </>) : <Load/>
}

export default CategoryForm
