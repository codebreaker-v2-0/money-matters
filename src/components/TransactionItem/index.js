import { BsArrowDownCircle, BsArrowUpCircle, BsTrash } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";

import styles from "./index.module.css";

const TransactionItem = (props) => {
  const { id, transactionName, type, category, amount, date, userId } = props;

  const icon =
    type === "credit" ? (
      <BsArrowUpCircle className={styles.icon} />
    ) : (
      <BsArrowDownCircle className={styles.icon} />
    );

  const dateTime = new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
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
          <button type="button" className={styles.editBtn}>
            <BiPencil className={styles.icon} />
          </button>
          <button type="button" className={styles.debit}>
            <BsTrash className={styles.icon} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionItem;
