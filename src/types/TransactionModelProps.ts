export default interface TransactionModelProps {
    id: string;
    transactionName: string;
    type: "credit" | "debit";
    category: string;
    amount: number;
    date: string;
    userId: string;
};