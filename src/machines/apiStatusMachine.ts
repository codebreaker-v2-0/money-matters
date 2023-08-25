import { createMachine } from "xstate";

const apiStatusMachine = createMachine({
	id: "apiStatusMachine",
    initial: "pending",
	states: {
        pending: {
            invoke: {
                src: "fetchData",
                onDone: "successful",
                onError: "failed"
            }
		},
		successful: { type: "final" },
        failed: { 
            on: {
                RETRY: "pending"
            }
         },
    },
}, );

export default apiStatusMachine;
