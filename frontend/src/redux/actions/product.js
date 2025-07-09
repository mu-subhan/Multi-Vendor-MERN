import axios from "axios"
import { server } from "../../server"

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// create product 
export const createProduct = (newForm) => async (dispatch) =>{
    try {
        dispatch({
            type:"productCreateRequest",
        })
        const config = {
            headers: {"Content-Type":"multipart/form-data"},
            withCredentials: true
        }
        const {data}= await axios.post(`${server}/product/create-product`,
            newForm,
            config
        )
        dispatch({
            type:"productCreateSuccess",
            payload:data.product,
        })
    } catch (error) {
        dispatch({
        type:"productCreateFail",
        payload: error.response?.data?.message || "Failed to create product",
   })
    }
};

// get all products of shop
export const getAllProductsShop = (id) => async (dispatch) =>{
    try {
        dispatch({
            type:"getAllProductsShopRequest",
        });

        console.log("Making API call to fetch products for shop:", id);
        const {data} = await axios.get(`${server}/product/get-all-products-shop/${id}`)

        if (data.success) {
            dispatch({
                type:"getAllProductsShopSuccess",
                payload: data.products,
            })
        } else {
            dispatch({
                type:"getAllProductsShopFailed",
                payload: "Failed to fetch products",
            });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        dispatch({
            type:"getAllProductsShopFailed",
            payload: error.response?.data?.message || "Failed to fetch products",
        });
    }
}

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};