import axios from "axios"
import { server } from "../../server"


// create event 
export const createevent = (newForm) => async (dispatch) =>{
    try {
        dispatch({
            type:"eventCreateRequest",
        })
        const config = {headers:{"Content-Type":"multipart/form-data"}}
        const {data}= await axios.post(`${server}/event/create-event`,
            newForm,
            config
        )
        dispatch({
            type:"eventCreateSuccess",
            payload:data.event,
        })
    } catch (error) {
        dispatch({
        type:"eventCreateFail",
        payload: error.response.data.message,
   })
    }
};

// get all events
export const getAlleventsShop = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:"getAlleventsShopRequest",
        });

        
        const {data} = await axios.get(`${server}/event/get-all-events/${id}`)

        if (data.success) {
            dispatch({
                type:"getAlleventsShopSuccess",
                payload: data.events,
            })
        } else {
            dispatch({
                type:"getAlleventsShopFailed",
                payload: "Failed to fetch events",
            });
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        dispatch({
            type:"getAlleventsShopFailed",
            payload: error.response?.data?.message || "Failed to fetch events",
        });
    }
}

// delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteeventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteeventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteeventFailed",
      payload: error.response.data.message,
    });
  }
};