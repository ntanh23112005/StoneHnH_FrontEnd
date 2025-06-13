import { Pagination } from 'antd';
import HomestayList from '../components/homestays/homestay.list';

const onChange = pageNumber => {
    console.log('Page: ', pageNumber);
};

const HomestayPage = () => {
    return (
        <>
            <div style={{ padding: 24 }}>
                <h2>Danh sách Homestay</h2>
                <HomestayList />
                
                <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <Pagination
                        showQuickJumper
                        defaultCurrent={2}
                        total={500}
                        onChange={onChange}
                    />
                </div>
            </div>
        </>
    );
};

export default HomestayPage;