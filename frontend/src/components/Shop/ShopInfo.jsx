import React from 'react'
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import styles from '../../styles/styles';

const ShopInfo = ({isOwner}) => {

    const { seller } = useSelector((state) => state.seller);
   const logoutHandler = () => {

   }
    // console.log(seller);
    return (
        <>
            <div className='w-full py-5'>
                <div className="w-full flex items-center justify-center">
                    <img
                        src={
                            seller.avatar?.url
                                ? `${backend_url}uploads/${seller.avatar.url}`
                                : "/default-avatar.png"
                        }
                        alt="seller avatar"
                        className="w-[150px] h-[150px] object-cover rounded-full border-2 border-blue-400"
                    />
                </div>
                <h3 className='text-center py-2 text-[20px]'>
                    {seller.name}
                </h3>
                <p className='text-[16px] text-[#000000a6] p-[10px] flex items-center'>
                    {seller.description ? seller.description : "No description available for this shop."}
                </p>
            </div>

            <div className="p-3">
                <h5 className='font-[600]'>
                    Phone Number
                </h5>
                <h4 className='text-[#000000a6]'>
                    {seller.phoneNumber ? seller.phoneNumber : "No phone number available for this shop."}
                </h4>
            </div>

            <div className="p-3">
                <h5 className='font-[600]'>
                    Total Product
                </h5>
                <h4 className='text-[#000000a6]'>
                    {seller.product ? seller.product : "No product available for this shop."}
                </h4>
            </div>
             <div className="p-3">
                <h5 className='font-[600]'>
                   Shop Rating
                </h5>
                <h4 className='text-[#000000a6]'>
                    {seller.rating ? seller.rating : "No rating available for this shop."}
                </h4>
            </div>

             <div className="p-3">
                <h5 className='font-[600]'>
                   Joined On
                </h5>
                <h4 className='text-[#000000a6]'>
                    {seller.createdAt.slice(0, 10) ? seller.createdAt.slice(0, 10) : "No join date available for this shop."}
                </h4>
            </div>
            {
                isOwner && (
                    <div className="py-3 px-4">
                        <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                            <span className='text-white'>
Edit Shop
                            </span>
 
                        </div>
                         <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                         onClick={logoutHandler}>
                            <span className='text-white'>Log Out
                            </span>
                         </div>
                    </div>
                )
            }
        </>
    )
}

export default ShopInfo