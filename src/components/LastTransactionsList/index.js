import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItem from "../TransactionItem";

import styles from "./index.module.css";

const LastTransactionsList = ({
  allTransactionsData,
  reload,
  isAdmin,
  usersData,
}) => {
  const data = allTransactionsData.map((item) => ({
    id: item.id,
    transactionName: item.transaction_name,
    type: item.type,
    category: item.category,
    amount: item.amount,
    date: item.date,
    userId: item.user_id,
  }));

  const content = data.map((item) => {
    if (isAdmin) {
      const username = usersData.find((user) => user.id === item.userId).name;
      return (
        <AdminTransactionItem
          key={item.id}
          {...item}
          reload={reload}
          username={username}
        />
      );
    } else {
      return <TransactionItem key={item.id} {...item} reload={reload} />;
    }
  });

  return (
    <table className={styles.lastTransactionsList}>
      <tbody>{content}</tbody>
    </table>
  );
};

export default LastTransactionsList;
