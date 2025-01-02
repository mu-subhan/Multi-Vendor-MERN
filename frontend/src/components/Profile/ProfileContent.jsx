import React, { useState } from "react";
import { backend_url } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState();
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="w-full">
      {/* profile page  */}

      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                alt="user-profile piture"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <AiOutlineCamera />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full grid grid-cols-2 pb-2">
                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} rounded mb-4 !w-[95%] text-gray-700`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`${styles.input} mb-4 !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Phone Address
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} mb-4 !w-[95%]`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Zip Code
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} mb-4 !w-[95%]`}
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>

                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Address 1
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} mb-4 !w-[95%]`}
                    required
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>

                <div className="w-[50%]">
                  <label
                    className="
                    block pb-2 font-bold"
                  >
                    Address 2
                  </label>
                  <input
                    type="address"
                    className={`${styles.input} mb-4 !w-[95%]`}
                    required
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[15%] h-[40px] border border-[#3a24db] text-[#3a24db] rounded-[5px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      )}

      {/* Order Page */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}
    </div>
  );
};

const AllOrders =() =>{
  const orders=[
    {
      _id:"7463hvbfbhfbrtr28820221",
      orderStatus:[
        {
          name:"Iphone 14 pro max",
        },
      ],
      totalPrice:120,
      orderStatus:"Processing",
    },
  ];

  const columns = [
    {
      field:"id",headerName:"order ID", minWidth:150,flex:0.7
    },
    {
      field:"status",
      headerName:"Status",
      minWidth:130,
      flex:0.7,
      cellClassName:(params) =>{
        return params.getValue(params.id,"status") === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field:"ItemsQty",
      headerName:"Item Qty",
      type:"number",
      minWidth:130,
      flex:0.7,
    },
    {
      
    }
  ]

  return (
    <div className="pl-8 pt-1">

    </div>
  )
};


export default ProfileContent;
