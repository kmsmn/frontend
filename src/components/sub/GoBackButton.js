import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons"

export default function GoBackButton() {
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }

    return (
        <div className="GoBackButton">
            <Button onClick={goBack}>
                <FontAwesomeIcon icon={faHandPointLeft} />
            </Button>
        </div>
    )
}

const Button = styled.button`
    color: orange;
    font-size: 1rem;
`;