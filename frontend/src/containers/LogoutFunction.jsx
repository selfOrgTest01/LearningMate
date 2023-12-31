import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth';
import { useCallback } from 'react';

function LogoutFunction() {
    const dispatch = useDispatch();
    const logout_user = useCallback(async () => {
        await axios.get('http://localhost:8000/users/logout', { withCredentials: true });
        dispatch(authAction.logout());
        window.location.reload();
    }, [dispatch]);

    return logout_user;
}

export default LogoutFunction;
