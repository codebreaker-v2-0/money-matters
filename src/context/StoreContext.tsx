import { PropsWithChildren, createContext, useRef } from "react";
import TransactionsStore from "../store/TransactionsStore";
import UserDetails from "../store/models/UserDetails";

const StoreContext = createContext({
  transactionsStore: new TransactionsStore(),
  userStore: new UserDetails(),
});

export default StoreContext;

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const transactionsStoreRef = useRef(new TransactionsStore());
  const userStoreRef = useRef(new UserDetails());
  return (
    <StoreContext.Provider
      value={{
        transactionsStore: transactionsStoreRef.current,
        userStore: userStoreRef.current,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
