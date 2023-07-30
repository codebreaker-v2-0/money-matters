import { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";
import BtnPrimary from "../../utilities/BtnPrimary";
import TransactionsList from "../TransactionsList";

import tabOptions from "../../constants/tab-options";
import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./index.module.css";
import Cookies from "js-cookie";

let allTransactionsData = [];
let userId = null;

const Transactions = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [currentTab, setCurrentTab] = useState("all-transactions");

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    userId = Cookies.get("user_id");

    // Fetching Credit Debit Totals
    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
    const options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": userId === "3" ? "admin" : "user",
        "x-hasura-user-id": userId.toString(),
      },
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();
    allTransactionsData = fetchedData["transactions"].sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });

    setApiStatus(apiStatusContants.success);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.transactions}>
        <div className={styles.header}>
          <div>
            <h3>Transactions</h3>
            <BtnPrimary>
              <BsPlus />
              Add Transaction
            </BtnPrimary>
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

        <div className={styles.content}>
          {/* Last Transaction */}
          <TransactionsList
            allTransactionsData={allTransactionsData}
            currentTab={currentTab}
            reload={fetchData}
            isAdmin={userId === "3"}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
