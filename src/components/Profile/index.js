import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";

import SideBar from "../SideBar/SideBar";
import BtnPrimary from "../../utilities/BtnPrimary";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import FormControl from "../../utilities/FormControl";

import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";
import profileOptions from "../../constants/profile-options";

import styles from "./index.module.css";
import { FaUserCircle } from "react-icons/fa";

let data = [];

const Profile = () => {
  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    let url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    let options = {
      ...apiInitialOptions,
      "x-hasura-role": "user",
      "x-hasura-user-id": "1",
    };

    let response = await fetch(url, options);
    let fetchedData = await response.json();
    const unformattedData = fetchedData.users[0];
    data = {
      name: unformattedData.name,
      email: unformattedData.email,
      country: unformattedData.country || "",
      dateOfBirth: unformattedData.date_of_birth,
      city: unformattedData.city || "",
      permanentAddress: unformattedData.permanent_address || "",
      postalCode: unformattedData.postal_code || "",
      presentAddress: unformattedData.present_address || "",
    };

    setApiStatus(apiStatusContants.success);
    console.log(data);
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  const renderSuccessView = () => {
    return (
      <div className={styles.content}>
        <div>
          <FaUserCircle className={styles.icon} />
        </div>
        <ul className={styles.profileDetails}>
          {profileOptions.map((item) => (
            <FormControl key={item.id} {...item} value={data[item.id]} />
          ))}
        </ul>
      </div>
    );
  };

  // METHOD: Render Content
  const renderContent = () => {
    switch (apiStatus) {
      // Failure View
      case apiStatusContants.failure:
        return <FailureView />;

      case apiStatusContants.success:
        // Success View
        return renderSuccessView();

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  return (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.profile}>
        <div className={styles.header}>
          <h3>Profile</h3>
          <BtnPrimary>
            <BsPlus />
            Add Transaction
          </BtnPrimary>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
