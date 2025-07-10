// import React, { useState, useMemo, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import styles from "../../../styles/styles"
// import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
// import ProductDetailCard from "../ProductDetailCard/ProductDetailCard"
// import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist';
// import { useDispatch, useSelector } from 'react-redux';
// import { backend_url } from '../../../server';

// const ProductCard = ({ data, isShop, isEvent }) => {
//     const [click, setClick] = useState(false);
//     const [open, setOpen] = useState(false);
//     const dispatch = useDispatch();
//     const [imgError, setImgError] = useState(false);
//  const { wishlist } = useSelector((state) => state.wishlist);
     

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addToCart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };
//    console.log("ProductCard data:", data);

//     return (
//         <>
//             <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
//                 <div className='flex justify-end'></div>
//                 <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//                     <img 
//                        src={
//      data.images && data.images[0]?.url
//        ? `${backend_url || ""}/uploads/${data.images[0].url}`
//        : "/no-image.png"
//    }
//    alt={data.name || ""}
//    className="w-full h-[170px] object-contain"
//                     />
//                 </Link>
//                 <Link to={isShop ? `/shop/preview/${data?.shop?._id}` : "/"}>
//                     <h5 className={`${styles.shop_name}`}>
//                         {data.shop?.name || "Shop Name"}
//                     </h5>
//                 </Link>
//                 <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//                     <h4 className="pb-3 font-[500]">
//                         {data.name && data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//                     </h4>

//                     <div className="flex">
//                         <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
//                         <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
//                         <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
//                         <AiFillStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
//                         <AiOutlineStar className='mr-2 cursor-pointer' color='#F6BA00' size={20} />
//                     </div>

//                     <div className='py-2 flex items-center justify-between'>
//                         <div className='flex'>
//                             <h5 className={`${styles.productDiscountPrice}`}>
//                                 {isEvent ? (
//                                     `$${data.discountPrice || data.discount_price || 0}`
//                                 ) : (
//                                     `$${data.price === 0 ? data.price : data.discount_price || data.price || 0}`
//                                 )}
//                             </h5>
//                             {!isEvent && data.price && data.discount_price && (
//                                 <h4 className={`${styles.price}`}>
//                                     ${data.price}
//                                 </h4>
//                             )}
//                         </div>
//                         <span className='font-[400] text-[17px] text-[#68d284]'>
//                             {data.total_sell || data.sold_out || 0} sold
//                         </span>
//                     </div>
//                 </Link>

//                 {/* side options */}
//                 <div>
//                     {click ? (
//                         <AiFillHeart
//                             size={22}
//                             className='cursor-pointer absolute right-2 top-5'
//                             onClick={() => removeFromWishlistHandler(data)}
//                             color={click ? "red" : "#333"}
//                             title='Remove from wishlist'
//                         />
//                     ) : (
//                         <AiOutlineHeart
//                             size={22}
//                             className='cursor-pointer absolute right-2 top-5'
//                             onClick={() => addToWishlistHandler(data)}
//                             color={click ? "red" : "#333"}
//                             title='Add to wishlist'
//                         />
//                     )}
//                     <AiOutlineEye
//                         size={22}
//                         className='cursor-pointer absolute right-2 top-14'
//                         onClick={() => setOpen(!open)}
//                         color="#333"
//                         title='Quick View'
//                     />

//                     <AiOutlineShoppingCart
//                         size={22}
//                         className='cursor-pointer absolute right-2 top-24'
//                         onClick={() => addToCartHandler(data._id)}
//                         color="#444"
//                         title='Add to cart'
//                     />

//                     {open && <ProductDetailCard setOpen={setOpen} data={data} />}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductCard;


// import React, { useState } from "react";
// import {
//   AiFillHeart,
//   AiFillStar,
//   AiOutlineEye,
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiOutlineStar,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import { useDispatch, useSelector } from "react-redux";
// import ProductDetailCard from "../ProductDetailCard/ProductDetailCard";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../../redux/actions/wishlist";
// import { useEffect } from "react";
// import { addToCart } from "../../../redux/actions/cart";
// import { toast } from "react-toastify";
// import Ratings from "../../Products/Ratings";
// import { backend_url } from "../../../server";

// const ProductCard = ({ data,isEvent }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (wishlist && wishlist.find((i) => i._id === data._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist]);

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: 1 };
//         dispatch(addToCart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };
//    console.log("ProductCard data:", data);

//   return (
//     <>
//       <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
//         <div className="flex justify-end"></div>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
// <img
//   src={
//     data.images && data.images[0]?.url
//       ? `${backend_url || ""}/uploads/${data.images[0].url}`
//       : "/no-image.png"
//   }
//   alt={data.name || ""}
//   className="w-full h-[170px] object-contain"
// />
//         </Link>
//         <Link to={`/shop/preview/${data?.shop._id}`}>
//           <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
//         </Link>
//         <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
//           <h4 className="pb-3 font-[500]">
//             {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
//           </h4>

//           <div className="flex">
//           <Ratings rating={data?.ratings} />
//           </div>

//           <div className="py-2 flex items-center justify-between">
//             <div className="flex">
//                        <h5 className={`${styles.productDiscountPrice}`}>
//                 {data.originalPrice === 0
//                   ? data.originalPrice
//                   : data.discountPrice}
//                 $
//               </h5>
//               <h4 className={`${styles.price}`}>
//                 {data.originalPrice ? data.originalPrice + " $" : null}
//               </h4>
//             </div>
//             <span className="font-[400] text-[17px] text-[#68d284]">
//               {data?.sold_out} sold
//             </span>
//           </div>
//         </Link>

//         {/* side options */}
//         <div>
//           {click ? (
//             <AiFillHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => removeFromWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Remove from wishlist"
//             />
//           ) : (
//             <AiOutlineHeart
//               size={22}
//               className="cursor-pointer absolute right-2 top-5"
//               onClick={() => addToWishlistHandler(data)}
//               color={click ? "red" : "#333"}
//               title="Add to wishlist"
//             />
//           )}
//           <AiOutlineEye
//             size={22}
//             className="cursor-pointer absolute right-2 top-14"
//             onClick={() => setOpen(!open)}
//             color="#333"
//             title="Quick view"
//           />
//           <AiOutlineShoppingCart
//             size={25}
//             className="cursor-pointer absolute right-2 top-24"
//             onClick={() => addToCartHandler(data._id)}
//             color="#444"
//             title="Add to cart"
//           />
//           {open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;



import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addToCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data,isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;