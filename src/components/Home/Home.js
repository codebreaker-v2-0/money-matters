import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";
import BtnPrimary from "../../utilities/BtnPrimary";
import SummaryCard from "../SummaryCard";
import LastTransactionsList from "../LastTransactionsList";
import OverviewChart from "../OverviewChart";

import styles from "./Home.module.css";
import apiStatusContants from "../../constants/api-status-constants";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";

let totalCredit = 0;
let totalDebit = 0;
let creditDebitTotalsData = [];
let initialOptions = {
  method: "GET",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret":
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
  },
};

const Home = () => {
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    totalCredit = 0;
    totalDebit = 0;

    const url =
      "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

    const options = {
      ...initialOptions,
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    };

    const response = await fetch(url, options);

    const fetchedData = await response.json();
    creditDebitTotalsData = fetchedData["totals_credit_debit_transactions"];

    creditDebitTotalsData.forEach((item) => {
      if (item.type === "credit") totalCredit += item.sum;
      else totalDebit += item.sum;
    });

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
            <LastTransactionsList />

            {/* Debit & Credit Overview */}
            <h3>Debit & Credit Overview</h3>
            <OverviewChart />
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
