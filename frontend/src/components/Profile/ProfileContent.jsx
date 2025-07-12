import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import styles from "../../styles/styles";
import {Country,State } from "country-state-city"
import { Link, useNavigate } from "react-router-dom";
// import AllOrders from "./AllOrders";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import visa from "../../assests/visa.png"
import { updateUserInformation, loadUser, updateUserAddress, deleteUserAddress } from "../../redux/actions/user";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const ProfileContent = ({ active }) => {

    const { user, error, loading, isAuthenticated,successMessage } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({type:"clearErrors"})
          }
            // if (error === "Please login to continue") {
            //     navigate('/login');
            // }

        if(successMessage){
          toast.success(successMessage.successMessage || successMessage);
          dispatch({type:"clearMessage"});
        }
    }, [error, successMessage]);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Update form fields when user data changes
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInformation(name, email, phoneNumber, password));
      toast.success("Profile updated successfully!");
      // Reload user data to get the latest updates
      dispatch(loadUser());
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      if (response.data.success) {
        // Reload user data to get the updated avatar
        dispatch(loadUser());
        toast.success("Avatar updated successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading image");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  return (
    <div className="w-full">
      {/* profile page  */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar?.url || "/default-avatar.png"}
                alt="user-profile picture"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
              <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                  accept="image/*"
                />
                <label htmlFor="image" className="cursor-pointer">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
          
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
          {/* <p>Testing phasae</p> */}
        </div>
      )}

      {/* Refund Page */}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        
        </div>
      )}
{/* Track order page */}
{
  active === 5 && (
    <div>
      <TrackOrder/>
      </div>
  )
}

{/* Change Password */}
{
  active === 6 &&(
    <div>
      <ChangePassword/>
    </div>
  )
}
{/* user address */}

{active === 7 && (
  <div>
    <Address/>
  </div>
)}

    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "6348hvbfbhfbrtr12345021",
      orderItems: [{ name: "Samsung Galaxy" }],
      totalPrice: 150,
      orderStatus: "Delivered",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        // Correct way to access the status value in the row
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.7, // Adjust this so the column is visible
    },
    {
      field: "action",
      headerName: "",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = orders.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems ? item.orderItems.length : 0,
    total: "US$ " + item.totalPrice,
    status: item.orderStatus,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
      />
    </div>
  );
};
const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        // Use params.row.status instead of params.getValue()
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  
  const row = [];
  
  // Correctly mapping the orders
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length, // Corrected field to `orderItems`
        total: "US$ " + item.totalPrice,
        status: item.orderStatus, // Corrected the field to `orderStatus`
      });
    });
  

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder =()=>{
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
    {
      _id: "6348hvbfbhfbrtr12345021",
      orderItems: [{ name: "Samsung Galaxy" }],
      totalPrice: 150,
      orderStatus: "Delivered",
    },
  ];
  const columns = [
    { field:"id",headerName:"Order ID",minWidth:150,flex:0.7},
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        // Correct way to access the status value in the row
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Item Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.7, // Adjust this so the column is visible
    },
     {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ]

  const row =[];

   orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
 <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  )
}

const ChangePassword =()=>{
   const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }; 
  return(
     <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


const Address =()=>{
    const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!");
    } else {
dispatch(
  updateUserAddress(country,city,address1,address2,zipCode,addressType)
)
 setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
    }
  }
  
   const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

return(
  <div className="w-full px-5">
     {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
    My Address
        </h1>
        <div className={`${styles.button} rounded-md`}
        onClick={() => setOpen(true)}
        >
<span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1} {item.address2}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}
          {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}

    </div>
)
}

export default ProfileContent;
