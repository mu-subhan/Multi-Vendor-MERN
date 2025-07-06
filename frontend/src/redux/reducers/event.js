import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: [],
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('eventCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('eventCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase('eventCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all events of shop 
    .addCase('getAlleventsShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAlleventsShopSuccess', (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase('getAlleventsShopFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.events = [];
    })
    // delete event of shop
    .addCase("deleteeventRequest",(state)=>{
      state.isLoading= true;
    })
    .addCase("deleteeventSuccess",(state,action)=>{
      state.isLoading= false;
      state.message=action.payload;
    })
    .addCase("deleteeventFailed",(state,action)=>{
      state.isLoading=false;
      state.error= action.payload
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
