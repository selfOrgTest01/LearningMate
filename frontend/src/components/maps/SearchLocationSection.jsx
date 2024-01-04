// 추가할 기능: 검색결과 ui목록 구현, 검색한 마커의 위도와 경도를 db에 보낼 state에 저장, 맵을 클릭해서 나온 위도와 경도를 db에 보낼 state에 저장
import { useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';

function SearchLocationSection() {
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  // position을 axios통신으로 저장하시면 마우스로 찍은게 저장이됩니다.
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [map, setMap] = useState(false);
  const [info, setInfo] = useState(null);
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
        // 검색 후 마커들을 띄웁니다.
        if (newMarkers.length > 0) {
          setInfo(newMarkers[0]);
        }
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 막기
    searchLocation();
  };

  const onClickHandlerMarker = (marker) => {
    // 더블클릭하면 맵중앙으로 마커이동
    const moveLatLon = new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng);
    map.panTo(moveLatLon);
    setInfo(marker); // 문제가 생기는 코드다 info가 안뜨는 마커를 눌렀을때 이상한 위치로 이동하는 문제가 생긴다 => 검색된 마커의 거리가 너무 멀때 발생하는 에러인데 아마 api자체에러인듯
  };
  return (
    <Container>
      {/* mx-auto: 중앙정렬 */}
      <Form className='mx-auto' style={{ width: '50%' }} onSubmit={handleFormSubmit}>
        <InputGroup className='mb-3'>
          <Form.Control
            type='text'
            value={keyword}
            required
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='장소를 검색하세요'
          />
          <Button variant='primary' type='button' onClick={searchLocation}>
            검색
          </Button>
        </InputGroup>
      </Form>
      <Container className='d-flex justify-content-center align-items-center'>
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
      </Container>
      {position && <p>{`클릭한 위치의 위도는 ${position.lat}이고, 경도는 ${position.lng} 입니다`}</p>}
      <h3>원하는 장소를 지도에 클릭하세요</h3>
    </Container>
  );
}

export default SearchLocationSection;
