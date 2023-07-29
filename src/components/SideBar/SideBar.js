import styles from "./SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <img
        className={styles.logo}
        alt="money-matters-logo"
        src="https://res.cloudinary.com/dojcknl66/image/upload/v1690626504/Logo_k10a32.png"
      />
      <ul className={styles.navLinks}>
        <li>Dashboard</li>
        <li>Transactions</li>
        <li>Profile</li>
      </ul>
    </div>
  );
};

export default SideBar;
