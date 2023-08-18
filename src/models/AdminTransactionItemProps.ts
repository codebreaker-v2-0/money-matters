interface AdminTransactionItemProps {
    id: number,
    transactionName: string,
    type: string,
    category: string,
    amount: number,
    date: string,
    reload: () => void,
    username: string,
}
export default AdminTransactionItemProps;