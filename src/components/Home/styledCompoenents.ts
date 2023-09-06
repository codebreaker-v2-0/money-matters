import styled from "@emotion/styled";

export const HeaderContainer = styled.div`
    padding: 1rem;
    background-color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    /* container-type: inline-size; */
`

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #343c6a;
    font-size: 1.25rem;

    @container (width < 300px) {
        flex-direction: column;
        gap: 0.5rem;
    }
`