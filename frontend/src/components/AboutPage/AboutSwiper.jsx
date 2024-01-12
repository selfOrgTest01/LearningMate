/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { Pagination, Navigation } from 'swiper/modules';
import InfoSlide from './InfoSlide';

export default function App() {
  return (
    <>
      <Container style={{ height: '500px' }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/러닝메이트로고.png`} alt='exampleImage1.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/Hani.jpg`} alt='exampleImage2.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <InfoSlide />
          </SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
