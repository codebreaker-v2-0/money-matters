import { PropsWithChildren, createContext, useRef } from "react";
import UserStore from "../stores/UserStore/UserStore";

const UserStoreContext = createContext({
  userStore: new UserStore(),
});

export default UserStoreContext;

export const UserStoreProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
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
