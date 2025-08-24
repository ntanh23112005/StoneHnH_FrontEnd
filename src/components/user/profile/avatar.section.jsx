import { Avatar, Button, Upload, message } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { uploadAvatarAPI } from "../../../services/customer/user.api";
import { AuthContext } from "../../context/auth.context";
import { getAccountAPI } from "../../../services/auth/api.auth";

const AvatarSection = ({ userInf }) => {

    const VITE_IMG_BACKEND_URL = import.meta.env.VITE_IMG_BACKEND_URL;

    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [avatarName, setAvatarName] = useState(userInf.customerPicture);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getAccountAPI();
                if (res?.data) {
                    setUser(res.data);
                }
            } catch (err) {
                console.log("Have Error, check log");
            }
            setLoading(false);
        };

        if (user && user.email) {
            setLoading(false);
        } else {
            fetchUser();
        }
    }, [user, setUser, avatarName, setAvatarName]);

    const handleUpload = async ({ file }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("customerId", user.customerId);

        setLoading(true);
        try {
            const res = await uploadAvatarAPI(formData);
            if (res.data) {
                setAvatarName(res.data);
                // Cập nhật user context với avatar mới
                const updatedUser = { ...user, customerPicture: res.data };
                setUser(updatedUser);
                message.success("Lưu ảnh thành công");
            }
        } catch (err) {
            console.error(err);
            message.error("Tải ảnh lên thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Avatar
                size={120}
                icon={<UserOutlined />}
                src={`${VITE_IMG_BACKEND_URL}/avatar/${avatarName}`}
                style={{ border: "2px solid #4266b3", marginBottom: 12 }}
            />
            <Upload
                customRequest={handleUpload}
                showUploadList={false}
                accept="image/*"
            >
                <Button
                    type="primary"
                    icon={<UploadOutlined />}
                    loading={loading}
                    style={{ backgroundColor: "#4266b3", borderColor: "#4266b3" }}
                >
                    Upload Picture
                </Button>
            </Upload>
        </div>
    );
};

export default AvatarSection;
