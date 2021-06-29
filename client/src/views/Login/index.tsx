import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { InputComponent, ButtonComponent } from '../../components/common';
import { setToken, setUserData, setAuthUser } from '../../store/actions';

import { toHoverStyle } from '../../components/utils';
import { useHistory } from 'react-router-dom';

const LoginView: React.FC = () => {

  const history = useHistory()

  const loginButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-blue-400 to-blue-500',
    IS_TRANSPARENT: false,
    BUTTON_LABEL: 'Login Now',
    TEXT_COLOR: 'white',
    ON_HOVER_STYLES:
      'bg-gradient-to-r from-blue-500 to-blue-600 translate-y-11',
  };

  const registerButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-green-500 to-green-400',
    IS_TRANSPARENT: true,
    BUTTON_LABEL: 'Register',
    TEXT_COLOR: 'white',
    ON_HOVER_STYLES: 'bg-gradient-to-r from-green-500 to-green-400',
  };

  const dispatch = useDispatch()

  const { handleSubmit, control } = useForm<TFormValues<LoginFormValues>>({
    defaultValues: { values: { email: '', password: '' } },
    shouldUnregister: false,
  });

  const loginUser: SubmitHandler<TFormValues<LoginFormValues>> = async (values) => {
    // Request configuration
    const LOGIN_URL: RequestInfo = 'http://localhost:8000/auth/login';
    const LOGIN_REQUEST_PARAMS: RequestInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values.values),
    };

    // Setting up our request
    const response = await fetch(LOGIN_URL, LOGIN_REQUEST_PARAMS);
    // Accessing the response data
    const data = await response.json(); // response.json() transforms the request to only get the response data from the server

    if (response.ok) {
      const { access_token, user } = data;
      if (access_token) {
        // Guardar usuario y token usuario  en el global state(Redux)
        dispatch(setUserData(user))
        dispatch(setToken(access_token))
        dispatch(setAuthUser(true))

        // Guardar token y usuario en el local storage
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', access_token)
        history.push('/')
      } else {
        console.log('No tienes accesso, proceda a crearse una cuenta');
      }
    } else {
      console.log('Error: Unknow error || Server error');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 py-4 px-6">
          <img
            className="h-full w-full"
            src="/assets/images/graphic3.svg"
            alt="market"
          />
        </div>

        <form
          onSubmit={handleSubmit(loginUser)}
          className="col-span-2 py-4 px-6"
        >
          <h1 className="text-4xl mt-16 mb-8 opacity-75 text-left">Login</h1>
          <p className="text-xs mt-4 mb-20 opacity-50 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eos ex
            nesciunt ad maxime, harum nulla et veniam quisquam quasi corporis
            quaerat enim voluptate debitis possimus voluptatum sit assumenda
            quo.
          </p>
          <Controller
            control={control}
            name="values.email"
            render={({ field: { onChange, onBlur, value, ref, name } }) => (
                <InputComponent
                  type="email"
                  label="Email"
                  name="email"
                  onChange={onChange}
                  value={value}
                />
            )}
          />
          <Controller
            control={control}
            name="values.password"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <InputComponent
                type="password"
                name="password"
                label="Password"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <div className="mt-16 flex justify-start">
            <ButtonComponent
              label={loginButtonStyles.BUTTON_LABEL}
              bgColor={loginButtonStyles.BACKGROUND_COLOR}
              textColor={loginButtonStyles.TEXT_COLOR}
              submit={true}
              onHoverStyles={toHoverStyle(loginButtonStyles.ON_HOVER_STYLES)}
            />
            <ButtonComponent
              label={registerButtonStyles.BUTTON_LABEL}
              bgColor={registerButtonStyles.BACKGROUND_COLOR}
              textColor={registerButtonStyles.TEXT_COLOR}
              onHoverStyles={toHoverStyle(registerButtonStyles.ON_HOVER_STYLES)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
