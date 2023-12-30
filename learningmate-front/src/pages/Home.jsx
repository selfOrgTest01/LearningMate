import { useEffect } from 'react';
import { locationAction } from '../store/location';
import { useDispatch } from 'react-redux';
import ImageUploader from '../components/ImageUploader';

function Home() {
<<<<<<< HEAD
  return (
      <>
          <h1>Home</h1>
      </>
  );
=======
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
            <ImageUploader />
        </>
    );
>>>>>>> 13309560540278241bffac1940e284da9279a450
}
export default Home;