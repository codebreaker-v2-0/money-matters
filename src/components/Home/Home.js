import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";
import BtnPrimary from "../../utilities/BtnPrimary";
import SummaryCard from "../SummaryCard";
import LastTransactionsList from "../LastTransactionsList";
import OverviewChart from "../OverviewChart";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";

import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./Home.module.css";

let creditDebitTotalsData = [];
let allTransactionsData = [];
let lastSevenDaysData = [];

const Home = () => {
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    // Fetching Credit Debit Totals
    let url =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
    let options = {
      ...apiInitialOptions,
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    };
    let response = await fetch(url, options);
    let fetchedData = await response.json();
    creditDebitTotalsData = fetchedData["totals_credit_debit_transactions"];

    let credit = 0;
    let debit = 0;
    creditDebitTotalsData.forEach((item) => {
      if (item.type === "credit") credit += item.sum;
      else debit += item.sum;
    });

    setTotalCredit(credit);
    setTotalDebit(debit);

    // Fetching All Transactions
    // url = "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
    // response = await fetch(url, options);
    // fetchedData = await response.json();
    // allTransactionsData = fetchedData["transactions"];

    // Fetching Last 7 days Transactions
    url =
      "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";
    response = await fetch(url, options);
    fetchedData = await response.json();
    lastSevenDaysData =
      fetchedData["last_7_days_transactions_credit_debit_totals"];

    setApiStatus(apiStatusContants.success);
    console.log(creditDebitTotalsData);
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
              creditDebitTotalsData={creditDebitTotalsData}
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
          <BtnPrimary>
            <BsPlus />
            Add Transaction
          </BtnPrimary>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
