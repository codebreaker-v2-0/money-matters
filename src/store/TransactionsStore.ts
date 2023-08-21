import {
  makeObservable,
  observable,
  computed,
  action,
} from "mobx";
import { differenceInDays } from "date-fns";

import TransactionItem from "./models/TransactionItem";
import LastSevenDaysItem from "./models/LastSevenDaysItem";

class TransactionsStore {
  allTransactionsData: TransactionItem[] = [];
  lastSevenDaysData: LastSevenDaysItem[] = [];

  constructor() {
    makeObservable(this, {
      allTransactionsData: observable,
      lastSevenDaysData: observable,
      creditDebitTotalsData: computed,
      addTransaction: action,
      updateTransaction: action,
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

  setLastSevenDaysData(lastSevenDaysData: LastSevenDaysItem[]) {
    this.lastSevenDaysData = lastSevenDaysData;
  }

  addLastSevenDayItem(lastSevenDaysItem: LastSevenDaysItem) {
    const noOfDays = differenceInDays(new Date(), new Date(lastSevenDaysItem.date));
    if (noOfDays <= 7) {
      this.lastSevenDaysData.push(lastSevenDaysItem);
      console.log(noOfDays);
    }
  }
}

export default TransactionsStore;
