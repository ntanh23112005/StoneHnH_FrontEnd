import {
    CalendarOutlined,
    DollarOutlined,
    HomeOutlined
} from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Select,
    Statistic
} from "antd";
import {
    useContext,
    useEffect,
    useState
} from "react";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { AuthContext } from "../../components/context/auth.context";
import {
    getAllBookings,
    getOwnerMonthlyRevenue,
    getOwnerStatistics
} from "../../services/owner/owner.api";
import "../owner/Owner.css";

const { Option } = Select;

const OverviewOwnerPage = () => {
    const [stats, setStats] = useState();
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const { user } = useContext(AuthContext);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);

    useEffect(() => {
        if (user?.customerId) {
            fetchOwnerStatistics();
            fetchOwnerRevenue(selectedYear);
        }
    }, [user?.customerId, selectedYear]);

    const fetchOwnerStatistics = async () => {
        const statsRes = await getOwnerStatistics(user.customerId);
        const bookings = await getAllBookings(user.customerId);
        const status0 = bookings.filter(b => b.paymentStatus === 0).length;
        const status1 = bookings.filter(b => b.paymentStatus === 1).length;
        const status2 = bookings.filter(b => b.paymentStatus === 2).length;

        setStats({
            ...statsRes,
            bookingStatus0: status0,
            bookingStatus1: status1,
            bookingStatus2: status2
        });
    };

    const fetchOwnerRevenue = async (year) => {
        const res = await getOwnerMonthlyRevenue(user.customerId, year);
        console.log(res)
        const monthLabels = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ];
        const formatted = res.map(item => ({
            ...item,
            month: monthLabels[item.month - 1],
        }));
        setMonthlyRevenue(formatted);
    };

    return (
        <div className="admin-dashboard">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu (đơn đã thanh toán)"
                            value={stats?.totalRevenue || 0}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: "#3f8600" }}
                            suffix="VNĐ"
                            formatter={(value) =>
                                value.toLocaleString("vi-VN")
                            }
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card style={{ borderLeft: "4px solid #1890ff" }}>
                        <Statistic
                            title="Tổng số Homestay"
                            value={(stats?.activeHomestays || 0) + (stats?.inactiveHomestays || 0)}
                            prefix={<HomeOutlined />}
                            valueStyle={{ fontWeight: "bold", fontSize: 36, color: "#1890ff" }}
                            formatter={(value) => value.toLocaleString("vi-VN")}
                        />
                        <div className="homestay-breakdown highlighted-breakdown">
                            <div>Đã duyệt: {stats?.activeHomestays || 0}</div>
                            <div>Chưa duyệt: {stats?.inactiveHomestays || 0}</div>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card style={{ borderLeft: "4px solid #faad14" }}>
                        <Statistic
                            title="Tổng số đơn hàng"
                            value={
                                (stats?.bookingStatus0 || 0) +
                                (stats?.bookingStatus1 || 0) +
                                (stats?.bookingStatus2 || 0)
                            }
                            prefix={<CalendarOutlined />}
                            valueStyle={{ fontWeight: "bold", fontSize: 36, color: "#faad14" }}
                            formatter={(value) => value.toLocaleString("vi-VN")}
                        />
                        <div className="order-breakdown highlighted-breakdown">
                            <div>Chưa thanh toán: {stats?.bookingStatus0 || 0}</div>
                            <div>Đã thanh toán: {stats?.bookingStatus1 || 0}</div>
                            <div>Đã hủy: {stats?.bookingStatus2 || 0}</div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                <Col xs={24}>
                    <Card
                        title={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <span>Tổng doanh thu theo tháng</span>
                                <Select
                                    value={selectedYear}
                                    onChange={(value) => setSelectedYear(value)}
                                    style={{ width: 120 }}
                                >
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const year = currentYear - index;
                                        return (
                                            <Option key={year} value={year}>
                                                Năm {year}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            </div>
                        }
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRevenue}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) =>
                                        `${value.toLocaleString("vi-VN")} VNĐ`
                                    }
                                />
                                <Bar dataKey="revenue" fill="#4b71b8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OverviewOwnerPage;