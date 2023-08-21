import { PropsWithChildren, createContext, useRef } from "react";
import UserDetails from "../store/models/UserDetails";

const UserContext = createContext({
  userStore: new UserDetails(),
});

export default UserContext;

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userStoreRef = useRef(new UserDetails());
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
