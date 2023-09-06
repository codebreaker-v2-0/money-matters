import { useState, FormEvent, useContext } from "react";
import { BsPlus } from "react-icons/bs";

import BtnPrimary from "../../common-components/BtnPrimary";
import Modal from "../../common-components/Modal";

import apiInitialOptions from "../../constants/api-initial-options";
import TransactionModel from "../../store/models/TransactionModel";
import TransactionsContext from "../../context/TransactionsStoreContext";
import UserContext from "../../context/UserStoreContext";
import TransactionModelProps from "../../types/TransactionModelProps";
import { observer } from "mobx-react";
import { useLiveRegion } from "@chakra-ui/live-region";

const url = "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";

const AddTransactionBtn: React.FC = () => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserContext);
  const ariaLiveRegion = useLiveRegion();

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

    if (response.ok) {
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

      ariaLiveRegion.speak("Transacation Details Updated");
      hideModal();
    } else {
      ariaLiveRegion.speak("An error occured in updating Transacation Details");
    }
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <form className="flex flex-col min-w-[350px]" onSubmit={onAddTransaction}>
        <h3 className="text-xl font-bold">Add Transaction</h3>
        <ul>
          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              required
              autoFocus
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
              id="transactionName"
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.setTransactionName(e.target.value);
              }}
              autoComplete="transaction-name"
            />
          </li>

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
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
            <label htmlFor="category">Category</label>
            <select
              id="category"
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
              required
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2]"
              id="amount"
              type="number"
              min={1}
              value={tempTransaction.amount}
              onChange={(e) =>
                tempTransaction.setAmount(parseInt(e.target.value))
              }
            />
          </li>

          <li className="flex flex-col gap-1 text-base my-4 mx-0">
            <label htmlFor="date">Date</label>
            <input
              id="date"
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
          aria-label="submit add transaction"
        >
          Add Transaction
        </button>
      </form>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <BtnPrimary onClick={showModal} aria-label="add transaction">
        <BsPlus />
        Add Transaction
      </BtnPrimary>
    </>
  );
};

export default observer(AddTransactionBtn);
