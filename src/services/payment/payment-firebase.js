// Import từ firebase/database thay vì từ firebase.js
import {
  ref,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  get,
  update,
  remove,
  getDatabase, // Thêm import này nếu cần
} from "firebase/database";
import { db } from "../firebase.js"; // Import db từ firebase.js

/**
 * Tạo mới customer-bank record
 * @param {Object} data { accountNo, bin, customerId }
 * @returns {Promise<string>} id vừa tạo
 */
export async function createNewCustomerBank(data) {
  const newRef = push(ref(db, "customer-bank")); // tạo node id mới
  await set(newRef, data);
  return newRef.key; // trả về id Firebase
}

/**
 * Tìm customer-bank theo customerId
 * @param {string} customerId
 * @returns {Promise<Array>} danh sách record
 */
export async function findCustomerBankByCustomerId(customerId) {
  // Kiểm tra giá trị đầu vào kỹ lưỡng
  if (customerId === undefined || customerId === null) {
    console.error("Lỗi: Customer ID là undefined hoặc null");
    return [];
  }

  if (typeof customerId !== "string" || customerId.trim() === "") {
    console.error("Lỗi: Customer ID không hợp lệ", customerId);
    return [];
  }

  try {
    const q = query(
      ref(db, "customer-bank"),
      orderByChild("customerId"),
      equalTo(customerId)
    );
    const snapshot = await get(q);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, obj]) => ({ id, ...obj }));
    }
    return [];
  } catch (error) {
    console.error("Lỗi khi truy vấn Firebase:", error);
    return [];
  }
}

/**
 * Update customer-bank record theo customerId
 * (nếu có nhiều bản ghi trùng customerId thì update tất cả)
 * @param {string} customerId
 * @param {Object} newData (chỉ field cần update)
 */
export async function updateCustomerBankByCustomerId(customerId, newData) {
  try {
    const records = await findCustomerBankByCustomerId(customerId);

    if (records.length === 0) {
      console.warn(
        "Không tìm thấy bản ghi nào để update cho customerId:",
        customerId
      );
      return [];
    }

    const updates = {};
    records.forEach((r) => {
      // Chỉ update các field được cung cấp trong newData, giữ nguyên các field khác
      const updatedRecord = { ...r, ...newData };
      // Đảm bảo không có field undefined
      Object.keys(updatedRecord).forEach((key) => {
        if (updatedRecord[key] === undefined) {
          delete updatedRecord[key];
        }
      });
      updates[`customer-bank/${r.id}`] = updatedRecord;
    });

    await update(ref(db), updates);
    console.log("Đã update thành công", records.length, "bản ghi");
    return records.map((r) => r.id);
  } catch (error) {
    console.error("Lỗi khi update customer bank:", error);
    throw error;
  }
}

/**
 * Xoá customer-bank record theo customerId
 * (nếu có nhiều bản ghi trùng customerId thì xoá tất cả)
 * @param {string} customerId
 */
export async function deleteCustomerBankByCustomerId(customerId) {
  const records = await findCustomerBankByCustomerId(customerId);
  const updates = {};
  records.forEach((r) => {
    updates[`customer-bank/${r.id}`] = null; // null = xoá node
  });
  await update(ref(db), updates);
  return records.map((r) => r.id); // trả về list id đã xoá
}
