+++
title = "Bảng so sánh"
date = 2025
weight = 7
chapter = false
pre = "<b>7. </b>"
+++

## Bảng so sánh dịch vụ

Bảng so sánh nhanh cho các dịch vụ AWS thường bị nhầm lẫn trong kỳ thi SAA-C03.

### S3 vs EBS vs EFS

| Tính năng | S3 | EBS | EFS |
|-----------|-----|-----|-----|
| Use Case | Lưu trữ đối tượng | Boot volumes, CSDL | Hệ thống file chia sẻ |
| Pricing | Theo GB lưu trữ | Theo GB provision | Theo GB sử dụng |
| Performance | 3,500 PUT / 5,500 GET | Tối đa 256K IOPS | Throughput elastic |
| Exam Tip | Mặc định cho object storage | Gắn vào 1 EC2 | NFS chia sẻ multi-AZ |

### ALB vs NLB vs GLB

| Tính năng | ALB | NLB | GLB |
|-----------|-----|-----|-----|
| Use Case | Web apps HTTP/HTTPS | TCP/UDP, độ trễ thấp | Thiết bị bảo mật |
| Pricing | ~$0.0225/hr | ~$0.0225/hr | ~$0.0125/hr |
| Exam Tip | Mặc định cho web | Khi cần IP tĩnh hoặc TCP | Firewalls, IDS/IPS |

### SQS vs SNS vs EventBridge

| Tính năng | SQS | SNS | EventBridge |
|-----------|-----|-----|-------------|
| Use Case | Hàng đợi | Pub/sub fan-out | Định tuyến sự kiện |
| Exam Tip | Tách rời thành phần | Fan-out nhiều targets | Event-driven, SaaS |

### Security Groups vs NACLs

| Tính năng | Security Groups | NACLs |
|-----------|----------------|-------|
| Cấp độ | Instance | Subnet |
| Trạng thái | Stateful | Stateless |
| Quy tắc | Chỉ cho phép | Cho phép và từ chối |

### NAT Gateway vs NAT Instance

| Tính năng | NAT Gateway | NAT Instance |
|-----------|-------------|--------------|
| Chi phí | ~$32/tháng | ~$3.80/tháng (t3.nano) |
| Exam Tip | Production | Dev/test tiết kiệm |

### Direct Connect vs VPN

| Tính năng | Direct Connect | VPN |
|-----------|---------------|-----|
| Mã hóa | Không mặc định | Có |
| Thiết lập | Tuần | Phút |
| Exam Tip | Lưu lượng lớn, ổn định | Lưu lượng thấp, nhanh |

### Reserved vs Savings Plans vs Spot

| Tính năng | Reserved | Savings Plans | Spot |
|-----------|----------|---------------|------|
| Giảm giá | Tới 72% | Tới 72% | Tới 90% |
| Exam Tip | Steady-state | Linh hoạt | Batch, chịu gián đoạn |
