import { BsArrowDownCircle, BsArrowUpCircle, BsTrash } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import styles from "./index.module.css";
import { useState } from "react";
import BtnSecondary from "../../utilities/BtnSecondary";
import BtnOutline from "../../utilities/BtnOutline";
import Modal from "../../utilities/Modal";

const TransactionItem = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const { id, transactionName, type, category, amount, date } = props;

  const icon =
    type === "credit" ? (
      <BsArrowUpCircle className={styles.icon} />
    ) : (
      <BsArrowDownCircle className={styles.icon} />
    );

  const dateTime = new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const sign = type === "credit" ? "+" : "-";

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <div>
        <img
          alt="delete"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690718727/warning_dtqvuy.png"
        />
      </div>
      <div className={styles.modalContent}>
        <h3>Are you sure you want to Delete?</h3>
        <p>
          This transaction will be deleted immediately. You can’t undo this
          action.
        </p>
        <div className={styles.modalButtonsContainer}>
          <BtnSecondary>Yes, Delete</BtnSecondary>
          <BtnOutline onClick={hideModal}>No, Leave it</BtnOutline>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <tr className={styles.transactionItem}>
        <td className={styles.transactionName}>
          <div>
            {icon}
            {transactionName}
          </div>
        </td>
        <td>{category}</td>
        <td>{dateTime}</td>
        <td className={styles[type]}>
          {sign}${amount.toLocaleString()}
        </td>
        <td>
          <div className={styles.buttonsContainer}>
            <button type="button" className={styles.editBtn}>
              <BiPencil className={styles.icon} />
            </button>
            <button type="button" className={styles.debit} onClick={showModal}>
              <BsTrash className={styles.icon} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TransactionItem;
