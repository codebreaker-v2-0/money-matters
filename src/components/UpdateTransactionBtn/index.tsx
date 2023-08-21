import { useState, useRef, useContext, useMemo } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../common-components/Modal";

import styles from "./index.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import TransactionModel from "../../store/models/TransactionModel";
import TransactionsContext from "../../context/TransactionsContext";
import UserContext from "../../context/UserContext";
import { observer } from "mobx-react";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

interface Props {
  transaction: TransactionModel;
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

  const [tempTransaction] = useState(
    () => new TransactionModel({ ...transaction })
  );

  const onUpdateTransaction: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId || "",
      },
      body: tempTransaction.stringify,
    };

    await fetch(url, options);

    transactionsStore.updateTransaction(tempTransaction);

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
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.transactionName = e.target.value;
              }}
              type="text"
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Transaction Type</label>
            <select
              value={tempTransaction.type}
              onChange={(e) => {
                tempTransaction.type =
                  e.target.value === "credit" ? "credit" : "debit";
              }}
            >
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label>Category</label>
            <select
              value={tempTransaction.category}
              onChange={(e) => {
                tempTransaction.category = e.target.value;
              }}
            >
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
              type="number"
              value={tempTransaction.amount}
              onChange={(e) =>
                (tempTransaction.amount = parseInt(e.target.value))
              }
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Date</label>
            <input
              type="date"
              value={tempTransaction.date.slice(0, 10)}
              onChange={(e) =>
                (tempTransaction.date = new Date(e.target.value).toISOString())
              }
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

export default observer(UpdateTransactionBtn);
