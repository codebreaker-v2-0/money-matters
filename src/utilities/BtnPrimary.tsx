import styles from "./BtnPrimary.module.css";

type Props = {
  onClick: () => void,
  children: React.ReactNode,
}

const BtnPrimary: React.FC<Props> = ({onClick, children}) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnPrimary;
