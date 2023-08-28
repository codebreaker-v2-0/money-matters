import { useState, FormEvent, useContext } from "react";
import { BsPlus } from "react-icons/bs";

import BtnPrimary from "../../common-components/BtnPrimary";
import Modal from "../../common-components/Modal";

import apiInitialOptions from "../../Common/constants/ApiInitialOptionsConstants";
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
      <form className="flex flex-col min-w-[350px]" onSubmit={onAddTransaction}>
        <h3>Add Transaction</h3>
        <ul>
          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
              id="transactionName"
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.setTransactionName(e.target.value);
              }}
              type="text"
              required
            />
          </li>

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label>Transaction Type</label>
            <select
              className="bg-white px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
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

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label>Category</label>
            <select
              className="bg-white px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
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

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label htmlFor="amount">Amount</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
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

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label>Date</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
              type="date"
              value={tempTransaction.date.slice(0, 10)}
              onChange={(e) =>
                tempTransaction.setDate(new Date(e.target.value).toISOString())
              }
              required
            />
          </li>
        </ul>

        <button
          className="rounded-xl bg-btnPrimaryColor text-white text-base py-2 px-4 flex items-center justify-center hover:bg-btnPrimaryHoverColor active:scale-95"
          type="submit"
        >
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
