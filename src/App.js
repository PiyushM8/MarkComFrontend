import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
import Homepage from "./component/homepage/homepage";
import CustomerPage from "./component/customerDashboard/customerDashboard";
import ProductPage from "./component/storefront/products/productPage";
import { useEffect, useState } from "react";
import StoreFront from "./component/storefront/storefront";
import NotFound from "./component/errors/404";
import InternalServerError from "./component/errors/500";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";


function App() {
  const [ storeName, setStoreName ] = useState()

  useEffect(() => {
    let path = window.location.pathname.split("/")[1]

    if(!path.includes('dashboard') && 
       !path.includes("customer") && 
       !path.includes("query") &&
       path !== "login" && 
       path !== "register" &&
       path !== '404' &&
       path !== '500')
    {
      setStoreName(path)
    }
  })

  return (
    <div>
      <Routes>
        <Route path="*" element={<Homepage/>}/>
        <Route path={`/${storeName}/*`} element = {<StoreFront storeName={storeName}/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        <Route path="/customer/*" element={<CustomerPage/>}/>
        <Route path="/product/*" element={<ProductPage/>}/>
        <Route path="/404" element={<NotFound/>}/>
        <Route path="/500" element={<InternalServerError/>}/>
      </Routes>
      <Register/>
      <Login/>
    </div>
  );
}

export default App;
