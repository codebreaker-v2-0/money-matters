import Cookies from "js-cookie";
import { makeAutoObservable } from "mobx";

interface userDataProps {
  [key: string]: string;
}

class UserStore {
  userId: string = "";
  userData: userDataProps = {};

  constructor() {
    makeAutoObservable(this)
    this.userId = Cookies.get("user_id") ?? "";
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  setUserData(userData: userDataProps) {
    this.userData = userData;
  }

  get isAdmin() {
    return this.userId === "3";
  }
}

export default UserStore;
