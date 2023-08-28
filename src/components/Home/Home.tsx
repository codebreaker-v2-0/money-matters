import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";

import SideBar from "../SideBar/SideBar";
import SummaryCard from "../SummaryCard";
import LastTransactionsList from "../LastTransactionsList";
import OverviewChart from "../OverviewChart";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import AddTransactionBtn from "../AddTransactionBtn";

import apiInitialOptions from "../../Common/constants/ApiInitialOptionsConstants";

import TransactionModel from "../../store/models/TransactionModel";
import UserProps from "../../types/UserProps";
import TransactionsContext from "../../context/TransactionsStoreContext";
import { useMachine } from "@xstate/react";
import apiStatusMachine from "../../machines/apiStatusMachine";
import UserStoreContext from "../../Common/context/UserStoreContext";

let creditDebitTotalsData: {
  type: "credit" | "debit";
  sum: number;
}[];

let allTransactionsData: TransactionModel[];

let usersData: UserProps[];

const Home: React.FC = () => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserStoreContext);
  // STATES
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);

  console.log(userStore.userIdValue);

  const machineConfig = {
    services: {
      fetchData: async () => {
        let url = userStore.isAdmin
          ? "https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin"
          : "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";

        let options = {
          method: "GET",
          headers: {
            ...apiInitialOptions,
            "x-hasura-role": userStore.isAdmin ? "admin" : "user",
            "x-hasura-user-id": userStore.userIdValue || "",
          },
        };
        let response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Fetching Failed");
        }

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

        if (!response.ok) {
          throw new Error("Fetching Failed");
        }
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
        return "Fetching Successful";
      },
    },
  };

  const [apiStatusState, send] = useMachine(apiStatusMachine, machineConfig);

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatusState.value) {
      // Failure View
      case "failed":
        return (
          <FailureView
            fetchData={() => {
              send("RETRY");
            }}
          />
        );

      case "successful":
        // Success View
        return (
          <div className="flex flex-col gap-4 pt-4 px-4 pb-4 sm:px-8 sm:py-4 overflow-y-auto">
            {/* Summary Cards Container */}
            <div className="flex flex-col md:flex-row gap-4">
              <SummaryCard value={totalCredit} type="credit" />
              <SummaryCard value={totalDebit} type="debit" />
            </div>

            {/* Last Transaction */}
            <h3 className="text-lg text-[#333b69] font-medium">
              Last Transactions
            </h3>
            <LastTransactionsList
              allTransactionsData={transactionsStore.allTransactionsData}
              isAdmin={userStore.isAdmin}
              usersData={usersData}
            />

            {/* Debit & Credit Overview */}
            <h3 className="text-lg text-[#333b69] font-medium">
              Debit & Credit Overview
            </h3>
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
    <div className="sm:flex bg-[#f5f7fa]">
      <SideBar />

      <div className="flex-1">
        <div className="flex justify-between items-center p-4 md:py-4 md:px-6 text-xl bg-white text-[#343c6a] shadow-sm">
          <h3>Accounts</h3>
          <AddTransactionBtn />
        </div>

        {renderContent()}
      </div>
    </div>
  );

  return userStore.userIdValue ? (
    renderComponent()
  ) : (
    <Navigate replace to="/login" />
  );
};

export default observer(Home);
