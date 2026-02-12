+++
title = "Task 3.3: Giai phap co so du lieu hieu suat cao"
date = 2025
weight = 3
chapter = false
pre = "<b>5.3 </b>"
+++

## Ly thuyet

### Amazon RDS
CSDL quan he duoc quan ly. Multi-AZ cho HA, Read Replicas cho hieu suat doc.

### Amazon Aurora
Tuong thich MySQL/PostgreSQL, hieu suat 5x MySQL. 15 read replicas, Aurora Serverless v2, Global Database.

### Amazon DynamoDB
NoSQL key-value, do tre mili giay. On-Demand hoac Provisioned. DAX cho do tre micro giay.

### Amazon ElastiCache
- **Redis:** Persistence, replication, kieu du lieu phong phu
- **Memcached:** Don gian, da luong, khong persistence

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Aurora co bao nhieu read replicas? | Toi da 15 |
| 2 | DynamoDB DAX la gi? | Cache in-memory cho DynamoDB, do tre micro giay |
| 3 | Redis vs Memcached? | Redis: persistence, replication. Memcached: don gian, da luong. |
| 4 | Lazy Loading la gi? | Tai du lieu vao cache khi cache miss |
| 5 | CSDL nao cho graph data? | Amazon Neptune |

---

## Tai lieu tham khao

- [Amazon Aurora User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Amazon ElastiCache User Guide](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html)
