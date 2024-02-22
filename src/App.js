import { Routes, Route, Link } from "react-router-dom";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Navbar from "./component/navbar/Navbar"

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="*" element={<div>d</div>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Link to={"/register"}>
        <div>fdsfd</div>
      </Link>

    </div>
  );
}

export default App;
