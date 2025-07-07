
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { getAllCoupons, deleteCoupon } from '../../redux/actions/coupon';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Loader from '../Layout/Loader';
import { toast } from 'react-toastify';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState("");

  const { products } = useSelector((state) => state.products);
  const { coupons, isLoading, error, message } = useSelector((state) => state.coupons);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller && seller._id) {
      dispatch(getAllCoupons(seller._id));
    }
  }, [dispatch, seller]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
      
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessages" });
      dispatch(getAllCoupons(seller._id));
    }
  }, [dispatch, error, message, seller._id]);

  const handleDelete = (id) => {
    dispatch(deleteCoupon(id));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post(`${server}/coupon/create-coupon-code`, {
      name,
      value,
      minAmount,
      maxAmount,
      selectedProducts,
      shop: {
        _id: seller._id,
        name: seller.name,
      },
    }, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        dispatch(getAllCoupons(seller._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Failed to create coupon code");
      });
  }

  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Value",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`} onClick={() => setOpen(true)}>
              <span className='text-white'>
                Create Copoun Code
              </span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="w-full"
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 30]}
          />
          {
            open && (
              <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] bg-opacity-50 flex items-center justify-center z-[20000]">
                <div className="bg-white p-4 rounded-md shadow w-[90%] 800px:w-[40%] h-[80vh]">
                  <div className="w-full flex justify-end">
                    <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpen(false)} />
                  </div>
                  <h5 className="text-[30px] font-Poppins text-center">
                    Create Coupon code
                  </h5>
                  {/* create coupoun code */}
                  <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                     <div>
                       <label className="pb-2">
                         Name <span className="text-red-500">*</span>
                       </label>
                       <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your coupon code name..."
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">
                        Discount Percentenge{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="value"
                        value={value}
                        required
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter your coupon code value..."
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">Min Amount</label>
                      <input
                        type="number"
                        name="value"
                        value={minAmount}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setMinAmout(e.target.value)}
                        placeholder="Enter your coupon code min amount..."
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">Max Amount</label>
                      <input
                        type="number"
                        name="value"
                        value={maxAmount}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="Enter your coupon code max amount..."
                      />
                    </div>
                    <br />
                    <div>
                      <label className="pb-2">Selected Product</label>
                      <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                      >
                        <option value="Choose your selected products">
                          Choose a selected product
                        </option>
                        {products &&
                          products.map((i) => (
                            <option value={i.name} key={i.name}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <br />
                    <div>
                      <input
                        type="submit"
                        value="Create"
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </form>
                </div>
              </div>
            )
          }
        </div>
      )}
    </>
  );
};

export default AllCoupons
