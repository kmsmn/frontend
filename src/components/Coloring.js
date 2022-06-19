import React, { useContext } from 'react';
import styled from 'styled-components';
import { DataContext } from './Day';

export default function Coloring({ rem }) {
    const [ , targetRem] = useContext(DataContext);
    
    const stamps = [];
    for (let i = 0; i < targetRem; i++) {
        if (i < rem) {
            stamps.push(`💗`);
        } else {
            stamps.push(`🤍`);
        }
    }

    return (
        <div className="Coloring">
            <ContainerDiv>
                <div>
                    {stamps}
                </div>
            </ContainerDiv>
        </div>
    )
}

Coloring = React.memo(Coloring);
//이 작업을 하지 않으면, 부모컴포넌트인 Word에서 isPending값이 변경될때마다 불필요한 렌더링이 발생한다.
//따라서 부모컴포넌트에서 props로 받고있는 rem과 targetRem이 최신데이터로 업데이트 됐을 때만 렌더링이 일어나도록 해주는 작업이다.

const ContainerDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    div{
        background-color: beige;
        display: block;
        width: 60%;
        text-align: center;
        padding: 3px;
    }
`;