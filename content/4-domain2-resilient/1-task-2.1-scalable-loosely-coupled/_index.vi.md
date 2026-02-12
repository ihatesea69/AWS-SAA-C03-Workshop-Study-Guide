+++
title = "Task 2.1: Kien truc co kha nang mo rong va lien ket long leo"
date = 2025
weight = 1
chapter = false
pre = "<b>4.1 </b>"
+++

## Ly thuyet

### Amazon API Gateway
Dich vu quan ly day du de tao, xuat ban va quan ly REST, HTTP va WebSocket APIs.

### Amazon SQS
Dich vu hang doi tin nhan de tach roi cac thanh phan.
- **Standard Queue:** At-least-once, throughput gan nhu khong gioi han
- **FIFO Queue:** Exactly-once, thu tu nghiem ngat, 300 msg/s

### Chien luoc Caching
- ElastiCache (Redis/Memcached), CloudFront, API Gateway Caching, DAX

### Kien truc Microservices
- Workloads khong trang thai: Luu session ben ngoai (ElastiCache, DynamoDB)
- Moi microservice so huu data store rieng

### Kien truc huong su kien
- EventBridge, SNS, SQS + SNS Fan-out, Lambda Event Source Mappings

### Elastic Load Balancing
- **ALB:** Layer 7, HTTP/HTTPS, dinh tuyen theo path/host
- **NLB:** Layer 4, TCP/UDP, do tre cuc thap
- **GLB:** Layer 3, cho thiet bi ao (firewall, IDS/IPS)

### Cong nghe Serverless
- Lambda: Tinh toan huong su kien, toi da 15 phut
- Fargate: Container serverless cho ECS va EKS
- Step Functions: Dieu phoi workflows

### Read Replicas
- Aurora: Toi da 15 replicas
- RDS khac: Toi da 5 replicas
- Nhan ban bat dong bo

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | SQS Standard vs FIFO khac nhau the nao? | Standard: at-least-once, khong dam bao thu tu. FIFO: exactly-once, thu tu nghiem ngat. |
| 2 | Kich thuoc tin nhan SQS toi da? | 256 KB |
| 3 | ALB vs NLB khac nhau the nao? | ALB: Layer 7, HTTP. NLB: Layer 4, TCP/UDP. |
| 4 | Thoi gian thuc thi Lambda toi da? | 15 phut |
| 5 | Aurora co bao nhieu read replicas? | Toi da 15 |

---

## Tai lieu tham khao

- [Amazon SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
