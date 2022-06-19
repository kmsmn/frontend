import { useEffect, useState } from "react";

export default function useHook() {
    console.log('hook함수 실행 시작');
    const [isPending, setIsPending] = useState(false);

    useEffect(()=>{
        console.log('훅 내부 렌더링(=return문 반영) 후에 실행');
        console.log('Hook IsPending : ', isPending);
        //useHook()가 첫번째로 호출되었을때 최초한번, setIsPending이 호출되어 useHook이 처음부터 다시 실행될때 한번,
        //setNewState가 호출되어 Test가 처음부터 다시 실행되어, useHook이 호출되었을때 내부의 return까지 한 후에 한번, 총 3번 호출됨 
    })

    useEffect(()=>{
        setTimeout(() => {
            console.log('1초경과, 훅 내부 setState 호출됨');
            setIsPending(!isPending);
        }, 1000);
    }, [])

    console.log('useEffect호출 전에 실행됨');


    return (
        'success'
    )
}