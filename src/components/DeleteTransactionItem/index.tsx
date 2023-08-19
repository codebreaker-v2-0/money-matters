import { useState } from "react";
import Cookies from "js-cookie";
import { BsTrash } from "react-icons/bs";

import Modal from "../../utilities/Modal";
import BtnSecondary from "../../utilities/BtnSecondary";
import BtnOutline from "../../utilities/BtnOutline";

import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./index.module.css";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";

interface Props {
  id: number, 
  reload: () => void, 
  isAdmin: boolean
}

const DeleteTransactionButton: React.FC<Props> = ({ id, reload, isAdmin }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onDelete = async () => {
    const userId = Cookies.get("user_id") || "";

    const options = {
      method: "DELETE",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": isAdmin ? "admin" : "user",
        "x-hasura-user-id": userId.toString(),
      },
      body: JSON.stringify({ id }),
    };

    await fetch(url, options);

    hideModal();
    reload();
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
