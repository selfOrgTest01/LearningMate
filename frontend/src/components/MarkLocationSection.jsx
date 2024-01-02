import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';

function MarkLocationSection() {
  const reduxLat = useSelector((state) => state.location.lat);
  const reduxLng = useSelector((state) => state.location.lng);
  return (
    <Map
      center={{ lat: reduxLat, lng: reduxLng }} // 지도의 중심 좌표
      style={{ width: '800px', height: '600px' }} // 지도 크기
      level={3}
    >
      <MapMarker position={{ lat: reduxLat, lng: reduxLng }}>
        <div style={{ color: '#000', textAlign: 'center' }}>내위치</div>
      </MapMarker>
    </Map>
  );
}

export default MarkLocationSection;
