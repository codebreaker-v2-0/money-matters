import styles from "./BtnOutline.module.css";

type Props = {
  onClick: () => void,
  children: React.ReactNode,
}

const BtnOutline: React.FC<Props> = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnOutline;
