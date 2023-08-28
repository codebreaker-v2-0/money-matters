import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Transactions from "./components/Transactions/index";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/index";

import "./App.css";
import { UserStoreProvider } from "./Common/context/UserStoreContext";
import { TransactionsProvider } from "./context/TransactionsStoreContext";
import LoginPage from "./Authentication/components/LoginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
    <UserStoreProvider>
      <TransactionsProvider>
        <RouterProvider router={router} />;
      </TransactionsProvider>
    </UserStoreProvider>
  );
};

export default App;
