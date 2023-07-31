import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.js";
import Login from "./components/Login";
import Transactions from "./components/Transactions";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
