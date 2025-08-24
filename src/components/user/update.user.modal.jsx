import { useEffect, useState } from "react";
import { Input, Button, notification, Modal } from "antd";
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate,
        loadUser } = props;

    useEffect(() => {
        console.log(">> Check data update props: ", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName)
            setPhone(dataUpdate.phone)
        }
    }, [dataUpdate])

    const handleSubmitForm = async () => {
        const resp = await updateUserAPI(id, fullName, phone)

        if (resp.data) {
            notification.success({
                message: "Update User",
                description: "Update User thành công"
            })
            resetAndCloseModal()
            await loadUser()
        } else {
            notification.error({
                message: "Error Update User",
                description: JSON.stringify(resp.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        setFullName("")
        setPhone("")
        setId("")
        setDataUpdate(null)
    }


    return (
        <>
            <Modal
                title="Update User"
                open={isModalUpdateOpen}
                onOk={() => { handleSubmitForm() }}
                onCancel={() => { resetAndCloseModal() }}
                okText={"Update"}
                maskClosable={false}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div>
                        <span>Id</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <div>
                        <span>FullName</span>
                        <Input
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Phone</span>
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

export default UpdateUserModal;