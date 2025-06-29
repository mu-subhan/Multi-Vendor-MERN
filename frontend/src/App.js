import React, { useEffect } from "react";
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
  ShopLoginPage
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import SellerProtectedRoute from "./SellerProtectedRoute.js"
import {ShopHomePage} from "./ShopRoutes"

function App() {
  const { loading,isAuthenticated} = useSelector((state) => state.user);
  const {isLoading, isSeller} = useSelector((state) => state.seller);
  

  // isAuthentication
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  // console.log(isSeller,seller)
  return (
    <>
      {loading  || isLoading ? null : (
        <BrowserRouter>
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
            <Route path="product/:name" element ={<ProductDetailsPage/>}/>
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CheckoutPage />
              </ProtectedRoute>
              } />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/order/success/:id" element={<OrderSuccessPage/>}/>
            <Route path="/profile" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage/>
              </ProtectedRoute>
            }/>
            {/* Shop Routes */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            {/* <Route path="/shop/:id" element={<ShopHomePage/>}/> */}
           <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute
              isSeller={isSeller}>
              <ShopHomePage />
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
      )}
    </>
  );
}
export default App;
