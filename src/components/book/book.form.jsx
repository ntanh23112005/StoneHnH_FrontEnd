import { Button, Input, InputNumber, Modal, Select, Space } from "antd"
import { useState } from "react";

const BookForm = (props) => {
    const { loadBook } = props

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [phone, setPhone] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // const onChange = value => {
    //     console.log('changed', value);
    // };

    const handleChange = value => {
        console.log(`selected ${value}`);
    };


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
                title="Create new book"
                open={isModalOpen}
                // onOk={() => { handleSubmitForm() }}
                // onCancel={() => { resetAndCloseModal() }}
                onCancel={() => setIsModalOpen(false)}
                okText={"Create"}
                maskClosable={false}
            >
                <div style={{
                    display: "flex",
                    gap: "15px",
                    flexDirection: "column"
                }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div >
                        <span>Giá tiền</span> <br />
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter="đ"
                            onChange={(event) => console.log(event)}
                        />
                    </div>
                    <div >
                        <span>Số lượng</span> <br />
                        <InputNumber
                            style={{ width: "100%" }} onChange={(event) => console.log(event)} />
                    </div>
                    <div>
                        <Select
                            defaultValue="lucy"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },

                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },

                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },

                            ]}
                        />
                    </div>
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
                        </>
                    }
                </div>
            </Modal>
        </>
    )
}

export default BookForm