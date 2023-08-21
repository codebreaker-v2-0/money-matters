import Cookies from "js-cookie";

interface userDataProps {
  name: string;
  email: string;
  country: string;
  dateOfBirth: string;
  city: string;
  permanentAddress: string;
  postalCode: string;
  presentAddress: string;
}

class UserDetails {
  readonly userId: string;
  userData: userDataProps = {
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

  setUserData(userData: userDataProps) {
    this.userData = userData;
  }

  get isAdmin() {
    return this.userId === "3";
  }
}

export default UserDetails;
