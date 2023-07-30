import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";

const TransactionsList = ({ currentTab, allTransactionsData, reload }) => {
  const data = allTransactionsData.map((item) => ({
    id: item.id,
    transactionName: item.transaction_name,
    type: item.type,
    category: item.category,
    amount: item.amount,
    date: item.date,
    userId: item.user_id,
  }));

  let filteredData = [];

  if (currentTab === "all-transactions") {
    filteredData = [...data];
  } else {
    filteredData = data.filter((item) => item.type === currentTab);
  }

  return (
    <table className={styles.transactionsList}>
      <thead className={styles.tableHeader}>
        <tr>
          <th>Transaction Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => (
          <TransactionItem key={item.id} {...item} reload={reload} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;
