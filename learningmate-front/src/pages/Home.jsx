
import { useEffect } from 'react';
import { locationAction } from '../store/location';
import { useDispatch } from 'react-redux';

function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchLocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                dispatch(locationAction.setLocation({ lat, lng }));
            });
        };
        fetchLocation();
    }, [dispatch]);
    return (
        <>
            <h1>Home</h1>
        </>
    );
}
export default Home;
