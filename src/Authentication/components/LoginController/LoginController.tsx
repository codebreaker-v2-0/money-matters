import { FormEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserStoreContext from "../../../Common/context/UserStoreContext";
import LoginForm from "../LoginForm";
import { observer } from "mobx-react";

const LoginController: React.FC = () => {
  let navigate = useNavigate();
  const { userStore } = useContext(UserStoreContext);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showError, setShowError] = useState(false);

  const updateEmailInput = (value: string) => {
    setEmailInput(value);
  };

  const updatePasswordInput = (value: string) => {
    setPasswordInput(value);
  };

  const onLoginHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const isLoginSuccessful = await userStore.setUserId(
      emailInput,
      passwordInput
    );

    if (!isLoginSuccessful) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  useEffect(() => {
    if (userStore.isLoggedIn) {
      navigate("/");
    }
  }, [userStore.isLoggedIn]);

  return (
    <LoginForm
      updateEmailInput={updateEmailInput}
      updatePasswordInput={updatePasswordInput}
      showError={showError}
      onLoginHandler={onLoginHandler}
    />
  );
};

export default observer(LoginController);
