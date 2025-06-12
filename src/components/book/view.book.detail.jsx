import { Drawer } from "antd"

const ViewBookDeTail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props
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
                        <p> <strong>Tiêu đề:</strong> {dataDetail.mainText}</p>
                        <br />
                        <p> <strong>Tác giả:</strong> {dataDetail.author}</p>
                        <br />
                        <p> <strong>Thể loại:</strong> {dataDetail.category}</p>
                        <br />
                        <p> <strong>Giá tiền:</strong> {
                            new Intl.NumberFormat('vi-VN',
                                { style: 'currency', currency: 'VND' }
                            ).format(dataDetail.price)
                        }
                        </p>
                        <br />
                        <p> <strong>Số lượng:</strong> {dataDetail.quantity}</p>
                        <br />
                        <p> <strong>Đã bán:</strong> {dataDetail.sold}</p>
                        <br />

                        <p> <strong>Thumbnail :</strong></p>
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
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`} alt="" />
                        </div>
                    </>
                    :
                    <>
                        No Data
                    </>
                }
            </Drawer>
        </>
    )
}

export default ViewBookDeTail