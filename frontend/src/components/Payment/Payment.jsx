import axios from "axios";
import { application } from "express";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import { on } from "nodemon";
import styles from "../../styles/styles";
import { CardCvcElement, CardElement, CardNumberElement } from "@stripe/react-stripe-js";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const element = useElement();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, action) => {
    return action.order
      .create({
        purchase_units: [
          {
            description: "Sun-flower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, action) => {
    return action.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;
      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("order/success");
        toast.success(" Order Successfully");
        localStorage.setItem(cartItems, JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };
  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );
      const client_secret = data.client_secret;

      if (!stripe || !element) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: element.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "CCredit Card",
          };

          await axios
            .post(`${server}/order/create-order`.order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
        toast.error(error);
    }
  };

  const cashOneDeliveryHandler = async (e) =>{
    e.preventDefault();

    const config= {
        headers:{
            "Content-Type":"application/json",
        }
    }
    order.paymentInfo={
        type:"Cash On Delivery",
    };

    await axios.post(`${server}/order/create-order`,order.config)
    .then((res)=>{
        setOpen(false)
        navigate("/order/success");
        toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
    })
  }

  return( 
  <div className="w-full flex flex-col items-center py-8">
    <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
            <paymentInfo 
            user ={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOneDeliveryHandler={cashOneDeliveryHandler}
            />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
            <CartData orderData={orderData}/>
        </div>
    </div>

  </div>
  )
};


const paymentInfo = ({
    user,
    open,
    setOpen,
    onApprove,
    createOrder,
    paymentHandler,
    cashOneDeliveryHandler,
}) =>{
    const [select,setSelect] = useState(1);

    return (
        <div className="w-full 800px:w0[95%] bg-white rounded-md p-5 pb-8">
            {/* selct button */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center" 
                    onClick={()=>setSelect(1)}
                    >
                        {select ===1 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full"/>
                        ):null
                    }

                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Debit/credit card
                    </h4>
                </div>

                {/* pay with card */}
                {select === 1 ? (
                    <div className="w-full flex border-b">
                       <form className="w-full"onSubmit={paymentHandler}>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label className="block pb-2">Name On Card</label>
                                <input 
                                required
                                placeholder={user && user.name}
                                className={`${styles.input} !w-[95%] text-[#444]`}
                                value={user && user.name}/>
                            </div>
                            <div className="w-[50%]">
                                <label className="block pb-2">Exp Date</label>
                                <CardElement
                                className={`${styles.input}`}
                                options={{
                                    style:{
                                        base:{
                                            fontSize:"19px",
                                            lineHeight:"1.5",
                                            color:"#444",
                                        },
                                        empty:{
                                            color:"3a120a",
                                            backgroundColor:"transparent",
                                            "::placeholder":{
                                                color:"#444",
                                            }
                                        }
                                    }
                                }}
                                />
                            </div>
                        </div>
                        <div className="w-full flex pb-3">
                            <div className="w-[50%]">
                                <label className="block pb-2">Card NUbmer

                                </label>
                                <CardNumberElement
                                className={`${styles.input} !h-[35px] !w-[95%]`}
                                options={{
                                    style: {
                                        base: {
                                          fontSize: "19px",
                                          lineHeight: 1.5,
                                          color: "#444",
                                        },
                                        empty: {
                                          color: "#3a120a",
                                          backgroundColor: "transparent",
                                          "::placeholder": {
                                            color: "#444",
                                          },
                                        },
                                      },
                                    }}
                                  />
                            </div>
                            <div className="w-[50%]">
                                <label className="block pb-2">CW</label>
                                <CardCvcElement
                                 className={`${styles.input} !h-[35px]`}
                                 options={{
                                   style: {
                                     base: {
                                       fontSize: "19px",
                                       lineHeight: 1.5,
                                       color: "#444",
                                     },
                                     empty: {
                                       color: "#3a120a",
                                       backgroundColor: "transparent",
                                       "::placeholder": {
                                         color: "#444",
                                       },
                                     },
                                   },
                                 }}
                               />
                            </div>
                        </div>
                        <input type="submit"
                        value="Submit"
                        className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}/>
                       </form>
                       </div>
                ):null}
            </div>

            <br/>
            
        </div>
    )
}

export default Payment;
