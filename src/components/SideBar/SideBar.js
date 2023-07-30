import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { BiExit } from "react-icons/bi";

import styles from "./SideBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import BtnSecondary from "../../utilities/BtnSecondary";
import BtnOutline from "../../utilities/BtnOutline";
import Modal from "../../utilities/Modal";
import Cookies from "js-cookie";

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const onLogout = () => {
    Cookies.remove("user_id");
    navigate("/login");
  };

  const renderModal = () => (
    <Modal hideModal={hideModal}>
      <div>
        <img
          alt="delete"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690718727/warning_dtqvuy.png"
        />
      </div>
      <div className={styles.modalContent}>
        <h3>You are attempting to log out of Money Matters</h3>
        <p>Are you Sure?</p>
        <div className={styles.modalButtonsContainer}>
          <BtnSecondary onClick={onLogout}>Yes, Logout</BtnSecondary>
          <BtnOutline onClick={hideModal}>Cancel</BtnOutline>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <div className={styles.sidebar}>
        <img
          className={styles.logo}
          alt="money-matters-logo"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690626504/Logo_k10a32.png"
        />

        <ul className={styles.navLinksList}>
          <Link className="reactLink" to="/">
            <li className={pathname === "/" ? styles.active : ""}>
              <AiFillHome className={styles.icon} />
              Dashboard
            </li>
          </Link>

          <Link className="reactLink" to="/transactions">
            <li className={pathname === "/transactions" ? styles.active : ""}>
              <FaMoneyBillTransfer className={styles.icon} />
              Transactions
            </li>
          </Link>

          <Link className="reactLink" to="/profile">
            <li className={pathname === "/profile" ? styles.active : ""}>
              <FaUserAlt className={styles.icon} />
              Profile
            </li>
          </Link>
        </ul>

        <div className={styles.profile}>
          <div className={styles.profileContent}>
            <p className={styles.profileName}>Rhye</p>
            <p className={styles.userName}>olivia@untitlededui.com</p>
          </div>
          <button className={styles.exitIcon} onClick={showModal}>
            <BiExit />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
