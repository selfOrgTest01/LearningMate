import NearByMyLocationSection from '../components/maps/NearByMyLocationSection';
import SearchLocationSection from '../components/maps/SearchLocationSection';
import Page from '../components/Page';

function About() {
  return (
    <Page>
      <>
        <h1>About</h1>
        <SearchLocationSection />
        <NearByMyLocationSection />
      </>
    </Page>
  );
}

export default About;
