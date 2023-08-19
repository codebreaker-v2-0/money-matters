import styles from "./index.module.css";
import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItemComponent from "../TransactionItemComponent";
import TransactionItem from "../../store/models/TransactionItem";
import UserDetails from "../../store/models/UserDetails";
import { observer } from "mobx-react";

interface Props {
  currentTab: string;
  allTransactionsData: TransactionItem[];
  isAdmin: boolean;
  usersData: UserDetails[];
}

const TransactionsList: React.FC<Props> = ({
  currentTab,
  allTransactionsData,
  isAdmin,
  usersData,
}) => {
  let filteredData: TransactionItem[];

  if (currentTab === "all-transactions") {
    filteredData = [...allTransactionsData];
  } else {
    filteredData = allTransactionsData.filter(
      (item) => item.type === currentTab
    );
  }

  const content = filteredData.map((item) => {
    if (isAdmin) {
      const username = usersData.find(
        (user) => user.userId === item.userId.toString()
      )!.userData.name;
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
