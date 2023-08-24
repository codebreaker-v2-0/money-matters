import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClick: () => void;
}

const BtnPrimary: React.FC<Props> = ({ onClick, children }) => (
  <button
    className="rounded-xl bg-btnPrimaryColor text-white text-base py-2 px-4 flex items-center hover:bg-btnPrimaryHoverColor active:scale-95"
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default BtnPrimary;
