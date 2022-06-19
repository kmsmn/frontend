import { Link, useLocation } from "react-router-dom"

export default function ErrorDisplay() {
    const location = useLocation();
    const {error} = location.state;

    return (
        <div className="ErrorDisplay">
            <h2>Sorry! There was an error :(</h2>
            <p>TypeError : {error.message}</p>
            <Link to='/'><button>Home</button></Link>
        </div>
    )
}