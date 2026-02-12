+++
title = "Cheat Sheets va Flashcards"
date = 2025
weight = 8
chapter = false
pre = "<b>8. </b>"
+++

## Domain 1: Thiet ke kien truc bao mat (30%) — Cheat Sheet

**Cay quyet dinh IAM:**
- Can thong tin xac thuc tam thoi? -> IAM Roles + STS
- Can truy cap cross-account? -> IAM Role voi trust policy
- Can gioi han toan to chuc? -> SCPs
- Can federate corporate users? -> IAM Identity Center + SAML 2.0
- Can web identity federation? -> Cognito

**Gioi han chinh:**
- IAM policies moi user: 10 managed policies
- STS session mac dinh: 1 gio (15 phut - 12 gio)
- SCPs: KHONG cap quyen, chi gioi han

**Ma hoa:**
- Tai cho: KMS (SSE-KMS, SSE-S3), CloudHSM
- Khi truyen: ACM (TLS/SSL), VPN
- Xoay vong khoa: KMS tu dong hang nam cho CMKs
- Chung chi ACM cong khai: Mien phi, tu dong gia han

**Bao mat mang:**
- Security Groups: Stateful, chi allow, cap instance
- NACLs: Stateless, allow+deny, cap subnet
- WAF: Layer 7 (SQL injection, XSS) tren ALB/CloudFront/API Gateway
- Shield Standard: Mien phi DDoS (L3/L4). Advanced: $3K/thang

---

## Domain 2: Thiet ke kien truc phuc hoi (26%) — Cheat Sheet

**Chon chien luoc DR:**

| RPO/RTO | Chien luoc | Chi phi |
|---------|------------|---------|
| Gio | Backup and Restore | $ |
| Phut | Pilot Light | $$ |
| Giay-Phut | Warm Standby | $$$ |
| Gan bang 0 | Active-Active | $$$$ |

**Gioi han chinh:**
- SQS message: 256 KB (Extended Client cho lon hon)
- SQS FIFO: 300 msg/s (3,000 voi batching)
- Lambda max: 15 phut
- Aurora replicas: 15
- RDS replicas: 5

**Quyet dinh Scaling:**
- Traffic du doan? -> Scheduled Scaling
- Duy tri metric target? -> Target Tracking
- Nguong bien dong? -> Step Scaling
- Dua tren ML? -> Predictive Scaling

**Chon Load Balancer:**
- HTTP/HTTPS? -> ALB
- TCP/UDP hoac static IP? -> NLB
- Third-party appliances? -> GLB

---

## Domain 3: Kien truc hieu suat cao (24%) — Cheat Sheet

**Chon luu tru:**

| Can | Dich vu |
|-----|---------|
| Objects, web content | S3 |
| Boot volumes, databases | EBS |
| File Linux chia se | EFS |
| File Windows chia se | FSx for Windows |
| HPC, ML | FSx for Lustre |
| Hybrid | Storage Gateway |

**EBS:**
- gp3: 3,000 IOPS co ban, toi da 16,000
- io2 Block Express: Toi da 256,000 IOPS
- st1: Throughput HDD (big data)
- sc1: Cold HDD (re nhat)

**Chon Database:**
- Relational hieu suat cao? -> Aurora
- Relational tieu chuan? -> RDS
- Key-value, serverless? -> DynamoDB
- In-memory cache? -> ElastiCache Redis
- Graph? -> Neptune

**Caching:**
- DynamoDB? -> DAX (microseconds)
- Tong quat? -> ElastiCache Redis (persistence, replication)
- Don gian? -> ElastiCache Memcached (multi-threaded)

---

## Domain 4: Toi uu chi phi (20%) — Cheat Sheet

**Chon EC2:**
- On dinh 24/7? -> Reserved hoac Savings Plans (giam 72%)
- Cam ket linh hoat? -> Compute Savings Plans
- Batch chiu loi? -> Spot (giam 90%)
- Ngan han, khong du doan? -> On-Demand

**Toi uu S3:**
- Dung lifecycle policies de chuyen storage classes
- Glacier Deep Archive: $0.00099/GB/thang (re nhat)
- Gateway Endpoints cho S3: Mien phi (tranh phi NAT Gateway)
- Intelligent-Tiering: Tu dong chuyen theo access patterns

**Tiet kiem mang:**
- Truy cap S3/DynamoDB? -> Gateway Endpoint (mien phi)
- It VPCs? -> VPC Peering (khong phi hang gio)
- Nhieu VPCs? -> Transit Gateway
- Dev/test NAT? -> NAT Instance (~$3.80/thang vs $32/thang)
- Content delivery? -> CloudFront (re hon S3 truc tiep)

**So lieu chinh:**
- Du lieu vao: Mien phi
- Cung AZ (private IP): Mien phi
- Cross-AZ: $0.01/GB
- Cross-Region: $0.02/GB
- Internet ra: $0.09/GB (10 TB dau)
