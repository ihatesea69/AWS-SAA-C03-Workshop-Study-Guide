+++
title = "Task 3.3: Giải pháp cơ sở dữ liệu hiệu suất cao"
date = 2025
weight = 3
chapter = false
pre = "<b>5.3 </b>"
+++

## Lý thuyết

### Amazon RDS
CSDL quan hệ được quản lý. Multi-AZ cho HA, Read Replicas cho hiệu suất đọc.

### Amazon Aurora
Tương thích MySQL/PostgreSQL, hiệu suất 5x MySQL. 15 read replicas, Aurora Serverless v2, Global Database.

### Amazon DynamoDB
NoSQL key-value, độ trễ mili giây. On-Demand hoặc Provisioned. DAX cho độ trễ micro giây.

### Amazon ElastiCache
- **Redis:** Persistence, replication, kiểu dữ liệu phong phú
- **Memcached:** Đơn giản, đa luồng, không persistence

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Aurora có bao nhiêu read replicas? | Tối đa 15 |
| 2 | DynamoDB DAX là gì? | Cache in-memory cho DynamoDB, độ trễ micro giây |
| 3 | Redis vs Memcached? | Redis: persistence, replication. Memcached: đơn giản, đa luồng. |
| 4 | Lazy Loading là gì? | Tải dữ liệu vào cache khi cache miss |
| 5 | CSDL nào cho graph data? | Amazon Neptune |

---

## Tài liệu tham khảo

- [Amazon Aurora User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Amazon ElastiCache User Guide](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html)
