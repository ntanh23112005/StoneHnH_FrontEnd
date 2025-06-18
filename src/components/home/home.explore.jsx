import './home.explore.css';

const HomeExplore = () => {
    return (
        <>
            <div className="home-explore-header">
                <p className="home-explore-title">Điểm đến đang thịnh hành</p><br />
                <p className="home-explore-subtitle">Các lựa chọn phổ biến cho du khách ở Việt Nam</p>
            </div>

            {/* Block 1 */}
            <div data-aos="fade-right" className="explore-block">
                <div className="explore-text">
                    <p className="explore-text-title">Vũng Tàu</p><br />
                    <p className="explore-text-description">
                        Thành phố biển quyến rũ, nơi du khách có thể hòa mình vào làn nước trong xanh, thưởng thức hải sản tươi ngon và khám phá những di tích lịch sử độc đáo.
                    </p>
                </div>
                <div data-aos="fade-left" className="explore-image">
                    <img src="/images/home/homepage-vungtau.jpg" alt="" />
                </div>
            </div>

            {/* Block 2 - đảo ngược ảnh và text */}
            <div data-aos="fade-right" className="explore-block">
                <div className="explore-image">
                    <img src="/images/home/homepage-vungtau.jpg" alt="" />
                </div>
                <div data-aos="fade-left" className="explore-text">
                    <p className="explore-text-title">Vũng Tàu</p><br />
                    <p className="explore-text-description">
                        Thành phố biển quyến rũ, nơi du khách có thể hòa mình vào làn nước trong xanh, thưởng thức hải sản tươi ngon và khám phá những di tích lịch sử độc đáo.
                    </p>
                </div>
            </div>

            {/* Block 3 */}
            <div data-aos="fade-right" className="explore-block">
                <div className="explore-text">
                    <p className="explore-text-title">Vũng Tàu</p><br />
                    <p className="explore-text-description">
                        Thành phố biển quyến rũ, nơi du khách có thể hòa mình vào làn nước trong xanh, thưởng thức hải sản tươi ngon và khám phá những di tích lịch sử độc đáo.
                    </p>
                </div>
                <div data-aos="fade-left" className="explore-image">
                    <img src="/images/home/homepage-vungtau.jpg" alt="" />
                </div>
            </div>
        </>
    );
};

export default HomeExplore;
