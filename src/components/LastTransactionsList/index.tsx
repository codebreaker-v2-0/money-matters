import { observer } from "mobx-react";

import AdminTransactionItem from "../AdminTransactionItem";
import TransactionItemComponent from "../TransactionItemComponent";

import styles from "./index.module.css";
import TransactionModel from "../../store/models/TransactionModel";
import UserItem from "../../types/UserProps";

interface Props {
  allTransactionsData: TransactionModel[];
  isAdmin: boolean;
  usersData: UserItem[];
}

const LastTransactionsList: React.FC<Props> = ({
  allTransactionsData,
  isAdmin,
  usersData,
}) => {
  const lastThreeTransactions = allTransactionsData
    .slice()
    .sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    })
    .slice(0, 3);

  const content = lastThreeTransactions.map((item) => {
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
    <table className={styles.lastTransactionsList}>
      <tbody>{content}</tbody>
    </table>
  );
};

export default observer(LastTransactionsList);
