import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import styles from "./index.module.css";

interface Props {
  id: number,
  transactionName: string,
  type: string,
  category: string,
  amount: number,
  date: string,
  reload: () => void,
  username: string,
}

const AdminTransactionItem: React.FC<Props> = (props) => {
  const {
    id,
    transactionName,
    type,
    category,
    amount,
    date,
    reload,
    username,
  } = props;

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
          {username}
        </div>
      </td>
      <td>{transactionName}</td>
      <td>{category}</td>
      <td>{dateTime}</td>
      <td className={styles[type]}>
        {sign}${amount.toLocaleString()}
      </td>
      <td>
        <div className={styles.buttonsContainer}>
          <UpdateTransactionBtn {...props} />
          <DeleteTransactionButton id={id} reload={reload} isAdmin={true} />
        </div>
      </td>
    </tr>
  );
};

export default AdminTransactionItem;
