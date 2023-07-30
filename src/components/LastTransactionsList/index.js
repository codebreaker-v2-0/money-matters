import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";

const fetchedData = {
  transactions: [
    {
      id: 312,
      transaction_name: "Test",
      type: "credit",
      category: "transfer",
      amount: 100,
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

const LastTransactionsList = ({ creditDebitTransactionsData }) => (
  <table className={styles.lastTransactionsList}>
    <tbody>
      {data.map((item) => (
        <TransactionItem key={item.id} {...item} />
      ))}
    </tbody>
  </table>
);

export default LastTransactionsList;
