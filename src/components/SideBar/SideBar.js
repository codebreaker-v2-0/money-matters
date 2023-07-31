import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { BiExit } from "react-icons/bi";

import BtnSecondary from "../../utilities/BtnSecondary";
import BtnOutline from "../../utilities/BtnOutline";
import Modal from "../../utilities/Modal";

import styles from "./SideBar.module.css";
import apiInitialOptions from "../../constants/api-initial-options";

let userId = null;

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    userId = Cookies.get("user_id");

    let url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userId.toString(),
      },
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    const unformattedData = fetchedData.users[0];
    setUserData({
      name: unformattedData.name,
      email: unformattedData.email,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <p>Are you sure?</p>
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
              {userId === "3" ? "All Transactions" : "Transactions"}
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
          <div>
            <FaUserCircle className={styles.icon} />
          </div>
          <div className={styles.profileContent}>
            <p className={styles.profileName}>{userData.name}</p>
            <p className={styles.userName}>{userData.email}</p>
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
