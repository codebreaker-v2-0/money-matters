import { useState, FormEvent, useContext } from "react";
import { BsPlus } from "react-icons/bs";

import BtnPrimary from "../../common-components/BtnPrimary";
import Modal from "../../common-components/Modal";

import styles from "./index.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import TransactionModel from "../../store/models/TransactionModel";
import TransactionsContext from "../../context/TransactionsStoreContext";
import UserContext from "../../context/UserStoreContext";
import TransactionModelProps from "../../types/TransactionModelProps";
import { observer } from "mobx-react";

const url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

const AddTransactionBtn: React.FC = () => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const [tempTransaction, setTempTransaction] = useState(
    () =>
      new TransactionModel({
        id: Math.random().toString(),
        transactionName: "",
        type: "credit",
        category: "Entertainment",
        amount: 1,
        date: new Date().toISOString().slice(0, 10),
        userId: userStore.userId,
      })
  );

  const onAddTransaction = async (e: FormEvent) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId,
      },
      body: tempTransaction.stringify("add"),
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();

    const transaction = fetchedData.insert_transactions_one;
    console.log(transaction);
    const transactionData: TransactionModelProps = {
      id: transaction.id,
      transactionName: transaction.transaction_name,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date,
      userId: transaction.userId,
    };

    transactionsStore.addTransaction(new TransactionModel(transactionData));
    setTempTransaction(
      () =>
        new TransactionModel({
          id: Math.random().toString(),
          transactionName: "",
          type: "credit",
          category: "Entertainment",
          amount: 1,
          date: new Date().toISOString().slice(0, 10),
          userId: userStore.userId,
        })
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
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.setTransactionName(e.target.value);
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
                tempTransaction.setType(
                  e.target.value === "credit" ? "credit" : "debit"
                );
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
                tempTransaction.setCategory(e.target.value);
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
              min={1}
              value={tempTransaction.amount}
              onChange={(e) =>
                tempTransaction.setAmount(parseInt(e.target.value))
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
                tempTransaction.setDate(new Date(e.target.value).toISOString())
              }
              required
            />
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

export default observer(AddTransactionBtn);
