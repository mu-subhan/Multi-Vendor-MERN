import React from 'react'
import styles from "../../styles/styles"
import {IoBagHandleOutline} from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'

const Cart = ({setOpenCart}) => {
  const cartData =[
    {
        name:"Iphone 14 pro max 256 gb SSD and 8GB ram silver color",
        description:"test",
        price:999,
    },
    {
        name:"Iphone 14 pro max 256 gb SSD and 8GB ram silver color",
        description:"test",
        price:999,
    },{
        name:"Iphone 14 pro max 256 gb SSD and 8GB ram silver color",
        description:"test",
        price:1099,
    },{
        name:"Iphone 14 pro max 256 gb SSD and 8GB ram silver color",
        description:"test",
        price:899,
    },

  ]
   
    return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
     <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm '>
      <div>
        <div className='flex w-full justify-end pt-5 pr-5'>
          <RxCross1
          size={25}
          className='cursor-pointer'
          onClick={() => setOpenCart(false)}
          />
          
        </div>
        {/* item length */}
        <div className={`${styles.normalflex} p-4`}>
          <IoBagHandleOutline size={25} />
        </div>
      </div>
    </div> 
    </div>
  )
}

export default Cart
