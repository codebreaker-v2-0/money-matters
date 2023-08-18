interface TransactionItemProps {
    id: number,
    transactionName: string,
    type: "credit" | "debit",
    category: string,
    amount: number,
    date: string,
    userId: number,
    reload: () => void,
}

export default TransactionItemProps;