import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import styles from "./index.module.css";
import TransactionItem from "../../store/models/TransactionItem";
import { observer } from "mobx-react";

interface Props {
  transaction: TransactionItem;
}

const TransactionItemComponent: React.FC<Props> = ({ transaction }) => {
  const icon =
    transaction.type === "credit" ? (
      <BsArrowUpCircle className={styles.creditIcon} />
    ) : (
      <BsArrowDownCircle className={styles.debitIcon} />
    );

  const dateTime = new Date(transaction.date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const sign = transaction.type === "credit" ? "+" : "-";

  return (
    <tr className={styles.transactionItem}>
      <td className={styles.transactionName}>
        <div>
          {icon}
          {transaction.transactionName}
        </div>
      </td>
      <td>{transaction.category}</td>
      <td>{dateTime}</td>
      <td className={styles[transaction.type]}>
        {sign}${transaction.amount.toLocaleString()}
      </td>
      <td>
        <div className={styles.buttonsContainer}>
          <UpdateTransactionBtn transaction={transaction} />
          <DeleteTransactionButton id={transaction.id} />
        </div>
      </td>
    </tr>
  );
};

export default observer(TransactionItemComponent);
