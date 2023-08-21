import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";

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
import TransactionItem from "../../store/models/TransactionModel";
import UserProps from "../../types/UserProps";
import TransactionsContext from "../../context/TransactionsContext";
import UserContext from "../../context/UserContext";

let creditDebitTotalsData: {
  type: "credit" | "debit";
  sum: number;
}[];

let allTransactionsData: TransactionItem[];

let usersData: UserProps[];

const Home: React.FC = () => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserContext);
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    // Fetching Credit Debit Totals
    let url = userStore.isAdmin
      ? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
      : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": userStore.isAdmin ? "admin" : "user",
        "x-hasura-user-id": userStore.userId,
      },
    };
    let response = await fetch(url, options);
    let fetchedData = await response.json();
    creditDebitTotalsData =
      fetchedData[
        userStore.isAdmin
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
    allTransactionsData = fetchedData["transactions"].map((item: any) => ({
      id: item.id,
      transactionName: item.transaction_name,
      type: item.type,
      category: item.category,
      amount: item.amount,
      date: item.date,
      userId: item.user_id,
    }));

    // Fetching All Users Data if Admin
    if (userStore.isAdmin) {
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

    transactionsStore.setAllTransactionsData(allTransactionsData);

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
        return <FailureView fetchData={fetchData} />;

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
              allTransactionsData={transactionsStore.allTransactionsData}
              isAdmin={userStore.isAdmin}
              usersData={usersData}
            />

            {/* Debit & Credit Overview */}
            <h3>Debit & Credit Overview</h3>
            <OverviewChart
              allTransactionsData={transactionsStore.allTransactionsData}
            />
          </div>
        );

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  const renderComponent = () => (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.home}>
        <div className={styles.header}>
          <h3>Accounts</h3>
          <AddTransactionBtn />
        </div>

        {renderContent()}
      </div>
    </div>
  );

  return userStore.userId ? (
    renderComponent()
  ) : (
    <Navigate replace to="/login" />
  );
};

export default observer(Home);
