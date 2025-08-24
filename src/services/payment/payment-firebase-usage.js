import {
  createNewCustomerBank,
  findCustomerBankByCustomerId,
  updateCustomerBankByCustomerId,
  deleteCustomerBankByCustomerId,
  updateCustomerBankById,
  deleteCustomerBankById
} from "./customerBankService";

// 🔹 1. Tạo mới
const id = await createNewCustomerBank({
  accountNo: "123456789",
  bin: "970418",
  customerId: "cs999"
});
console.log("ID mới:", id);

// 🔹 2. Tìm theo customerId
const list = await findCustomerBankByCustomerId("cs999");
console.log("Danh sách:", list);

// 🔹 3. Update theo customerId
await updateCustomerBankByCustomerId("cs999", { accountNo: "99999999" });
console.log("Update xong");

// 🔹 4. Xoá theo customerId
await deleteCustomerBankByCustomerId("cs999");
console.log("Đã xoá");

// 🔹 5. Update theo id (an toàn hơn)
await updateCustomerBankById(id, { accountNo: "77777777" });

// 🔹 6. Xoá theo id (an toàn hơn)
await deleteCustomerBankById(id);
