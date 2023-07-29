import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";

import styles from "./Home.module.css";
import BtnPrimary from "../../utilities/BtnPrimary";
import SummaryCard from "../SummaryCard";
import LastTransactionsList from "../LastTransactionsList";

const Home = () => {
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

        <div className={styles.content}>
          {/* Summary Cards Container */}
          <div className={styles.summaryCardsContainer}>
            <SummaryCard value={12750} type="credit" />
            <SummaryCard value={5600} type="debit" />
          </div>

          {/* Last Transaction */}
          <h3>Last Transaction</h3>
          <LastTransactionsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
