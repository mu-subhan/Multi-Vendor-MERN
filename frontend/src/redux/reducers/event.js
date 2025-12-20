// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isLoading: true,
//   events: [],
//   allEvents: [],
//   error: null,
// };

// export const eventReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase("getAlleventsRequest", (state) => {
//       state.isLoading = true;
//     })
//     .addCase("getAlleventsSuccess", (state, action) => {
//       state.isLoading = false;
//       state.allEvents = action.payload;
//       state.error = null;
//     })
//     .addCase("getAlleventsFailed", (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//       state.allEvents = [];
//     })
//     .addCase("clearErrors", (state) => {
//       state.error = null;
//     });
// });

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: [],
  allEvents: [],
  error: null,
  success: false,
  message: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // Create Event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
      state.error = null;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all events of a shop
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.error = null;
    })
    .addCase("getAlleventsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.events = [];
    })

    // Delete event of a shop
    .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteeventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all events
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

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
