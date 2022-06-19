import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosAPI from "../api/axiosAPI";
import useFetchGet from "../hooks/useFetchGet";
import useNavError from "../hooks/useNavError";
import GoBackButton from "./sub/GoBackButton";

export default function AddDay() {
    const days = useFetchGet('/days');
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const navError = useNavError();
    const daysLength = useMemo(()=>{
        return (!days || days==='none') ? 0 : days.length;
    }, [days])

    async function btnAddH() {
        setIsPending(true);
        try{
            await axiosAPI.post('/days', { dayNum: daysLength + 1 });
            navigate('/add-word', {replace: true, state:{day: daysLength + 1}});
        } catch (err){
            navError(err);
        }
        setIsPending(false);
    }

    return (
        <div className="AddDay">
            <div className="title">
                <h2>현재 day수 : {!days ? 'loading...' : daysLength}</h2>
            </div>
            <GoBackButton />
            <button onClick={btnAddH} disabled={!days || isPending}>
                {!days || isPending ? 'loading..' : 'day추가'}
            </button>
        </div>
    )
}