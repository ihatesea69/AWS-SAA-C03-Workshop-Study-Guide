+++
title = "Cheat Sheets và Flashcards"
date = 2025
weight = 8
chapter = false
pre = "<b>8. </b>"
+++

## Domain 1: Thiết kế kiến trúc bảo mật (30%) — Cheat Sheet

**Cây quyết định IAM:**
- Cần thông tin xác thực tạm thời? -> IAM Roles + STS
- Cần truy cập cross-account? -> IAM Role với trust policy
- Cần giới hạn toàn tổ chức? -> SCPs
- Cần federate corporate users? -> IAM Identity Center + SAML 2.0
- Cần web identity federation? -> Cognito

**Giới hạn chính:**
- IAM policies mỗi user: 10 managed policies
- STS session mặc định: 1 giờ (15 phút - 12 giờ)
- SCPs: KHÔNG cấp quyền, chỉ giới hạn

**Mã hóa:**
- Tại chỗ: KMS (SSE-KMS, SSE-S3), CloudHSM
- Khi truyền: ACM (TLS/SSL), VPN
- Xoay vòng khóa: KMS tự động hàng năm cho CMKs
- Chứng chỉ ACM công khai: Miễn phí, tự động gia hạn

**Bảo mật mạng:**
- Security Groups: Stateful, chỉ allow, cấp instance
- NACLs: Stateless, allow+deny, cấp subnet
- WAF: Layer 7 (SQL injection, XSS) trên ALB/CloudFront/API Gateway
- Shield Standard: Miễn phí DDoS (L3/L4). Advanced: $3K/tháng

---

## Domain 2: Thiết kế kiến trúc phục hồi (26%) — Cheat Sheet

**Chọn chiến lược DR:**

| RPO/RTO | Chiến lược | Chi phí |
|---------|------------|---------|
| Giờ | Backup and Restore | $ |
| Phút | Pilot Light | $$ |
| Giây-Phút | Warm Standby | $$$ |
| Gần bằng 0 | Active-Active | $$$$ |

**Giới hạn chính:**
- SQS message: 256 KB (Extended Client cho lớn hơn)
- SQS FIFO: 300 msg/s (3,000 với batching)
- Lambda max: 15 phút
- Aurora replicas: 15
- RDS replicas: 5

**Quyết định Scaling:**
- Traffic dự đoán? -> Scheduled Scaling
- Duy trì metric target? -> Target Tracking
- Ngưỡng biến động? -> Step Scaling
- Dựa trên ML? -> Predictive Scaling

**Chọn Load Balancer:**
- HTTP/HTTPS? -> ALB
- TCP/UDP hoặc static IP? -> NLB
- Third-party appliances? -> GLB

---

## Domain 3: Kiến trúc hiệu suất cao (24%) — Cheat Sheet

**Chọn lưu trữ:**

| Cần | Dịch vụ |
|-----|---------|
| Objects, web content | S3 |
| Boot volumes, databases | EBS |
| File Linux chia sẻ | EFS |
| File Windows chia sẻ | FSx for Windows |
| HPC, ML | FSx for Lustre |
| Hybrid | Storage Gateway |

**EBS:**
- gp3: 3,000 IOPS cơ bản, tối đa 16,000
- io2 Block Express: Tối đa 256,000 IOPS
- st1: Throughput HDD (big data)
- sc1: Cold HDD (rẻ nhất)

**Chọn Database:**
- Relational hiệu suất cao? -> Aurora
- Relational tiêu chuẩn? -> RDS
- Key-value, serverless? -> DynamoDB
- In-memory cache? -> ElastiCache Redis
- Graph? -> Neptune

**Caching:**
- DynamoDB? -> DAX (microseconds)
- Tổng quát? -> ElastiCache Redis (persistence, replication)
- Đơn giản? -> ElastiCache Memcached (multi-threaded)

---

## Domain 4: Tối ưu chi phí (20%) — Cheat Sheet

**Chọn EC2:**
- Ổn định 24/7? -> Reserved hoặc Savings Plans (giảm 72%)
- Cam kết linh hoạt? -> Compute Savings Plans
- Batch chịu lỗi? -> Spot (giảm 90%)
- Ngắn hạn, không dự đoán? -> On-Demand

**Tối ưu S3:**
- Dùng lifecycle policies để chuyển storage classes
- Glacier Deep Archive: $0.00099/GB/tháng (rẻ nhất)
- Gateway Endpoints cho S3: Miễn phí (tránh phí NAT Gateway)
- Intelligent-Tiering: Tự động chuyển theo access patterns

**Tiết kiệm mạng:**
- Truy cập S3/DynamoDB? -> Gateway Endpoint (miễn phí)
- Ít VPCs? -> VPC Peering (không phí hàng giờ)
- Nhiều VPCs? -> Transit Gateway
- Dev/test NAT? -> NAT Instance (~$3.80/tháng vs $32/tháng)
- Content delivery? -> CloudFront (rẻ hơn S3 trực tiếp)

**Số liệu chính:**
- Dữ liệu vào: Miễn phí
- Cùng AZ (private IP): Miễn phí
- Cross-AZ: $0.01/GB
- Cross-Region: $0.02/GB
- Internet ra: $0.09/GB (10 TB đầu)
