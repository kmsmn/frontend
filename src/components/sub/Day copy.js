import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';
import Word from './Word'
import Loader from './sub/Loader';
import NoDay from './sub/NoDay';
import styled from 'styled-components';
import DaysList from "./DaysList";
import Modal from 'react-modal/lib/components/Modal';
import NoWords from './sub/NoWords';

export default function Day() {
    const { dayNum } = useParams();
    const words = useFetchGet(`/words?day=${dayNum}`);
    const days = useFetchGet(`/days`);
    const targetRemD = useFetchGet(`/target-rem`);
    const [targetRem, setTargetRem] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const isLoading = useMemo(()=>{
        return (!words || !days || !targetRem);
    }, [words, days, targetRem])

    //재렌더링될때마다 x가 매번 선언+초기화되지 않도록 / 실행되지 않도록 해주는 hook들
    //함수: useCallback, 변수: useState / 연산: useMemo, 그 외의 명령: useEffect

    // useEffect(()=>{
    //     setIsOpen(false);
    // }, [dayNum])
    
    useEffect(()=>{
        targetRemD && setTargetRem(targetRemD[0].targetRem);
    }, [targetRemD])
    
    const openModal = useCallback(()=>{
        setIsOpen(true);
    }, [])


    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, [])
    //다른 state들이 어떻게 변하든 항상 같은 기능을 수행하면 되는 함수이므로
    //즉, 트래킹해야할 state가 없으므로, 의존배열을 비워 최초 렌더링시 단 한번만 선언되도록 함.
    //의존배열을 통해 재선언 되어야하는 조건을 지정할 수 있음

    if (!isLoading && days!=='none' && !(days.length>=dayNum && dayNum>0)){
        return <NoDay dayNum={dayNum}/>
    }

    return (
        <div className='Day'>
            <DayDisplay isLoading={isLoading} openF={openModal} dayNum={dayNum} words={words} targetRem={targetRem}/>
            <ModalDiv days={days} closeF={closeModal} isOpen={modalIsOpen}/>
        </div>
    )
}

function DayDisplay ({ isLoading, openF, dayNum, words, targetRem }) {
    console.log('daydisplay');
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='day-display'>
            <div className='title'>
                <DayNumDiv>
                    <button onClick={openF}>+</button>
                    <h2>DAY {dayNum}</h2>
                </DayNumDiv>
                <Link to='/add-word' state={{ day: dayNum }}><button>word추가</button></Link>
            </div>
            <WordsList words={words} targetRem={targetRem} dayNum={dayNum} />
        </div>
    )
}

DayDisplay = React.memo(DayDisplay);

function ModalDiv({days, closeF, isOpen}){
    // console.log('모달 렌더링');
    //첫 렌더링에서 한번, days에 배열이 들어오고 한번, 그 이후로는 isOpen값이 바뀔때마다 호출+렌더링됨
    return (
        <div className='ModalDiv'>
            <SModal
                isOpen={isOpen}
                onRequestClose={closeF}
            // style={modalStyles}
            >
                <button onClick={closeF}>x</button>
                <DaysList days={days} />
            </SModal>
        </div>
    )
}

ModalDiv = React.memo(ModalDiv);
//React.memo를 통해 ModalDiv함수가 받는 props, 즉 days, closeF, isOpen이 참조하는 값이 달라질때만
//ModalDiv 컴포넌트함수를 호출하여 렌더링해준다
//(closeF가 참조하는) closeModal이 참조하는 함수는 평상시와 같이 선언하면(ex. function func(){}나 애로우함수)
//Day가 렌더링될 때마다 다른 모든 변수들과 같이 재언선되므로 참조값이 달라진다
//(함수의 내용/코드가 같더라도 실질적인 데이터가 다름)
//따라서 값이 달라진 closeModal을 props로 받고있는 ModalDiv함수가 호출되어
//불필요한 자식 렌더링이 발생하게 되는 것이다.
//이러한 불필요한 렌더링을 방지하기 위해 closeModal을 선언할 때 useCallback을 사용해야한다.
//useCallback을 사용하면 지정한 값(두번째 인자인 의존배열 속 값들)이 바뀌지 않는한, 함수의 재선언이 이루어지지 않는다.
//결론 : 자식컴포넌트로 함수를 props로 넘겨줄 때에는
//그 함수를 useCallback으로 선언해야하며, 자식컴포넌트는 React.memo로 감싸줘야한다.

function WordsList({words, targetRem, dayNum}){
    //이 컴포넌트는 부모컴포넌트에서 loading(words, targetRem, dayNum 등 을 받아오는 과정)이 다 끝난 후에만 렌더링되는 컴포넌트이기 때문에
    //최초 렌더링 이후에는 전달받은 props들의 값에 변화가 한번도 없을 것이다.
    //따라서 WordsList=React.memo(WordsList)를 처리하지 않아도 되며, 안해야 한다.
    //React.memo로 감싼 자식컴포넌트는 props들이 가리키는 값이 최신 값인지 부모컴포넌트와 비교를 하게되는데,
    //만약 이 props들이 항상 최신 값인게 보장될 경우 불필요한 비교작업을 하게되는 것이다.

    if(words==='none'){
        return(
            <NoWords dayNum={dayNum}/>
        )
    }
    return(
        <div className='WordsList'>
            <ul>
                {words.map(word => (
                    <Word key={word.id} word={word} targetRem={targetRem} />
                ))}
            </ul>
        </div>
    )
}


const DayNumDiv = styled.div`
    display: flex;
    align-items: center;
`
const SModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* margin: auto; */
    width: 70%;
    height: 50%;
    overflow: auto;
    /* opacity: 0.8; */
    background-color: beige;
    border-radius: 20px;
    padding: 20px;
    button{
        background-color: transparent;
        border: none;
        font-size: 1.3rem;
    }
`

// Modal.defaultStyles.overlay.backgroundColor = 'cornsilk';

// const modalStyles = {
//     overlay: {
//     },
//     content: {
//         top: '30%',
//         bottom: 'auto',
//         border: 'none',
//         borderRadius: '20px',
//         backgroundColor: 'beige',
//         opacity: '0.8'
//     }
// }