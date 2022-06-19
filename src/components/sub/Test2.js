import { useLocation } from "react-router-dom"

export default function Test2() {
    const location = useLocation();
    const {test:testA, testB} = location.state;
    // const [testA, testB] = location.state;
    console.log(testA, testB, location);

    return (
        <>
            <div>
                테스트2화면
            </div>
        </>
    )
}