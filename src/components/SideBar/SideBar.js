import { AiFillHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { BiExit } from "react-icons/bi";

import styles from "./SideBar.module.css";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const { pathname } = useLocation();

  return (
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
        <button className={styles.exitIcon}>
          <BiExit />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
