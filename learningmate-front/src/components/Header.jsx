import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth';
import axios from 'axios';

function Header() {
    const dispatch = useDispatch();
    const fn_logout_user = useCallback(async () => {
        await axios.get('http://localhost:8000/users/logout', { withCredentials: true });
        dispatch(authAction.logout());
        window.location.reload();
    }, [dispatch]);
    return (
        <>
            <h1>Header</h1>
            <button onClick={fn_logout_user}>로그아웃</button>
        </>
    );
}
export default Header;
