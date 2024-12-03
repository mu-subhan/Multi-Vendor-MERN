import React, { useState } from 'react'
import {IoBagHandleOutline} from 'react-icons/io5'
import { RxCross1 } from 'react-icons/rx'
import {BsCartPlus} from 'react-icons/bs'
import styles from "../../styles/styles";
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';



const Wishlist = ({setOpenWishList}) => {
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
          onClick={() => setOpenWishList(false)}
          />
          
        </div>
        {/* item length */}
        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={25} />
          <h5 className='pl-2 text-[20px] font-[500]'>
3 items
          </h5>
        </div>

      {/* cart single item */}
<br/>
<div className='w-full border-t'>
  {
    cartData && cartData.map((i,index) =>
      <CartSingle key={index} data={i}/>
    )
  }
</div>


      </div>
      
    </div> 
    </div>
  )
}

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        <RxCross1 className='cursor-pointer'/>
        <img 
          src='https://outfitters.com.pk/cdn/shop/files/F0124102901_2.jpg?v=1731385277&width=533' 
          alt='' 
          className='w-[80px] h-[80px] ml-2 object-cover'
        />

        
        <div className='pl-[5px]'>
          <h1>{data.name}</h1>
         
          <h4 className="font-[500] text-[17px] pt-[4px] text-[#d02222] font-Roboto">US$ {totalPrice}</h4>
        </div>
    <div>
        <BsCartPlus size={20} className="cursor-pointer" title="Add to Cart"/>
        </div>
      </div>
    </div>
  );
};



export default Wishlist