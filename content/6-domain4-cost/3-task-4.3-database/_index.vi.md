+++
title = "Task 4.3: Cơ sở dữ liệu tối ưu chi phí"
date = 2025
weight = 3
chapter = false
pre = "<b>6.3 </b>"
+++

## Lý thuyết

### DynamoDB vs RDS
DynamoDB On-Demand: trả theo request, không chi phí nhàn rỗi. RDS: trả theo giờ instance, chạy 24/7.

### Aurora Serverless v2
Tự động mở rộng, tối ưu cho workloads không dự đoán. Loại bỏ over-provisioning.

### Di chuyển CSDL
DMS + SCT để chuyển từ Oracle sang Aurora/PostgreSQL, tiết kiệm 80%+ chi phí licensing.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | DynamoDB On-Demand vs Provisioned? | On-Demand: trả theo request. Provisioned: chỉ định RCU/WCU. |
| 2 | Tiết kiệm bao nhiêu khi chuyển Oracle sang Aurora? | 80%+ chi phí licensing |
| 3 | Aurora read replicas có tốn thêm storage không? | Không, chia sẻ cùng storage volume |
| 4 | DMS là gì? | Database Migration Service |
| 5 | Khi nào Aurora Serverless tối ưu chi phí? | Workloads không dự đoán hoặc không thường xuyên |

---

## Tài liệu tham khảo

- [Amazon RDS Pricing](https://aws.amazon.com/rds/pricing/)
- [Amazon DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
- [AWS DMS User Guide](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
