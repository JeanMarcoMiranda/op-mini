import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardOrderComponent as Card,
  LoadingPageComponent as Load,
} from '../../components/common';
import { formatDate } from '../../components/utils';

interface Product {
  note: string;
  product: {
    name: string;
    _id: string;
  };
  quantity: string;
}

interface IOrder {
  createdby: {
    name: string;
    _id: string;
  };
  createdate: string;
  receivedby: {
    name: string;
    _id: string;
  };
  receptiondate: string;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: {
    name: string;
    _id: string;
  };
  products: Product[];
  status: string;
}

const OrderView: React.FC = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [orderData, setOrderData] = useState<IOrder[]>([]);

  const { access_token, userData: userDataT } = useSelector<RootState, RootState['user']>(
    (state) => state.user,
  );
  const url: RequestInfo = 'http://localhost:8000/orders';

  useEffect(() => {
    getOrder();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(orderData.length);
    (orderData.length != 0) && setShow(true);
  }, [orderData])

  const getOrder = async () => {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, requestInit);
    const data: IOrder[] = await res.json();
    const newOrderData: IOrder[] = []
    await data.map(async (order) => {
      const createDate = formatDate(new Date(order.createdate));
      const receptionDate = formatDate(new Date(order.receptiondate));
      const newObject: IOrder = {
        createdby: order.createdby,
        createdate: createDate,
        receivedby: order.receivedby,
        receptiondate: receptionDate,
        estimatedamount: order.estimatedamount,
        finalamount: order.finalamount,
        type: order.type,
        supplier: order.supplier,
        products: order.products,
        status: order.status
      }
      console.log(newObject)
      newOrderData.push(newObject)
    })
    setOrderData(newOrderData);
  };

  return show ? (
    <>
      <div className="container mx-auto">
        <div className="w-full lg:w-10/12 mx-auto my-8">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
            <div className="rounded-lg bg-white mb-0 px-6 py-3">
              <div className="grid grid-cols-3 gap-6 mt-6 mb-6">
                {
                  orderData.map((order, index) => (
                    <Card
                      key={index}
                      createdBy={order.createdby.name}
                      supplier={order.supplier.name}
                      createdDate={order.createdate}
                      status={order.status}
                      receivedBy={order.receivedby.name}
                      receptionDate={order.receptiondate}
                      estimatedAmount={order.estimatedamount}
                      finalAmount={order.finalamount}
                      type={order.type}
                      products={order.products}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : <Load />
}
export default OrderView;
