import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
import Homepage from "./component/homepage/homepage";
import CustomerPage from "./component/customer/customerPage";
import { useEffect, useState } from "react";
import StoreFront from "./component/storefront/storefront";
import CustomerInvoicePage from "./component/storefront/customerInvoicePage/customerInvoicePage";


function App() {
  const [ storeName, setStoreName ] = useState()

  useEffect(() => {
    let path = window.location.pathname.split("/")[1]
    console.log(path)
    if(!path.includes('dashboard') && !path.includes("customer") && !path.includes("query") &&
       path !== "login" && path !== "register")
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
      </Routes>
    </div>
  );
}

export default App;
