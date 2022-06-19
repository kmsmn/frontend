import { useEffect, useState } from "react"
import axiosAPI from "../api/axiosAPI";
import useNavError from "./useNavError";

export default function useFetchGet(URL) {
    const [data, setData] = useState(null);
    const navError = useNavError();
    
    useEffect(async ()=>{
        if(!data){
            // console.log('get', URL);
            try {
                const res = await axiosAPI.get(URL);
                res.data.length ? setData(res.data) : setData('none');
            } catch (err){
                navError(err);
            }
        }
    }, [data])

    useEffect(async ()=>{
        setData(null);
    }, [URL])

    return data;
}