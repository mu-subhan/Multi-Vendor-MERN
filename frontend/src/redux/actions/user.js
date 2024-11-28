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
  