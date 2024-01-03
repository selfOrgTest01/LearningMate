import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import geolib from 'geolib';
import { conditionRadius } from '../../constants/math';

function NearByMyLocationSection() {
  const radius = conditionRadius;
  const reduxLat = useSelector((state) => state.location.lat);
  const reduxLng = useSelector((state) => state.location.lng);

  // 2km 반경 내 더미 데이터 생성

  const [locationsWithinRadius, setLocationsWithinRadius] = useState([]);

  useEffect(() => {
    const myLocation = { latitude: reduxLat, longitude: reduxLng };
    const dummyData = [
      { lat: 37.545549, lng: 127.064466 },
      { lat: 37.546, lng: 127.065 },
      { lat: 37.545, lng: 127.063 },
      { lat: 37.5448, lng: 127.0647 },
      { lat: 37.5452, lng: 127.0653 },
      { lat: 37.55, lng: 127.07 },
      { lat: 37.54, lng: 127.06 },
      { lat: 37.5505, lng: 127.0655 },
      { lat: 37.5402, lng: 127.0597 },
      { lat: 37.546, lng: 127.07 },
    ];
    console.log(myLocation);
    console.log(dummyData);
    console.log(radius);
    // const locationsInRadius = dummyData.filter((location) => geolib.isPointWithinRadius(location, myLocation, radius));
    // setLocationsWithinRadius(locationsInRadius);
    console.log(myLocation);
  }, [reduxLat, reduxLng, radius]);
  return (
    <>
      <h1>내 근처에는 뭐가 있을까</h1>
      <h2>{locationsWithinRadius}</h2>
    </>
  );
}
export default NearByMyLocationSection;
