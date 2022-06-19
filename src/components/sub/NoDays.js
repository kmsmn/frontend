import { Link } from "react-router-dom"

export default function NoDays() {
    return (
        <div className="NoDays">
            <h3>There are no days!</h3>
            <Link to='/add-day'><button>day 추가하러 가기</button></Link>
        </div>
    )
}