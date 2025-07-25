import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, message, Row, Select, Upload } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const Step3ImagesForm = ({ setData, setIsImageSaved, initialImages = [] }) => {
    const [fileList, setFileList] = useState([]);

    // Load ảnh ban đầu (khi ở editMode)
    useEffect(() => {
        if (initialImages.length > 0) {
            setFileList(initialImages);
        }
    }, [initialImages]);

    const handleUploadChange = ({ fileList: newFileList }) => {
        const updatedList = newFileList.map(file => ({
            name: file.name,
            thumbUrl:
                file.thumbUrl ||
                file.url ||
                (file.originFileObj ? URL.createObjectURL(file.originFileObj) : ""),
            imageFor: file.imageFor || "Gallery",
            originFileObj: file.originFileObj,
        }));
        setFileList(updatedList);
    };

    const handleImageForChange = (fileName, value) => {
        const updatedList = fileList.map(file => {
            if (file.name === fileName) {
                return { ...file, imageFor: value };
            }
            return file;
        });
        setFileList(updatedList);
    };

    const handleSave = () => {
        const mainImages = fileList.filter(file => file.imageFor === "Main");
        const galleryImages = fileList.filter(file => file.imageFor === "Gallery");

        if (mainImages.length !== 5) {
            message.error("Bạn phải chọn chính xác 5 ảnh chính (Main).");
            return;
        }

        const result = {
            represent: mainImages.map(file => ({
                name: file.name,
                originFileObj: file.originFileObj
            })),
            catalog: galleryImages.map(file => ({
                name: file.name,
                originFileObj: file.originFileObj
            })),
        };

        if (setData) {
            setData(result); // Gửi dữ liệu ảnh về component cha
        }
        if (setIsImageSaved) {
            setIsImageSaved(true); // Đánh dấu đã lưu
        }
    };

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList.map(file => ({
                    uid: file.name,
                    name: file.name,
                    thumbUrl: file.thumbUrl,
                }))}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                multiple
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>

            {fileList.length > 0 && (
                <>
                    <div
                        style={{
                            maxHeight: 400,
                            overflowY: "auto",
                            overflowX: "hidden",
                            paddingRight: 8,
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            {fileList.map(file => (
                                <Col key={file.name} xs={24} sm={12} md={8}>
                                    <Card
                                        cover={
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    overflow: "hidden",
                                                    borderRadius: "4px"
                                                }}
                                            >
                                                <img
                                                    alt={file.name}
                                                    src={file.thumbUrl}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </div>
                                        }
                                    >
                                        <Select
                                            value={file.imageFor}
                                            style={{ width: "100%" }}
                                            onChange={value => handleImageForChange(file.name, value)}
                                        >
                                            <Option value="Main">Ảnh chính</Option>
                                            <Option value="Gallery">Thư viện</Option>
                                        </Select>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        <Button type="primary" onClick={handleSave}>
                            Lưu ảnh
                        </Button>
                    </div>
                </>
            )}
        </>
    );
};

export default Step3ImagesForm;