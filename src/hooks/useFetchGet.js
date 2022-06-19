import { useEffect, useState } from "react"
import axiosAPI from "../api/axiosAPI";
import useNavError from "./useNavError";

export default function useFetchGet(URL) {
    const [data, setData] = useState(null);
    const navError = useNavError();
    
    useEffect(()=>{
        if(!data){
            axiosAPI.get(URL)
            .then(res=>{
                res.data.length ? setData(res.data) : setData('none')
            })
            .catch(navError)
        }
    }, [data])

    useEffect(()=>{
        setData(null);
    }, [URL])

    return data;
}