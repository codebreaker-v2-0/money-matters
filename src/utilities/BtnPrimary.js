import styles from "./BtnPrimary.module.css";

const BtnPrimary = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnPrimary;
