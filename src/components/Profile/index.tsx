import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { observer } from "mobx-react";

import SideBar from "../SideBar/SideBar";
import FormControl from "../../utilities/FormControl";
import AddTransactionBtn from "../AddTransactionBtn";

import styles from "./index.module.css";
import profileOptions from "../../constants/profile-options";
import StoreContext from "../../context/StoreContext";

const Profile: React.FC = () => {
  const { userStore } = useContext(StoreContext);

  // METHOD: Render Content
  const renderContent = () => (
    <div className={styles.content}>
      <div className={styles.iconContainer}>
        <FaUserCircle className={styles.icon} />
      </div>
      <ul className={styles.profileDetails}>
        {profileOptions.map((item) => (
          <FormControl
            key={item.id}
            {...item}
            value={userStore.userData[item.id]}
          />
        ))}
      </ul>
    </div>
  );

  const render = () => (
    <div className={styles.page}>
      <SideBar />

      <div className={styles.profile}>
        <div className={styles.header}>
          <h3>Profile</h3>
          <AddTransactionBtn />
        </div>

        {renderContent()}
      </div>
    </div>
  );

  return userStore.userId ? render() : <Navigate replace to="/login" />;
};

export default observer(Profile);
