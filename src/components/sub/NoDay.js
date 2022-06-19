import { Link } from "react-router-dom"

export default function NoDay({dayNum}){
    return(
        <div className="NoDay">
            <h2>There's no DAY {dayNum}!</h2>
            <Link to='/'><button>Home</button></Link>
        </div>
    )
}