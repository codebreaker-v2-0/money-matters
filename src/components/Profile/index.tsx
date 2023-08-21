import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

import SideBar from "../SideBar/SideBar";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import FormControl from "../../utilities/FormControl";
import AddTransactionBtn from "../AddTransactionBtn";

import apiStatusContants from "../../constants/api-status-constants";
import apiInitialOptions from "../../constants/api-initial-options";
import profileOptions from "../../constants/profile-options";

import styles from "./index.module.css";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import StoreContext from "../../context/StoreContext";

let data: any = [];

const Profile: React.FC = () => {
  const { userStore } = useContext(StoreContext);

  // STATES
  const [apiStatus, setApiStatus] = useState(apiStatusContants.progress);

  // METHOD: Fetch Data
  const fetchData = async () => {
    setApiStatus(apiStatusContants.progress);

    let url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
    let options = {
      method: "GET",
      headers: {
        ...apiInitialOptions,
        "x-hasura-role": "user",
        "x-hasura-user-id": userStore.userId,
      },
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
  };

  // METHOD: Component Did Mount
  useEffect(() => {
    fetchData();
  }, []);

  const renderSuccessView = () => {
    return (
      <div className={styles.content}>
        <div className={styles.iconContainer}>
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
        return <FailureView fetchData={fetchData} />;

      case apiStatusContants.success:
        // Success View
        return renderSuccessView();

      // Progress View
      default:
        return <ProgressView />;
    }
  };

  const render = () => (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.profile}>
        <div className={styles.header}>
          <h3>Profile</h3>
          <AddTransactionBtn reload={fetchData} />
        </div>

        {renderContent()}
      </div>
    </div>
  );

  return userStore.userId ? render() : <Navigate replace to="/login" />;
};

export default observer(Profile);
