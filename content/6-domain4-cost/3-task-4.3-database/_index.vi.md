+++
title = "Task 4.3: Co so du lieu toi uu chi phi"
date = 2025
weight = 3
chapter = false
pre = "<b>6.3 </b>"
+++

## Ly thuyet

### DynamoDB vs RDS
DynamoDB On-Demand: tra theo request, khong chi phi nhan roi. RDS: tra theo gio instance, chay 24/7.

### Aurora Serverless v2
Tu dong mo rong, toi uu cho workloads khong du doan. Loai bo over-provisioning.

### Di chuyen CSDL
DMS + SCT de chuyen tu Oracle sang Aurora/PostgreSQL, tiet kiem 80%+ chi phi licensing.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | DynamoDB On-Demand vs Provisioned? | On-Demand: tra theo request. Provisioned: chi dinh RCU/WCU. |
| 2 | Tiet kiem bao nhieu khi chuyen Oracle sang Aurora? | 80%+ chi phi licensing |
| 3 | Aurora read replicas co ton them storage khong? | Khong, chia se cung storage volume |
| 4 | DMS la gi? | Database Migration Service |
| 5 | Khi nao Aurora Serverless toi uu chi phi? | Workloads khong du doan hoac khong thuong xuyen |

---

## Tai lieu tham khao

- [Amazon RDS Pricing](https://aws.amazon.com/rds/pricing/)
- [Amazon DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
- [AWS DMS User Guide](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
