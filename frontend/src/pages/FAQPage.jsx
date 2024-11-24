import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5}/>
      <Faq/>
      <Footer/>
    </div>
  )
}

export default FAQPage
