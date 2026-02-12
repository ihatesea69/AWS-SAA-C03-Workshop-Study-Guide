+++
title = "Task 2.1: Kiến trúc có khả năng mở rộng và liên kết lỏng lẻo"
date = 2025
weight = 1
chapter = false
pre = "<b>4.1 </b>"
+++

## Lý thuyết

### Amazon API Gateway
Dịch vụ quản lý đầy đủ để tạo, xuất bản và quản lý REST, HTTP và WebSocket APIs.

### Amazon SQS
Dịch vụ hàng đợi tin nhắn để tách rời các thành phần.
- **Standard Queue:** At-least-once, throughput gần như không giới hạn
- **FIFO Queue:** Exactly-once, thứ tự nghiêm ngặt, 300 msg/s

### Chiến lược Caching
- ElastiCache (Redis/Memcached), CloudFront, API Gateway Caching, DAX

### Kiến trúc Microservices
- Workloads không trạng thái: Lưu session bên ngoài (ElastiCache, DynamoDB)
- Mỗi microservice sở hữu data store riêng

### Kiến trúc hướng sự kiện
- EventBridge, SNS, SQS + SNS Fan-out, Lambda Event Source Mappings

### Elastic Load Balancing
- **ALB:** Layer 7, HTTP/HTTPS, định tuyến theo path/host
- **NLB:** Layer 4, TCP/UDP, độ trễ cực thấp
- **GLB:** Layer 3, cho thiết bị ảo (firewall, IDS/IPS)

### Công nghệ Serverless
- Lambda: Tính toán hướng sự kiện, tối đa 15 phút
- Fargate: Container serverless cho ECS và EKS
- Step Functions: Điều phối workflows

### Read Replicas
- Aurora: Tối đa 15 replicas
- RDS khác: Tối đa 5 replicas
- Nhân bản bất đồng bộ

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | SQS Standard vs FIFO khác nhau thế nào? | Standard: at-least-once, không đảm bảo thứ tự. FIFO: exactly-once, thứ tự nghiêm ngặt. |
| 2 | Kích thước tin nhắn SQS tối đa? | 256 KB |
| 3 | ALB vs NLB khác nhau thế nào? | ALB: Layer 7, HTTP. NLB: Layer 4, TCP/UDP. |
| 4 | Thời gian thực thi Lambda tối đa? | 15 phút |
| 5 | Aurora có bao nhiêu read replicas? | Tối đa 15 |

---

## Tài liệu tham khảo

- [Amazon SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
