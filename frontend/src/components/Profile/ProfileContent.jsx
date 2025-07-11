import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
// import AllOrders from "./AllOrders";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "@mui/material";
import visa from "../../assests/visa.png"
import { updateUserInformation, loadUser } from "../../redux/actions/user";
import {toast} from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";

const ProfileContent = ({ active }) => {
    const { user, error, loading, isAuthenticated } = useSelector((state) => state.user);
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
            if (error === "Please login to continue") {
                navigate('/login');
            }
        }
    }, [error, navigate]);

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

{/* payment page */}
{
  active === 6 &&(
    <div>
      <PaymentMethod/>
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

const PaymentMethod =()=>{
  return(
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
    Payment Method
        </h1>
        <div className={`${styles.button} rounded-md`}>
<span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img src={visa}
          className="w-12 h-12" />
          <h5 className="pl-5 font-[600]">Subhan Shabeer</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="">1237 **** *** ****</h6>
           <h5 className="pl-6">08/2025</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
<AiOutlineDelete size={25} className="cursor-pointer"/>
        </div>
      </div>
    </div>
  )
}

const Address =()=>{
return(
  <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
    My Address
        </h1>
        <div className={`${styles.button} rounded-md`}>
<span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
        
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          
           <h5 className="">65 Canal Bank Madni Park Lahore</h5>
        </div>
             <div className="pl-8 flex items-center">
          
           <h5 className="">{+92} 326 ****** </h5>
        </div>


        <div className="min-w-[10%] flex items-center justify-between pl-8">
<AiOutlineDelete size={25} className="cursor-pointer"/>
        </div>
      </div>
    </div>
)
}

export default ProfileContent;
