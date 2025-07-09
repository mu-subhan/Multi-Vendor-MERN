import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  products: [],
  success: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    // Get all products
    .addCase('getAllProductsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllProductsSuccess', (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase('getAllProductsFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // Create product
    .addCase('productCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('productCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
      state.success = true;
    })
    .addCase('productCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all products of shop 
    .addCase('getAllProductsShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllProductsShopSuccess', (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase('getAllProductsShopFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.products = [];
    })
    // delete product of shop
    .addCase("deleteProductRequest",(state)=>{
      state.isLoading= true;
    })
    .addCase("deleteProductSuccess",(state,action)=>{
      state.isLoading= false;
      state.message=action.payload;
    })
    .addCase("deleteProductFailed",(state,action)=>{
      state.isLoading=false;
      state.error= action.payload
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
