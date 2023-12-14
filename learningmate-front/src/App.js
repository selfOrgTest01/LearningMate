import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
function App() {
    const [data, setData] = useState({});
    const [isloading, setLoading] = useState(true);
    const getData = useCallback(async () => {
        try {
            const resp = await axios.get('http://localhost:8000/test/data');
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
        getData();
    }, [getData]);
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

export default App;
