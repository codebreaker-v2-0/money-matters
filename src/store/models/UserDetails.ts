import Cookies from "js-cookie";

class UserDetails {
  readonly userId: string;
  userData = {
    name: "",
    email: "",
    country: "",
    dateOfBirth: "",
    city: "",
    permanentAddress: "",
    postalCode: "",
    presentAddress: "",
  };

  constructor() {
    this.userId = Cookies.get("user_id") ?? "";
  }

  get isAdmin() {
    return this.userId === "3";
  }
}

export default UserDetails;
