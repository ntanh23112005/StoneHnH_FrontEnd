import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';
const ViewUserDetail = (props) => {

    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null)
            setPreview(null)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleUpdateUserAvatar = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar")

        if (resUpload.data) {
            //step 2: upload file
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone)

            if (resUpdateAvatar.data) {
                setIsDetailOpen(false);
                setPreview(null)
                setSelectedFile(null)
                await loadUser();

                notification.success({
                    message: "Success",
                    description: "Upload user avatar successfully"
                })
            } else {
                notification.error({
                    message: "Error upload avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    return (
        <>
            <Drawer title="User Detail"
                width={"40vw"}
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}>
                {dataDetail ?
                    <>
                        <p> <strong>ID:</strong> {dataDetail._id}</p>
                        <br />
                        <p> <strong>Full name:</strong> {dataDetail.fullName}</p>
                        <br />
                        <p> <strong>Email:</strong> {dataDetail.email}</p>
                        <br />
                        <p> <strong>Phone Number:</strong> {dataDetail.phone}</p>
                        <br />

                        <p> <strong>Avatar :</strong></p>
                        <div style={{
                            marginTop: "10px",
                            height: "100px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                            }}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} alt="" />
                        </div>

                        <div>
                            <label htmlFor='btnUpload' style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "16px",
                                cursor: "pointer"
                            }}>
                                Upload Avatar</label>
                            <input
                                type="file" id='btnUpload' hidden
                                // onChange={handleOnChangeFile} 
                                onChange={(event) => { handleOnChangeFile(event) }}
                            />
                        </div>

                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                        src={preview} alt="" />
                                </div>
                                <Button
                                    onClick={() => { handleUpdateUserAvatar() }}
                                    type='primary'>Save Image</Button>
                            </>
                        }
                    </>
                    :
                    <>
                        <p>No data !</p>
                    </>
                }
            </Drawer>
        </>
    );
};
export default ViewUserDetail;