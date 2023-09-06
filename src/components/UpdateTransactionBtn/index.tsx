import { useState, useContext } from "react";
import { BiPencil } from "react-icons/bi";
import { useLiveRegion } from "@chakra-ui/live-region";

import Modal from "../../common-components/Modal";

import apiInitialOptions from "../../constants/api-initial-options";
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
  const ariaLiveRegion = useLiveRegion();

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

    const response = await fetch(url, options);
    if (response.ok) {
      transactionsStore.updateTransaction(tempTransaction);
      hideModal();
      ariaLiveRegion.speak("Transacation Details Updated");
    } else {
      ariaLiveRegion.speak("An error occured in updating Transacation Details");
    }
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <form
        className="min-w-[350px] flex flex-col"
        onSubmit={onUpdateTransaction}
      >
        <h3 className="text-lg font-bold">Update Transaction</h3>
        <ul>
          <li className="flex flex-col gap-1 my-4 text-left">
            <label htmlFor="transactionName">Transaction Name</label>
            <input
              required
              autoFocus
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
              id="transactionName"
              value={tempTransaction.transactionName}
              onChange={(e) => {
                tempTransaction.transactionName = e.target.value;
              }}
              type="text"
              autoComplete="transaction-name"
            />
          </li>

          <li className="flex flex-col gap-1 my-4 text-left">
            <label htmlFor="transactionType">Transaction Type</label>
            <select
              id="transactionType"
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
            <label htmlFor="category">Category</label>
            <select
              id="category"
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
              required
              id="amount"
              className="px-4 py-2 rounded-xl border border-solid border-[#dfeaf2] text-[#718ebf]"
              type="number"
              min={1}
              value={tempTransaction.amount}
              onChange={(e) =>
                (tempTransaction.amount = parseInt(e.target.value))
              }
            />
          </li>

          <li className="flex flex-col gap-1 my-4 text-left">
            <label htmlFor="date">Date</label>
            <input
              id="date"
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
          aria-label="submit update transaction"
        >
          Update Transaction
        </button>
      </form>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <button type="button" className="text-[#2d60ff]" onClick={showModal} aria-label={`update details for ${transaction.transactionName} transaction`}>
        <BiPencil className="m-0 md:mx-4 text-xl" />
      </button>
    </>
  );
};

export default observer(UpdateTransactionBtn);
