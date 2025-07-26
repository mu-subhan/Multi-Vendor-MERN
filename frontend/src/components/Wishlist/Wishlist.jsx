import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty: 1};
    dispatch(addToCart(newData));
    setOpenWishlist(false);
    // Optional: Add toast notification here
  };

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    if (typeof image === 'string' && image.startsWith('http')) {
      return image;
    }
    return `${backend_url}/uploads/${image}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center">
            <AiFillHeart className="text-rose-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Wishlist ({wishlist?.length || 0})
            </h2>
          </div>
          <button 
            onClick={() => setOpenWishlist(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Empty State */}
        {wishlist?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <AiOutlineHeart className="text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start adding items you love to see them here
            </p>
            <button
              onClick={() => setOpenWishlist(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="h-[calc(100%-180px)] overflow-y-auto">
            {/* Wishlist Items */}
            {wishlist?.map((item) => (
              <WishlistItem
                key={item._id}
                data={item}
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
                getImageUrl={getImageUrl}
              />
               
            ))}
          </div>
        )}

        {/* Footer (visible only when items exist) */}
        {wishlist?.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <button
              onClick={() => {
                wishlist.forEach(item => addToCartHandler(item));
              }}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <BsCartPlus className="mr-2" />
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({ data, removeFromWishlistHandler, addToCartHandler,getImageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        {/* Product Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={getImageUrl(data?.images?.[0].url)}
            alt={data.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.png";
            }}
          />
          {isHovered && (
            <button
              onClick={() => removeFromWishlistHandler(data)}
              className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md text-rose-500 hover:bg-rose-50 transition-colors"
              aria-label="Remove from wishlist"
            >
              <RxCross1 size={14} />
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="ml-4 flex-1">
          <h3 className="text-gray-800 font-medium line-clamp-1">{data.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-lg font-bold text-indigo-600">
              ${data.discountPrice || data.price}
            </span>
            {data.discountPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${data.price}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCartHandler(data)}
          className="ml-4 p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
          aria-label="Add to cart"
        >
          <BsCartPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Wishlist;