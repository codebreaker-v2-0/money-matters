import { BsArrowDownCircle, BsArrowUpCircle, BsTrash } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";

import styles from "./index.module.css";

const fetchedData = {
  transactions: [
    {
      id: 312,
      transaction_name: "Test",
      type: "credit",
      category: "transfer",
      amount: 100,
      date: "2023-06-28T10:00:15+00:00",
      user_id: 1,
    },
    {
      id: 266,
      transaction_name: "Rajesh",
      type: "debit",
      category: "Shopping",
      amount: 543,
      date: "2023-07-22T00:00:00+00:00",
      user_id: 1,
    },
  ],
};

const data = fetchedData.transactions.map((item) => ({
  id: item.id,
  transactionName: item.transaction_name,
  type: item.type,
  category: item.category,
  amount: item.amount,
  date: item.date,
  userId: item.user_id,
}));

const LastTransactionsList = () => (
  <ul className={styles.lastTransactionsList}>
    {data.map((item) => {
      const { id, transactionName, type, category, amount, date, userId } =
        item;

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

      return (
        <li>
          <span className={styles.transactionName}>
            {icon}
            {transactionName}
          </span>
          <span>{category}</span>
          <span>{dateTime}</span>
          <span>{amount}</span>
          <span className={styles.buttonsContainer}>
            <button type="button">
              <BiPencil className={styles.icon} />
            </button>
            <button type="button">
              <BsTrash className={styles.icon} />
            </button>
          </span>
        </li>
      );
    })}
  </ul>
);

export default LastTransactionsList;
