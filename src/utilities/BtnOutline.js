import styles from "./BtnOutline.module.css";

const BtnOutline = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnOutline;
