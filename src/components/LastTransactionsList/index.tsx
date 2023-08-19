import UserDataProps from "../../models/UsersData";
import TransactionItem from "../../store/models/TransactionItem";
import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItemComponent from "../TransactionItemComponent";

import styles from "./index.module.css";

interface Props {
  allTransactionsData: TransactionItem[];
  isAdmin: boolean;
  usersData: UserDataProps[];
}

const LastTransactionsList: React.FC<Props> = ({
  allTransactionsData,
  isAdmin,
  usersData,
}) => {
  const content = allTransactionsData.map((item) => {
    if (isAdmin) {
      const username = usersData.find((user) => user.id === item.userId)!.name;
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
    <table className={styles.lastTransactionsList}>
      <tbody>{content}</tbody>
    </table>
  );
};

export default LastTransactionsList;
