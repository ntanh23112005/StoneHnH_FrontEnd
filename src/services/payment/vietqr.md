# API VietQR để hoàn thiện payment

- GET: `https://api.vietqr.io/v2/banks`

### Sample Bank Object

| Field               | Description                                             | Example                                                   |
|---------------------|---------------------------------------------------------|------------------------------------------------------------|
| `id`                | ID                                                      | 1                                                          |
| `name`              | Tên pháp nhân ngân hàng                                 | Ngân hàng TMCP Đầu tư và Phát triển Việt Nam              |
| `shortName`         | Tên ngắn gọn thường gọi                                 | BIDV                                                       |
| `code`              | Tên mã ngân hàng                                        | BIDV                                                       |
| `bin`               | Mã ngân hàng, sử dụng mã này trong Quick Link           | 970418                                                     |
| `logo`              | Đường dẫn tới logo ngân hàng                            | [https://api.vietqr.io/img/ICB.3d4d6760.png](https://api.vietqr.io/img/ICB.3d4d6760.png) |
| `transferSupported` | App hỗ trợ chuyển tiền qua mã VietQR (0 hoặc 1)         | 1                                                          |
| `lookupSupported`   | Có thể tra cứu số tài khoản bằng API (0 hoặc 1)         | 1                                                          |
