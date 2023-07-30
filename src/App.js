import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.js";
import Login from "./components/Login";
import Transactions from "./components/Transactions";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
