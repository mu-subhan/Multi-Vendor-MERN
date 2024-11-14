import { createReducer } from "@reduxjs/toolkit";
import { isAuthentication } from "../../../../backend/middleware/auth";

const initialState = {
    isAuthentication : false,
};

export const userReducer = createReducer(initialState,{
    LoadUserRequest:(state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state,action) =>{
        state.isAuthentication= true,
        state.loading= false,
        state.user = action.payload;

    },
    LoadUserFail:(state,action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthentication = false;

    },
    clearErrors:(state) =>{
        state.error = null;
    },
});