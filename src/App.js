import { Routes, Route, Link } from "react-router-dom";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<div>d</div>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
