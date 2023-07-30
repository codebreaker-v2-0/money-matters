import { IoMdClose } from "react-icons/io";

import styles from "./Modal.module.css";

const Modal = ({ hideModal, children }) => (
  <div className={styles.modalBackground}>
    <div className={styles.modalCard}>
      <button className={styles.modalCloseBtn} onClick={hideModal}>
        <IoMdClose />
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
