import React from 'react'
import { useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { RootState } from '../../store/store';

const OrderForm: React.FC = () => {


  const { id } = useParams<IParamTypes>();
  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );

  return (
    <div>

    </div>
  )
}

export default OrderForm
