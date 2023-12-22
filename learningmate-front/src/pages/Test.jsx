//서버 테스트용 페이지
import { useCallback, useEffect, useState } from 'react';
import { serverDomain } from '../config/config';
import axios from 'axios';
function Test() {
    const [data, setData] = useState({});
    const [isloading, setLoading] = useState(true);
    //배포 서버 테스트 하실때  serverDomain을 사용하시면 됩니다 config.jsx에 설정해놨어요
    //로컬 서버 테스트 하실때는 localDomain을 사용하시면 됩니다
    // const localDomain = 'http://localhost:8000';
    const fn_get_data = useCallback(async () => {
        try {
            //데이터 get요청
            const resp = await axios.get(
                `https://port-0-learningmate-server-5r422alqajqbni.sel4.cloudtype.app/test/data`
            );
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
                <h2>name:{data.name}</h2>
                <h2>age:{data.age}</h2>
            </>
        );
    }
}

export default Test;
