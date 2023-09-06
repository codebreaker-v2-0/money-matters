import { PropsWithChildren } from "react";
import styles from "./BtnSecondary.module.css";

interface Props extends PropsWithChildren {
  onClick: () => void;
  autoFocus?: boolean;
}

const BtnSecondary: React.FC<Props> = ({ onClick, autoFocus, children }) => (
  <button
    className="rounded-xl bg-[#dc2626] hover:bg-[#b02020] text-white text-sm px-4 py-2 flex items-center active:scale-95"
    type="button"
    onClick={onClick}
    autoFocus={autoFocus}
  >
    {children}
  </button>
);

export default BtnSecondary;
