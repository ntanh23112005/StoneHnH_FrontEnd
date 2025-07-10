import HomeCarousel from "../components/home/home.carousel";
import HomeExplore from "../components/home/home.explore";
import { Container } from 'react-bootstrap';
import '../components/home/home.explore.css';

const HomePage = () => {
    return (
        <Container fluid className="py-4 home-page-container" style={{ backgroundColor: "#ffffff" }}>
            <div className="mb-5">
                <HomeExplore />
            </div>
            <div className="mb-5">
                <HomeCarousel />
            </div>
        </Container>
    );
}

export default HomePage;
