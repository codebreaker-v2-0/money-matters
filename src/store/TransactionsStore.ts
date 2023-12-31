import {
  makeAutoObservable,
} from "mobx";

import TransactionItem from "./models/TransactionModel";

class TransactionsStore {
  allTransactionsData: TransactionItem[] = [];

  constructor() {
    makeAutoObservable(this);
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

  deleteTransaction(transactionId: string) {
    const updatedData = this.allTransactionsData.filter(
      (item) => transactionId !== item.id
    );
    this.setAllTransactionsData(updatedData);
  }

  setAllTransactionsData(allTransactionsData: TransactionItem[]) {
    this.allTransactionsData = allTransactionsData;
  }

  clearStore() {
    this.allTransactionsData = [];
  }
}

export default TransactionsStore;
