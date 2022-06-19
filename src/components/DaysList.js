import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function DaysList({days}){
    return(
        <nav className='DaysList'>
            <SOl>
                {days.map(day => (
                    <li key={day.id}>
                        <SNavLink to={`/day/${day.dayNum}`}
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                        >
                            Day {day.dayNum}
                        </SNavLink>
                    </li>
                ))}
            </SOl>
        </nav>
    )
}

const SNavLink = styled(NavLink)`
    padding: 10px 13px;
    display: inline-block;
    width: 60px;
    text-align: center;
    border: none;
    color: beige;
    background-color: skyblue;
    border-radius: 5px;
    &:hover{
        background-color: powderblue;
    }
    &.active{
        color: #FF3873;
        font-weight: bold;
    }
`;

const SOl = styled.ol`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 20px;
    li{
        margin: 8px
    }
`;