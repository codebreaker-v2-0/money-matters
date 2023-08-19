import styles from "./index.module.css";
import TransactionItem from "../TransactionItem";
import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItemProps from "../../models/TransactionItemProps";
import UserDataProps from "../../models/UsersData";

interface Props {
  currentTab: string,
  allTransactionsData: TransactionItemProps[],
  reload: () => void,
  isAdmin: boolean,
  usersData: UserDataProps[],
}

const TransactionsList: React.FC<Props> = ({
  currentTab,
  allTransactionsData,
  reload,
  isAdmin,
  usersData,
}) => {

  let filteredData = [];

  if (currentTab === "all-transactions") {
    filteredData = [...allTransactionsData];
  } else {
    filteredData = allTransactionsData.filter((item) => item.type === currentTab);
  }

  const content = filteredData.map((item) => {
    if (isAdmin) {
      const username = usersData.find((user) => user.id === item.userId)!.name;
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
