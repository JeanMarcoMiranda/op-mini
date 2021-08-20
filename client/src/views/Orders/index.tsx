import React, { useEffect, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  CardOrderComponent as Card,
  LoadingPageComponent as Load,
} from '../../components/common';
import { formatDate } from '../../components/utils';

interface Product {
  product: string;
  quantity: string;
  note: string;
}

interface IOrder {
  createdby: string;
  createdate: string;
  receivedby: string;
  receptiondate: string;
  estimatedamount: string;
  finalamount: string;
  type: string;
  supplier: string;
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
    /*const initialRender = async () => {
      const cardData = await getOrder()
      prepareCardData(cardData)
    }
    initialRender()*/
    getOrder()
    //eslint-disable-next-line
  }, []);

  const getIdSupplier = async (id: string) => {
    const urlSup: RequestInfo = 'http://localhost:8000/suppliers/' + id;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlSup, requestInit)
    const data: ISupplier = await res.json()
    return data
  }

  const getIdUser = async (id: string) => {
    const urlUser: RequestInfo = 'http://localhost:8000/users/' + id;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlUser, requestInit)
    const data: IUser = await res.json()
    return data
  }

  const getIdProduct = async (id: string) => {
    const urlPro: RequestInfo = 'http://localhost:8000/products/' + id;
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    }
    const res = await fetch(urlPro, requestInit)
    const data: IProduct = await res.json()
    return data.name
  }

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
    //return data
    //prepareCardData(data)
    const newOrderData: IOrder[] = []
    const newProduct: Product[] = []
    await data.map(async (order) => {
      const newSupplier = await getIdSupplier(order.supplier);
      const newCreate = await getIdUser(order.createdby);
      const newReceive = await getIdUser(order.receivedby);
      await order.products.map(async (product) => {
        const name = await getIdProduct(product.product)
        newProduct.push({ ...product, product: name })
      })
      const createDate = formatDate(new Date(order.createdate));
      const receptionDate = formatDate(new Date(order.receptiondate));
      const newObject: IOrder = {
        createdby: newCreate.name,
        createdate: createDate,
        receivedby: newReceive.name,
        receptiondate: receptionDate,
        estimatedamount: order.estimatedamount,
        finalamount: order.finalamount,
        type: order.type,
        supplier: newSupplier.name,
        products: newProduct,
        status: order.status
      }
      newOrderData.push(newObject)
      //console.log('sdad');
      if (data[data.length - 1] === order) {
        setOrderData(newOrderData);
        //console.log(newOrderData);
      }

    })

  };

  const prepareCardData = async (data: IOrder[]) => {

  }

  useEffect(() => {
    console.log(orderData.length);
    (orderData.length != 0) && setShow(true);
  }, [orderData])

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
                      createdBy={order.createdby}
                      supplier={order.supplier}
                      createdDate={order.createdate}
                      status={order.status}
                      receivedBy={order.receivedby}
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
