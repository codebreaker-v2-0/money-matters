import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";
import AuthAPI from "../../../Authentication/services/AuthService/index.api";
import AuthService from "../../../Authentication/services/AuthService";

interface userDataProps {
  [key: string]: string;
}

class UserStore {
  private userId: string | undefined;
  userData: userDataProps = {};
  authAPI: AuthService;

  constructor() {
    makeAutoObservable(this);
    this.authAPI = new AuthAPI();
    this.userId = Cookies.get("user_id");
  }

  async setUserId(email: string, password: string): Promise<boolean> {
    const response = await this.authAPI.loginAPI({ email, password });

    if (response.isLoginSuccessful) {
      this.userId = `${response.get_user_id[0].id}`;
      Cookies.set("user_id", this.userId);
    }

    return response.isLoginSuccessful;
  }

  setUserData(userData: userDataProps) {
    this.userData = userData;
  }

  clearStore() {
    this.userId = "";
    this.userData = {};
    Cookies.remove("user_id");
  }

  get userIdValue() {
    return this.userId
  }

  get userDataValue() {
    return this.userData;
  }

  get isLoggedIn() {
    return this.userId !== undefined;
  }

  get isAdmin() {
    return this.userId === "3";
  }

}

export default UserStore;
