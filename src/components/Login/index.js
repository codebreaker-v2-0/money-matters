import { useRef } from "react";

import { FaUserAstronaut, FaUserAlt, FaLock } from "react-icons/fa";

import styles from "./index.module.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginHandler = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
    );

    var raw = JSON.stringify({
      email: "jane.doe@gmail.com",
      password: "janedoe@123",
    });

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://bursting-gelding-24.hasura.app/api/rest/get-user-id",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
