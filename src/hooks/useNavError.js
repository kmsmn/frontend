import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useNavError() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        error && console.log(error.request, error.response, error.message);
        //axios의 오류 반환
        //https://yamoo9.github.io/axios/guide/error-handling.html
        //백엔드에 통신자체를 하지 못하면 (ex.서버측 문제발생) Error오브젝트를 반환함 
        //catch에서 전달받은 Error오브젝트는 message만 담고 있으며, request와 response는 undefined이다.
        //백엔드에 request(요청)은 성공적으로 보냈으나, 아무 response(응답)을 돌려받지 못하면 Error오브젝트를 반환함
        //request와 message는 내용을 담고 있으나, response는 undefined
        //백엔드에 request을 보내고 response을 돌려받았으나, response의 status code가 2xxx범위를 벗어난다면(ex.잘못된url로 404) Error오브젝트를 반환함
        //request, response, message 모두 내용을 담고있다.
            //이 부분이 fetch와 크게 다름 
            //fetch는 response의 status가 정상범위가 아니어도(ex.404), 에러를 반환하지 않기 때문에,
            //response.ok를 확인하여 이가 false일 경우 Error객체를 직접 throw해줘야 정상적인 오류 처리가 가능하다.(statusText 등의 정보를 담아 Error객체를 throw)
        error && navigate('/error', {replace: true, state: { error } });
    }, [error])

    return setError;
}
