import { useState, useRef } from "react";
import { BsPlus } from "react-icons/bs";

import BtnPrimary from "../../utilities/BtnPrimary";

import styles from "./index.module.css";
import Modal from "../../utilities/Modal";
import apiInitialOptions from "../../constants/api-initial-options";

const url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

const UpdateTransactionBtn = ({ reload }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const transactionNameRef = useRef();
  const transactionTypeRef = useRef();
  const categoryRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();

  const onAddTransaction = async (e) => {
    e.preventDefault();

    const transactionDetails = {
      name: transactionNameRef.current.value,
      type: transactionTypeRef.current.value,
      category: categoryRef.current.value,
      amount: +amountRef.current.value,
      date: new Date(dateRef.current.value).toISOString(),
      user_id: 4,
    };

    console.log(transactionDetails);

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": "4",
      },
      body: JSON.stringify(transactionDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    hideModal();
    reload();
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
            <select ref={transactionTypeRef} type="text">
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label>Category</label>
            <select ref={categoryRef} type="text">
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

export default UpdateTransactionBtn;