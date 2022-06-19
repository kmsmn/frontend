import styled from "styled-components"

export default function Loader(){
    return(
        <SP>Loading...</SP>
    )
}

const SP = styled.p`
    text-align: center;
    font-weight: lighter;
    padding: 20px;
    font-size: 1.3rem;
`;