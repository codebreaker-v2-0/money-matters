import { createMachine } from "xstate";

const apiStatusMachine = createMachine({
    id: "apiStatusMachine",
    initial: "pending",
    states: {
        pending: {
            on: {
                SUCCESS: 'successful',
                FAIL: 'failed'
            }
        },
        successful: { type: 'final'},
        failed: { type: 'final'}
    }
});

export default apiStatusMachine;