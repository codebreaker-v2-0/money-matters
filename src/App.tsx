import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Transactions from "./components/Transactions/index";
import Login from "./components/Login/index";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/index";

import "./App.css";
import { TransactionsProvider } from "./context/TransactionsStoreContext";
import { UserProvider } from "./context/UserStoreContext";
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
]);

const App = () => {
  return (
    <UserProvider>
      <TransactionsProvider>
        <RouterProvider router={router} />;
      </TransactionsProvider>
    </UserProvider>
  );
};

export default App;
