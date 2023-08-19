import { makeObservable, observable, action } from "mobx";

class TransactionItem {
  readonly id: number;
  transactionName: string;
  type: string;
  category: string;
  amount: number;
  date: string;
  readonly userId: number;

  constructor(
    id: number,
    transactionName: string,
    type: string,
    category: string,
    amount: number,
    date: string,
    userId: number
  ) {
    this.id = id;
    this.transactionName = transactionName;
    this.type = type;
    this.category = category;
    this.amount = amount;
    this.date = date;
    this.userId = userId;

    makeObservable(this, {
      transactionName: observable,
      type: observable,
      category: observable,
      amount: observable,
      date: observable,
      setTransactionName: action,
      setType: action,
      setCategory: action,
      setAmount: action,
      setDate: action,
    });
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

  get stringify(): string {
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
