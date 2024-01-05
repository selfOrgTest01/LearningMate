import LandingModal from '../components/maps/LandingModal';
import Page from '../components/Page';
import AboutSwiper from '../components/AboutPage/AboutSwiper';

function About() {
  return (
    <Page>
      <>
        <h1>About</h1>
        <br />
        <AboutSwiper />
        <LandingModal />
        {/* <LandingPage /> */}
      </>
    </Page>
  );
}

export default About;
