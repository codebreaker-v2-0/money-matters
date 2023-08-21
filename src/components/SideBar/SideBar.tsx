import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserAlt, FaUserCircle } from "react-icons/fa";
import { BiExit } from "react-icons/bi";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import Cookies from "js-cookie";

import BtnSecondary from "../../common-components/BtnSecondary";
import BtnOutline from "../../common-components/BtnOutline";
import Modal from "../../common-components/Modal";

import styles from "./SideBar.module.css";
import apiInitialOptions from "../../constants/api-initial-options";
import UserContext from "../../context/UserContext";

const SideBar: React.FC = () => {
  const { userStore } = useContext(UserContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const fetchData = async () => {
    let url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId,
      },
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    const unformattedData = fetchedData.users[0];
    let data = {
      name: unformattedData.name,
      email: unformattedData.email,
      country: unformattedData.country || "",
      dateOfBirth: unformattedData.date_of_birth,
      city: unformattedData.city || "",
      permanentAddress: unformattedData.permanent_address || "",
      postalCode: unformattedData.postal_code || "",
      presentAddress: unformattedData.present_address || "",
    };

    userStore.setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onLogout = () => {
    Cookies.remove("user_id");
    navigate("/login", { replace: true });
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
        <div className={styles.mainHeader}>
          <img
            className={styles.logo}
            alt="money-matters-logo"
            src="https://res.cloudinary.com/dojcknl66/image/upload/v1690626504/Logo_k10a32.png"
          />
          <button onClick={toggleMenu}>
            <BsFillMenuButtonWideFill />
          </button>
        </div>

        <ul
          className={`${styles.navLinksList} ${showMenu ? styles.active : ""}`}
        >
          <Link className="reactLink" to="/">
            <li className={pathname === "/" ? styles.active : ""}>
              <AiFillHome className={styles.icon} />
              Dashboard
            </li>
          </Link>

          <Link className="reactLink" to="/transactions">
            <li className={pathname === "/transactions" ? styles.active : ""}>
              <FaMoneyBillTransfer className={styles.icon} />
              {userStore.isAdmin ? "All Transactions" : "Transactions"}
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
            <p className={styles.profileName}>{userStore.userData.name}</p>
            <p className={styles.userName}>{userStore.userData.email}</p>
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
