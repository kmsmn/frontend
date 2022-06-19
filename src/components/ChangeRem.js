import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axiosAPI from "../api/axiosAPI";
import useFetchGet from "../hooks/useFetchGet";
import useNavError from "../hooks/useNavError";
import GoBackButton from "./sub/GoBackButton";
import Loader from "./sub/Loader";
const rangeMax = 10;


export default function ChangeRem(){
    const targetRemD = useFetchGet('/target-rem');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();
    const rangeRef = useRef(null);
    const [targetRem, setTargetRem] = useState(null);
    const [rangeVal, setRangeVal] = useState(null);

    const navError = useNavError();

    useEffect(()=>{
        if (targetRem){
            setRangeVal(targetRem);
            rangeRef.current.value = targetRem;
        }
    },[targetRem])

    useEffect(()=>{
        targetRemD && setTargetRem(targetRemD[0].targetRem);
    }, [targetRemD])


    function changeVal(e){
        setRangeVal(Number(e.target.value));
    }

    async function changeRem(e){
        e.preventDefault();
        setIsPending(true);
        try{ 
            await axiosAPI.put('/target-rem/1', { targetRem: rangeVal });
            navigate('/');
        } catch (err) {
            navError(err);
        }
        setIsPending(false);
    }

    return(
        <div className="ChangeRem">
            <div className="title">
                <h2>암기 횟수를 지정하세요</h2>
            </div>
            <GoBackButton />
            {!targetRem ? <Loader /> :
                <form onSubmit={changeRem}>
                    <RangeDiv>
                        <input type='range' ref={rangeRef} min={1} max={rangeMax} onChange={changeVal}/>
                        <p>👀{rangeVal}회</p>
                    </RangeDiv>
                    <button disabled={isPending}>{isPending?'loading..':'저장'}</button>
                </form>
            }
        </div>
    )
}

const RangeDiv = styled.div`
    text-align: center;
    padding: 20px;
    input{
        width: 50%;
    }
`;