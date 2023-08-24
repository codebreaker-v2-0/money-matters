import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { observer } from "mobx-react";

import SideBar from "../SideBar/SideBar";
import FormControl from "../../common-components/FormControl";
import AddTransactionBtn from "../AddTransactionBtn";

import profileOptions from "../../constants/profile-options";
import UserContext from "../../context/UserStoreContext";

const Profile: React.FC = () => {
  const { userStore } = useContext(UserContext);

  // METHOD: Render Content
  const renderContent = () => (
    <div className="text-[#505887] flex gap-6 mx-6 my-4 p-6 rounded-xl bg-white shadow">
      <FaUserCircle className="text-8xl" />
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 flex-1">
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

  const renderComponent = () => (
    <div className="flex bg-backgroundGray">
      <SideBar />

      <div className="flex-1">
        <div className="flex justify-between py-4 px-6 text-xl bg-white text-[#343c6a] shadow-sm">
          <h3>Profile</h3>
          <AddTransactionBtn />
        </div>

        {renderContent()}
      </div>
    </div>
  );

  return userStore.userId ? (
    renderComponent()
  ) : (
    <Navigate replace to="/login" />
  );
};

export default observer(Profile);
