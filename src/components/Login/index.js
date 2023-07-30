import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut, FaUserAlt, FaLock } from "react-icons/fa";
import Cookies from "js-cookie";

import apiInitialOptions from "../../constants/api-initial-options";

import styles from "./index.module.css";

const Login = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const url = `https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`;
    const options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
      },
    };

    const response = await fetch(url, options);
    const fetchedData = await response.json();
    const data = fetchedData["get_user_id"];

    if (data.length === 0) {
      setShowError(true);
    } else {
      const userId = data[0]["id"];
      Cookies.set("user_id", userId);
      setShowError(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const userId = Cookies.get("user_id");
    if (userId) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      {/* Card */}
      <form className={styles.card} onSubmit={onLoginHandler}>
        {/* User Logo */}
        <div className={styles.userLogoContainer}>
          <FaUserAstronaut className={styles.userLogo} />
        </div>

        {/* Nxt Watch Logo */}
        <img
          alt="nxt-watch-logo"
          src="https://res.cloudinary.com/dojcknl66/image/upload/v1690631981/logo-lg_bjjl2m.png"
        />

        {/* INPUT: Email Id  */}
        <div className={styles.formControl}>
          <label htmlFor="email">
            <FaUserAlt />
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email ID"
            ref={emailRef}
          />
        </div>

        {/* INPUT: Password */}
        <div className={styles.formControl}>
          <label htmlFor="password">
            <FaLock />
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>

        {showError && (
          <p className={styles.error}>*User Credentials Incorrect</p>
        )}

        {/* BUTTON: Login */}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
