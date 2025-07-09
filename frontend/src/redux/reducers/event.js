import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: [],
  error: null,
  success: false,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "eventCreateRequest":
      return {
        ...state,
        isLoading: true,
        success: false,
      };

    case "eventCreateSuccess":
      return {
        ...state,
        isLoading: false,
        success: true,
        events: [...state.events, action.payload],
      };

    case "eventCreateFail":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };

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

    case "clearErrors":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
