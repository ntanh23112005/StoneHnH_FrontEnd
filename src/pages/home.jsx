import HomeCarousel from "../components/home/home.carousel"
import HomeExplore from "../components/home/home.explore"
import '../components/home/home.explore.css'

const HomePage = () => {
    return (
        <>
            <div className="home-page-container">
                <div style={{ marginBottom: "100px" }}>
                    <HomeExplore />
                </div>
                <div style={{ marginBottom: "100px" }}>
                    <HomeCarousel />
                </div>
            </div>

        </>
    )
}

export default HomePage