import { createReducer } from "@reduxjs/toolkit";
// import {
//   getAllOrdersUserRequest,
//   getAllOrdersUserSuccess,
//   getAllOrdersUserFailed,
//   getAllOrdersShopRequest,
//   getAllOrdersShopSuccess,
//   getAllOrdersShopFailed,
//   adminAllOrdersRequest,
//   adminAllOrdersSuccess,
//   adminAllOrdersFailed,
//   clearErrors,
// } from "./actions"; 

const initialState = {
  isLoading: true,
  adminOrderLoading: false,
  orders: [],
  adminOrders: [],
  error: null,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // get all orders of user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // get all orders of shop
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    
    // get all orders for admin
    .addCase("adminAllOrdersRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("adminAllOrdersSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllOrdersFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })
    
    // clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
