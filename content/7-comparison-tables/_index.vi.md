+++
title = "Bang so sanh"
date = 2025
weight = 7
chapter = false
pre = "<b>7. </b>"
+++

## Bang so sanh dich vu

Bang so sanh nhanh cho cac dich vu AWS thuong bi nham lan trong ky thi SAA-C03.

### S3 vs EBS vs EFS

| Tinh nang | S3 | EBS | EFS |
|-----------|-----|-----|-----|
| Use Case | Luu tru doi tuong | Boot volumes, CSDL | He thong file chia se |
| Pricing | Theo GB luu tru | Theo GB provision | Theo GB su dung |
| Performance | 3,500 PUT / 5,500 GET | Toi da 256K IOPS | Throughput elastic |
| Exam Tip | Mac dinh cho object storage | Gan vao 1 EC2 | NFS chia se multi-AZ |

### ALB vs NLB vs GLB

| Tinh nang | ALB | NLB | GLB |
|-----------|-----|-----|-----|
| Use Case | Web apps HTTP/HTTPS | TCP/UDP, do tre thap | Thiet bi bao mat |
| Pricing | ~$0.0225/hr | ~$0.0225/hr | ~$0.0125/hr |
| Exam Tip | Mac dinh cho web | Khi can IP tinh hoac TCP | Firewalls, IDS/IPS |

### SQS vs SNS vs EventBridge

| Tinh nang | SQS | SNS | EventBridge |
|-----------|-----|-----|-------------|
| Use Case | Hang doi | Pub/sub fan-out | Dinh tuyen su kien |
| Exam Tip | Tach roi thanh phan | Fan-out nhieu targets | Event-driven, SaaS |

### Security Groups vs NACLs

| Tinh nang | Security Groups | NACLs |
|-----------|----------------|-------|
| Cap do | Instance | Subnet |
| Trang thai | Stateful | Stateless |
| Quy tac | Chi cho phep | Cho phep va tu choi |

### NAT Gateway vs NAT Instance

| Tinh nang | NAT Gateway | NAT Instance |
|-----------|-------------|--------------|
| Chi phi | ~$32/thang | ~$3.80/thang (t3.nano) |
| Exam Tip | Production | Dev/test tiet kiem |

### Direct Connect vs VPN

| Tinh nang | Direct Connect | VPN |
|-----------|---------------|-----|
| Ma hoa | Khong mac dinh | Co |
| Thiet lap | Tuan | Phut |
| Exam Tip | Luu luong lon, on dinh | Luu luong thap, nhanh |

### Reserved vs Savings Plans vs Spot

| Tinh nang | Reserved | Savings Plans | Spot |
|-----------|----------|---------------|------|
| Giam gia | Toi 72% | Toi 72% | Toi 90% |
| Exam Tip | Steady-state | Linh hoat | Batch, chiu gian doan |
