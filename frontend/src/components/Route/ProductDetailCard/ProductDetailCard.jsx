import React, { useState } from 'react'
import {RxCross1} from "react-icons/rx";
import {AiFillHeart, AiOutlineHeart, AiOutlineMessage} from "react-icons/ai"
import styles from "../../../styles/styles"

const ProductDetailCard = ({setOpen, data}) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = () => {
    // Add message submit logic here
  }

  const decrementCount = () => {
    if(count > 1){
      setCount(count - 1);
    }
  }
  
  const incrementCount = () => {
    setCount(count + 1)
  }

  // Get image URL safely
  const getImageUrl = () => {
    if (!data) return "/no-image.png";
    
    if (data.images?.[0]) {
      return typeof data.images[0] === 'string' 
        ? `${process.env.REACT_APP_BACKEND_URL}/uploads/${data.images[0]}`
        : data.images[0].url;
    }
    
    if (data.image_Url?.[0]?.url) {
      return data.image_Url[0].url;
    }
    
    return "/no-image.png";
  }

  if (!data) return null;

  return (
    <div className='bg-white'>
      <div className='fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center'>
        <div className='w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4'>
          <RxCross1 
            size={30} 
            className="absolute right-3 top-3 z-50"
            onClick={() => setOpen(false)}
          />
          <div className='block w-full 800px:flex'>
            {/* left side */}
            <div className='w-full 800px:w-[50%]'>
              <img 
                src={getImageUrl()} 
                alt={data.name || 'Product'} 
                className="w-full h-auto"
              />
              <div className="flex mt-2">
                {data.shop?.shop_avatar?.url && (
                  <img 
                    src={data.shop.shop_avatar.url} 
                    alt={data.shop?.name || 'Shop'} 
                    className='w-[50px] h-[50px] rounded-full mr-2'
                  />
                )}
                <div>
                  <h3 className={`${styles.shop_name}`}>
                    {data.shop?.name || 'Shop Name'}
                  </h3>
                  <h5 className='pb-3 text-[15px]'>
                    ({data.shop?.ratings || 0}) Ratings
                  </h5>
                </div>
              </div>
            </div>

            {/* right side */}
            <div className='w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]'>
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name || 'Product Name'}
              </h1>
              <p>{data.description || 'No description available'}</p>
              
              <div className='flex pt-3'>
                <h4 className={`${styles.productDiscountPrice}`}>
                  ${data.discount_price || data.price || 0}
                </h4>
                {data.price && data.discount_price && (
                  <h3 className={`${styles.price}`}>${data.price}</h3>
                )}
              </div>

              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button 
                    className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[11px]'>
                    {count}
                  </span>
                  <button 
                    className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart 
                      size={30}
                      className='cursor-pointer'
                      onClick={() => setClick(!click)}
                      color="red"
                      title='Remove from wishlist'
                    />
                  ) : (
                    <AiOutlineHeart 
                      size={30}
                      className='cursor-pointer'
                      onClick={() => setClick(!click)}
                      color="#333"
                      title='Add to wishlist'
                    />
                  )}
                </div>
              </div>

              <div 
                className={`${styles.button} bg-black mt-4 rounded-[4px] h-11`}
                onClick={handleMessageSubmit}
              >
                <span className='text-white flex items-center'>
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>

              <h5 className='text-[16px] text-red-700 mt-5'>
                {data.total_sell || data.sold_out || 0} Sold out
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard
