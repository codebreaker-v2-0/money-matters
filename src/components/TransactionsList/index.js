import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";

const fetchedData = {
  transactions: [
    {
      id: 312,
      transaction_name: "Test",
      type: "credit",
      category: "transfer",
      amount: 15300,
      date: "2023-06-28T10:00:15+00:00",
      user_id: 1,
    },
    {
      id: 266,
      transaction_name: "Rajesh",
      type: "debit",
      category: "Shopping",
      amount: 543,
      date: "2023-07-22T00:00:00+00:00",
      user_id: 1,
    },
    {
      id: 313,
      transaction_name: "Test",
      type: "credit",
      category: "transfer",
      amount: 100,
      date: "2023-06-28T10:00:15+00:00",
      user_id: 1,
    },
    {
      id: 267,
      transaction_name: "Rajesh",
      type: "debit",
      category: "Shopping",
      amount: 543,
      date: "2023-07-22T00:00:00+00:00",
      user_id: 1,
    },
  ],
};

const data = fetchedData.transactions.map((item) => ({
  id: item.id,
  transactionName: item.transaction_name,
  type: item.type,
  category: item.category,
  amount: item.amount,
  date: item.date,
  userId: item.user_id,
}));

const TransactionsList = ({ currentTab }) => {
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
          <TransactionItem key={item.id} {...item} />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;
