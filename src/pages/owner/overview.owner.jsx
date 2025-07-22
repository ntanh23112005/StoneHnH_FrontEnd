import { CalendarOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getOwnerMonthlyRevenue, getOwnerStatistics } from '../../services/owner/owner.api';
import "../owner/Owner.css";

const OverviewOwnerPage = () => {
    const { id } = useParams();
    const [stats, setStats] = useState();
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);

    useEffect(() => {
        if (id) {
            fetchOwnerStatistics();
            fetchOwnerRevenue();
        }
    }, [id]);

    const fetchOwnerStatistics = async () => {
        const res = await getOwnerStatistics(id);
        setStats(res)
        console.log(res)
    };

    const fetchOwnerRevenue = async () => {
        const res = await getOwnerMonthlyRevenue(id);
        const monthLabels = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        const formatted = res.map(item => ({
            ...item,
            month: monthLabels[item.month - 1],
        }));
        setMonthlyRevenue(formatted);
    };

    return (
        <div className="admin-dashboard">
            {/* ROW 1 - Statistics */}
            <Row gutter={[16, 16]}>
                {/* Tổng doanh thu */}
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu (đơn đã thanh toán)"
                            value={stats?.totalRevenue || 0}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: "#3f8600" }}
                            suffix="VNĐ"
                            formatter={(value) => value.toLocaleString("vi-VN")}
                        />
                    </Card>
                </Col>

                {/* Tổng số Homestay */}
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng số Homestay"
                            value={(stats?.activeHomestays || 0) + (stats?.inactiveHomestays || 0)}
                            prefix={<HomeOutlined />}
                            formatter={(value) => value.toLocaleString("vi-VN")}
                        />
                        <div className="homestay-breakdown">
                            <div>Đã duyệt: {stats?.activeHomestays || 0}</div>
                            <div>Chưa duyệt: {stats?.inactiveHomestays || 0}</div>
                        </div>
                    </Card>
                </Col>

                {/* Tổng số đơn hàng */}
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng số đơn hàng"
                            value={
                                (stats?.bookingStatus0 || 0) +
                                (stats?.bookingStatus1 || 0) +
                                (stats?.bookingStatus2 || 0)
                            }
                            prefix={<CalendarOutlined />}
                            formatter={(value) => value.toLocaleString("vi-VN")}
                        />
                        <div className="order-breakdown">
                            <div>Chưa thanh toán: {stats?.bookingStatus0 || 0}</div>
                            <div>Đã thanh toán: {stats?.bookingStatus1 || 0}</div>
                            <div>Đã hủy: {stats?.bookingStatus2 || 0}</div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* ROW 2 - Monthly Revenue Chart */}
            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                <Col xs={24}>
                    <Card title="Tổng doanh thu theo tháng">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRevenue}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => `${value.toLocaleString("vi-VN")} VNĐ`}
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