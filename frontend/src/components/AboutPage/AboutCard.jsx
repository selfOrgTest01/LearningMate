import { Container } from 'react-bootstrap';

function AboutCard() {
  return (
    <>
      <Container>
        <div className='card mb-3 mt-3' style={{ width: '100%' }}>
          <div className='row g-0'>
            <div className='col-md-4 d-flex align-items-center justify-content-center'>
              <img
                src={`${process.env.PUBLIC_URL}/img/Hani.jpg`}
                className='img-fluid rounded-start'
                alt='profile_image'
                style={{
                  height: '100%',
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h3 className='card-title'>연제헌</h3>
                <p className='card-text'>
                  안녕하세요 프론트엔드 개발자 취업캠프(React) - 4회차 1조 러닝메이트의 조장을 맡은 연제헌입니다.
                  <br /> 러닝메이트 프로젝트에서 회원가입, 로그인, 챗봇, 클라우드타입배포, 깃허브 협업환경구성,
                  <br />
                  about페이지, 강의페이지, 카카오맵 api 관련 기능, 홈페이지, 유저정보, 강의댓글, 강의페이지와 <br />{' '}
                  관련된 DB 를 맡아서 구현했습니다. 프론트엔드 프로젝트는 처음이라 모자란점이 많아요
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default AboutCard;
