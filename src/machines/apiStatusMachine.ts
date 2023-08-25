import { createMachine } from "xstate";

const apiStatusMachine = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMAOBLAygF2dgrrALLIDGAFugHZgB0qYVE1UAxBAPY23UBuHAazposuAsTKVuDJiwR8OpPOi4BtAAwBdDZsShUHWOmwqqekAA9EAJgDMADloBOWwHYArLYCMt634As6va2ADQgAJ6IwbSu-k7x9l6utgBsrin+1gC+WWEiOHiEJBTUdDLMVGxgAE7VHNX0ADZ4AGb1ALa0+WJFkqX0jBVQ8lT8SiZqWjrmBkYTZkiWNg7Obp4+ftaBwWGRCF6JMXHx7k6egbYOOXkYBeLFUnQtyOiNkKwASgCiACofAJrTRazYymcxWBDWJyuWhJLxOdSIlJrby7RA+Ly0LbxJz2fxxWz+VxOHK5EBUDgQODmbqFCQlGgzQygrjgxAAWhSaIQnNoiP5AoFXn81xAtPufWkgxYTLmYMWEMy3K8QSx7n5qTsrnSXmyZPFvQZdFg+FIpDgsBa+EaspZC1AitV9lO-hVTmsKRS8Qy3MO6oFrmFvnxooN9MetGer0gtvmbIQ21ozqcrvU7s93v8yo8sM9KXsGVc6hS1nUItJQA */
	id: "apiStatusMachine",
    initial: "pending",
    schema: {
        services: {} as {
            fetchData: {
                data: string
            }
        }
    },
    tsTypes: {} as import("./apiStatusMachine.typegen").Typegen0,
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
