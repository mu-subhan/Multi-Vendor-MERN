import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

import CheckoutSteps from "../components/CheckoutSteps/CheckoutSteps.jsx"



const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br/>
      <br/>
      <CheckoutSteps active={1}/>

      <br/>
      <br/>
     <Footer/>
    </div>
  )
}

export default CheckoutPage
