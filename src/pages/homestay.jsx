import { FilterOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomestayList from '../components/homestays/homestay.list';
import { fetchAllHomeStayAPI } from '../services/homestay/homestay.api';

const HomestayPage = () => {

    // Lấy param cho category
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const category = queryParam.get('category')
    console.log(category);


    const [homeStays, setHomeStays] = useState([]);
    const [current, setCurrent] = useState(1);
    const [totalHomestays, setTotalHomestays] = useState();

    // gọi dữ liệu khi category hoặc page bị thay đổi
    useEffect(() => {
        getAllHomeStay();
    }, [category, current])

    // reset trang khi chuyển category
    useEffect(() => {
        setCurrent(1);
    }, [category]);

    const getAllHomeStay = async () => {
        const resp = await fetchAllHomeStayAPI(category, current);
        if (resp.data) {
            setHomeStays(resp.data.data);
            setTotalHomestays(resp.data.totalItems);
            // console.log(resp);
        } else {
            console.log("Lỗi fetch API, check log lỗi !");
        }
    }

    return (
        <>
            <div style={{ padding: '24px' }}>
                <Breadcrumb
                    items={[
                        {
                            href: '/',
                            title: (
                                <div style={{ fontSize: '16px', marginRight: '5px', display: 'flex', gap: 5 }}>
                                    <span>Trang chủ</span>
                                </div>
                            ),
                        },
                        {
                            href: '/category?category=all',
                            title: (
                                <div style={{ fontSize: '16px', marginRight: '5px', display: 'flex', gap: 5 }}>
                                    <FilterOutlined />
                                    <span>Danh mục</span>
                                </div>
                            ),
                        },
                        {
                            title: (
                                <div style={{ fontSize: '16px', marginRight: '5px', display: 'flex', gap: 5 }}>
                                    <HomeOutlined />
                                    <span>{category}</span>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>

            <div style={{ padding: 24 }}>
                <HomestayList
                    homeStays={homeStays}
                />

                <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <Pagination
                        current={current}
                        onChange={(pageNumber) => setCurrent(pageNumber)}
                        total={totalHomestays}
                        pageSize={8} />
                </div>
            </div>
        </>
    );
};

export default HomestayPage;