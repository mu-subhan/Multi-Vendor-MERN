import React, { act, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';

const ProductDetails = ({data}) => {
 
    const [count,setCount] = useState(1);
    const [click,setClick] = useState(false);
    const [select,setSelect] = useState(0);
    const navigate = useNavigate();

    const incrementCount = () =>{
        setCount(count +1);
    }
    const decrementCount = () =>{
        if(count >1){
            setCount(count -1);
        }
    }

    const handleMessageSubmit = ()=>{
        navigate("/inbox?conversation=507ebjver884ehfdjeriv84")
    }
  return (
    <div className='bg-white'>
        {
            data ? (
            <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                <div className="w-full py-5">
                    <div className="block w-full 800px:flex">
                        <div className="w-full 800px:w-[50%]">
                            <img src={data.image_Url[select].url} alt="" className='w-[80%]'/>

                            <div className='w-full flex p-6'>
                                <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                    <img src={data?.image_Url[0].url} alt=''
                                    className='h-[200px]'
                                    onClick={()=>setSelect(0)}/>
                                    </div>

                                    <div className={`${select === 1 ? "border" : "null"} cursor-pointer pl-5`}>
                                    <img src={data?.image_Url[1].url} alt=''
                                    className=' h-[200px]'
                                    onClick={()=>setSelect(1)}/>
                                    </div>
                                </div>
                        </div>
                        <div className='w-full 800px:w-[50%] pt-5'>
                            <h1 className={`${styles.productTitle}`}>
                                {data.name}
                            </h1>
                           <p>{data.description}</p>
                           <div className="flex pt-3">
                            <h4 className={`${styles.productDiscountPrice}`}>
                                {data.discount_price}$
                            </h4>
                            <h3 className={`${styles.price}`}>
                                {data.price ? data.price + "$":null}

                            </h3>
                           </div>
                           <div className="flex items-center mt-12 justify-between pr-3">
                                     <div>
                                       <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-6 mr-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                       onClick={decrementCount}>
                                             -
                                       </button>
                                       <span className='bg-gray-200 text-gray-800 font-medium px-4 py-[11px]'>
                                         {count}
                                       </span>
                                       <button className='bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l ml-4 px-6 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out'
                                       onClickCapture={incrementCount}>
                                             +
                                       </button>
                                       </div>
                                 <div>
                                 { click ? (
                               <AiFillHeart size={30}
                                className='cursor-pointer ' 
                               onClick={() => setClick(!click)}
                               color={click ? "red" : "#333"}
                               title='Remove from wishlist'/>
                               ) : (
                                 <AiOutlineHeart size={30}
                                 className='cursor-pointer' 
                                onClick={() => setClick(!click)}
                                color={click ? "red" : "#333"}
                                title='Add to wishlist'/>
                               )}
                            </div>   
                                   </div>
                         <div className={`${styles.button} !mt-6 !rounded h-11 flex items-center`}
                         onClick={handleMessageSubmit}
                         >
                            <span className='text-white flex items-center'>
                                Add to cart <AiOutlineShoppingCart className='ml-1'/>
                            </span>
                            </div>

                            <div className='flex items-center pt-8'>
                                <img src={data.shop.shop_avatar.url} alt=''
                                className='w-[50px] h-[50px] rounded-full mr-2'/>
                                <div className='pr-8'>
                                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                                        {data.shop.name}
                                    </h3>
                                    <h5 className='
                                    pb-3 text-[15px]'>
                                        ({data.shop.ratings}) Rating
                                    </h5>
                                </div>
                                <div className={`${styles.button} bg-[#6443d1] !rounded !h-11`}>
                                    <span className='text-white flex items-center '>
                                        Send Message <AiOutlineMessage className='ml-1'/>
                                    </span>

                                </div>
                                </div>
                         </div>

                    </div>
                </div>
                <ProductDetailsInfo data ={data}/>
                <br />
                <br />
                </div>
            ) : null
        }
      
    </div>
  )
}

const ProductDetailsInfo =({data}) =>{
    
    const [active,setActive] = useState(1);

    return(
        <div className='bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded '>
            <div className="w-full flex justify-between border-b pt-10 pb-2">
                <div className='relative'>
                    <h5 className='text-black text-[#18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                    onClick={()=>setActive(1)}
                    >
Product Details
                    </h5>
                    {
                        active === 1 ? (
                            <div className={`${styles.active_indicator}`}/>

                            
                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className='text-black text-[#18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                    onClick={()=>setActive(2)}
                    >
Product Reviews
                    </h5>
                    {
                        active === 2 ? (
                            <div className={`${styles.active_indicator}`}/>

                            
                        ) : null
                    }
                </div>
                <div className='relative'>
                    <h5 className='text-black text-[#18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
                    onClick={()=>setActive(3)}
                    >
Seller Information 
                    </h5>
                    {
                        active === 3 ? (
                            <div className={`${styles.active_indicator}`}/>

                            
                        ) : null
                    }
                </div>
            </div>
            {
                active === 1 ? (
<>
                 <p className='py-2 text-[#18px] leading-8 pb-10 whitespace-pre-line'>
                    Product details are a curcial part of ant eCommerce website or online marketplace. These details help the ppotentials customers to make an informed desciion about the product . They are interested in buting. A well-written product description can also be a powerful marketing tool that can help to increase sales. Product details typically include information about the products features, specification, dimension,weight, materials, and other relevent information that can help language and be honest and transparent about the products features and linitations 
                    </p>
                    <p className='py-2 text-[#18px] leading-8 pb-10 whitespace-pre-line'>
                   Customer to understand the product better. The product details sectin should also include gigh quality images and videos of the product details it is essential to keep the target audience in mind. The language used should be clear and est to understand. technical terms should be explained in simple language . The tone of profuct dettails shoul be persuasive, highlighting the unique features of the products
                    </p>
                    <p className='py-2 text-[#18px] leading-8 pb-10 whitespace-pre-line'>
                   Customer to understand the product better. The product details sectin should also include gigh quality images and videos of the product details it is essential to keep the target audience in mind. The language used should be clear and est to understand. technical terms should be explained in simple language . The tone of profuct dettails shoul be persuasive, highlighting the unique features of the products
                    </p>
                    </>        

                ) : null
            }

            {
                active === 2 ? (
              <div className='w-full justify-center min-h-[40vh] flex items-center'>
                <p>No Reviews Yet!</p>
                </div>
                ) : null
            }

            {
                active === 3 && (
                    <div className="w-full block 800px:flex p-5">
                        <div className="w-full 800px:w-[50%]">
                            <div className='flex items-center'>
                                <img src={data.shop.shop_avatar.url}
                                alt=''
                                className='w-[50px] h-[50px] rounded-full'/>
                                <div className='pl-3'>
                                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                                    <h5 className='pb-3 text-[15px]'>
                                        ({data.shop.ratings}) Ratings
                                    </h5>
                                    </div>
                                <p className='pt-2'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia eos sed velit dignissimos ratione nesciunt tenetur, ab neque obcaecati ea illum nisi, ullam cupiditate aspernatur cumque sunt? Nulla, assumenda aliquam.
                                </p>
                                </div>
                        </div>

                        <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
               <div className="text-left">
                <h5 className="font-[600]">
Joined on: <span className='font-[500]'>5 FEB,2025</span>
                </h5>
                <h5 className='font-[600] pt-3'>
                    Total Products: <span className='font-[500]'>1,324</span>
                </h5>
                <h5 className='font-[600] pt-3'>
                    Total Reviews: <span className='font-[500]'>124</span>
                </h5>
                <Link to='/'>
                <div className={`${styles.button} !rounded-[4px] !h-[39px] mt-3`}>
                    <h4 className='text-white'>Visit Shop</h4>
                </div>
                </Link>
               </div>
                        </div>
                    </div>
                ) 
            }
                    </div>
        
    )
}


export default ProductDetails
