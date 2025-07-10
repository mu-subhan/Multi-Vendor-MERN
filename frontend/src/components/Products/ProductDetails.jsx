import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import { backend_url } from '../../server';

const ProductDetails = ({data}) => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);
    const [select, setSelect] = useState(0);
    const navigate = useNavigate();

    const incrementCount = () => {
        setCount(count + 1);
    }
    
    const decrementCount = () => {
        if(count > 1) {
            setCount(count - 1);
        }
    }

    const handleMessageSubmit = () => {
        navigate("/inbox?conversation=507ebjver884ehfdjeriv84")
    }

    return (
        <div className='bg-white'>
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%]">
                                <img 
                                    src={`${backend_url}uploads/${data?.images[select]}`}
                                    alt={data?.name || "Product Image"}
                                    className='w-[80%] object-contain'
                                />
                                <div className='w-full flex p-6'>
                                    <div className={`${select === 0 ? "border" : "null"} cursor-pointer`}>
                                        <img 
                                            src={`${backend_url}uploads/${data?.images[0]}`}
                                            alt={data?.name || "Product Image"}
                                            className='h-[200px] object-contain'
                                            onClick={() => setSelect(0)}
                                        />
                                    </div>
                                    {data?.images[1] && (
                                        <div className={`${select === 1 ? "border" : "null"} cursor-pointer pl-5`}>
                                            <img 
                                                src={`${backend_url}uploads/${data?.images[1]}`}
                                                alt={data?.name || "Product Image"}
                                                className='h-[200px] object-contain'
                                                onClick={() => setSelect(1)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='w-full 800px:w-[50%] pt-5'>
                                <h1 className={`${styles.productTitle}`}>
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4 className={`${styles.productDiscountPrice}`}>
                                        ${data.discountPrice}
                                    </h4>
                                    <h3 className={`${styles.price}`}>
                                        {data.originalPrice ? `$${data.originalPrice}` : null}
                                    </h3>
                                </div>
                                <div className="flex items-center mt-12 justify-between pr-3">
                                    <div>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={decrementCount}
                                        >
                                            -
                                        </button>
                                        <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                            {count}
                                        </span>
                                        <button
                                            className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                            onClick={incrementCount}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => setClick(!click)}
                                                color={click ? "red" : "#333"}
                                                title="Remove from wishlist"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => setClick(!click)}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                                    onClick={handleMessageSubmit}
                                >
                                    <span className="text-white flex items-center">
                                        Send Message <AiOutlineMessage className="ml-1" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ProductDetails;
