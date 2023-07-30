import styles from "./BtnSecondary.module.css";

const BtnSecondary = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnSecondary;
