import { createContext, useEffect, useState } from "react";
import { findCustomerBankByCustomerId } from "../../services/payment/payment-firebase";

export const AuthContext = createContext({});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({});
  const [customerBank, setCustomerBank] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [showBeforeTax, setShowBeforeTax] = useState(false);

  // Hàm fetch customer bank
  const fetchCustomerBank = async (customerId) => {
    if (!customerId) {
      console.warn("Không có customer ID để fetch bank");
      setCustomerBank(null);
      return;
    }

    try {
      const resp = await findCustomerBankByCustomerId(customerId);
      //   console.log("Bank data response:", resp); // Log resp

      if (resp && resp.length > 0) {
        const bankData = resp[0];
        setCustomerBank(bankData);
        // console.log("BankData to be saved: ", bankData); // Log data nhận
      } else {
        setCustomerBank(null);
        console.log("No bank data found");
      }
    } catch (error) {
      console.error("Lỗi khi fetch customer bank:", error);
      setCustomerBank(null);
    }
  };

  // Fetch bank khi user thay đổi
  useEffect(() => {
    if (user && user.customerId) {
      //   console.log("Fetching bank for customer:", user.customerId);
      fetchCustomerBank(user.customerId);
    } else {
      setCustomerBank(null);
    }
  }, [user]); // Chỉ chạy khi user thay đổi

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUser(null);
    }
    setIsAppLoading(false);
  }, []);

  useEffect(() => {
    console.log("CustomerBank state updated:", customerBank);
  }, [customerBank]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAppLoading,
        setIsAppLoading,
        showBeforeTax,
        setShowBeforeTax,
        customerBank,
        fetchCustomerBank,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
