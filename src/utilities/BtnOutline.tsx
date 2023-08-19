import { PropsWithChildren } from "react";
import styles from "./BtnOutline.module.css";

interface Props extends PropsWithChildren{
  onClick: () => void,
}

const BtnOutline: React.FC<Props> = ({ onClick, children }) => (
  <button className={styles.button} type="button" onClick={onClick}>
    {children}
  </button>
);

export default BtnOutline;
