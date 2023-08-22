import { PropsWithChildren, createContext, useRef } from "react";
import TransactionsStore from "../store/TransactionsStore";

const TransactionsStoreContext = createContext({
  transactionsStore: new TransactionsStore(),
});

export default TransactionsStoreContext;

export const TransactionsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const transactionsStoreRef = useRef(new TransactionsStore());
  return (
    <TransactionsStoreContext.Provider
      value={{
        transactionsStore: transactionsStoreRef.current,
      }}
    >
      {children}
    </TransactionsStoreContext.Provider>
  );
};
