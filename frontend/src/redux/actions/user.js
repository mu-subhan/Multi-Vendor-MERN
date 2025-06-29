import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: "LoadUserRequest" });
      const { data } = await axios.get(`${server}/user/getuser`, { withCredentials: true });
      dispatch({ type: "LoadUserSuccess", payload: data.user });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error (e.g., redirect to login page)
        console.log("Unauthorized access - please log in.");
      }
      dispatch({
        type: "LoadUserFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  

  // load seller

  export const loadSeller = () => async (dispatch) => {
    try {
      dispatch({ type: "LoadSellerRequest" });
      const { data } = await axios.get(`${server}/shop/getSeller`, { withCredentials: true });
      dispatch({ type: "LoadSellerSuccess", payload: data.seller });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error (e.g., redirect to login page)
        console.log("Unauthorized access - please log in.");
      }
      dispatch({
        type: "LoadSellerFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };