import { makeAutoObservable } from "mobx";

class LastSevenDaysItem {
    readonly date: string;
    readonly sum: number;
    readonly type: string;

    constructor(date: string, sum: number, type: string) {
        this.date = date;
        this.sum = sum;
        this.type = type;
    }
}

export default LastSevenDaysItem;