+++
title = "Task 2.2: Kiến trúc sẵn sàng cao và chịu lỗi"
date = 2025
weight = 2
chapter = false
pre = "<b>4.2 </b>"
+++

## Lý thuyết

### Hạ tầng toàn cầu AWS
- **Regions:** Khu vực địa lý với 2+ AZs
- **Availability Zones:** Trung tâm dữ liệu riêng biệt với nguồn điện và mạng dự phòng

### Amazon Route 53
Dịch vụ DNS với health checking và các chính sách định tuyến: Simple, Weighted, Latency, Failover, Geolocation, Multi-value.

### Chiến lược Disaster Recovery

| Chiến lược | RPO | RTO | Chi phí |
|------------|-----|-----|---------|
| Backup and Restore | Giờ | Giờ | Thấp nhất |
| Pilot Light | Phút | Chục phút | Thấp |
| Warm Standby | Giây-Phút | Phút | Trung bình |
| Active-Active | Gần bằng 0 | Gần bằng 0 | Cao nhất |

### RDS High Availability
- **Multi-AZ:** Nhân bản đồng bộ, failover tự động 1-2 phút
- **Aurora:** 6 bản sao trên 3 AZs, failover dưới 30 giây
- **Aurora Global Database:** RPO 1 giây, RTO dưới 1 phút

### Amazon RDS Proxy
Gộp nhóm kết nối database, giảm thời gian failover 66%, hỗ trợ IAM auth.

### Immutable Infrastructure
Thay thế instances thay vì cập nhật tại chỗ. Sử dụng AMIs và Auto Scaling.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | RPO và RTO khác nhau thế nào? | RPO: mất dữ liệu tối đa. RTO: thời gian ngừng tối đa. |
| 2 | Chiến lược DR nào rẻ nhất? | Backup and Restore |
| 3 | Có thể đọc từ RDS Multi-AZ standby không? | Không. Chỉ dùng cho failover. |
| 4 | Aurora lưu bao nhiêu bản sao dữ liệu? | 6 bản sao trên 3 AZs |
| 5 | RDS Proxy làm gì? | Gộp nhóm kết nối, giảm failover 66% |

---

## Tài liệu tham khảo

- [Amazon Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [AWS Disaster Recovery Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html)
- [Amazon RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
