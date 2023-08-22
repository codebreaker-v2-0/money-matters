import { PropsWithChildren, createContext, useRef } from "react";
import UserStore from "../store/UserStore";

const UserStoreContext = createContext({
  userStore: new UserStore(),
});

export default UserStoreContext;

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef(new UserStore());
  return (
    <UserStoreContext.Provider
      value={{
        userStore: userStoreRef.current,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
};
