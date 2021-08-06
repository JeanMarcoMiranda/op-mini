import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory, useLocation } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../store/actions';
import { setToastData } from '../../store/actions';

import {
  ButtonComponent as Button,
  InputComponent as Input,
  LoadingPageComponent as Load,
  SelectComponent as Select,
} from '../../components/common';
import { toHoverStyle } from '../../components/utils';
import { RootState } from '../../store/store';

const activeOptions: ISelectOption[] = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false },
];

const urlUser: RequestInfo = 'http://localhost:8000/users';
const urlRol: RequestInfo = 'http://localhost:8000/roles';

const UserForm: React.FC = () => {

  const [editProfile, setEditProfile] = useState(false)
  const [show, setShow] = useState(false);
  const [roleOptions, setRoleOptions] = useState<ISelectOption[]>([]);
  const [selActive, setSelActive] = useState<ISelectOption>(activeOptions[0]);
  const [selRole, setSelRole] = useState<ISelectOption>();
  const { control, handleSubmit, setValue } = useForm<TFormValues<IFormUser>>({
    defaultValues: {
      values: {
        name: '',
        password: '',
        documentType: '',
        documentNumber: '0',
        phone: '0',
        email: '',
        currentAddress: '',
        isActive: activeOptions[0],
      },
    },
  });
  const { id } = useParams<IParamTypes>();
  const location = useLocation()
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/user/edit') setEditProfile(true)
    const initialRender = async () => {
      const userData = await getRoles();
      prepareUserOptions(userData);
    };
    initialRender();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (roleOptions.length === 0) return;
    id || editProfile ? getUser() : setShow(true);
    // eslint-disable-next-line
  }, [roleOptions]);

  const getUser = async () => {
    let urlReq: RequestInfo
    if (editProfile) {
      urlReq = urlUser + `/${userData._id}`;
    } else {
      urlReq = urlUser + `/${id}`;
    }
    const response = await fetch(urlReq);
    const {
      name,
      password,
      documentType,
      documentNumber,
      phone,
      email,
      currentAddress,
      isActive,
      role,
    }: IUserResponse = await response.json();
    const activeOption = isActive ? activeOptions[0] : activeOptions[1];
    const roleOption = roleOptions.find((rol) => rol.value === role._id);
    if (response.ok) {
      setValue('values', {
        name,
        password,
        documentType,
        documentNumber,
        phone,
        email,
        currentAddress,
        isActive: activeOption,
        role: roleOption,
      });
      setSelRole(roleOption);
      setSelActive(activeOption);
      setShow(true);
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
  };

  const prepareUserOptions = (data: IRole[]) => {
    const userOptions: ISelectOption[] = [];
    // eslint-disable-next-line
    data.map((user) => {
      if (user.isActive) {
        const newObject: ISelectOption = {
          label: user.name,
          value: user._id,
        };
        userOptions.push(newObject);
      }
    });
    setRoleOptions(userOptions);
  };

  const getRoles = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(urlRol, requestInit);
    const data: IRole[] = await res.json();
    return data;
  };

  const onSubmit: SubmitHandler<TFormValues<IFormUser>> = ({ values }) => {
    console.log('AQUI ESTA EL PROBLEMA -> REVISAR',values)
    if (id || editProfile) {
      updateUser(values);
    } else {
      createUser(values);
    }
    console.log('onsubmit', values);
  };

  const updateUser = async (data: IFormUser) => {
    let urlReq: RequestInfo
    if (editProfile) {
      urlReq = urlUser + `/${userData._id}`;
    } else {
      urlReq = urlUser + `/${id}`;
    }
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        'isActive': data.isActive.value,
        'role': data.role?.value,
      }),
    };
    const res = await fetch(urlReq, requestInit);
    console.log(res);
    const dataRes: IUserResponse = await res.json();
    if (res.ok) {
      //console.log('User Updated', dataRes);
      //probar que esto puede fallar
      dispatch(setUserData(dataRes))
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El usuario ha sido actualizado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/user')
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
  };

  const createUser = async (data: IFormUser) => {
    const requestInit: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        'isActive': data.isActive.value,
        'role': data.role?.value,
      }),
    };
    const res = await fetch(urlUser, requestInit);
    //const dataRes: IUserResponse = await res.json();
    if (res.ok) {
      //console.log('User Created', dataRes);
      dispatch(setToastData({
        isOpen: true,
        setisOpen: (prev => !prev),
        contentText: 'El usuario se ha creado con exito.',
        color: 'success',
        delay: 5
      }))
      history.push('/user')
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
  };

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-3">
              <div className="text-center flex justify-between">
                <h6 className="text-gray-500 text-2xl font-semibold tracking-normal">Usuarios</h6>
                <Link to="/user">
                  <Button
                    label="Regresar"
                    bgColor="bg-gradient-to-r from-blue-400 to-blue-500"
                    textColor="white"
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-blue-500 to-blue-600',)}
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
                  Informacion del usuario
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
                      name="values.password"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="password"
                          label="Contraseña"
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
                      name="values.documentType"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Tipo de documento"
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
                      name="values.documentNumber"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Nr. de documento"
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
                  Informacion de contacto
                </h6>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="md:col-span-2 px-4">
                    <Controller
                      control={control}
                      name="values.currentAddress"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="text"
                          label="Direccion"
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
                      name="values.phone"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="number"
                          label="Telefono"
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
                      name="values.email"
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          type="email"
                          label="Correo"
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
                      name="values.isActive"
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
                  <div className="px-4">
                    <Controller
                      control={control}
                      name="values.role"
                      render={({ field: { onChange, name } }) => (
                        <Select
                          label="Rol"
                          name={name}
                          value={selRole}
                          options={roleOptions}
                          onChange={onChange}
                          handleChange={setSelRole}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <Button
                    label={id ? 'Actualizar Usuario' : editProfile ? 'Actualizar Usuario' : 'Crear Usuario'}
                    bgColor={'bg-gradient-to-r from-blue-400 to-blue-500'}
                    textColor={'white'}
                    onHoverStyles={toHoverStyle('bg-gradient-to-r from-blue-500 to-blue-600',)}
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
};

export default UserForm;
