import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
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
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});



// import { createReducer } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   loading: false,
//   user: null,
//   error: null,
// };

// const actionTypes = {
//   LOAD_USER_REQUEST: "LoadUserRequest",
//   LOAD_USER_SUCCESS: "LoadUserSuccess",
//   LOAD_USER_FAIL: "LoadUserFail",
//   CLEAR_ERRORS: "clearErrors",
// };

// export const userReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(actionTypes.LOAD_USER_REQUEST, (state) => {
//       state.loading = true;
//     })
//     .addCase(actionTypes.LOAD_USER_SUCCESS, (state, action) => {
//       state.isAuthenticated = true;
//       state.loading = false;
//       state.user = action.payload;
//     })
//     .addCase(actionTypes.LOAD_USER_FAIL, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.isAuthenticated = false;
//     })
//     .addCase(actionTypes.CLEAR_ERRORS, (state) => {
//       state.error = null;
//     });
// });
