import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import HomeSwiper from '../components/HomePage/HomeSwiper';
import MeetSection from '../components/HomePage/MeetSection';
import CourseSection from '../components/HomePage/LectureSection';
import ChatbotModal from '../components/Chatbot';
import { locationAction } from '../store/location';

function Home() {
  const dispatch = useDispatch();
  const fetchLocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      dispatch(locationAction.setLocation({ lat, lng }));
    });
  }, [dispatch]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <>
      <Container className='mt-5'>
        <section id='about'>
          <HomeSwiper />
        </section>
        <br />
        <section id='contact'>
          <div className='container px-4'>
            <div className='row gx-4 justify-content-center'>
              <div className='col-lg-8'>
                <h2>Contact us</h2>
                <p className='lead'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero odio fugiat voluptatem dolor, provident
                  officiis, id iusto! Obcaecati incidunt, qui nihil beatae magnam et repudiandae ipsa exercitationem,
                  in, quo totam.
                </p>
              </div>
            </div>
          </div>
        </section>
        <h2>모임정보</h2>
        <MeetSection />
        <br />
        <h2>강의정보</h2>
        <CourseSection />
        <br />
        <br />
        <br />
        <ChatbotModal />
      </Container>
    </>
  );
}
export default Home;
