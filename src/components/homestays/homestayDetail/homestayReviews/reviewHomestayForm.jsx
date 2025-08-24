import {
  Divider,
  Rating,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { Col, message, Row } from "antd";
import { useEffect, useState } from "react";
import { creatNewPost } from "../../../../services/rate/rate.api";

const ReviewHomestayForm = ({ homestayId, customerId }) => {
  const [price, setPrice] = useState(1);
  const [location, setLocation] = useState(1);
  const [communication, setCommunication] = useState(1);
  const [exactly, setExactly] = useState(1);
  const [cleanlinessLevel, setCleanlinessLevel] = useState(1);
  const [comments, setComments] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (!customerId) {
      messageApi.open({
        type: "warning",
        content: "Bạn cần đăng nhập để đánh giá homestay này.",
      });
      return;
    }

    const averageRate = parseFloat(
      (
        (price + location + communication + exactly + cleanlinessLevel) /
        5
      ).toFixed(1)
    );

    const rateTitle = averageRate > 4.5 ? "Tuyệt vời" : "Không có";

    const rateData = {
      rateId: null, // Backend generate
      homestayId,
      customerId,
      comments,
      ratedTime: new Date().toISOString().split("T")[0], // yyyy-MM-dd
      price,
      location,
      communication,
      exactly,
      cleanlinessLevel,
      averageRate,
      rateTitle,
    };

    // console.log("Review Data gửi API:", rateData);

    const resp = await creatNewPost(rateData);
    if (resp.data == 1) {
      messageApi.open({
        type: "success",
        content: "Đánh giá của bạn đã được gửi thành công.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 500); // Tải lại trang để cập nhật đánh giá
    } else {
      messageApi.open({
        type: "error",
        content: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      {contextHolder}
      <Row gutter={[24, 24]}>
        {/* Cột trái: Rating */}
        <Col span={12}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography fontWeight={500}>Giá cả</Typography>
              <Rating value={price} onChange={(_, v) => setPrice(v)} />
            </Box>
            <Divider />

            <Box>
              <Typography fontWeight={500}>Vị trí</Typography>
              <Rating value={location} onChange={(_, v) => setLocation(v)} />
            </Box>
            <Divider />

            <Box>
              <Typography fontWeight={500}>Giao tiếp</Typography>
              <Rating
                value={communication}
                onChange={(_, v) => setCommunication(v)}
              />
            </Box>
            <Divider />

            <Box>
              <Typography fontWeight={500}>
                Độ chính xác so với mô tả
              </Typography>
              <Rating value={exactly} onChange={(_, v) => setExactly(v)} />
            </Box>
            <Divider />

            <Box>
              <Typography fontWeight={500}>Mức độ sạch sẽ</Typography>
              <Rating
                value={cleanlinessLevel}
                onChange={(_, v) => setCleanlinessLevel(v)}
              />
            </Box>
          </Box>
        </Col>

        {/* Cột phải: Comment + Submit */}
        <Col span={12}>
          <Box display="flex" flexDirection="column" height="100%">
            <Typography fontWeight={500} mb={1}>
              Nhận xét của bạn
            </Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Hãy chia sẻ trải nghiệm của bạn..."
            />
            <Box mt="auto" pt={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleSubmit}
              >
                Gửi đánh giá
              </Button>
            </Box>
          </Box>
        </Col>
      </Row>
    </Paper>
  );
};

export default ReviewHomestayForm;
