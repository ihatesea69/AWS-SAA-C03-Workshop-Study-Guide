+++
title = "Task 2.2: Kien truc san sang cao va chiu loi"
date = 2025
weight = 2
chapter = false
pre = "<b>4.2 </b>"
+++

## Ly thuyet

### Ha tang toan cau AWS
- **Regions:** Khu vuc dia ly voi 2+ AZs
- **Availability Zones:** Trung tam du lieu rieng biet voi nguon dien va mang du phong

### Amazon Route 53
Dich vu DNS voi health checking va cac chinh sach dinh tuyen: Simple, Weighted, Latency, Failover, Geolocation, Multi-value.

### Chien luoc Disaster Recovery

| Chien luoc | RPO | RTO | Chi phi |
|------------|-----|-----|---------|
| Backup and Restore | Gio | Gio | Thap nhat |
| Pilot Light | Phut | Chuc phut | Thap |
| Warm Standby | Giay-Phut | Phut | Trung binh |
| Active-Active | Gan bang 0 | Gan bang 0 | Cao nhat |

### RDS High Availability
- **Multi-AZ:** Nhan ban dong bo, failover tu dong 1-2 phut
- **Aurora:** 6 ban sao tren 3 AZs, failover duoi 30 giay
- **Aurora Global Database:** RPO 1 giay, RTO duoi 1 phut

### Amazon RDS Proxy
Gom nhom ket noi database, giam thoi gian failover 66%, ho tro IAM auth.

### Immutable Infrastructure
Thay the instances thay vi cap nhat tai cho. Su dung AMIs va Auto Scaling.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | RPO va RTO khac nhau the nao? | RPO: mat du lieu toi da. RTO: thoi gian ngung toi da. |
| 2 | Chien luoc DR nao re nhat? | Backup and Restore |
| 3 | Co the doc tu RDS Multi-AZ standby khong? | Khong. Chi dung cho failover. |
| 4 | Aurora luu bao nhieu ban sao du lieu? | 6 ban sao tren 3 AZs |
| 5 | RDS Proxy lam gi? | Gom nhom ket noi, giam failover 66% |

---

## Tai lieu tham khao

- [Amazon Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [AWS Disaster Recovery Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html)
- [Amazon RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
