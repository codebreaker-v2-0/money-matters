import {makeAutoObservable } from "mobx";
import TransactionModelProps from "../../types/TransactionModelProps";


class TransactionItem {
  readonly id: string;
  transactionName: string;
  type: "credit" | "debit";
  category: string;
  amount: number;
  date: string;
  readonly userId: string;

  constructor(data: TransactionModelProps
  ) {
    this.id = data.id;
    this.transactionName = data.transactionName;
    this.type = data.type;
    this.category = data.category;
    this.amount = data.amount;
    this.date = data.date;
    this.userId = data.userId;

    makeAutoObservable(this);
  }

  setTransactionName(name: string) {
    this.transactionName = name;
  }

  setType(type: "credit" | "debit") {
    this.type = type;
  }

  setCategory(category: string) {
    this.category = category;
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  setDate(date: string) {
    this.date = date;
  }

  stringify(action: "add" | "update"): string {
    if (action === "add") {
      return JSON.stringify({
        name: this.transactionName,
        type: this.type,
        category: this.category,
        amount: this.amount,
        date: this.date,
        user_id: this.userId,
      });
    }
    return JSON.stringify({
      name: this.transactionName,
      type: this.type,
      category: this.category,
      amount: this.amount,
      date: this.date,
      id: this.id,
    });
  }
}

export default TransactionItem;