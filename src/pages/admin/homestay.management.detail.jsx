import { Button, Col, Divider, Modal, Row, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
import HomestayAmenities from "../../components/homestays/homestayDetail/homestayDescription/homestayAmenities";
import HomestayHeader from "../../components/homestays/homestayDetail/homestayHeader";
import HomestayLocationMap from "../../components/homestays/homestayDetail/HomestayLocationMap";
import CancellationPolicy from "../../components/homestays/homestayDetail/homestayRulesAndPolicies/cancellationPolicy";
import HouseRules from "../../components/homestays/homestayDetail/homestayRulesAndPolicies/homeRules";
import SafetyInfo from "../../components/homestays/homestayDetail/homestayRulesAndPolicies/safetyInfo";
import HomestaySummary from "../../components/homestays/homestayDetail/homestaySummary";
import HostInfo from "../../components/homestays/homestayDetail/hostInfo";
import { updateHomestayStatus } from "../../services/admin/admin.api";
import { getHomestayForDetailById } from "../../services/homestay/homestay.api";

const HomestayDetailModal = ({ id, open, onClose, homestayId, currentStatus, onSuccess }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openBooking, setOpenBooking] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!id) return;
        const fetchDetail = async () => {
            setLoading(true);
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

    if (loading || !data) return;

    const {
        homestay,
        homestayRule,
        images,
        customer,
    } = data;

    const mergedImageString = images
        .map((img) => img?.homestayImage)
        .filter((imgStr) => typeof imgStr === "string" && imgStr.trim() !== "")
        .join(",");
    const mainImages = mergedImageString
        .split(",")
        .map((img) => img.trim())
        .filter((img) => img !== "");

    const extractSafety = (text) => {
        const keywords = ["hư hỏng", "sự cố", "cháy", "thanh vịn", "tai nạn"];
        return text
            .split(",")
            .filter((line) => keywords.some((k) => line.toLowerCase().includes(k)));
    };

    const handleCheckLogged = () => {
        if (!user) {
            message.warning("Bạn cần đăng nhập để tiếp tục !");
            return;
        }
        setOpenBooking(true);
    };

    const handleToggleStatus = async () => {
        if (!homestay?.homestayId) {
            message.error("Không tìm thấy ID homestay");
            return;
        }

        try {
            const newStatus = !homestay.status;
            await updateHomestayStatus(homestay.homestayId, newStatus);

            setData({
                ...data,
                homestay: {
                    ...data.homestay,
                    status: newStatus
                }
            });

            message.success(`Đã ${newStatus ? "duyệt" : "hủy duyệt"} homestay thành công`);

            if (onSuccess) {
                onSuccess(newStatus);
            }

            if (onClose) {
                onClose();
            }

        } catch (error) {
            console.error(error);
            message.error("Cập nhật trạng thái thất bại");
        }
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                footer={null}
                width={1000}
                title={homestay.homestayName}
                bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                <HomestayHeader
                    name={homestay.homestayName}
                    location={homestay.detailAddress}
                    price={homestay.dailyPrice}
                    images={mainImages}
                />

                <HomestaySummary
                    maxCustomer={homestay.maxCustomer}
                    numberOfBeds={homestay.numberOfBeds}
                    numberOfBathrooms={homestay.numberOfBathrooms}
                    havePet={homestay.havePet}
                    options={homestay.options}
                />

                <HostInfo customer={customer} />

                <HomestayAmenities
                    conveniences={homestay.conveniences}
                    supportEquipments={homestay.supportEquipments}
                />

                <HomestayLocationMap
                    address={homestay.detailAddress}
                    area={homestay.areaAddress}
                />

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

                <Divider />

                <Button
                    type={homestay?.status ? "default" : "primary"}
                    size="large"
                    onClick={handleToggleStatus}
                    style={{
                        borderRadius: "24px",
                        padding: "0 24px",
                        height: "48px",
                        backgroundColor: homestay?.status ? "#999" : "#4266b3",
                        borderColor: homestay?.status ? "#999" : "#4266b3",
                        color: "white",
                    }}
                >
                    {homestay?.status ? "Hủy duyệt" : "Duyệt homestay"}
                </Button>
            </Modal>
        </>
    );
};

export default HomestayDetailModal;