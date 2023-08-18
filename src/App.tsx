import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Transactions from "./components/Transactions/index";
import Login from './components/Login/index';
import Home from './components/Home/Home';
import Profile from "./components/Profile/index";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
