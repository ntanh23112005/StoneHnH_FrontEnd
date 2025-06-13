import { Col, Row } from 'antd';
import { useState } from 'react';
import HomestayCard from './homestay.card';

const HomestayList = () => {
    const [homestays] = useState([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
            name: 'Seaside Retreat',
            location: 'Vũng Tàu, Việt Nam',
            distance: '1.2 km',
            rating: 4.5,
            description: '2 - 6 người • 3 phòng ngủ • 2 phòng tắm',
            price: 200000,
            amenities: ['wifi', 'pool', 'parking']
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80',
            name: 'Cozy Cottage',
            location: 'Đà Lạt, Việt Nam',
            distance: '3.5 km',
            rating: 4.8,
            description: '1 - 4 người • 2 phòng ngủ • 1 phòng tắm',
            price: 250000,
            amenities: ['wifi', 'kitchen']
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=800&q=80',
            name: 'Island Paradise',
            location: 'Phú Quốc, Việt Nam',
            distance: '0.5 km',
            rating: 4.7,
            description: '2 - 5 người • 3 phòng ngủ • 2 phòng tắm',
            price: 300000,
            amenities: ['wifi', 'pool', 'kitchen']
        },
        {
            id: 4,
            image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
            name: 'Beachfront Bungalow',
            location: 'Nha Trang, Việt Nam',
            distance: '1.8 km',
            rating: 4.6,
            description: '1 - 3 người • 2 phòng ngủ • 1 phòng tắm',
            price: 220000,
            amenities: ['wifi', 'parking']
        },
        {
            id: 5,
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            name: 'Historic Homestay',
            location: 'Hội An, Việt Nam',
            distance: '2.0 km',
            rating: 4.4,
            description: '2 - 4 người • 2 phòng ngủ • 1 phòng tắm',
            price: 210000,
            amenities: ['wifi', 'kitchen', 'parking']
        }
    ]);

    return (
        <>
            <div className="px-4 py-8">
                <Row gutter={[24, 24]}>
                    {homestays.map((item) => (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                            <HomestayCard data={item} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
        
    );
};

export default HomestayList;