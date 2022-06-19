import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import axiosAPI from "../api/axiosAPI";
import useFetchGet from "../hooks/useFetchGet";
import useNavError from "../hooks/useNavError";
import GoBackButton from "./sub/GoBackButton";
import Loader from "./sub/Loader";
import NoDays from "./sub/NoDays";

export default function AddWord() {
    const days = useFetchGet('/days');
    const location = useLocation();
    const [isPending, setIsPending] = useState(false);
    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);
    const navError = useNavError();

    useEffect(() => {
        if(days && location.state){
            const { day } = location.state;
            if(day){
                dayRef.current.value = String(day);
            }
        }
    }, [days])


    async function submitH(e) {
        e.preventDefault();
        const body = {
            day: Number(dayRef.current.value),
            eng: engRef.current.value,
            kor: korRef.current.value,
            rem: 0
        };
        setIsPending(true);
        try {
            await axiosAPI.post('/words', body);
            alert('등록되었습니다');
            engRef.current.value = "";
            korRef.current.value = "";
            engRef.current.focus();
        } catch (err) {
            navError(err);
        }
        setIsPending(false);
    }

    return (
        <div className="AddWord">
            <div className="title">
                <h2>추가할 단어를 작성해 주세요</h2>
            </div>
            <GoBackButton />
            {
                {
                    null: <Loader />,
                    'none': <NoDays />
                }[days] ||
                    <form onSubmit={submitH}>
                        <InputDiv>
                            <label htmlFor="eng">영어 : </label>
                            <input type='text' pattern="[a-z]+" required autoFocus placeholder="box" ref={engRef} id='eng' />
                        </InputDiv>
                        <InputDiv>
                            <label htmlFor="kor">한국어 : </label>
                            <input type='text' pattern="[가-힣~, ]+" required placeholder="상자" ref={korRef} id='kor' />
                        </InputDiv>
                        <InputDiv>
                            <label htmlFor="day">DAY : </label>
                            <select name='days' required ref={dayRef} id='day' disabled={!days}>
                                <option value="">선택</option>
                                {days.map(day => (
                                    <option key={day.id} value={day.dayNum}>
                                        {day.dayNum}
                                    </option>
                                ))}
                            </select>
                        </InputDiv>
                        <button disabled={isPending}>
                            {isPending ? `loading..` : `저장`}
                        </button>
                    </form>            
            }
        </div>
    )
}

//https://www.delftstack.com/howto/react/react-switch/
//https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/
//https://ko.reactjs.org/docs/conditional-rendering.html
//다양한 조건부 렌더링

const InputDiv = styled.div`
    padding: 5px;
    margin-left: 10px;
`;
