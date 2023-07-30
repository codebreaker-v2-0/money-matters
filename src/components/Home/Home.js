import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import SideBar from "../SideBar/SideBar";
import SummaryCard from "../SummaryCard";
import LastTransactionsList from "../LastTransactionsList";
import OverviewChart from "../OverviewChart";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import AddTransactionBtn from "../AddTransactionBtn";

import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./Home.module.css";

let creditDebitTotalsData = [];
let allTransactionsData = [];
let lastSevenDaysData = [];
let userId = null;

const Home = () => {
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    userId = Cookies.get("user_id");

    // Fetching Credit Debit Totals
    let url =
      userId === "3"
        ? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
        : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": userId === "3" ? "admin" : "user",
        "x-hasura-user-id": userId.toString(),
      },
    };
    let response = await fetch(url, options);
    let fetchedData = await response.json();
    creditDebitTotalsData =
      fetchedData[
        userId === "3"
          ? "transaction_totals_admin"
          : "totals_credit_debit_transactions"
      ];

    let credit = 0;
    let debit = 0;
    creditDebitTotalsData.forEach((item) => {
      if (item.type === "credit") credit += item.sum;
      else debit += item.sum;
    });

    setTotalCredit(credit);
    setTotalDebit(debit);

    // Fetching All Transactions
    url =
      "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
    response = await fetch(url, options);
    fetchedData = await response.json();
    allTransactionsData = fetchedData["transactions"]
      .sort((a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      })
      .slice(0, 3);

    // Fetching Last 7 days Transactions
    url =
      userId === "3"
        ? "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-last-7-days-admin"
        : "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
    response = await fetch(url, options);
    fetchedData = await response.json();
    lastSevenDaysData =
      fetchedData[
        userId === "3"
          ? "last_7_days_transactions_totals_admin"
          : "last_7_days_transactions_credit_debit_totals"
      ];

    setApiStatus(apiStatusContants.success);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatus) {
      // Failure View
      case apiStatusContants.failure:
        return <FailureView />;

      case apiStatusContants.success:
        // Success View
        return (
          <div className={styles.content}>
            {/* Summary Cards Container */}
            <div className={styles.summaryCardsContainer}>
              <SummaryCard value={totalCredit} type="credit" />
              <SummaryCard value={totalDebit} type="debit" />
            </div>

            {/* Last Transaction */}
            <h3>Last Transaction</h3>
            <LastTransactionsList
              allTransactionsData={allTransactionsData}
              reload={fetchData}
            />

            {/* Debit & Credit Overview */}
            <h3>Debit & Credit Overview</h3>
            <OverviewChart lastSevenDaysData={lastSevenDaysData} />
          </div>
        );

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  return (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.home}>
        <div className={styles.header}>
          <h3>Accounts</h3>
          <AddTransactionBtn reload={fetchData} />
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
