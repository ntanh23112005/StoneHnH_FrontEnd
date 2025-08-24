import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {

    const { loadUser } = props;

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitForm = async () => {
        const resp = await createUserAPI(fullName, email, password, phone)
        console.log(">> Check RESP", resp);

        if (resp.data) {
            notification.success({
                message: "Create User",
                description: "Create User thành công"
            })
            resetAndCloseModal()
            await loadUser()
        } else {
            notification.error({
                message: "Error Create User",
                description: JSON.stringify(resp.message)
            })
        }
        console.log(">> Check Resp Data: ", resp.data);
    }

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("")
        setEmail("")
        setPassword("")
        setPhone("")
    }


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    onClick={() => { setIsModalOpen(true) }}
                    type="primary">
                    Create User
                </Button>
            </div>
            <Modal
                title="Create User"
                open={isModalOpen}
                onOk={() => { handleSubmitForm() }}
                onCancel={() => { resetAndCloseModal() }}
                okText={"Create"}
                maskClosable={false}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <Input
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default UserForm;