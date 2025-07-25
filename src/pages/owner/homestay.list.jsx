import { Button, message, Modal, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/context/auth.context';
import HomestayCard from '../../components/owner/homestay.card';
import { getHomestayImagesByHomestayId, getHomestayRuleByHomestayId, getOwnerHomestays } from '../../services/owner/owner.api';
import '../owner/Owner.css';
import CreateHomstayOwner from './create.homestay';

const OwnerHomestayList = () => {
    const [homestays, setHomestays] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedHomestay, setSelectedHomestay] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const fetchHomestays = async () => {
        if (!user?.customerId) return;

        try {
            setLoading(true);
            const data = await getOwnerHomestays(user.customerId);
            const normalized = data.map(item => ({
                ...item,
                images: Array.isArray(item.images)
                    ? item.images.flatMap(i =>
                        i
                            .split(",")
                            .map(s => s.trim())
                            .filter(Boolean)
                    )
                    : []
            }));
            setHomestays(normalized);
        } catch (err) {
            console.error("Lỗi khi gọi API homestay:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomestays();
    }, [user]);

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedHomestay(null);
        setIsEditMode(false);
        fetchHomestays();
    };

    const openEditModal = async (homestayData) => {
        try {
            setLoading(true);

            // Gọi API lấy rule
            const ruleRes = await getHomestayRuleByHomestayId(homestayData.homestayId);

            // Gọi API lấy ảnh
            const imageRes = await getHomestayImagesByHomestayId(homestayData.homestayId);

            console.log(imageRes)

            // Xử lý ảnh
            const representObject = imageRes.find(img => img.imageFor === 'represent');
            const catalogObject = imageRes.find(img => img.imageFor === 'catalog');

            const represent = buildImages(representObject, homestayData.homestayName);
            const catalog = buildImages(catalogObject, homestayData.homestayName);

            const fullHomestayData = {
                ...homestayData,
                ruleId: ruleRes?.id,
                imageIdRepresent: representObject?.id,
                imageIdCatalog: catalogObject?.id,
                ruleText: ruleRes.ruleText,
                policyText: ruleRes.policyText,
                images: {
                    represent,
                    catalog,
                },
            };

            setSelectedHomestay(fullHomestayData);
            setIsEditMode(true);
            setModalVisible(true);
        } catch (err) {
            console.error("Lỗi khi load dữ liệu chỉnh sửa:", err);
            message.error("Không thể tải dữ liệu chỉnh sửa");
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setSelectedHomestay(null);
        setIsEditMode(false);
        setModalVisible(true);
    };

    const buildImages = (imageObject, homestayName) => {
        if (!imageObject?.homestayImage) return [];

        return imageObject.homestayImage
            .split(',')
            .map(file => {
                const fileName = file.trim();
                return {
                    name: fileName,
                    originFileObj: null,
                    imageFor: imageObject.imageFor === 'represent' ? 'Main' : 'Gallery',
                    thumbUrl: `${VITE_IMG_BACKEND_URL}/HomeStay/${homestayName}/${fileName}`
                };
            });
    };

    return (
        <div>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Spin tip="Đang tải danh sách homestay..." />
                </div>
            ) : (
                <>
                    <div className="homestay-header">
                        <Button type="primary" onClick={openCreateModal}>
                            + Tạo mới Homestay
                        </Button>
                    </div>
                    <div className="homestay-grid">
                        {homestays.map(item => (
                            <HomestayCard
                                key={item.homestayId}
                                data={item}
                                onClick={() => openEditModal(item)}
                            />
                        ))}
                    </div>
                </>
            )}

            <Modal
                title={isEditMode ? "Chỉnh sửa Homestay" : "Tạo mới Homestay"}
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={1000}
                destroyOnClose
            >
                <CreateHomstayOwner
                    onClose={handleModalClose}
                    editMode={isEditMode}
                    initialData={selectedHomestay}
                />
            </Modal>
        </div>
    );
};

export default OwnerHomestayList;