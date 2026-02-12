+++
title = "Task 4.1: Lưu trữ tối ưu chi phí"
date = 2025
weight = 1
chapter = false
pre = "<b>6.1 </b>"
+++

## Lý thuyết

### S3 Storage Classes
Standard > Intelligent-Tiering > Standard-IA > One Zone-IA > Glacier Instant > Glacier Flexible > Deep Archive. Lifecycle policies tự động chuyển đổi.

### Công cụ quản lý chi phí
- **Cost Explorer:** Phân tích chi tiêu
- **Budgets:** Đặt ngân sách với cảnh báo
- **Cost Allocation Tags:** Theo dõi chi phí theo dự án/nhóm

### EBS tối ưu chi phí
gp3 rẻ hơn gp2 20%. Xóa volumes không sử dụng. DLM cho snapshots.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | S3 class rẻ nhất? | Glacier Deep Archive |
| 2 | gp3 vs gp2 chi phí? | gp3 rẻ hơn 20% |
| 3 | Requester Pays là gì? | Người yêu cầu trả phí thay vì chủ bucket |
| 4 | Budgets làm gì? | Đặt ngân sách với cảnh báo |
| 5 | Min ngày trước khi chuyển Standard sang IA? | 30 ngày |

---

## Tài liệu tham khảo

- [S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
