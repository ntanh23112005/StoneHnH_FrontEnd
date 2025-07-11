import { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Spin, message } from "antd";
import { AuthContext } from "../components/context/auth.context";
import AvatarSection from "../components/user/profile/avatar.section";
import InfoForm from "../components/user/profile/info.form";
import { customerInfo } from "../types/user.type";
import { updateUserAPI } from "../services/customer/user.api";

const CustomerProfile = () => {

    const { user } = useContext(AuthContext);
    const [formValues, setFormValues] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (user) {
            setFormValues({
                customerName: user.customerName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                customerAddress: user.customerAddress,
                createdDate: new Date(user.createdDate).toLocaleDateString(),
            });
        }
    }, [user]);

    const onSubmit = async (values) => {

        const creationUpdate = {
            ...customerInfo,
            customerId: user.customerId,
            customerName: values.customerName,
            email: user.email,
            phoneNumber: values.phoneNumber,
            password: user.password,
            customerAddress: values.customerAddress,
            createdDate: user.createdDate,
            customerPicture: user.customerPicture,
            verifyStatus: true,
            accountStatus: true,
        }
        const res = await updateUserAPI(user.customerId, creationUpdate)
        if (res.data) {
            message.success("Thông tin đã được lưu");
            setIsEditMode(false);
        } else {
            console.error(res);
        }

    };

    if (!user || !formValues) return (
        <Spin tip="Loading user...">
            <div style={{ height: 100 }} />
        </Spin>
    );

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                background: "#f0f2f5",
                minHeight: "100vh",
                padding: "40px",
            }}
        >
            <Card
                title="PROFILE"
                bordered={false}
                style={{ width: 800, borderRadius: 8 }}
            // headStyle={{ color: "#4266b3", fontWeight: "bold", fontSize: 20 }}
            >
                <Row gutter={24}>
                    <Col span={6}>
                        <AvatarSection userInf={user} />
                    </Col>
                    <Col span={18}>
                        <InfoForm
                            user={user}
                            initialValues={formValues}
                            isEditMode={isEditMode}
                            setIsEditMode={setIsEditMode}
                            onSubmit={onSubmit}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CustomerProfile;
