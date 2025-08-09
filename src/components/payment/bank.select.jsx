import { notification, Select } from "antd";
import { useEffect, useState } from "react";
import { getAllBanksInfo } from "../../services/payment/vietqr.api";

const BankSelect = () => {
  const [api, context] = notification.useNotification();
  const [listBanks, setListBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState();

  const fetchAllBanks = async () => {
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
  };

  useEffect(() => {
    fetchAllBanks();
  });

  return (
    <>
      {context}
      <Select
        showSearch
        placeholder="Chọn ngân hàng"
        value={selectedBank}
        onChange={(value) => setSelectedBank(value)}
        style={{ width: "100%" }}
        options={listBanks.map((bank) => ({
          value: bank.code,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={bank.logo}
                alt={bank.name}
                style={{ width: 80, height: 80, objectFit: "contain" }}
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
