import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./dashboard.css";
import ProductList from "./products/productList";
import { useEffect } from "react";
import Queries from "./queries/queries";

function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    const jwtToken = window.sessionStorage.getItem("Authorization");
    if (!jwtToken) {
      navigate("/login");
    }
  }, []);

  const signout = () => {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("UserDetails");
    navigate("/");
  };

  return (
    <div className="dashboard-cont">
      <div className="dashboard-top-cont">
        <div className="column-one">f</div>
        <div className="column-two">f</div>
        <div className="column-three">f</div>
        <button className="signout-btn" onClick={signout}>
          Sign Out
        </button>
      </div>
      <div className="dashboard-main-cont">
        <div className="column-one dashboard-nav">
          <Link to={"/dashboard/products"} className="db-n-item">
            Products
          </Link>
          <Link to={"/dashboard/invoices"} className="db-n-item">
            Invoices
          </Link>
          <Link to={"/dashboard/queries"} className="db-n-item">
            Queries
          </Link>
          <Link to={"/dashboard/payments"} className="db-n-item">
            Payment Methods
          </Link>
          <Link to={"/dashboard/categories"} className="db-n-item">
            Categories
          </Link>
          <Link to={"/dashboard/coupons"} className="db-n-item">
            Coupons
          </Link>
          <Link to={"/dashboard/feedback"} className="db-n-item">
            Feedback
          </Link>
        </div>
        <div className="column-two dashboard-page-cont">
          <Routes>
            <Route path="/products/*" element={<ProductList />} />
            <Route path="/invoices" element={<ProductList />} />
            <Route path="/queries/*" element={<Queries />} />
            <Route path="/payments" element={<ProductList />} />
            <Route path="/categories" element={<ProductList />} />
            <Route path="/coupons" element={<ProductList />} />
            <Route path="/feedback" element={<ProductList />} />
          </Routes>
        </div>
        <div className="column-three"></div>
      </div>
      <div className="dashboard-bottom-cont">
        <div className="column-one">
          {}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
