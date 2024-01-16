import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function LectureDetailSection({ lectureInfo }) {
  const lectureDetail = useSelector((state) => state.lectureDetail);
  const { content } = lectureDetail;
  return (
    <>
      <Container>
        <h2 className='mt-2'>{lectureDetail.title}</h2>
        <div className='d-flex align-items-center'>
          <div className='flex-shrink-0'>
            <img
              src={lectureDetail.registerProfile}
              alt={`default.png`}
              style={{ width: '70px', maxHeight: '70px', borderRadius: '40px' }}
            />
          </div>
          <div className='flex-grow-1 ms-3'>
            <h4>{lectureDetail.registerNickname}</h4>
          </div>
        </div>
      </Container>
      <Container className='my-3' style={{ width: '100%', backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
        <h4>
          조회수:{lectureInfo.views} 등록일:{lectureDetail.createdAt}
        </h4>
        {/* dispatch때 문자열로 저장한 content 문자열을 <div>로 나눠서 하나씩 출력하면 줄바꿈이 적용되어서 화면에 나옴 */}
        {content.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Container>
    </>
  );
}

export default LectureDetailSection;
