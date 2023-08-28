import { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";

import Modal from "../../common-components/Modal";
import BtnSecondary from "../../common-components/BtnSecondary";
import BtnOutline from "../../common-components/BtnOutline";

import apiInitialOptions from "../../Common/constants/ApiInitialOptionsConstants";
import TransactionsContext from "../../context/TransactionsStoreContext";
import UserContext from "../../context/UserStoreContext";

const url =
  "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction";

const DeleteTransactionButton: React.FC<{ id: string }> = ({ id }) => {
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
      <div className="flex gap-4">
        <div>
          <img
            alt="delete"
            src="https://res.cloudinary.com/dojcknl66/image/upload/v1690718727/warning_dtqvuy.png"
          />
        </div>
        <div className="flex flex-col gap-4 text-left">
          <h3>Are you sure you want to Delete?</h3>
          <p>
            This transaction will be deleted immediately. You can’t undo this
            action.
          </p>
          <div className="flex gap-4">
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
      <button type="button" className="text-[#fe5c73]" onClick={showModal}>
        <BsTrash className="text-xl mx-4 my-0" />
      </button>
    </>
  );
};

export default DeleteTransactionButton;
