import useFetchGet from "../hooks/useFetchGet";
import DaysList from "./DaysList";
import Loader from "./sub/Loader";
import NoDays from "./sub/NoDays";

export default function Days() {
    const days = useFetchGet('/days');

    if(!days){
        return <Loader />
    }

    return (
        <div className="Days">
            <div className='title'>
                <h2>DAYS</h2>
            </div>
            {days==='none' ? <NoDays /> : 
                <DaysList days={days}/> 
            }
        </div>
    )
}