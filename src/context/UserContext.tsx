import { PropsWithChildren, createContext, useRef } from "react";
import UserStore from "../store/UserStore";

const UserContext = createContext({
  userStore: new UserStore(),
});

export default UserContext;

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef(new UserStore());
  return (
    <UserContext.Provider
      value={{
        userStore: userStoreRef.current,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
