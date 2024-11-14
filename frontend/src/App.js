import React, { useEffect } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {LoginPage,SignupPage,ActivationPage} from './Routes.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { server } from "./server.js";


function App(){
  useEffect(() => {
    axios.get(`${server}/user/getuser`)
    .then((res) => {
      console.log(res.data);
      
    })
    .catch((err)=>{
      toast.error(err.response.data.message);
    });
  },[])
  
  return(
<BrowserRouter>
<Routes>
  <Route path="/login" element = {<LoginPage />}/>
  <Route path="/sign-up" element = {<SignupPage />} />
  <Route path="/activation/:activation_token" element = {<ActivationPage />} />

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
  )
}
export default App;