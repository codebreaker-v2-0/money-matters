import { useState } from "react";
import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";
import BtnPrimary from "../../utilities/BtnPrimary";
import TransactionsList from "../TransactionsList";

import styles from "./index.module.css";
import { useMatch } from "react-router-dom";

const tabOptions = [
  {
    name: "All Transactions",
    value: "all-transactions",
  },
  {
    name: "Debit",
    value: "debit",
  },
  {
    name: "Credit",
    value: "credit",
  },
];

const Transactions = () => {
  const [currentTab, setCurrentTab] = useState("all-transactions");

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
          <TransactionsList currentTab={currentTab} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
