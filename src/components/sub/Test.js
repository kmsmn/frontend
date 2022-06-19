import { useEffect, useRef, useState } from "react";
import useHook from "../../hooks/useHook"

export default function Test() {
    console.log('test함수 실행 시작'); //컴포넌트에서 사용한 훅 내부의 state가 바뀌었을 때도 컴포넌트 함수가 처음부터 다시 실행됨
    const success = useHook();
    // console.log(success);
    const [newstate, setNewstate] = useState(false);
    const divRef = useRef(null);

    useEffect(()=>{
        console.log('컴포넌트 내부 최초 렌더링 혹은 재렌더링(setState호출되면 일어남) 후에 실행');
        console.log(divRef.current.innerText);
        console.log('newState : ', newstate);
        console.log('rendered');
        console.log('----------------------');
        //최초한번, setIsPending이 호출되어 재렌더링이 완료된 이후에 한번,
        //setNewstate가 호출되어 재렌더링이 완료된 이후에 한번, 총 3번 호출됨
    })

    useEffect(()=>{
        setTimeout(() => {
            console.log('2초경과, 컴포넌트 내부 setState 호출됨');
            setNewstate(true);
        }, 2000);
    }, [])

    console.log('useEffect호출 전에 실행됨');

    // 함수 컴포넌트(Day())내부에서 setState함수가 호출될 때마다,
    // 또는 컴포넌트에서 사용하는 함수 훅(useFetchGet())내부에서 setState함수가 호출될 때마다
    // 재렌더링이 발생한다
    // 재렌더링이란 컴포넌트함수 안의 명령이 처음부터 다시 실행되면서, return문 안의 DOM이 업데이트되는 과정이다.
    // 단, useEffect는 설정한 조건에 따라 실행되거나 실행되지 않기도 한다.
    // 예를 들어, 인자가 콜백함수 뿐인 기본 useEffect()는 첫번째 렌더링때와 DOM 업데이트가 완료될 때마다 실행된다.
    // 반면, 두번째 인자에 빈 배열을 전달하는 useEffect()는 첫번째 렌더링이 완료된 후에만 단 한 번 실행된다.


    return (
        <div className="Test" ref={divRef}>
            {success}
        </div>
    )
}