import { notification, Select } from "antd";
import { useEffect, useState } from "react";
import { getAllBanksInfo } from "../../services/payment/vietqr.api";

const BankSelect = ({ value, onChange, isModalBankOpen }) => {
  const [api, context] = notification.useNotification();
  const [listBanks, setListBanks] = useState([]);

  const fetchAllBanks = async () => {
    try {
      const resp = await getAllBanksInfo();
      if (resp.data.code === "00") {
        setListBanks(resp.data.data);
        console.log("Get data banks thành công");
      } else {
        api.error({
          message: "Lỗi khi lấy danh sách ngân hàng",
          duration: 3,
        });
      }
    } catch (error) {
      api.error({
        message: "Lỗi kết nối",
        description: "Không thể lấy danh sách ngân hàng",
        duration: 3,
      });
    }
  };

  useEffect(() => {
    if (isModalBankOpen) {
      fetchAllBanks();
    }
  }, [isModalBankOpen]);

  const handleChange = (value) => {
    // Gọi callback function từ props để truyền giá trị lên component cha
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <>
      {context}
      <Select
        showSearch
        placeholder="Chọn ngân hàng"
        value={value} // Sử dụng value từ props thay vì state local
        onChange={handleChange} // Sử dụng handleChange thay vì setSelectedBank
        style={{ width: "100%" }}
        filterOption={(input, option) =>
          option.label.props.children[1].props.children
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={listBanks.map((bank) => ({
          value: bank.bin,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={bank.logo}
                alt={bank.name}
                style={{ width: 24, height: 24, objectFit: "contain" }}
              />
              <span>{bank.name}</span>
            </div>
          ),
        }))}
      />
    </>
  );
};

export default BankSelect;
