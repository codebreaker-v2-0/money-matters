import { FaUserAlt } from "react-icons/fa";

const EmailInput: React.FC<{ updateInput: (value: string) => void }> = ({
  updateInput,
}) => (
  <div className="flex rounded overflow-hidden border boder-solid border-loginPrimaryColor">
    <label
      className="flex justify-center items-center p-3 text-lightColor text-xl bg-loginPrimaryColor"
      htmlFor="email"
    >
      <FaUserAlt />
    </label>
    <input
      autoFocus
      className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight placeholder:text-placeholderColor"
      id="email"
      type="email"
      placeholder="Email ID"
      onChange={(e) => {
        updateInput(e.target.value);
      }}
    />
  </div>
);

export default EmailInput;
