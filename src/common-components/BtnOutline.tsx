import { PropsWithChildren } from "react";
import styles from "./BtnOutline.module.css";

interface Props extends PropsWithChildren {
  onClick: () => void;
}

const BtnOutline: React.FC<Props> = ({ onClick, children }) => (
  <button
    className="rounded-xl bg-transparent text-[#333b69] border border-solid border-[#cbd5e1] py-2 px-4 text-sm active:scale-95"
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default BtnOutline;
