import Cookies from "js-cookie";

interface userDataProps {
  [key: string]: string;
}

class UserStore {
  userId: string = "";
  userData: userDataProps = {};

  constructor() {
    this.userId = Cookies.get("user_id") ?? "";
  }

  setUserData(userData: userDataProps) {
    this.userData = userData;
  }

  get isAdmin() {
    return this.userId === "3";
  }
}

export default UserStore;
