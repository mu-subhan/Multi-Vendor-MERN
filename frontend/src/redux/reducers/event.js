import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: [],
  allEvents: [],
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
      state.error = null;
    })
    .addCase("getAlleventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.allEvents = [];
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
