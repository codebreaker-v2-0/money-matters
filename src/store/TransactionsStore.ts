import {
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";
import TransactionItem from "./models/TransactionItem";

interface lastSevenDaysItemProps {
  date: string;
  sum: number;
  type: "credit" | "debit";
}

class TransactionsStore {
  allTransactionsData: TransactionItem[] = [];
  lastSevenDaysData: lastSevenDaysItemProps[] = [];

  constructor() {
    makeObservable(this, {
      allTransactionsData: observable,
      lastSevenDaysData: observable,
      creditDebitTotalsData: computed,
      addTransaction: action,
      updateTransaction: action.bound,
      deleteTransaction: action,
      setAllTransactionsData: action,
      setLastSevenDaysData: action,
    });
  }

  get creditDebitTotalsData(): { credit: number; debit: number } {
    let credit = 0;
    let debit = 0;

    this.allTransactionsData.forEach((item) => {
      if (item.type === "credit") credit += item.amount;
      else debit += item.amount;
    });

    return { credit, debit };
  }

  addTransaction(transaction: TransactionItem) {
    this.allTransactionsData.push(transaction);
  }

  updateTransaction(transaction: TransactionItem) {
    const index = this.allTransactionsData.findIndex(
      (item) => item.id === transaction.id
    );
    this.allTransactionsData[index] = transaction;
    console.log(this.allTransactionsData[index])
    console.log("Updated!");
  }

  deleteTransaction(transactionId: number) {
    const updatedData = this.allTransactionsData.filter(
      (item) => transactionId !== item.id
    );
    this.setAllTransactionsData(updatedData);
  }

  setAllTransactionsData(allTransactionsData: TransactionItem[]) {
    this.allTransactionsData = allTransactionsData;
  }

  setLastSevenDaysData(lastSevenDaysData: lastSevenDaysItemProps[]) {
    this.lastSevenDaysData = lastSevenDaysData;
  }
}

export default TransactionsStore;
