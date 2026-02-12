+++
title = "Task 1.3: Kiểm soát bảo mật dữ liệu"
date = 2025
weight = 3
chapter = false
pre = "<b>3.3 </b>"
+++

## Lý thuyết

### Mã hóa tại chỗ — AWS KMS

AWS KMS là dịch vụ trung tâm để quản lý khóa mã hóa.

**Loại khóa:**
- **AWS Managed Keys** — AWS tạo và quản lý. Miễn phí, tự động xoay vòng hàng năm.
- **Customer Managed Keys (CMKs)** — Bạn tạo và quản lý. $1/tháng mỗi khóa.
- **AWS Owned Keys** — AWS sử dụng nội bộ. Không hiển thị trong tài khoản bạn.

**Envelope Encryption:** KMS mã hóa data key, data key mã hóa dữ liệu của bạn.

### Mã hóa khi truyền — ACM và TLS

AWS Certificate Manager (ACM) quản lý chứng chỉ SSL/TLS.
- Chứng chỉ công khai: Miễn phí, tự động gia hạn
- Điểm kết thúc TLS: ALB, CloudFront, API Gateway

### Sao lưu và Nhân bản dữ liệu

- **AWS Backup** — Dịch vụ sao lưu tập trung
- **S3 CRR** — Nhân bản cross-region
- **Backup Vault Lock** — Tuân thủ WORM

### Vòng đời dữ liệu

- **S3 Lifecycle Policies** — Chuyển đổi storage classes
- **S3 Object Lock** — Ngăn xóa đối tượng
- **S3 Versioning** — Bảo vệ chống xóa nhầm

### Xoay vòng khóa và Gia hạn chứng chỉ

- KMS tự động xoay vòng: Hàng năm
- ACM tự động gia hạn chứng chỉ công khai

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Ba loại khóa KMS là gì? | AWS Managed, Customer Managed, AWS Owned |
| 2 | Envelope encryption là gì? | KMS mã hóa data key, data key mã hóa dữ liệu |
| 3 | Chứng chỉ ACM công khai có miễn phí không? | Có, và tự động gia hạn |
| 4 | S3 Object Lock là gì? | Tuân thủ WORM ngăn xóa đối tượng |
| 5 | Có thể mã hóa RDS instance hiện tại không? | Không. Phải tạo snapshot mã hóa rồi restore instance mới |

---

## Tài liệu tham khảo

- [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)
- [AWS Certificate Manager User Guide](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
- [AWS Backup Developer Guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
