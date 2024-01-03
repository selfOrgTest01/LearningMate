// 추가할 기능: 검색결과 ui목록 구현, 검색한 마커의 위도와 경도를 db에 보낼 state에 저장, 맵을 클릭해서 나온 위도와 경도를 db에 보낼 state에 저장
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';

function SearchLocationSection() {
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  // position을 axios통신으로 저장하시면 마우스로 찍은게 저장이됩니다.
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [map, setMap] = useState(false);
  const [info, setInfo] = useState();
  const reduxLat = useSelector((state) => state.location.lat);
  const reduxLng = useSelector((state) => state.location.lng);

  const searchLocation = async () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = [];

        for (let i = 0; i < data.length; i += 1) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(newMarkers);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  const onClickHandlerMarker = (marker) => {
    setInfo(marker);
    // 더블클릭하면 마커가 지도의 중앙이 됩니다
    const moveLatLon = new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng);
    map.panTo(moveLatLon);
    // map.setCenter(moveLatLon);
  };
  return (
    <Container>
      <h1>SearchLocationSection</h1>
      <Map
        center={{ lat: reduxLat, lng: reduxLng }} // 지도의 중심 좌표 홈에서 수집한 위치정보를 기준으로함
        style={{ width: '800px', height: '600px' }} // 지도 크기
        level={2}
        onCreate={setMap}
        disableDoubleClickZoom={true} // 더블클릭 확대 끔
        // 클릭한 위치의 위도 경도를 받는 이벤트 소수점6자리까지만 받는다
        onClick={(_t, mouseEvent) =>
          setPosition((current) => ({
            ...current,
            lat: mouseEvent.latLng.getLat().toFixed(6),
            lng: mouseEvent.latLng.getLng().toFixed(6),
          }))
        }
      >
        {/* 내위치 마커 생성 */}
        <MapMarker position={{ lat: reduxLat, lng: reduxLng }}>
          <div style={{ color: '#000', textAlign: 'center' }}>내위치</div>
        </MapMarker>
        {/* 클릭으로 마커 생성 */}
        {position && <MapMarker position={position} />}
        {/* 키워드 검색으로 주변 마커 생성 */}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => onClickHandlerMarker(marker)}
          >
            {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
      {position && <p>{`클릭한 위치의 위도는 ${position.lat}이고, 경도는 ${position.lng} 입니다`}</p>}
      <div>
        <input
          type='text'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='장소를 검색하세요'
        />
        <button type='button' onClick={searchLocation}>
          검색
        </button>
      </div>
    </Container>
  );
}

export default SearchLocationSection;
