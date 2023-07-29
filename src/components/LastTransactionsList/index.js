import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";

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

      return (
        <li>
          <span className={styles.transactionName}>
            {icon}
            {transactionName}
          </span>
          <span>{category}</span>
          <span>{date}</span>
          <span>{amount}</span>
          <span className={styles.buttonsContainer}>
            <button type="button">Edit</button>
            <button type="button">Del</button>
          </span>
        </li>
      );
    })}
  </ul>
);

export default LastTransactionsList;
