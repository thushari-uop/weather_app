import "./App.css";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/dash-board" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
export default App;
