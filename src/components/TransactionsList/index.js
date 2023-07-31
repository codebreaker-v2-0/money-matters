import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";
import AdminTransactionItem from "../AdminTransactionItem";

const TransactionsList = ({
  currentTab,
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

  let filteredData = [];

  if (currentTab === "all-transactions") {
    filteredData = [...data];
  } else {
    filteredData = data.filter((item) => item.type === currentTab);
  }

  const content = filteredData.map((item) => {
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
    <table className={styles.transactionsList}>
      <thead className={styles.tableHeader}>
        <tr>
          {isAdmin && <th>User Name</th>}
          <th>Transaction Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th />
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default TransactionsList;
