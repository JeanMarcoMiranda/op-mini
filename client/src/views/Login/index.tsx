import React from 'react';

import { InputComponent, ButtonComponent } from '../../components/common';
import { useForm } from '../../components/hooks';

function toHoverStyle(stylesOnHover: string): string {
  const stylesSplited = stylesOnHover.split(' ');
  let hoverStyles = '';

  stylesSplited.forEach((style, index) => {
    let newStyle = `hover:${style}`;
    if (index !== stylesSplited.length - 1) {
      newStyle = newStyle + ' ';
    }
    hoverStyles = hoverStyles + newStyle;
  });

  return hoverStyles;
}

const LoginView: React.FC = () => {
  const loginButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-blue-400 to-blue-500',
    IS_TRANSPARENT: false,
    BUTTON_LABEL: 'Login Now',
    TEXT_COLOR: 'text-white',
    ON_HOVER_STYLES: 'bg-gradient-to-r from-blue-500 to-blue-600 translate-y-11'
  };

  const registerButtonStyles = {
    BACKGROUND_COLOR: 'bg-gradient-to-r from-green-500 to-green-400',
    IS_TRANSPARENT: true,
    BUTTON_LABEL: 'Register',
    TEXT_COLOR: 'text-green-500',
    ON_HOVER_STYLES: 'bg-gradient-to-r from-green-500 to-green-400',
  };

  const initialFormState = {
    email: 'buenas',
    password: '1234',
  };

  const { values, onChange, onSubmit } = useForm(prueba, initialFormState);

  async function loginUserCallback() {
    // Request configuration
    const LOGIN_URL: RequestInfo = 'http://localhost:5000/auth/login';
    const LOGIN_REQUEST_PARAMS: RequestInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    };

    // Setting up our request
    const response = await fetch(LOGIN_URL, LOGIN_REQUEST_PARAMS);
    // Accessing the response data
    const data = await response.json(); // response.json() transforms the request to only get the response data from the server

    if (response.ok) {
      const { access_token, user } = data;
      if (access_token) {
        console.log('Login buenardo');
        // Guardar usuario y tokeny usuario  en el global state(Redux)
        // Guardar token y usuario en el local storage
      } else {
        console.log('No tienes accesso, proceda a crearse una cuenta');
      }
    } else {
      console.log('Error: Unknow error || Server error');
    }
  }

  function prueba() {
    toHoverStyle(registerButtonStyles.ON_HOVER_STYLES);
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 py-4 px-6">
          <img className="h-full w-full" src="/assets/images/graphic3.svg" alt="market"/>
        </div>

        <form onSubmit={onSubmit} className="col-span-2 py-4 px-6">
          <h1 className="text-4xl mt-16 mb-8 opacity-75 text-left">Login</h1>
          <p className="text-xs mt-4 mb-20 opacity-50 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo eos ex
            nesciunt ad maxime, harum nulla et veniam quisquam quasi corporis
            quaerat enim voluptate debitis possimus voluptatum sit assumenda
            quo.
          </p>
          <InputComponent type="email" label="Email" name="email" onChange={onChange} />
          <InputComponent type="password" label="Password" name="password" onChange={onChange} />
          <div className="mt-16 flex justify-start">
            <ButtonComponent
              label={loginButtonStyles.BUTTON_LABEL}
              bgColor={loginButtonStyles.BACKGROUND_COLOR}
              bgTransparent={loginButtonStyles.IS_TRANSPARENT}
              textColor={loginButtonStyles.TEXT_COLOR}
              onHoverStyles={toHoverStyle(loginButtonStyles.ON_HOVER_STYLES)}
            />
            <ButtonComponent
              label={registerButtonStyles.BUTTON_LABEL}
              bgColor={registerButtonStyles.BACKGROUND_COLOR}
              bgTransparent={registerButtonStyles.IS_TRANSPARENT}
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
