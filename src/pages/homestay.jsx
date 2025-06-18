import { Breadcrumb, Pagination } from 'antd';
import HomestayList from '../components/homestays/homestay.list';
import { FilterOutlined, HomeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchAllHomeStayAPI } from '../services/homestay/homestay.api';

const HomestayPage = () => {

    const onChange = pageNumber => {
        console.log('Page: ', pageNumber);
    };

    const [homeStays, setHomeStays] = useState([]);

    const getAllHomeStay = async () => {
        const homes = await fetchAllHomeStayAPI();
        setHomeStays(homes.data);
        // console.log(homeStays);
    }
    useEffect(() => {
        getAllHomeStay();
    }, [])


    return (
        <>
            <div style={{ padding: '24px' }}>
                <Breadcrumb
                    items={[
                        {
                            href: '/',
                            title: "Trang chủ",
                        },
                        {
                            title: (
                                <>
                                    <FilterOutlined />
                                    <span>Danh mục</span>
                                </>
                            ),
                        },
                        {
                            title: (
                                <>
                                    <HomeOutlined />
                                    <span>Home Stay</span>
                                </>
                            ),
                        },
                    ]}
                />
            </div>

            <div style={{ padding: 24 }}>
                <h2>Danh sách Homestay</h2>
                <HomestayList
                    homeStays={homeStays}
                />

                <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <Pagination
                        current={1}
                        onChange={onChange}
                        total={50} />
                </div>
            </div>
        </>
    );
};

export default HomestayPage;