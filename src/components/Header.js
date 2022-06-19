import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";

export default function Header() {
    const [isShow, setIsShow] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        setIsShow(isShow => false);
    }, [location.pathname])

    // const toggleShow = useCallback(() => {
    //     setIsShow(!isShow);
    // }, [isShow]);
    const toggleShow = useCallback(() => {
        setIsShow(isShow => !isShow);
    }, []);
    //의존배열이 비어있으므로 이 함수는 최초 렌더링 한번만 선언이 된다.
    //그러면 실제 isShow의 값이 바뀌었어도,
    //이 함수 내에서 isShow가 참조하는 값은 업데이트 전의 옛날 데이터를 가리키게 된다(클로저에 의해)
    //따라서 isShow에 대해서는 모두 함수형 업데이트를 함으로써 isShow가 항상 최신 값을 가리키도록 한다.
    //이 처리를 해주면 isShow는 어디서든 항상 최신의 값을 보장받을 수 있으므로 의존배열을 비워놔도 되는 것이다.

    return (
        <div className="Header">
            <header>
                <Title clickF={toggleShow} isShow={isShow}/>
                {isShow &&
                    <nav>
                        <SUl>
                            <li><Link to="/add-day">day추가</Link></li>
                            <li><Link to="/add-word">word추가</Link></li>
                            <li><Link to="/change-rem">👀변경</Link></li>
                        </SUl>
                    </nav>
                }
            </header>
        </div>
    )
}

function Title({clickF, isShow}){
    console.log('title');
    return(
        <SDiv>
            <h1><Link to="/">영단어 노트</Link></h1>
            <button onClick={clickF}>
                <FontAwesomeIcon icon={isShow ? faAngleUp : faAngleDown} />
            </button>
        </SDiv>
    )
}

Title = React.memo(Title);

const SDiv = styled.div`
  background-color: skyblue;
  text-align: center;
  position: relative;
  button{
    position: absolute;
    top: 20px;
    right: 0;
  }
`;

const SUl = styled.ul`
    a{
        display: block;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #F2F9FB;
        margin: 3px 0;
    }
    a:hover{
        background-color: #E4F6F8;
    }
`