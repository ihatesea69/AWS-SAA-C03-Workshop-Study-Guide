+++
title = "Task 1.2: Bảo mật Workloads và Ứng dụng"
date = 2025
weight = 2
chapter = false
pre = "<b>3.2 </b>"
+++

## Lý thuyết

### Thành phần bảo mật VPC

Amazon VPC cung cấp nhiều lớp bảo mật mạng.

### Security Groups (Stateful)

- Tường lửa ảo ở **cấp instance** (ENI)
- **Stateful:** Nếu lưu lượng vào được phép, phản hồi tự động được phép
- Chỉ hỗ trợ **quy tắc cho phép** (không có quy tắc từ chối)

### Network ACLs (Stateless)

- Tường lửa ở **cấp subnet**
- **Stateless:** Lưu lượng trả về phải được cho phép rõ ràng
- Hỗ trợ cả **quy tắc cho phép và từ chối**
- Quy tắc được đánh giá theo thứ tự số (thấp nhất trước)

### NAT Gateways

Cho phép instances trong private subnets truy cập internet mà không bị truy cập từ internet.

### AWS Shield

- **Standard:** Miễn phí, bảo vệ DDoS Layer 3/4
- **Advanced:** $3,000/tháng, bảo vệ nâng cao, DRT 24/7

### AWS WAF

Bảo vệ chống SQL injection, XSS tại Layer 7. Triển khai trên CloudFront, ALB, API Gateway.

### AWS Secrets Manager

Lưu trữ và tự động xoay vòng secrets (database credentials, API keys).

### VPN và Direct Connect

- **Site-to-Site VPN:** Kết nối mã hóa qua internet công cộng
- **Direct Connect:** Kết nối riêng chuyên dụng, không mã hóa mặc định

### Amazon Cognito, GuardDuty, Macie

- **Cognito:** Xác thực người dùng (User Pools) và ủy quyền (Identity Pools)
- **GuardDuty:** Phát hiện mối đe dọa thông minh
- **Macie:** Phát hiện dữ liệu nhạy cảm trong S3

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Security Groups là stateful hay stateless? | Stateful |
| 2 | NACLs là stateful hay stateless? | Stateless |
| 3 | AWS WAF triển khai ở đâu? | CloudFront, ALB, API Gateway, AppSync |
| 4 | Direct Connect có mã hóa mặc định không? | Không. Cần thêm VPN để mã hóa. |
| 5 | Macie phát hiện gì? | Dữ liệu nhạy cảm trong S3 (PII, dữ liệu tài chính) |

---

## Tài liệu tham khảo

- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS WAF Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html)
- [Amazon GuardDuty User Guide](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html)
