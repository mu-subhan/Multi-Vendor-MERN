import axios from "axios";
import { server } from "../../server";

// login user
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        };

        const { data } = await axios.post(
            `${server}/user/login-user`,
            { email, password },
            config
        );

        dispatch({ type: "LoadUserSuccess", payload: data.user });

        // Immediately load user data after successful login
        await dispatch(loadUser());

        return data;
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response?.data?.message || "Login failed"
        });
        throw error;
    }
};

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });

        const { data } = await axios.get(`${server}/user/getuser`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!data.success) {
            throw new Error(data.message || "Failed to load user");
        }

        dispatch({ type: "LoadUserSuccess", payload: data.user });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response?.data?.message || "Failed to load user data"
        });
        
        // If unauthorized, clear the user state
        if (error.response?.status === 401) {
            dispatch({ type: "ClearUser" });
        }
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

  // user update information
export const updateUserInformation =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };