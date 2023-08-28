import { FaUserAlt } from "react-icons/fa";
import { FaLock, FaUserAstronaut } from "react-icons/fa6";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

interface Props {
  updateEmailInput: (value: string) => void;
  updatePasswordInput: (value: string) => void;
  showError: boolean;
  onLoginHandler: React.FormEventHandler<HTMLFormElement>;
}

const LoginForm: React.FC<Props> = ({
  onLoginHandler,
  updateEmailInput,
  updatePasswordInput,
  showError,
}) => (
  <div className="h-screen p-4 flex justify-center items-center bg-gradient-to-br from-loginGradient1 to-loginGradient2">
    <form
      className="md:w-full max-w-[400px] relative py-[64px] px-8 flex flex-col gap-6 bg-lightColor shadow-lg rounded-[24px]"
      onSubmit={onLoginHandler}
    >
      <FaUserAstronaut className="p-4 text-[96px] text-lightColor rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-loginPrimaryColor" />

      <img
        className="w-[250px] md:w-[300px] self-center"
        alt="nxt-watch-logo"
        src="https://res.cloudinary.com/dojcknl66/image/upload/v1690631981/logo-lg_bjjl2m.png"
      />

      {/* INPUT: Email Id  */}
      <EmailInput updateInput={updateEmailInput} />

      {/* INPUT: Password */}
      <PasswordInput updateInput={updatePasswordInput} />

      {/* Show Error Message */}
      {showError && (
        <p className="text-errorColor text-sm">*User Credentials Incorrect</p>
      )}

      {/* BUTTON: Login */}
      <button
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-base w-4/5 p-3 rounded-b-[24px] tracking-widest font-bold text-loginSecondaryColor bg-gradient-to-b from-transparent from-0% to-lightColor to-20%"
        type="submit"
      >
        LOGIN
      </button>
    </form>
  </div>
);

export default LoginForm;
