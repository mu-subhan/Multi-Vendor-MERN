import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [orderData,setOrderData] = useState([]);
  const [open,setOpen] = useState(false);
  const {user} = useSelector((state)=> state.user);
  const navigate = useNavigate();


  useEffect(()=>{
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  },[]);

  const createOrder = (data,action)=>{
    return action.order.create({
      purchase_units:[
        {
          description:"Sun-flower",
          amount:{
            currency_code:"USD",
            value:orderData?.totalPrice,
          },
        },
      ],
      // not needed if a shipping address is actually needed
      application_context:{
        shipping_preference:"NO_SHIPPING",
      }
    })
    .THEN((orderID)=>{
      return orderID;
    });
  };
  
  return (
    <div>
      
    </div>
  )
}

export default PaymentPage
