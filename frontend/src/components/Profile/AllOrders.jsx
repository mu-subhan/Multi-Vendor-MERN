import React from "react";
// import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [{ name: "Iphone 14 pro max" }],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {orders.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              flexDirection: "column", // Stack item name and details vertically
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {/* Displaying item name(s) above each order details */}
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {item.orderItems.map((orderItem, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  {orderItem.name}
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ flex: 1 }}>
                <strong>Order ID:</strong> {item._id}
              </div>
              <div style={{ flex: 1 }}>
                <strong>Status:</strong> {item.orderStatus}
              </div>
              <div style={{ flex: 1 }}>
                <strong>Item Qty:</strong> {item.orderItems.length}
              </div>
              <div style={{ flex: 1 }}>
                <strong>Total:</strong> US$ {item.totalPrice}
              </div>
              <div style={{ flex: 0 }}>
                <Link to={`/order/${item._id}`}>
                  <button>
                    <AiOutlineArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
