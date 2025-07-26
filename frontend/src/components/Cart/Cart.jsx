import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { backend_url } from "../../server";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
    toast.success("Item removed from cart");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    if (typeof image === "string" && image.startsWith("http")) return image;
    return `${backend_url}/uploads/${image}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity">
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center">
            <IoBagHandleOutline className="text-indigo-600 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Cart ({cart?.length || 0})
            </h2>
          </div>
          <button 
            onClick={() => setOpenCart(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <RxCross1 size={24} />
          </button>
        </div>

        {/* Empty State */}
        {cart?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <IoBagHandleOutline className="text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Start shopping to add items to your cart
            </p>
            <button
              onClick={() => setOpenCart(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {/* Cart Items */}
              {cart?.map((item) => (
                <CartItem
                  key={item._id}
                  data={item}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                  getImageUrl={getImageUrl}
                />
              ))}
            </div>

            {/* Checkout Section */}
            <div className="border-t border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-700">Subtotal</h3>
                <span className="text-xl font-bold text-indigo-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              
              <Link 
                to="/checkout" 
                onClick={() => setOpenCart(false)}
                className="block w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>
              
              <button
                onClick={() => setOpenCart(false)}
                className="w-full mt-3 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartItem = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
  getImageUrl,
}) => {
  const [quantity, setQuantity] = useState(data.qty);
  const totalPrice = data.discountPrice * quantity;

  const increment = () => {
    if (data.stock <= quantity) {
      toast.error("Product stock limited!");
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    quantityChangeHandler({ ...data, qty: newQuantity });
  };

  const decrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    quantityChangeHandler({ ...data, qty: newQuantity });
  };

  return (
    <div className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        {/* Product Image */}
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={getImageUrl(data?.images?.[0]?.url)}
            alt={data.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.png";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <h3 className="text-gray-800 font-medium line-clamp-1">{data.name}</h3>
            <button
              onClick={() => removeFromCartHandler(data)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <RxCross1 size={18} />
            </button>
          </div>
          
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold text-indigo-600">
              ${data.discountPrice}
            </span>
            {data.price !== data.discountPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${data.price}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center mt-3">
            <button
              onClick={decrement}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <HiOutlineMinus size={16} />
            </button>
            <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 text-center">
              {quantity}
            </span>
            <button
              onClick={increment}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100 transition-colors"
              disabled={quantity >= data.stock}
            >
              <HiPlus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;