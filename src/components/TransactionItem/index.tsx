import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import styles from "./index.module.css";
import TransactionItemProps from "../../models/TransactionItemProps";

const TransactionItem: React.FC<TransactionItemProps> = (props) => {
  const { id, transactionName, type, category, amount, date, reload} =
    props;

  const icon =
    type === "credit" ? (
      <BsArrowUpCircle className={styles.creditIcon} />
    ) : (
      <BsArrowDownCircle className={styles.debitIcon} />
    );

  const dateTime = new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const sign = type === "credit" ? "+" : "-";

  return (
    <tr className={styles.transactionItem}>
      <td className={styles.transactionName}>
        <div>
          {icon}
          {transactionName}
        </div>
      </td>
      <td>{category}</td>
      <td>{dateTime}</td>
      <td className={styles[type]}>
        {sign}${amount.toLocaleString()}
      </td>
      <td>
        <div className={styles.buttonsContainer}>
          <UpdateTransactionBtn {...props} />
          <DeleteTransactionButton id={id} reload={reload} isAdmin={false} />
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
