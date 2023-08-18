import styles from "./BtnSecondary.module.css";

type Props = {
  onClick: () => void,
  children: React.ReactNode,
}

const BtnSecondary: React.FC<Props> = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnSecondary;
