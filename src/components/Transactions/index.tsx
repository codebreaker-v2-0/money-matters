import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import SideBar from "../SideBar/SideBar";
import TransactionsList from "../TransactionsList";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import AddTransactionBtn from "../AddTransactionBtn";

import tabOptions from "../../constants/tab-options";
import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";
import UserDataProps from "../../models/UsersData";
import TransactionItemProps from "../../models/TransactionItemProps";

import styles from "./index.module.css";

let allTransactionsData: TransactionItemProps[];
let userId: string | undefined;
let isAdmin = false;
let usersData: UserDataProps[];

const Transactions = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [currentTab, setCurrentTab] = useState("all-transactions");

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    userId = Cookies.get("user_id");
    isAdmin = userId === "3";

    // Fetching Credit Debit Totals
    let url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": isAdmin ? "admin" : "user",
        "x-hasura-user-id": userId || "",
      },
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    allTransactionsData = fetchedData["transactions"].map((item: any) => ({
      id: item.id,
      transactionName: item.transaction_name,
      type: item.type,
      category: item.category,
      amount: item.amount,
      date: item.date,
      userId: item.user_id,
    }));
    allTransactionsData = allTransactionsData.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    // Fetching All Users Data if Admin
    if (isAdmin) {
      url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
      options = {
        method: "GET",
        headers: {
          ...apiInitialOptions,
          "x-hasura-role": "admin",
          "x-hasura-user-id": "3",
        },
      };

      response = await fetch(url, options);
      fetchedData = await response.json();
      usersData = fetchedData.users.map((item: any) => ({
        name: item.name,
        id: item.id,
      }));
    }

    setApiStatus(apiStatusContants.success);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    if (Cookies.get("user_id")) {
      fetchData();
    }
  }, []);

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatus) {
      // Failure View
      case apiStatusContants.failure:
        return <FailureView fetchData={fetchData} />;

      case apiStatusContants.success:
        // Success View
        return (
          <div className={styles.content}>
            {/* Last Transaction */}
            <TransactionsList
              allTransactionsData={allTransactionsData}
              currentTab={currentTab}
              reload={fetchData}
              isAdmin={isAdmin}
              usersData={usersData}
            />
          </div>
        );

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  const render = () => (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.transactions}>
        <div className={styles.header}>
          <div>
            <h3>Transactions</h3>
            <AddTransactionBtn reload={fetchData} />
          </div>
          <ul className={styles.tabsList}>
            {tabOptions.map((item) => (
              <button
                key={item.value}
                type="button"
                className={currentTab === item.value ? styles.active : ""}
                onClick={() => setCurrentTab(item.value)}
              >
                {item.name}
              </button>
            ))}
          </ul>
        </div>
        {renderContent()}
      </div>
    </div>
  );

  return Cookies.get("user_id") ? render() : <Navigate replace to="/login" />;
};

export default Transactions;
