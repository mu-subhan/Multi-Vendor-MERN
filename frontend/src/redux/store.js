import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import {sellerReducer} from "./reducers/seller"
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { couponReducer } from "./reducers/coupon";

const Store = configureStore({
    reducer:{
   user: userReducer,
   seller: sellerReducer,
   products: productReducer,
   events: eventReducer,
   coupons: couponReducer,

    }
});
export default Store;