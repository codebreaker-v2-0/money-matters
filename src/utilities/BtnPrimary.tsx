import { PropsWithChildren } from "react";
import styles from "./BtnPrimary.module.css";

interface Props extends PropsWithChildren {
  onClick: () => void,
}

const BtnPrimary: React.FC<Props> = ({onClick, children}) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnPrimary;
