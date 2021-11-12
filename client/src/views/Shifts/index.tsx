import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const tableFieldData = [
  {}
]

const ShiftView: React.FC = () => {
  const [shiftsData, setShiftsData] = useState()
  const { access_token, userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = "http://localhost:8000/shifts"

  useEffect(() => {
    const getShiftData = async () => {
      const requestInit: RequestInit = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(url, requestInit)
      const data = await res.json()
      const dataOrderDesc = data.reverse()
      setShiftsData(dataOrderDesc)
    }
  }, [])

  return (
    <div>Hola soy los turnos nocturnos</div>
  );
}

export default ShiftView
