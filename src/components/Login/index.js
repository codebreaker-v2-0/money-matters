import { useRef } from "react";
import axios from "axios";

import { FaUserAstronaut, FaUserAlt, FaLock } from "react-icons/fa";

import styles from "./index.module.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    const userDetails = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
    };

    const response = await axios({
      method: "GET",
      url: "https://bursting-gelding-24.hasura.app/api/rest/get-user-id",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret":
          "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      },
      data: JSON.stringify(userDetails),
    });

    const fetchedData = await response.json();

    console.log(fetchedData);
  };

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

        {/* BUTTON: Login */}
        <button type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
