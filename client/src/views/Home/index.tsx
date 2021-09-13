import React, { useEffect, useState } from 'react';
import { 
  CardComponent as Card,
  CardOrderComponent as CardOrder,
} from '../../components/common';
import { navRoutes } from '../../routes';
import { useDateTime } from '../../components/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const buttonProps: ButtonProps = {
  label: 'Vistar',
  bgColor: 'bg-gray-900 ml-3 mt-3',
  onHoverStyles: 'bg-gray-800',
  textColor: 'white',
};

const Home: React.FC = () => {
  const [date, setDate] = useState<IDate>();
  const [city, setCity] = useState<IWeatherValues>();
  const { userData } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${city?.weather[0]["icon"]}.svg`;
  const timeValue = useDateTime()

  useEffect(() => {
    setDate(timeValue)
  }, [timeValue]);

  useEffect(() => {
    const getWeather = async () => {
      const urlApi: RequestInfo = `https://api.openweathermap.org/data/2.5/weather?q=Arequipa&appid=e96d7162c54ff8ce2b51c0767e86ffa1&units=metric`;
      const res = await fetch(urlApi);
      const data = await res.json();
      if (res.ok) {
        setCity(data);
      } else {
        console.log('Error: City not found || Server error');
      }
      return data;
    };
    getWeather();
  }, []);

  return (
    <div className="grid my-8 py-6 px-6 mx-8 rounded-3xl bg-white">
      <div className="col-span-12 ">
        <div className="flex items-center h-10 intro-y mb-3">
          <h2 className="text-2xl font-semibold tracking-wide">Dashboard</h2>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 flex items-center justify-between w-full">
          <div className="flex justify-center items-center lg:mr-4 p-4 col-span-2 rounded-3xl bg-gradient-to-r from-red-500 to-yellow-400 h-full">
              <div className="container text-white px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                  <p className="uppercase tracking-loose w-full">
                    En que vamos a trabajar hoy?
                  </p>
                  <h1 className="my-4 text-4xl font-bold leading-tight w-full">
                    Bienvenido { userData.name }!
                  </h1>
                  <p className="leading-normal text-1xl mb-8 w-full">
                    La inspiración existe, pero te encontrará trabajando.
                  </p>
                  <p className="leading-normal text-2xl mb-8 w-full">
                    {date?.hour} : {date?.minutes} : {date?.seconds}{' '}
                    {new Date().getHours() < 12 ? 'A.M.' : 'P.M.'}
                  </p>
                </div>
                <div className="w-full md:w-3/5 text-center">
                  <img
                    className="w-full z-50"
                    src="https://s3.idle-empire.com/public/shop/rewards/main/ripple.png"
                    alt="Buenas"
                  />
                </div>
              </div>
          </div>

          <div className="flex lg:ml-4 p-4 justify-center items-center bg-gradient-to-r from-white to-gray-200 shadow-md rounded-3xl h-full">
            <div className="text-center flex-auto justify-between items-center">
              <div className="flex items-center justify-center">
                <div className="flex flex-col p-4 w-full max-w-xs">
                  <div className="font-bold text-xl">{city?.name}</div>
                  <div className="text-sm text-gray-500">
                    {date?.day} {date?.date} {date?.month} {date?.year}
                  </div>
                  <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img
                      src={icon}
                      alt="Just a flower"
                      className="h-24 w-24 object-scale-down lg:object-cover rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-4xl">
                      {city?.main.temp}°C
                    </div>
                    <div className="flex flex-col items-center ml-6">
                      <div>{city?.weather[0].main}</div>
                      <div className="mt-1">
                        <span className="text-sm">
                          <i className="far fa-long-arrow-up"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          {city?.main.temp_max}°C
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">
                          <i className="far fa-long-arrow-down"></i>
                        </span>
                        <span className="text-sm font-light text-gray-500">
                          {city?.main.temp_min}°C
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Viento</div>
                      <div className="text-sm text-gray-500">
                        {city?.wind.speed} k/h
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Humedad</div>
                      <div className="text-sm text-gray-500">
                        {city?.main.humidity}%
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="font-medium text-sm">Visibilidad</div>
                      <div className="text-sm text-gray-500">
                        {city?.visibility} km
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-10 gap-6 mt-6">
          {navRoutes.map(({ label, path }, index) => (
            <Card
              key={index}
              img="https://marketplace.canva.com/EAEK5jeIncM/1/0/1600w/canva-rosa%2C-azul-y-verde-ciberpunk-tendencia-moderna-fondo-para-zoom-bb3t9Mk6Ti8.jpg"
              title="Dashboard"
              label={label}
              bgCardColor="bg-white"
              textTitleColor="blue-700"
              link={path}
              button={buttonProps}
            />
          ))}
        </div>
        <div className="flex items-center h-10 intro-y my-3">
          <h2 className="text-2xl font-semibold tracking-wide">Pedidos para Hoy</h2>
        </div>

      </div>
    </div>
  );
};

export default Home;
