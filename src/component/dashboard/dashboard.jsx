import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./dashboard.css";
import ProductList from "./products/productList";
import Queries from "./queries/queries";
import DashboardInvoicePage from "./invoices/dashboardInvoicePage";
import DashboardFeedbackPage from "./Feedback/dashboardFeedbackPage";
import DashboardCouponPage from "./coupons/dashboardCouponPage";
import DashboardPaymentMethod from "./payment/dashboardPaymentMethod";
import DashboardCategoriesPage from "./categories/dashboardCatergoriesPage";
import { showLogin } from "../../utils/loginregister";

function Dashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    const jwtToken = window.sessionStorage.getItem("Authorization");
    const user = JSON.parse(window.sessionStorage.getItem("UserDetails"));

    if (!jwtToken) {
      navigate("/")
      showLogin();
    } else {
      if (user.AccountType === "Customer") {
        navigate("/customer");
      }
    }
  }, []);

  const signout = () => {
    window.sessionStorage.removeItem("Authorization");
    window.sessionStorage.removeItem("UserDetails");
    navigate("/");
  };

  const viewStorefront = () => {
    const user = JSON.parse(window.sessionStorage.getItem("UserDetails"));
    console.log(user)
    navigate(`/${user.Username}`);
    window.location.reload();
  };

  return (
    <div className="dashboard-cont">
      <div className="dashboard-top-cont">
        <div className="column-one"><strong>MarCom</strong></div>
        <div className="column-two"></div>
        <div className="column-three">
          <div className="button-container"> {/* Align buttons */}
            <button className="signout-btn" onClick={signout}>
              Sign Out
            </button>
            <button className="view-storefront-btn" onClick={viewStorefront}>
              View Storefront
            </button>
          </div>
        </div>
      </div>
      <div className="dashboard-main-cont">
        <div className="column-one dashboard-nav">
          <Link to={"/dashboard/products"} className="db-n-item">
            Products
          </Link>
          <Link to={"/dashboard/orders"} className="db-n-item">
            Orders
          </Link>
          <Link to={"/dashboard/messages"} className="db-n-item">
            Messages
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
            <Route path="/orders" element={<DashboardInvoicePage />} />
            <Route path="/messages/*" element={<Queries />} />
            <Route path="/payments" element={<DashboardPaymentMethod />} />
            <Route
              path="/categories"
              element={<DashboardCategoriesPage />}
            />
            <Route path="/coupons" element={<DashboardCouponPage />} />
            <Route path="/feedback" element={<DashboardFeedbackPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
