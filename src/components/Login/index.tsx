import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut, FaUserAlt, FaLock } from "react-icons/fa";
import Cookies from "js-cookie";

import apiInitialOptions from "../../constants/api-initial-options";

import UserContext from "../../context/UserStoreContext";

const Login: React.FC = () => {
  const { userStore } = useContext(UserContext);

  const [showError, setShowError] = useState(false);
  let navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onLoginHandler = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;

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
    } else {
      const userId = data[0]["id"];
      userStore.setUserId(userId);
      Cookies.set("user_id", userId);
      setShowError(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (Cookies.get("user_id")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen p-4 flex justify-center items-center bg-gradient-to-br from-loginGradient1 to-loginGradient2">
      {/* Card */}
      <form
        className="md:w-full max-w-[400px] relative py-[64px] px-8 flex flex-col gap-6 bg-lightColor shadow-lg rounded-[24px]"
        onSubmit={onLoginHandler}
      >
        {/* User Logo */}
        <FaUserAstronaut className="p-4 text-[96px] text-lightColor rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-loginPrimaryColor" />

        {/* Nxt Watch Logo */}
        <img
          className="w-[250px] md:w-[300px] self-center"
          alt="nxt-watch-logo"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690631981/logo-lg_bjjl2m.png"
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
            autoFocus
            className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight placeholder:text-placeholderColor"
            id="email"
            type="email"
            placeholder="Email ID"
            ref={emailRef}
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
            className="px-2 text-base text-inputColor flex-1 bg-loginPrimaryColorLight placeholder:text-placeholderColor"
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

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
};

export default Login;
