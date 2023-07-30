import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";

const LastTransactionsList = ({ allTransactionsData }) => {
  const data = allTransactionsData.map((item) => ({
    id: item.id,
    transactionName: item.transaction_name,
    type: item.type,
    category: item.category,
    amount: item.amount,
    date: item.date,
    userId: item.user_id,
  }));

  return (
    <table className={styles.lastTransactionsList}>
      <tbody>
        {data.map((item) => (
          <TransactionItem key={item.id} {...item} />
        ))}
      </tbody>
    </table>
  );
};

export default LastTransactionsList;
