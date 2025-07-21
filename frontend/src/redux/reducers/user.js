import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthentication: false,
    loading: false,
    user: null,
    error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.isAuthentication = true;
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        })
        .addCase("LoadUserFail", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthentication = false;
        })
        .addCase("ClearUser", (state) => {
            state.isAuthentication = false;
            state.user = null;
            state.error = null;
        })
        // update user Address
        .addCase("updateUserAddressRequest",(state)=>{
            state.addressloading = true;
        })
        .addCase("updateUserAddressSuccess",(state,action)=>{
            state.addressloading==false;
            state.successMessage = action.payload.successMessage;
            state.user= action.payload.user;
        })
        .addCase("updateUserAddressFailed",(state,action)=>{
            state.addressloading=false;
            state.error=action.payload;
         })
        // delete user address
        .addCase("deleteUserAddressRequest",(state)=>{
            state.addressloading = true;
        })
        .addCase("deleteUserAddressSuccess",(state,action)=>{
            state.addressloading = false;
            state.successMessage = action.payload.successMessage;
            state.user = action.payload.user;
        })
        .addCase("deleteUserAddressFailed",(state,action)=>{
            state.addressloading = false;
            state.error=action.payload;
        })
        .addCase("clearErrors", (state) => {
            state.error = null;
        })
         .addCase("clearMessage", (state) => {
            state.successMessage = null;
        });

});
