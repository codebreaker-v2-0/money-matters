import { useState, useRef, FormEvent, useContext } from "react";
import { BsPlus } from "react-icons/bs";

import BtnPrimary from "../../utilities/BtnPrimary";
import Modal from "../../utilities/Modal";

import styles from "./index.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import StoreContext from "../../context/StoreContext";
import TransactionItem from "../../store/models/TransactionItem";

const url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

const AddTransactionBtn: React.FC = () => {
  const { userStore, transactionsStore } = useContext(StoreContext);

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

  const onAddTransaction = async (e: FormEvent) => {
    e.preventDefault();

    const transactionDetails = {
      name: transactionNameRef.current!.value,
      type: transactionTypeRef.current!.value,
      category: categoryRef.current!.value,
      amount: parseInt(amountRef.current!.value),
      date: new Date(dateRef.current!.value).toISOString(),
      user_id: userStore.userId,
    };

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId,
      },
      body: JSON.stringify(transactionDetails),
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();

    const newTransactionData = fetchedData["insert_transactions_one"];

    transactionsStore.addTransaction(
      new TransactionItem(
        newTransactionData.id,
        newTransactionData["transaction_name"],
        newTransactionData.type,
        newTransactionData.category,
        newTransactionData.amount,
        newTransactionData.date,
        parseInt(userStore.userId)
      )
    );

    hideModal();
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <form className={styles.modalContent} onSubmit={onAddTransaction}>
        <h3>Add Transaction</h3>
        <ul>
          <li className={styles.formControl}>
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              id="transactionName"
              ref={transactionNameRef}
              type="text"
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Transaction Type</label>
            <select ref={transactionTypeRef}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label>Category</label>
            <select ref={categoryRef}>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Service">Service</option>
              <option value="Transfer">Transfer</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label htmlFor="amount">Amount</label>
            <input id="amount" ref={amountRef} type="number" required />
          </li>

          <li className={styles.formControl}>
            <label>Date</label>
            <input ref={dateRef} type="date" required />
          </li>
        </ul>

        <button className={styles.button} type="submit">
          Add Transaction
        </button>
      </form>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <BtnPrimary onClick={showModal}>
        <BsPlus />
        Add Transaction
      </BtnPrimary>
    </>
  );
};

export default AddTransactionBtn;
