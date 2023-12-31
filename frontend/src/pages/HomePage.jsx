import ImageUploadSection from '../components/ImageUploadSection';
import GetLocation from '../containers/pages/HomePage/GetLocation';

function Home() {
  GetLocation();
  return (
    <>
      <h1>Home</h1>
      <ImageUploadSection />
    </>
  );
}
export default Home;
