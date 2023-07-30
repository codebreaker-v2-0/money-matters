import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import styles from "./index.module.css";

const TransactionItem = (props) => {
  const { id, transactionName, type, category, amount, date, reload, isAdmin } =
    props;

  const icon =
    type === "credit" ? (
      <BsArrowUpCircle className={styles.icon} />
    ) : (
      <BsArrowDownCircle className={styles.icon} />
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
          <DeleteTransactionButton id={id} reload={reload} isAdmin={isAdmin} />
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
