import { FaLock } from "react-icons/fa6";

const PasswordInput: React.FC<{ updateInput: (value: string) => void }> = ({
  updateInput,
}) => (
  <div className="flex rounded overflow-hidden border boder-solid border-loginPrimaryColor">
    <label
      className="flex justify-center items-center p-3 text-lightColor text-xl bg-loginPrimaryColor"
      htmlFor="password"
    >
      <FaLock />
    </label>
    <input
      className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight placeholder:text-placeholderColor"
      id="password"
      type="password"
      placeholder="Password"
      onChange={(e) => {
        updateInput(e.target.value);
      }}
    />
  </div>
);

export default PasswordInput;
