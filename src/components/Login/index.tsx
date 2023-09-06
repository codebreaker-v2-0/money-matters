import { FormEvent, createRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut, FaUserAlt, FaLock } from "react-icons/fa";
import ReCAPTCHA from 'react-google-recaptcha';

import apiInitialOptions from "../../constants/api-initial-options";

import UserContext from "../../context/UserStoreContext";
import { BiHide, BiShow } from "react-icons/bi";

const Login: React.FC = () => {
  const { userStore } = useContext(UserContext);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitBtnRef = createRef<HTMLButtonElement>();
  const reCaptchaRef = createRef<ReCAPTCHA>();

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();

    submitBtnRef.current?.setAttribute("aria-pressed", "true");
    if (!reCaptchaRef.current?.getValue()) {
      setShowError(true);
      setErrorMsg("*reCAPTCHA is mandatory");
      return;
    }

    const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
    const options = {
      method: "POST",
      headers: {
        ...apiInitialOptions,
      },
      body: JSON.stringify({ email, password }),
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();
    const data = fetchedData.get_user_id;

    if (data.length === 0) {
      setShowError(true);
      setErrorMsg("*User Credentials Incorrect")
      reCaptchaRef.current?.reset();
    } else {
      const userId = data[0]["id"];
      userStore.setUserId(userId);
      setShowError(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (userStore.userId) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen p-4 flex justify-center items-center bg-gradient-to-br from-loginGradient1 to-loginGradient2">
      {/* Card */}
      <form
        className="md:w-full max-w-[400px] relative pt-[64px] pb-4 px-8 flex flex-col gap-4 bg-lightColor shadow-lg rounded-[24px]"
        onSubmit={onLoginHandler}
      >
        {/* User Logo */}
        <FaUserAstronaut className="p-4 text-[96px] text-lightColor rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-loginPrimaryColor" role="presentation" />

        {/* Nxt Watch Logo */}
        <img
          className="w-[250px] md:w-[300px] self-center"
          alt="nxt-watch-logo"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690631981/logo-lg_bjjl2m.png"
          role="presentation"
        />

        {/* INPUT: Email Id  */}
        <div className="flex rounded overflow-hidden border boder-solid border-loginPrimaryColor">
          <label
            className="flex justify-center items-center p-3 text-lightColor text-xl bg-loginPrimaryColor"
            htmlFor="email"
          >
            <FaUserAlt />
          </label>
          <input
            required
            autoFocus
            className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight autofill:!bg-white placeholder:text-placeholderColor"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            aria-describedby="errorMsg"
          />
        </div>

        {/* INPUT: Password */}
        <div className="flex rounded overflow-hidden border boder-solid border-loginPrimaryColor">
          <label
            className="flex justify-center items-center p-3 text-lightColor text-xl bg-loginPrimaryColor"
            htmlFor="password"
          >
            <FaLock />
          </label>
          <input
            required
            className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight placeholder:text-placeholderColor"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            aria-describedby="errorMsg"
          />
          <button
            type="button"
            className="pe-2"
            onClick={() => {
              setShowPassword((prevState) => !prevState);
            }}
            aria-label="toggle show password"
          >
            {showPassword ? <BiHide /> : <BiShow />}
          </button>
        </div>

        <p id="errorMsg" className="text-errorColor text-sm" aria-live="assertive">
          {showError && errorMsg}
        </p>
        
        <div className="flex justify-center">
          <ReCAPTCHA ref={reCaptchaRef} sitekey="6LclJQIoAAAAADk0oKcZSmZ2P0z2oTEVIPokfp4m" />
        </div>

        {/* BUTTON: Login */}
        <button
          ref={submitBtnRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-base w-4/5 p-3 rounded-b-[24px] tracking-widest font-bold text-loginSecondaryColor bg-gradient-to-b from-transparent from-0% to-lightColor to-20%"
          type="submit"
          aria-pressed="false"
          aria-label="submit login details"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
