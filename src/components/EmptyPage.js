import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <div className="EmptyPage">
            <div>
                <h2>Wrong URL</h2>
                <Link to='/'><button>Home</button></Link>
            </div>
        </div>
    )
}