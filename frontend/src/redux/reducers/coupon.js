import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  coupons: [],
  error: null,
  message: null,
};

export const couponReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getCouponsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getCouponsSuccess", (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    })
    .addCase("getCouponsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // delete coupon 
    .addCase("deleteCouponRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCouponSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteCouponFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.message = null;
    });
});
