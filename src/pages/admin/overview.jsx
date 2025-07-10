import { Card, Col, Row, Statistic } from 'antd';
import { DollarOutlined, UserOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import { getAllStats, getBookingRatio, getMonthlyRevenue } from '../../services/admin/admin.api';

const OverviewAdminPage = () => {
    const [stats, setStats] = useState();
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [bookingStatusRatio, setBookingStatusRatio] = useState([]);

    const statusColors = ['#52c41a', '#1890ff', '#ff4d4f']; // Thành công - Chờ - Hủy

    useEffect(() => {
        fetchDataOverviewPage();
    }, []);

    const fetchDataOverviewPage = async () => {
        try {
            const resStats = await getAllStats();
            if (resStats.data) setStats(resStats.data);

            const resMonthlyRevenue = await getMonthlyRevenue();
            if (resMonthlyRevenue.data) {
                const monthLabels = [
                    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
                ];
                const formatted = resMonthlyRevenue.data.map(item => ({
                    ...item,
                    month: monthLabels[item.month - 1],
                }));
                setMonthlyRevenue(formatted);
            }

            const resBookingStatusRatio = await getBookingRatio();
            if (resBookingStatusRatio.data) {
                const statusLabels = ['Đang chờ', 'Thành công', 'Đã hủy'];
                const formatted = resBookingStatusRatio.data.map(item => ({
                    ...item,
                    status: statusLabels[item.status],
                }));
                setBookingStatusRatio(formatted);
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu tổng quan:', error);
        }
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu"
                            value={stats?.totalPriceBooking || 0}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix="VNĐ"
                            formatter={(value) =>
                                value.toLocaleString('vi-VN')
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Người dùng"
                            value={stats?.totalUsers || 0}
                            prefix={<UserOutlined />}
                            formatter={(value) =>
                                value.toLocaleString('vi-VN')
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Homestay"
                            value={stats?.totalHomestays || 0}
                            prefix={<HomeOutlined />}
                            formatter={(value) =>
                                value.toLocaleString('vi-VN')
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Tổng hóa đơn"
                            value={stats?.totalBookings || 0}
                            prefix={<CalendarOutlined />}
                            formatter={(value) =>
                                value.toLocaleString('vi-VN')
                            }
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                <Col xs={24} md={16}>
                    <Card title="Tổng doanh thu theo tháng">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRevenue}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) =>
                                        `${value.toLocaleString('vi-VN')} VNĐ`
                                    }
                                />
                                <Bar dataKey="revenue" fill="#4b71b8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card title="Tỷ lệ trạng thái đơn">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={bookingStatusRatio}
                                    dataKey="value"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ name, percent }) =>
                                        `${name}: ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {bookingStatusRatio.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={statusColors[index]}
                                        />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OverviewAdminPage;
