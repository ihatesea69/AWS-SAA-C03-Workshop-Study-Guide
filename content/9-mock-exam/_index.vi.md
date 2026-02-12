+++
title = "Đề thi thử"
date = 2025
weight = 9
chapter = false
pre = "<b>9. </b>"
+++

# Đề thi thử SAA-C03

**Hướng dẫn:** Đề thi thử này có 65 câu hỏi theo trọng số domain giống kỳ thi SAA-C03 thật. Hãy chọn đáp án tốt nhất cho mỗi câu hỏi.

**Trọng số Domain:**
- Domain 1 (Bảo mật): 20 câu hỏi (30%)
- Domain 2 (Phục hồi): 17 câu hỏi (26%)
- Domain 3 (Hiệu suất): 16 câu hỏi (24%)
- Domain 4 (Chi phí): 12 câu hỏi (20%)

**Điểm đạt:** 720/1000 (khoảng 47/65 câu đúng)

---

## Mẹo thi và Chiến lược

### Quản lý thời gian
- Bạn có 130 phút cho 65 câu hỏi (2 phút/câu)
- Đánh dấu câu khó và quay lại sau
- Không nên dành quá 3-4 phút cho 1 câu

### Chiến lược trả lời
- Đọc kỹ câu hỏi và xác định yêu cầu chính
- Loại bỏ các đáp án sai rõ ràng trước
- Tìm các best practices và nguyên tắc Well-Architected
- Chọn giải pháp tối ưu chi phí khi có nhiều lựa chọn

### Các bẫy thi thường gặp
- **Over-engineering:** Chọn giải pháp đơn giản nhất đáp ứng yêu cầu
- **Chi phí vs Hiệu suất:** Cân bằng dựa trên trọng tâm câu hỏi
- **Bảo mật:** Khi nghi ngờ, chọn tùy chọn bảo mật hơn
- **Managed vs Tự quản lý:** AWS ưu tiên dịch vụ managed

---

## Câu hỏi mẫu theo Domain

### Domain 1: Thiết kế kiến trúc bảo mật

**Câu 1:** Một công ty cần cấp quyền truy cập tạm thời vào S3 bucket cho đối tác bên ngoài. Quyền truy cập chỉ giới hạn vào các object cụ thể và hết hạn sau 2 giờ. Cách nào an toàn nhất?

- A) Tạo IAM users cho mỗi đối tác với quyền S3
- B) Tạo pre-signed URLs với thời hạn 2 giờ
- C) Công khai S3 bucket với bucket policy theo thời gian
- D) Dùng S3 Access Points với thông tin xác thực tạm thời

<details><summary>Đáp án</summary>

**Đúng: B**

Pre-signed URLs cung cấp quyền truy cập tạm thời vào các S3 objects cụ thể với thời hạn hết hạn có thể cấu hình. Không cần tạo IAM users hoặc công khai buckets.

**Domain:** 1 — Thiết kế kiến trúc bảo mật
**Task:** 1.1

</details>

### Domain 2: Thiết kế kiến trúc phục hồi

**Câu 21:** Một công ty cần tách rời hệ thống xử lý đơn hàng để các đợt tăng đột biến đơn hàng không làm quá tải backend. Họ nên dùng pattern kiến trúc nào?

- A) Gọi API đồng bộ giữa các dịch vụ
- B) SQS queue giữa tiếp nhận đơn hàng và xử lý
- C) Ghi trực tiếp vào database từ frontend
- D) Hệ thống file chia sẻ giữa các dịch vụ

<details><summary>Đáp án</summary>

**Đúng: B**

SQS cung cấp loose coupling giữa các thành phần, cho phép tiếp nhận đơn hàng tiếp tục nhận đơn trong khi backend xử lý theo tốc độ của nó. Điều này xử lý tốt các đợt tăng traffic.

**Domain:** 2 — Thiết kế kiến trúc phục hồi
**Task:** 2.1

</details>

### Domain 3: Kiến trúc hiệu suất cao

**Câu 38:** Một công ty cần lưu trữ 100 TB dữ liệu sẽ được truy cập thường xuyên với độ trễ thấp. Họ nên dùng S3 storage class nào?

- A) S3 Standard
- B) S3 Intelligent-Tiering
- C) S3 Standard-IA
- D) S3 Glacier

<details><summary>Đáp án</summary>

**Đúng: A**

S3 Standard cung cấp độ trễ thấp và throughput cao cho dữ liệu truy cập thường xuyên. Intelligent-Tiering thêm overhead cho phân tích access pattern. IA và Glacier dành cho truy cập không thường xuyên.

**Domain:** 3 — Kiến trúc hiệu suất cao
**Task:** 3.1

</details>

### Domain 4: Tối ưu chi phí

**Câu 54:** Một công ty chạy EC2 instances 24/7 cho workload production. Họ muốn giảm chi phí. Tùy chọn mua nào tiết kiệm nhất?

- A) On-Demand Instances
- B) Spot Instances
- C) Reserved Instances hoặc Savings Plans
- D) Dedicated Hosts

<details><summary>Đáp án</summary>

**Đúng: C**

Reserved Instances và Savings Plans giảm tới 72% cho workloads ổn định. Spot rẻ hơn nhưng có thể bị gián đoạn. On-Demand là giá đầy đủ. Dedicated Hosts dành cho compliance.

**Domain:** 4 — Tối ưu chi phí
**Task:** 4.2

</details>

---

*Xem phiên bản tiếng Anh để có đầy đủ 65 câu hỏi.*
