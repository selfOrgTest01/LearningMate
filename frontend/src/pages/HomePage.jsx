import ImageUploadSection from '../components/ImageUploadSection';
import FetchLocation from '../containers/FetchLocation';
function Home() {
    FetchLocation();
    return (
        <>
            <h1>Home</h1>
            <ImageUploadSection />
        </>
    );
}
export default Home;
