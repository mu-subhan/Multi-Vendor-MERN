import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: [],
  error: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getAllEventsShopRequest":
      return {
        ...state,
        isLoading: true,
      };

    case "getAllEventsShopSuccess":
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };

    case "getAllEventsShopFailed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
