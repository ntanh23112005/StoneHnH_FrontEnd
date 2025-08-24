// src/pages/admin/HomestayList.jsx
import { Input, message, Pagination, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import HomestayCard from "../../components/admin/homestay/homestay.card";
import { getAllHomestays } from "../../services/admin/admin.api";

const { Search } = Input;
const { Option } = Select;

const HomestayList = () => {
    const [homestays, setHomestays] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(12); // theo dữ liệu backend
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [totalItems, setTotalItems] = useState(0); // dùng cho pagination backend

    useEffect(() => {
        const fetchHomestays = async () => {
            setLoading(true);
            try {
                const res = await getAllHomestays({
                    name: searchKeyword,
                    status: statusFilter,
                    page: currentPage,
                    size: pageSize
                });

                const { data, totalItems } = res.data;

                setHomestays(data || []);
                setTotalItems(totalItems || 0);
            } catch (err) {
                console.error(err);
                message.error("Không thể tải danh sách homestay!");
            } finally {
                setLoading(false);
            }
        };

        fetchHomestays();
    }, [currentPage, pageSize, searchKeyword, statusFilter]);

    const handleSearchChange = (value) => {
        setSearchKeyword(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    return (
        <div style={{ padding: "24px" }}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginBottom: "24px",
                }}
            >
                <Search
                    placeholder="Tìm kiếm homestay..."
                    allowClear
                    onSearch={handleSearchChange}
                    style={{ width: 300 }}
                />

                <Select
                    defaultValue="all"
                    style={{ width: 200 }}
                    onChange={handleStatusChange}
                >
                    <Option value="all">Tất cả</Option>
                    <Option value="approved">Đã duyệt</Option>
                    <Option value="unapproved">Chưa duyệt</Option>
                </Select>
            </div>

            {loading ? (
                <Spin size="large" />
            ) : (
                <>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {homestays.map((item) => (
                            <HomestayCard key={item.homestayId} data={item} />
                        ))}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalItems}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ marginTop: "24px", textAlign: "center" }}
                    />
                </>
            )}
        </div>
    );
};

export default HomestayList;