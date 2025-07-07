import axios from "axios";
import { server } from "../../server";

// get all coupons of shop
export const getAllCoupons = (shopId) => async (dispatch) => {
  try {
    dispatch({ 
      type: "getCouponsRequest",
    });

    const { data } = await axios.get(`${server}/coupon/get-coupon/${shopId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "getCouponsSuccess",
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: "getCouponsFailed",
      payload: error.response?.data?.message || "Failed to fetch coupons",
    });
  }
};

// delete coupon of a shop
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCouponRequest",
    });

    const { data } = await axios.delete(`${server}/coupon/delete-coupon/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteCouponSuccess",
      payload: data.message,
    });

    // Dispatch to refresh the coupon list
    dispatch(getAllCoupons());
  } catch (error) {
    dispatch({
      type: "deleteCouponFailed",
      payload: error.response?.data?.message || "Failed to delete coupon",
    });
  }
};
