import { Col, Row } from 'antd';
import HomestayCard from './homestay.card';
import { Link } from 'react-router-dom';

const HomestayList = (props) => {
    const { homeStays } = props;

    return (
        <>
            <div className="px-4 py-8">
                <Row gutter={[24, 24]}>
                    {homeStays.map((home) => (
                        <Col key={home.homestayId} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <Link to={`/detail/home-stay/${home.homestayId}`} style={{ textDecoration: 'none' }}>
                                <HomestayCard data={home} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </>

    );
};

export default HomestayList;