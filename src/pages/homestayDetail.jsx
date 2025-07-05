import { Breadcrumb, Button, Col, Divider, Row, Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomestayAmenities from "../components/homestays/homestayDetail/homestayDescription/homestayAmenities";
import HomestayHeader from "../components/homestays/homestayDetail/homestayHeader";
import HomestayLocationMap from "../components/homestays/homestayDetail/HomestayLocationMap";
import HomestayRatingSummary from "../components/homestays/homestayDetail/homestayReviews/homestayRatingSummary";
import ReviewItem from "../components/homestays/homestayDetail/homestayReviews/reviewItem";
import CancellationPolicy from "../components/homestays/homestayDetail/homestayRulesAndPolicies/cancellationPolicy";
import HouseRules from "../components/homestays/homestayDetail/homestayRulesAndPolicies/homeRules";
import SafetyInfo from "../components/homestays/homestayDetail/homestayRulesAndPolicies/safetyInfo";
import HomestaySummary from "../components/homestays/homestayDetail/homestaySummary";
import HostInfo from "../components/homestays/homestayDetail/hostInfo";
import { getHomestayForDetailById } from "../services/homestay/homestay.api";
import BookingPopup from "../components/homestays/homestayDetail/BookingPopup";
import { FilterOutlined, HomeOutlined } from "@ant-design/icons";
import { AuthContext } from "../components/context/auth.context"

const HomestayDetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openBooking, setOpenBooking] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getHomestayForDetailById(id);
                if (res.success) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Lỗi khi load chi tiết homestay", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading || !data) return <Spin fullscreen />;

    const {
        homestay,
        homestayRule,
        images,
        customer,
        reviews,
        rates,
    } = data;

    // Gộp toàn bộ ảnh từ các object trong mảng images
    // Gộp toàn bộ chuỗi ảnh từ tất cả object
    // Gộp toàn bộ homestayImage thành một chuỗi duy nhất
    const mergedImageString = images
        .map((img) => img?.homestayImage)         // lấy từng chuỗi ảnh
        .filter((imgStr) => typeof imgStr === "string" && imgStr.trim() !== "") // lọc ra chuỗi hợp lệ
        .join(",");                               // nối chuỗi

    // Tách ra thành mảng ảnh, loại bỏ chuỗi trống
    const mainImages = mergedImageString
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img !== "");

    // console.log("mergedImageString:", mergedImageString);
    // console.log("mainImages:", mainImages);


    // Tách thông tin an toàn từ ruleText
    const extractSafety = (text) => {
        const keywords = ["hư hỏng", "sự cố", "cháy", "thanh vịn", "tai nạn"];
        return text
            .split(",")
            .filter((line) => keywords.some((k) => line.toLowerCase().includes(k)));
    };

    return (
        <div style={{ padding: "24px 48px" }}>
            <div style={{ padding: '12px' }}>
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
                                    <span>{homestay.homestayName}</span>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
            {/* Header */}
            <HomestayHeader
                name={homestay.homestayName}
                location={homestay.detailAddress}
                price={homestay.dailyPrice}
                images={mainImages}
            />

            {/* Tổng quan */}
            <HomestaySummary
                maxCustomer={homestay.maxCustomer}
                numberOfBeds={homestay.numberOfBeds}
                numberOfBathrooms={homestay.numberOfBathrooms}
                havePet={homestay.havePet}
                options={homestay.options}
            />

            {/* Thông tin chủ nhà */}
            <HostInfo customer={customer} />

            {/* Tiện nghi */}
            <HomestayAmenities
                conveniences={homestay.conveniences}
                supportEquipments={homestay.supportEquipments}
            />

            {/* Bản đồ */}
            <HomestayLocationMap
                address={homestay.detailAddress}
                area={homestay.areaAddress}
            />

            {/* Nội quy & chính sách */}
            <Row gutter={24}>
                <Col span={8}>
                    <HouseRules rules={homestayRule.ruleText} />
                </Col>
                <Col span={8}>
                    <SafetyInfo safetyItems={extractSafety(homestayRule.ruleText).join(",")} />
                </Col>
                <Col span={8}>
                    <CancellationPolicy policy={homestayRule.policyText} />
                </Col>
            </Row>

            <HomestayRatingSummary rate={rates[0]} />

            <Divider />

            <Divider />

            {/* Đánh giá */}
            <h2 style={{ color: "#4266b3", fontWeight: 600, marginBottom: 16 }}>
                Đánh giá từ khách
            </h2>

            {(!rates || rates.length === 0) ? (
                <div
                    style={{
                        padding: "24px",
                        backgroundColor: "#f5f7fb",
                        borderRadius: 8,
                        textAlign: "center",
                        color: "#999",
                    }}
                >
                    Hiện chưa có đánh giá nào cho homestay này.
                </div>
            ) : (
                rates.map((rate) => (
                    <ReviewItem
                        key={rate.rateId}
                        reviewerName={
                            customer.customerId === rate.customerId
                                ? customer.customerName
                                : "Ẩn danh"
                        }
                        reviewerAvatar={
                            customer.customerId === rate.customerId
                                ? customer.customerPicture
                                : null
                        }
                        content={rate.comments}
                        rating={rate.averageRate}
                        date={rate.ratedTime}
                    />
                ))
            )}


            <Divider />

            {/* Gợi ý Homestay khác (nếu có) */}
            {/* <h2>Gợi ý Homestay khác</h2>
            <Row gutter={[16, 16]}>
                {[...Array(4)].map((_, idx) => (
                    <Col key={idx} span={6}>
                        <HomestayCard
                            name={`Homestay Gợi ý ${idx + 1}`}
                            image={mainImages[0]}
                            address={homestay.areaAddress}
                            price={homestay.dailyPrice}
                            rating={4}
                            maxCustomer={homestay.maxCustomer}
                            numberOfBeds={homestay.numberOfBeds}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        />
                    </Col>
                ))}
            </Row> */}

            {/* Nút đặt phòng */}
            <Button
                type="primary"
                size="large"
                onClick={() => setOpenBooking(true)}
                style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "24px",
                    zIndex: 1000,
                    borderRadius: "24px",
                    padding: "0 24px",
                    height: "48px",
                    backgroundColor: "#4266b3",
                    borderColor: "#4266b3",
                }}
            >
                Đặt phòng ngay
            </Button>

            {/* Popup đặt phòng */}
            <BookingPopup
                open={openBooking}
                onClose={() => setOpenBooking(false)}
                dailyPrice={homestay.dailyPrice}
                maxCustomer={homestay.maxCustomer}
                homestay={data.homestay}
                customerId={user.customerId}
            />

        </div>
    );
};

export default HomestayDetailPage;