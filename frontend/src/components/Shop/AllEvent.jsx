import React, { useEffect } from 'react'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import {useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { toast } from 'react-toastify';
import { deleteEvent, getAlleventsShop } from '../../redux/actions/event';
// import {deleteProduct} from '../../redux/actions/product';

const AllEvent = () => {
    const {events, isLoading, error, message} = useSelector((state) => state.events);
    const {seller} = useSelector((state) => state.seller);
    const dispatch = useDispatch();

    useEffect(() => {
        if(seller?._id) {
            dispatch(getAlleventsShop(seller._id));
        }
    }, [dispatch]);

    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
        if(message) {
            toast.success(message);
            dispatch({ type: "clearMessages" });
            dispatch(getAlleventsShop(seller._id));
        }
    }, [error, message, dispatch, seller._id]);

    const handleDelete = (id) => {
      dispatch(deleteEvent(id));
    //   window.location.reload();
    };

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "sold",
            headerName: "Sold out",
            type: "number",
            minWidth: 130,
            flex: 0.6,
        },
        {
            field: "Preview",
            headerName: "Preview",
            minWidth: 100,
            flex: 0.8,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/product/${params.row.name.replace(/\s+/g, "-").toLowerCase()}`}>
                        <Button>
                            <AiOutlineEye size={20} />
                        </Button>
                    </Link>
                );
            },
        },
        {
            field: "Delete",
            headerName: "Delete",
            minWidth: 120,
            flex: 0.8,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete size={20} />
                    </Button>
                );
            },
        },
    ];

    const row = [];

    events &&
        events.forEach((item) => {
            row.push({
                id: item._id,
                name: item.name,
                price: "US$ " + item.discountPrice,
                Stock: item.stock,
                sold: item.sold_out || 0,
            });
        });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-full mx-8 pt-1 mt-10 bg-white">
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
                </div>
            )}
        </>
    );
};
export default AllEvent