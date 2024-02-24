import { Routes, Route } from "react-router-dom";
import Dashboard from "./component/dashboard/dashboard";
import Homepage from "./component/homepage/homepage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Homepage/>}/>
        <Route path="/dashboard/*" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
