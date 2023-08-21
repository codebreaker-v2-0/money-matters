import { PropsWithChildren, createContext, useRef } from "react";
import TransactionsStore from "../store/TransactionsStore";

const TransactionsContext = createContext({
  transactionsStore: new TransactionsStore(),
});

export default TransactionsContext;

export const TransactionsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const transactionsStoreRef = useRef(new TransactionsStore());
  return (
    <TransactionsContext.Provider
      value={{
        transactionsStore: transactionsStoreRef.current,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
