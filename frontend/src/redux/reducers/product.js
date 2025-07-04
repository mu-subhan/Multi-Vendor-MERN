import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  product: null,
  success: false,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
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
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
