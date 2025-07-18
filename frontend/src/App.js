import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductPage,
  BestSellingPage,
  EventPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import {ShopHomePage} from "./ShopRoutes"
import {ShopDashboardPage,ShopCreateProduct,ShopAllProducts,ShopCreateEvent,ShopAllEvent,ShopAllCoupouns,ShopAllOrders,ShopOrderDetails} from "./routes/ShopRoutes"
import axios from "axios";
import { server } from "./server.js";

function App() {
  const [stripeApikey,setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey)
    
  }
   
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);
 
  return (
   
        <BrowserRouter>
         {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
                        <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
            <Route path="/products" element={<ProductPage />} />
            <Route path="product/:id" element ={<ProductDetailsPage/>}/>
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
              } />
            <Route path="/order/success/" element={<OrderSuccessPage/>}/>
            <Route path="/profile" element={
              <ProtectedRoute >
                <ProfilePage/>
              </ProtectedRoute>
            }/>
            {/* Shop Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
           
           <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage/>
            </SellerProtectedRoute>
          }
        />

          <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct/>
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders/>
            </SellerProtectedRoute>
          }
        />
   
 <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/user/order/:id"
          element={
            <SellerProtectedRoute>
              <OrderDetailsPage />
            </SellerProtectedRoute>
          }
        />

                 <Route
          path="/user/track/order/:id"
          element={
            <SellerProtectedRoute>
              <TrackOrderPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts/>
            </SellerProtectedRoute>
          }
        />

                  <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <ShopCreateEvent/>
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <ShopAllEvent/>
            </SellerProtectedRoute>
          }
        />

         <Route
          path="/dashboard-coupouns"
          element={
            <SellerProtectedRoute>
              <ShopAllCoupouns/>
            </SellerProtectedRoute>
          }
        />


          
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
     
  );
}
export default App;
