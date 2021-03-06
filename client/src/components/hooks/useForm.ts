import React, { useState } from 'react';

export const useForm = (callback: any, initialState:any) => {
  const [values, setValues] = useState(initialState);
  console.log("initialState", initialState)
  console.log("values", values)
  //onChange - method for all our inputs
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //onSubmit - method used by our form to execute an action or send data to a server
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback();
  };

  // return values
  return {
    values,
    onChange,
    onSubmit,
  };
};
