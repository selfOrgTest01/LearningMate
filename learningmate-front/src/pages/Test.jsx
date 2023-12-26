//서버 테스트용 페이지
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
function Test() {
    const [data, setData] = useState({});
    const [isloading, setLoading] = useState(true);
    //배포 서버 테스트 하실때 주석제거하시고 serverDomain을 사용하시면 됩니다
    //로컬 서버 테스트 하실때는 localDomain을 사용하시면 됩니다
    // const serverDomain = 'https://port-0-learningmate-server-5r422alqajqbni.sel4.cloudtype.app';
    const localDomain = 'http://localhost:8000';
    const fn_get_data = useCallback(async () => {
        try {
            //데이터 get요청 withCredentials: true 옵션을 추가하면 세션 쿠키가 요청에 올바르게 포함되어 서버에 전달됩니다.
            const resp = await axios.get(`${localDomain}/test/data`, { withCredentials: true });
            console.log(resp.data);
            if (resp.data.resdata === false) window.alert('불러오기 실패');
            else setData((data) => ({ ...data, ...resp.data.resdata }));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fn_get_data();
    }, [fn_get_data]);
    if (isloading) {
        return <div>Loading....</div>;
    } else {
        return (
            <>
                <h1>test</h1>
                {/* John Doe 출력 */}
                <h2>Sever Data:</h2>
                <h2>테스트용입니다~!!</h2>
                <h2>email:{data.email}</h2>
                <h2>nickname:{data.nickname}</h2>
            </>
        );
    }
}

export default Test;
