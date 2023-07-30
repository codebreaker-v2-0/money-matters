import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.js";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import Cookies from "js-cookie";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={Cookies.get("user_id") ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/transactions"
        element={
          Cookies.get("user_id") ? <Transactions /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/profile"
        element={
          Cookies.get("user_id") ? <Profile /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
}

export default App;
