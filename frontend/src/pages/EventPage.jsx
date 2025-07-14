import React from 'react'
import Header from '../components/Layout/Header'
import Events from '../components/Events/Events'
import Footer from '../components/Layout/Footer'

const EventPage = () => {
  return (
    <div>
      <Header activeHeading={4}/>
      <Events />
      <Footer />
    </div>
  )
}

export default EventPage
