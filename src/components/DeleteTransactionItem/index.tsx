import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";

import Modal from "../../common-components/Modal";
import BtnSecondary from "../../common-components/BtnSecondary";
import BtnOutline from "../../common-components/BtnOutline";

import styles from "./index.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import TransactionsContext from "../../context/TransactionsContext";
import UserContext from "../../context/UserContext";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";

const DeleteTransactionButton: React.FC<{ id: number }> = ({ id }) => {
  const { transactionsStore } = useContext(TransactionsContext);
  const { userStore } = useContext(UserContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onDelete = async () => {
    const options = {
      method: "DELETE",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": userStore.isAdmin ? "admin" : "user",
        "x-hasura-user-id": userStore.userId,
      },
      body: JSON.stringify({ id }),
    };

    await fetch(url, options);
    transactionsStore.deleteTransaction(id);

    hideModal();
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <div className={styles.modal}>
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
            <BtnSecondary onClick={onDelete}>Yes, Delete</BtnSecondary>
            <BtnOutline onClick={hideModal}>No, Leave it</BtnOutline>
          </div>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <button type="button" className={styles.debit} onClick={showModal}>
        <BsTrash className={styles.icon} />
      </button>
    </>
  );
};

export default DeleteTransactionButton;
