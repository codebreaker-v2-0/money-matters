import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useMachine } from "@xstate/react";

import SideBar from "../SideBar/SideBar";
import TransactionsList from "../TransactionsList";
import FailureView from "../FailureView";
import ProgressView from "../ProgressView";
import AddTransactionBtn from "../AddTransactionBtn";

import tabOptions from "../../constants/tab-options";
import apiInitialOptions from "../../constants/api-initial-options";

import apiStatusMachine from "../../machines/apiStatusMachine";
import UserModel from "../../types/UserProps";
import TransactionModel from "../../store/models/TransactionModel";
import UserContext from "../../context/UserStoreContext";
import TransactionsContext from "../../context/TransactionsStoreContext";

let usersData: UserModel[];

const Transactions = () => {
	const { transactionsStore } = useContext(TransactionsContext);
	const { userStore } = useContext(UserContext);

	const machineConfig = {
		services: {
			fetchData: async () => {
				let url =
					"https://brsting-gelding-24.hasura.app/api/rest/all-transactions?limit=100&offset=0";
				let options = {
					method: "GET",
					headers: {
						...apiInitialOptions,
						"x-hasura-role": userStore.isAdmin ? "admin" : "user",
						"x-hasura-user-id": userStore.userId,
					},
				};

				let response = await fetch(url, options);

				if (!response.ok) {
					throw new Error("Fetching Failed");
				}

				let fetchedData = await response.json();
				let allTransactionsData: TransactionModel[] =
					fetchedData.transactions.map((item: any) => ({
						id: item.id,
						transactionName: item.transaction_name,
						type: item.type,
						category: item.category,
						amount: item.amount,
						date: item.date,
						userId: item.user_id,
					}));

				transactionsStore.setAllTransactionsData(allTransactionsData);

				if (userStore.isAdmin) {
					url = "https://bursting-gelding-24.hasura.app/api/rest/profile";
					options = {
						method: "GET",
						headers: {
							...apiInitialOptions,
							"x-hasura-role": "admin",
							"x-hasura-user-id": "3",
						},
					};

					response = await fetch(url, options);
					fetchedData = await response.json();
					usersData = fetchedData.users.map((item: any) => ({
						name: item.name,
						id: item.id,
					}));
				}
				return "Fetching Successful";
			},
		},
	};

	const [apiState, send] = useMachine(apiStatusMachine, machineConfig);
	const [currentTab, setCurrentTab] = useState("all-transactions");

	// METHOD: Render Content
	const renderContent = () => {
		switch (apiState.value) {
			// Failure View
			case "failed":
				return (
					<FailureView
						fetchData={() => {
							send("RETRY");
						}}
					/>
				);

			case "successful":
				// Success View
				return (
					<div className="flex flex-col gap-4 pt-4 px-4 pb-8 sm:px-8 sm:py-4 sm:overflow-y-auto h-[calc(100vh - 120px)]">
						{/* Last Transaction */}
						<TransactionsList
							allTransactionsData={transactionsStore.allTransactionsData}
							currentTab={currentTab}
							isAdmin={userStore.isAdmin}
							usersData={usersData}
						/>
					</div>
				);

			// Progress View
			default:
				return <ProgressView />;
		}
	};

	const renderComponent = () => (
		<div className="block sm:flex min-h-screen bg-[#f5f7fa]">
			<SideBar />

			<div className="flex-1">
				<div className="text-[#343c6a] text-2xl pt-4 px-8 bg-white shadow">
					<div className="flex justify-between">
						<h3>Transactions</h3>
						<AddTransactionBtn />
					</div>
					<ul>
						{tabOptions.map((item) => (
							<button
								key={item.value}
								type="button"
								className={`px-4 py-2 text-base relative ${
									currentTab === item.value
										? "text-[#2d60ff]"
										: "text-[#718ebf]"
								}`}
								onClick={() => setCurrentTab(item.value)}
							>
								{item.name}
							</button>
						))}
					</ul>
				</div>
				{renderContent()}
			</div>
		</div>
	);

	return userStore.userId ? (
		renderComponent()
	) : (
		<Navigate replace to="/login" />
	);
};

export default observer(Transactions);
