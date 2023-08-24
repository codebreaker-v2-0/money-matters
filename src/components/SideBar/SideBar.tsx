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

import apiInitialOptions from "../../constants/api-initial-options";
import UserContext from "../../context/UserStoreContext";
import TransactionsContext from "../../context/TransactionsStoreContext";

const SideBar: React.FC = () => {
  const { userStore } = useContext(UserContext);
  const { transactionsStore } = useContext(TransactionsContext);

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
      country: unformattedData.country,
      dateOfBirth: unformattedData.date_of_birth,
      city: unformattedData.city,
      permanentAddress: unformattedData.permanent_address,
      postalCode: unformattedData.postal_code,
      presentAddress: unformattedData.present_address,
    };

    userStore.setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onLogout = () => {
    Cookies.remove("user_id");
    transactionsStore.clearStore();
    userStore.clearStore();
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
      <div className="flex flex-col items-start gap-4">
        <h3 className="text-[#333b69]">
          You are attempting to log out of Money Matters
        </h3>
        <p className="text-[#505887]">Are you sure?</p>
        <div className="flex gap-4">
          <BtnSecondary onClick={onLogout}>Yes, Logout</BtnSecondary>
          <BtnOutline onClick={hideModal}>Cancel</BtnOutline>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      {isModalVisible && renderModal()}
      <div className="sm:w-[250px] sm:h-screen flex flex-col bg-white sm:shadow-md z-10">
        <div className="flex items-center justify-between py-4 px-3 sm:px-4 sm:py-8">
          <img
            alt="money-matters-logo"
            src="https://res.cloudinary.com/dojcknl66/image/upload/v1690626504/Logo_k10a32.png"
          />
          <button
            className="sm:hidden text-2xl text-[#333]"
            onClick={toggleMenu}
          >
            <BsFillMenuButtonWideFill />
          </button>
        </div>

        <ul className={`flex-1 ${showMenu ? "block" : "hidden"} sm:block`}>
          <Link className="reactLink" to="/">
            <li
              className={`p-4 pl-8 flex items-center gap-4 text-lg text-[#505887] relative hover:bg-[#f5f7fa] ${
                pathname === "/" ? "bg-[#f5f7fa]" : ""
              }`}
            >
              <AiFillHome className="text-2xl" />
              Dashboard
            </li>
          </Link>

          <Link className="reactLink" to="/transactions">
            <li
              className={`p-4 pl-8 flex items-center gap-4 text-lg text-[#505887] relative hover:bg-[#f5f7fa] ${
                pathname === "/transactions" ? "bg-[#f5f7fa]" : ""
              }`}
            >
              <FaMoneyBillTransfer className="text-2xl" />
              {userStore.isAdmin ? "All Transactions" : "Transactions"}
            </li>
          </Link>

          <Link className="reactLink" to="/profile">
            <li
              className={`p-4 pl-8 flex items-center gap-4 text-lg text-[#505887] relative hover:bg-[#f5f7fa] ${
                pathname === "/profile" ? "bg-[#f5f7fa]" : ""
              }`}
            >
              <FaUserAlt className="text-2xl" />
              Profile
            </li>
          </Link>
        </ul>

        <div
          className={`gap-2 p-4 text-sm text-[#505887] border-t border-solid border-[#eaecf0] ${
            showMenu ? "flex" : "hidden"
          }`}
        >
          <div>
            <FaUserCircle className="text-2xl" />
          </div>
          <div className="flex-1">
            <p className="font-medium mb-1">{userStore.userData.name}</p>
            <p>{userStore.userData.email}</p>
          </div>
          <button className="text-xl" onClick={showModal}>
            <BiExit />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
