import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { observer } from "mobx-react";

import DeleteTransactionButton from "../DeleteTransactionItem";
import UpdateTransactionBtn from "../UpdateTransactionBtn";

import styles from "./index.module.css";
import TransactionItem from "../../store/models/TransactionModel";

interface Props {
  transaction: TransactionItem;
}

const TransactionItemComponent: React.FC<Props> = ({ transaction }) => {
  const icon =
    transaction.type === "credit" ? (
      <BsArrowUpCircle className="hidden sm:block text-3xl text-creditColor" />
    ) : (
      <BsArrowDownCircle className="hidden sm:block text-3xl text-debitColor" />
    );

  const dateTime = new Date(transaction.date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
  });

  const sign = transaction.type === "credit" ? "+" : "-";

  return (
    <tr className="transaction-item text-sm sm:text-base">
      <td className="p-1 sm:p-2 border-b border-solid border-[#e2e2e2] text-[#505887] font-normal">
        <div className="flex gap-2 md:gap-4 items-center">
          {icon}
          {transaction.transactionName}
        </div>
      </td>
      <td className="p-1 sm:p-2 border-b border-solid border-[#e2e2e2] text-[#505887] font-normal">
        {transaction.category}
      </td>
      <td className="p-1 sm:p-2 border-b border-solid border-[#e2e2e2] text-[#505887] font-normal">
        {dateTime}
      </td>
      <td
        className={`${
          transaction.type === "credit" ? "text-[#16dbaa]" : "text-[#fe5c73]"
        } p-1 sm:p-2 border-b border-solid border-[#e2e2e2] font-normal"`}
      >
        {sign}${transaction.amount.toLocaleString()}
      </td>
      <td className="p-1 sm:p-2 border-b border-solid border-[#e2e2e2] text-[#505887] font-normal">
        <div className="flex gap-2 md:gap-4 justify-around">
          <UpdateTransactionBtn transaction={transaction} />
          <DeleteTransactionButton id={transaction.id} />
        </div>
      </td>
    </tr>
  );
};

export default observer(TransactionItemComponent);
