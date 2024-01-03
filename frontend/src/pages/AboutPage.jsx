import NearByMyLocationSection from '../components/maps/NearByMyLocationSection';
import SearchLocationSection from '../components/maps/SearchLocationSection';
import SearchLocationSectioncopy from '../components/maps/SearchLocationSectioncopy';
import Page from '../components/Page';

function About() {
  return (
    <Page>
      <>
        <h1>About</h1>
        <SearchLocationSection />
        <SearchLocationSectioncopy />
      </>
    </Page>
  );
}

export default About;
