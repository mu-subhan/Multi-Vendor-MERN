import axios from "axios";
import { server } from "../../server";

// submit product review
export const submitReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({
      type: "submitReviewRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/product/create-review`,
      reviewData,
      config
    );

    dispatch({
      type: "submitReviewSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "submitReviewFail",
      payload: error.response?.data?.message || "Failed to submit review",
    });
  }
}; 