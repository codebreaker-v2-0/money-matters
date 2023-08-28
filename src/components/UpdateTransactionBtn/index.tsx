import { useState, useRef, useContext, useMemo } from "react";
import { BiPencil } from "react-icons/bi";

import Modal from "../../common-components/Modal";

import styles from "./index.module.css";
import apiInitialOptions from "../../Common/constants/ApiInitialOptionsConstants";
import TransactionModel from "../../store/models/TransactionModel";
import TransactionsContext from "../../context/TransactionsStoreContext";
import UserContext from "../../context/UserStoreContext";
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
      body: tempTransaction.stringify("update"),
    };

    await fetch(url, options);

    transactionsStore.updateTransaction(tempTransaction);

    hideModal();
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <form
        className="min-w-[350px] flex flex-col"
        onSubmit={onUpdateTransaction}
      >
        <h3>Update Transaction</h3>
        <ul>
          <li className="flex flex-col gap-1 my-4 text-left">
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
              id="transactionName"
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.transactionName = e.target.value;
              }}
              type="text"
              required
            />
          </li>

          <li className="flex flex-col gap-1 my-4 text-left">
            <label>Transaction Type</label>
            <select
              className="bg-white px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
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

          <li className="flex flex-col gap-1 my-4 text-left">
            <label>Category</label>
            <select
              className="bg-white px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
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

          <li className="flex flex-col gap-1 my-4 text-left">
            <label htmlFor="amount">Amount</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
              id="amount"
              type="number"
              min={1}
              value={tempTransaction.amount}
              onChange={(e) =>
                (tempTransaction.amount = parseInt(e.target.value))
              }
              required
            />
          </li>

          <li className="flex flex-col gap-1 my-4 text-left">
            <label>Date</label>
            <input
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
              type="date"
              value={tempTransaction.date.slice(0, 10)}
              onChange={(e) =>
                (tempTransaction.date = new Date(e.target.value).toISOString())
              }
              required
            />
          </li>
        </ul>

        <button
          className="rounded-xl bg-btnPrimaryColor hover:bg-btnPrimaryHoverColor text-white px-4 py-2 active:scale-95"
          type="submit"
        >
          Update Transaction
        </button>
      </form>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <button type="button" className="text-[#2d60ff]" onClick={showModal}>
        <BiPencil className="m-0 md:mx-4 text-xl" />
      </button>
    </>
  );
};

export default observer(UpdateTransactionBtn);
