import { useState, useRef, FormEvent } from "react";
import Cookies from "js-cookie";
import { BiPencil } from "react-icons/bi";

import Modal from "../../utilities/Modal";

import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./index.module.css";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

interface Props {
  id: number,
  transactionName: string,
  type: string,
  category: string,
  amount: number,
  date: string,
  reload: () => void, 
}

const UpdateTransactionBtn: React.FC<Props> = (props) => {
  const { id, transactionName, type, category, amount, date, reload } = props;

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

    const userId = Cookies.get("user_id");

    const transactionDetails = {
      name: transactionNameRef.current!.value,
      type: transactionTypeRef.current!.value,
      category: categoryRef.current!.value,
      amount: +amountRef.current!.value,
      date: new Date(dateRef.current!.value).toISOString(),
      id,
    };

    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userId || "",
      },
      body: JSON.stringify(transactionDetails),
    };

    await fetch(url, options);

    hideModal();
    reload();
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
              defaultValue={transactionName}
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Transaction Type</label>
            <select ref={transactionTypeRef} defaultValue={type}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </li>

          <li className={styles.formControl}>
            <label>Category</label>
            <select ref={categoryRef} defaultValue={category}>
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
              defaultValue={amount}
              required
            />
          </li>

          <li className={styles.formControl}>
            <label>Date</label>
            <input
              ref={dateRef}
              type="date"
              defaultValue={date.slice(0, 10)}
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
