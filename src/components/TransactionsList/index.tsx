import { observer } from "mobx-react";
import styles from "./index.module.css";
import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItemComponent from "../TransactionItemComponent";
import TransactionItem from "../../store/models/TransactionItem";
import UserItem from "../../store/models/UserItem";

interface Props {
  currentTab: string;
  allTransactionsData: TransactionItem[];
  isAdmin: boolean;
  usersData: UserItem[];
}

const TransactionsList: React.FC<Props> = ({
  currentTab,
  allTransactionsData,
  isAdmin,
  usersData,
}) => {
  let sortedAllTransactionsData = allTransactionsData.slice().sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
  let filteredData: TransactionItem[];

  if (currentTab === "all-transactions") {
    filteredData = [...sortedAllTransactionsData];
  } else {
    filteredData = sortedAllTransactionsData.filter(
      (item) => item.type === currentTab
    );
  }

  const content = filteredData.map((item) => {
    if (isAdmin) {
      const username = usersData.find(
        (user) => user.userId === item.userId
      )!.name;
      return (
        <AdminTransactionItem
          key={item.id}
          transaction={item}
          username={username}
        />
      );
    } else {
      return <TransactionItemComponent key={item.id} transaction={item} />;
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

export default observer(TransactionsList);
