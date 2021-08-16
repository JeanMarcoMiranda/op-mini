import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CardOrderComponent as Card } from '../../components/common';

const OrderView: React.FC = () => {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  let newdate = day + "/" + month + "/" + year;

  return (
    <div className="container mx-auto">
      <div className="w-full lg:w-10/12 mx-auto my-8">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <div className="rounded-lg bg-white mb-0 px-6 py-3">
            <div className="grid grid-cols-3 gap-6 mt-6 mb-6">
              <Card
                createdBy={"Usuario01"}
                supplier={"Leche Gloria"}
                createdDate={newdate}
                status={"Cancelado"}
                receivedBy={"Empleado01"}
                receptionDate={newdate}
                estimatedAmount={10}
                finalAmount={15}
                type={"Casual"}
              />
              <Card
                createdBy={"Usuario01"}
                supplier={"Leche Gloria"}
                createdDate={newdate}
                status={"Cancelado"}
                receivedBy={"Empleado01"}
                receptionDate={newdate}
                estimatedAmount={10}
                finalAmount={15}
                type={"Casual"}
              />
              <Card
                createdBy={"Usuario01"}
                supplier={"Leche Gloria"}
                createdDate={newdate}
                status={"Cancelado"}
                receivedBy={"Empleado01"}
                receptionDate={newdate}
                estimatedAmount={10}
                finalAmount={15}
                type={"Casual"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderView;
