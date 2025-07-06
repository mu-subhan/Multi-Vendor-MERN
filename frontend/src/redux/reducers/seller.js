import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSeller: false,
  seller: null,
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
      state.error = null;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
      state.seller = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearSellerData", (state) => {
      state.isSeller = false;
      state.seller = null;
      state.error = null;
    });
});
