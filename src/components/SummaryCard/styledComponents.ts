import styled from "@emotion/styled";

export const SummaryCardContainer = styled.div`
    flex: 1;
    border-radius: 0.75rem;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    container-type: inline-size;
`

export const SummaryCardContent = styled.div`
    display: flex;
    justify-content: space-between;

    & img {
        max-height: 120px;
    }

    @container (width < 250px) {
        flex-direction: column;
        
        & img {
            align-self: flex-end;
            max-height: 80px;
        }
    }
`