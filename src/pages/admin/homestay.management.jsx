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
    const [searchKeyword, setSearchKeyword] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const pageSize = 6;

    useEffect(() => {
        const fetchHomestays = async () => {
            setLoading(true);
            try {
                const res = await getAllHomestays();
                console.log(res.data);
                setHomestays(res.data);
            } catch (err) {
                console.error(err);
                message.error("Không thể tải danh sách homestay!");
            } finally {
                setLoading(false);
            }
        };

        fetchHomestays();
    }, []);

    // Áp dụng tìm kiếm và lọc
    const filteredHomestays = homestays.filter((item) => {
        const matchesKeyword = item.homestayName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        const matchesStatus =
            statusFilter === "all"
                ? true
                : statusFilter === "approved"
                    ? item.status === true
                    : item.status === false;
        return matchesKeyword && matchesStatus;
    });

    // Cắt dữ liệu trang hiện tại
    const paginatedHomestays = filteredHomestays.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Khi thay đổi filter hoặc tìm kiếm, reset về trang 1
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
                        {paginatedHomestays.map((item) => (
                            <HomestayCard key={item.homestayId} data={item} />
                        ))}
                    </div>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredHomestays.length}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ marginTop: "24px", textAlign: "center" }}
                    />
                </>
            )}
        </div>
    );
};

export default HomestayList;