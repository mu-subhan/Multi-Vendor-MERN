import React from 'react'
import styles from "../../styles/styles"


const Checkout = () => {
  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
        <div className='w-full 800px:w-[65%]'>
          <ShippingInfo
          user={user}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          zipCode={zipCode}
          setZipCode={setZipCode}

/>
        </div>
      </div>
      
    </div>
  )
}




const ShippingInfo=({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode
}) =>{
  return(
    <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
      <h5 className='text-[16px] font-[500]'>Shipping Address</h5>
      <br/>
      <form>
        <div className='w-full flex pb-3'>
          <div className='w-[50%]'>
            <label className='block pb-2'>Full Name</label>
            <input
            type='text'
            value={user && user.name}
            required
            className={`${styles.input} !w-[95%]`}/>

          </div>
          <div className='w-[50%]'>
            <label className='block pb-2'>Email Address</label>
            <input
            type='email'
            value={user && user.email}
            required
            className={`${styles.input}`}/>
          </div>
        </div>

        <div className='w-full flex pb-3'>
          <div className='w-[50%]'>
            <label className='block pb-3'>Phone Number</label>
            <input
            type='number'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className={`${styles.input}`}/>

          </div>
        </div>

         <div className='w-full flex pb-3'>
          <div className='w-[50%]'>
            <label className='block pb-3'>Country</label>
            <select
            className='w-[95%] border h-[40px] rounded-[5px]'
            value={country}
            onChange={(e)=> setCountry(e.target.value)}>
              <option className='block pb-3' value="">
                Choose your country
              </option>
              {Country &&
              Country.getAllCountries().map((item)=>(
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))
              }
            </select>
          </div>
         </div>
         <div className='w-full flex pb-3'>
          <div className='w-[59%]'>
            <label className='block pb-3'>Address1</label>
            <input
            type='address'
            required
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            className={`${styles.input} !w-[95%]`}/>

          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
         </div>
<div></div>
      </form>
      
    </div>
  )
}


export default Checkout
