import TransactionItemProps from "../../models/TransactionItemProps";
import UserDataProps from "../../models/UsersData";
import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItem from "../TransactionItem";

import styles from "./index.module.css";

interface Props {
  allTransactionsData: TransactionItemProps[],
  reload: () => void,
  isAdmin: boolean,
  usersData: UserDataProps[],
}

const LastTransactionsList: React.FC<Props> = ({
  allTransactionsData,
  reload,
  isAdmin,
  usersData,
}) => {

  const content = allTransactionsData.map((item) => {
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
    <table className={styles.lastTransactionsList}>
      <tbody>{content}</tbody>
    </table>
  );
};

export default LastTransactionsList;
