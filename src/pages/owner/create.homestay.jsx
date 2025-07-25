import { Button, message, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/auth.context";
import Step1Part1Form from "../../components/owner/createhomestay/Step1/Step1Part1Form";
import Step1Part2Form from "../../components/owner/createhomestay/Step1/Step1Part2Form";
import Step1Part3Form from "../../components/owner/createhomestay/Step1/Step1Part3Form";
import Step2RulesForm from "../../components/owner/createhomestay/Step2/Step2RulesForm";
import Step3ImagesForm from "../../components/owner/createhomestay/Step3/Step3ImagesForm";
import {
    createHomestay,
    createHomestayImage,
    createHomestayRule,
    createOwner,
    updateHomestay,
    updateHomestayImage,
    updateHomestayRule,
} from "../../services/owner/owner.api";

const CreateHomstayOwner = ({ onClose, editMode = false, initialData = null }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [currentPart, setCurrentPart] = useState(1);
    const { user } = useContext(AuthContext);
    const [isImageSaved, setIsImageSaved] = useState(false);

    const [formData, setFormData] = useState(() => initialData || {
        customerId: user.customerId,
        homestayName: "",
        countryAddress: "",
        areaAddress: "",
        detailAddress: "",
        dailyPrice: 0,
        hourlyPrice: 0,
        type: "",
        typeStyle: "",
        havePet: false,
        maxCustomer: 1,
        numberOfBeds: 1,
        numberOfBathrooms: 1,
        conveniences: "",
        options: "",
        entranceParking: false,
        bedroomDetails: "",
        bathroomDetails: "",
        supportEquipments: "",
        ruleText: "",
        policyText: "",
        images: {
            represent: [],
            catalog: []
        }
    });

    useEffect(() => {
        if (editMode && initialData) {
            setFormData(initialData);
        }
    }, [editMode, initialData]);

    const validateFormData = (data) => {
        if (!data.homestayName.trim()) {
            message.error("Vui lòng nhập tên homestay");
            return false;
        }
        if (!data.countryAddress.trim() || !data.areaAddress.trim() || !data.detailAddress.trim()) {
            message.error("Vui lòng nhập đầy đủ địa chỉ");
            return false;
        }
        if (data.dailyPrice <= 0 || data.hourlyPrice <= 0) {
            message.error("Giá phải lớn hơn 0");
            return false;
        }
        if (data.maxCustomer < 1) {
            message.error("Số khách tối đa phải >=1");
            return false;
        }
        if (data.numberOfBeds < 1) {
            message.error("Số giường phải >=1");
            return false;
        }
        if (data.numberOfBathrooms < 1) {
            message.error("Số phòng tắm phải >=1");
            return false;
        }
        if (!data.ruleText.trim() || !data.policyText.trim()) {
            message.error("Vui lòng nhập quy tắc và chính sách");
            return false;
        }
        if (!data.images || !data.images.represent || data.images.represent.length === 0) {
            message.error("Vui lòng chọn ít nhất 1 ảnh đại diện");
            return false;
        }
        if (!data.images || !data.images.catalog || data.images.catalog.length === 0) {
            message.error("Vui lòng chọn ít nhất 1 ảnh catalog");
            return false;
        }
        return true;
    };

    return (
        <div>
            {currentStep === 1 && (
                <>
                    {currentPart === 1 && (
                        <>
                            <Step1Part1Form
                                data={formData}
                                setData={(changed) => setFormData(prev => ({ ...prev, ...changed }))}
                            />
                            <Space style={{ marginTop: 16 }}>
                                <Button type="primary" onClick={() => setCurrentPart(2)}>
                                    Tiếp theo
                                </Button>
                            </Space>
                        </>
                    )}

                    {currentPart === 2 && (
                        <>
                            <Step1Part2Form
                                data={formData}
                                setData={(changed) => setFormData(prev => ({ ...prev, ...changed }))}
                            />
                            <Space style={{ marginTop: 16 }}>
                                <Button onClick={() => setCurrentPart(1)}>Quay lại</Button>
                                <Button type="primary" onClick={() => setCurrentPart(3)}>
                                    Tiếp theo
                                </Button>
                            </Space>
                        </>
                    )}

                    {currentPart === 3 && (
                        <>
                            <Step1Part3Form
                                data={formData}
                                setData={(changed) => setFormData(prev => ({ ...prev, ...changed }))}
                            />
                            <Space style={{ marginTop: 16 }}>
                                <Button onClick={() => setCurrentPart(2)}>Quay lại</Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setCurrentStep(2);
                                        setCurrentPart(1);
                                    }}
                                >
                                    Tiếp theo
                                </Button>
                            </Space>
                        </>
                    )}
                </>
            )}

            {currentStep === 2 && (
                <>
                    <Step2RulesForm
                        data={formData}
                        setData={(changed) => setFormData(prev => ({ ...prev, ...changed }))}
                    />
                    <Space style={{ marginTop: 16 }}>
                        <Button onClick={() => setCurrentStep(1)}>Quay lại</Button>
                        <Button type="primary" onClick={() => setCurrentStep(3)}>
                            Tiếp theo
                        </Button>
                    </Space>
                </>
            )}

            {currentStep === 3 && (
                <>
                    <Step3ImagesForm
                        setData={(images) => {
                            setFormData(prev => ({
                                ...prev,
                                images: images,
                            }));
                        }}
                        setIsImageSaved={setIsImageSaved}
                        initialImages={[
                            ...(initialData?.images?.represent || []),
                            ...(initialData?.images?.catalog || []),
                        ]}
                    />
                    <Space style={{ marginTop: 16 }}>
                        <Button onClick={() => setCurrentStep(2)}>Quay lại</Button>
                        {isImageSaved && (
                            <Button
                                type="primary"
                                onClick={async () => {
                                    if (!validateFormData(formData)) return;

                                    try {
                                        let homestayId = formData.homestayId;

                                        if (editMode) {
                                            // 👉 Cập nhật Homestay
                                            await updateHomestay(homestayId, {
                                                homestayName: formData.homestayName,
                                                countryAddress: formData.countryAddress,
                                                areaAddress: formData.areaAddress,
                                                detailAddress: formData.detailAddress,
                                                dailyPrice: Number(formData.dailyPrice),
                                                hourlyPrice: Number(formData.hourlyPrice),
                                                type: formData.type,
                                                typeStyle: formData.typeStyle,
                                                havePet: formData.havePet,
                                                maxCustomer: formData.maxCustomer,
                                                numberOfBeds: formData.numberOfBeds,
                                                numberOfBathrooms: formData.numberOfBathrooms,
                                                conveniences: formData.conveniences,
                                                options: formData.options,
                                                entranceParking: formData.entranceParking,
                                                bedroomDetails: formData.bedroomDetails,
                                                bathroomDetails: formData.bathroomDetails,
                                                supportEquipments: formData.supportEquipments,
                                                status: false,
                                            });

                                            // 👉 Cập nhật Rule
                                            await updateHomestayRule(formData.ruleId, {
                                                homestayId,
                                                ruleText: formData.ruleText,
                                                policyText: formData.policyText,
                                            });

                                            // 👉 Cập nhật Image
                                            const imageForm = new FormData();
                                            imageForm.append("homestayId", homestayId);
                                            imageForm.append("homestayName", formData.homestayName);

                                            formData.images.represent.forEach(img => {
                                                imageForm.append("represent", img.originFileObj);
                                            });
                                            formData.images.catalog.forEach(img => {
                                                imageForm.append("catalog", img.originFileObj);
                                            });

                                            await updateHomestayImage(formData.imageIdRepresent, imageForm);
                                            await updateHomestayImage(formData.imageIdCatalog, imageForm);

                                            message.success("Cập nhật homestay thành công!");
                                        } else {
                                            // 👉 Tạo mới Homestay
                                            const homestayRes = await createHomestay({
                                                homestayName: formData.homestayName,
                                                countryAddress: formData.countryAddress,
                                                areaAddress: formData.areaAddress,
                                                detailAddress: formData.detailAddress,
                                                dailyPrice: Number(formData.dailyPrice),
                                                hourlyPrice: Number(formData.hourlyPrice),
                                                type: formData.type,
                                                typeStyle: formData.typeStyle,
                                                havePet: formData.havePet,
                                                maxCustomer: formData.maxCustomer,
                                                numberOfBeds: formData.numberOfBeds,
                                                numberOfBathrooms: formData.numberOfBathrooms,
                                                conveniences: formData.conveniences,
                                                options: formData.options,
                                                entranceParking: formData.entranceParking,
                                                bedroomDetails: formData.bedroomDetails,
                                                bathroomDetails: formData.bathroomDetails,
                                                supportEquipments: formData.supportEquipments,
                                                status: false
                                            });

                                            homestayId = homestayRes?.homestayId;
                                            if (!homestayId) throw new Error("Không lấy được homestayId");

                                            // 👉 Tạo Rule
                                            await createHomestayRule({
                                                homestayId,
                                                ruleText: formData.ruleText,
                                                policyText: formData.policyText,
                                            });

                                            // 👉 Tạo ảnh
                                            const imageForm = new FormData();
                                            imageForm.append("homestayId", homestayId);
                                            imageForm.append("homestayName", formData.homestayName);

                                            formData.images.represent.forEach(img => {
                                                imageForm.append("represent", img.originFileObj);
                                            });
                                            formData.images.catalog.forEach(img => {
                                                imageForm.append("catalog", img.originFileObj);
                                            });

                                            await createHomestayImage(imageForm);

                                            // 👉 Tạo owner
                                            await createOwner({
                                                customerId: formData.customerId,
                                                homestayId,
                                                percentageOwn: 100,
                                            });

                                            message.success("Tạo homestay thành công!");
                                        }

                                        onClose(); // Đóng modal sau khi hoàn tất
                                    } catch (err) {
                                        console.error(err);
                                        message.error("Đã xảy ra lỗi khi lưu homestay");
                                    }
                                }}
                            >
                                Hoàn tất
                            </Button>
                        )}
                    </Space>
                </>
            )}
        </div>
    );
};

export default CreateHomstayOwner;
