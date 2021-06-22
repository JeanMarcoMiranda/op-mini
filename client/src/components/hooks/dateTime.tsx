import React, { useEffect, useState } from 'react';

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const dayNames = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo',
];

export const DateTime = () => {
  const [date, setDate] = useState<IDate>();
  const updateDate = () => {
    let currentDate = new Date()
    let hour = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : '' + currentDate.getHours();
    let minutes = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : '' + currentDate.getMinutes();
    let seconds = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : '' + currentDate.getSeconds();
    let month = currentDate.getMonth();
    let day = currentDate.getDay();
    setDate({
      day: dayNames[day],
      date: currentDate.getDate(),
      month: monthNames[month],
      year: currentDate.getFullYear(),
      hour: hour,
      minutes: minutes,
      seconds: seconds,
    });
  }

  useEffect(() => {
    var timerId = setInterval(() => updateDate(), 1000);
    return () => clearInterval(timerId);
  }, [])

  return date
};
