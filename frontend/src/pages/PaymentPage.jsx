import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [orderData,setOrderData] = useState([]);
  const [open,setOpen] = useState(false);
  const {user} = useSelector((state)=> state.user);
  const navigate = useNavigate();

  return (
    <div>
      
    </div>
  )
}

export default PaymentPage
