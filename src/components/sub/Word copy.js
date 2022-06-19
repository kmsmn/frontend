import { useEffect, useMemo, useState } from "react";
import Coloring from "./Coloring";
import styled from 'styled-components';
import { css } from "styled-components";
import useNavError from "../hooks/useNavError";
import axiosAPI from "../api/axiosAPI";

export default function Word({ word, targetRem }) {
    const { id, eng, kor, rem: _rem } = word;
    const [rem, setRem] = useState(_rem);
    const [deleted, setDeleted] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const URL = `/words/${id}`;
    const navError = useNavError();
    const [leftRem, isDone] = useMemo(()=>{
        return [targetRem - rem, rem >= targetRem];
    }, [rem]);
    // const isDone = useMemo(()=>{
    //     return rem >= targetRem
    // }, [rem]);
    
    // useEffect(()=>{
    //     console.log('isShow가 바뀐 후', isShow);
    //     return()=>{
    //         console.log('isShow가 바뀌기 전', isShow);
    //     }
    // },[isShow])

    useEffect(()=>{
        return ()=>{
            // console.log('이 컴포넌트가 언마운팅 될때 1회'); 
            setIsPending(false);
        }
    }, [])

    async function incrRem() {
        if (isDone) {
            return initRem();
        }
        setIsPending(true);
        try{
            await axiosAPI.put(URL, { ...word, rem: rem + 1 });
            setRem(rem + 1);
        } catch (err){
            navError(err);
        }
        setIsPending(false);
    }

    async function initRem() {
        setIsPending(true);
        try {
            await axiosAPI.put(URL, { ...word, rem: 0 });
            setRem(0);
        } catch (err){
            navError(err);
        }
        setIsPending(false);
    }
    
    function toggleShow() {
        setIsShow(!isShow);
    }
    
    async function delWord() {
        setIsPending(true);
        try{
            await axiosAPI.delete(URL);
            setDeleted(true);
        } catch (err){
            navError(err);
        }
        setIsPending(false);
    }

    
    if (deleted) {
        return null;
    }


    return (
        <SLi className="Word" isDone={isDone}>
            <MainDiv >
                <h3>
                    {eng}{isShow && ` (${kor})`}
                </h3>
                <div>
                    <button onClick={incrRem} disabled={isPending}>
                        {isPending ? `loading..` : `${isDone ? '♻' : `👀${targetRem - rem}/${targetRem}`} `}
                    </button>
                    <button onClick={toggleShow}>
                        {isShow ? '뜻숨기기' : '뜻보이기'}
                    </button>
                    <button onClick={delWord} disabled={isPending}>
                        {isPending ? 'loading...' : '삭제'}
                    </button>
                </div>
            </MainDiv>
            <Coloring rem={rem} targetRem={targetRem} />
            <hr/>
        </SLi>
    )
}

const SLi = styled.li`
    padding: 20px;
    background-color: ${props=>props.isDone?'lightgrey':'none'};
    opacity: ${({isDone})=>isDone ? 0.5 : 1};
    button{
        height: 25px;
    }
    h3{
        ${({isDone})=> isDone && 
        css`
            font-style: italic;
            text-decoration: line-through ;
        `}
    }
`;

const MainDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    div{
        display: flex;
        flex-direction: column;
    }
`;