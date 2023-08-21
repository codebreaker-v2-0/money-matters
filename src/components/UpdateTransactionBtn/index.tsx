import { useState, useRef, useContext } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../common-components/Modal";

import styles from "./index.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import TransactionItem from "../../store/models/TransactionItem";
import TransactionsContext from "../../context/TransactionsContext";
import UserContext from "../../context/UserContext";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

interface Props {
  transaction: TransactionItem;
}

const UpdateTransactionBtn: React.FC<Props> = ({ transaction }) => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const transactionNameRef = useRef<HTMLInputElement>(null);
  const transactionTypeRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const onUpdateTransaction: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const updatedtransactionItem = new TransactionItem(
      transaction.id,
      transactionNameRef.current!.value,
      transactionTypeRef.current!.value,
      categoryRef.current!.value,
      parseInt(amountRef.current!.value),
      new Date(dateRef.current!.value).toISOString(),
      transaction.userId
    );

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId || "",
      },
      body: updatedtransactionItem.stringify,
    };

    await fetch(url, options);

    transactionsStore.updateTransaction(updatedtransactionItem);

    hideModal();
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <form className={styles.modalContent} onSubmit={onUpdateTransaction}>
        <h3>Update Transaction</h3>
        <ul>
          <li className={styles.formControl}>
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              id="transactionName"
              ref={transactionNameRef}
              type="text"
              defaultValue={transaction.transactionName}
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Transaction Type</label>
            <select ref={transactionTypeRef} defaultValue={transaction.type}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label>Category</label>
            <select ref={categoryRef} defaultValue={transaction.category}>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Service">Service</option>
              <option value="Transfer">Transfer</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              ref={amountRef}
              type="number"
              defaultValue={transaction.amount}
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Date</label>
            <input
              ref={dateRef}
              type="date"
              defaultValue={transaction.date.slice(0, 10)}
              required
            />
          </li>
        </ul>

        <button className={styles.button} type="submit">
          Update Transaction
        </button>
      </form>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <button type="button" className={styles.editBtn} onClick={showModal}>
        <BiPencil className={styles.icon} />
      </button>
    </>
  );
};

export default UpdateTransactionBtn;
