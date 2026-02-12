+++
title = "Task 3.4: Kiến trúc mạng hiệu suất cao"
date = 2025
weight = 4
chapter = false
pre = "<b>5.4 </b>"
+++

## Lý thuyết

### Amazon CloudFront
CDN toàn cầu, cache nội dung tại 400+ edge locations. Hỗ trợ S3, ALB, EC2 origins.

### AWS Global Accelerator
Định tuyến qua mạng toàn cầu AWS. 2 IP tĩnh anycast. Không cache. Tốt cho TCP/UDP, gaming, IoT.

### VPC Endpoints
- **Gateway Endpoints:** S3 và DynamoDB. Miễn phí.
- **Interface Endpoints:** Hầu hết dịch vụ AWS. Có phí.

### Load Balancing
ALB (Layer 7, HTTP), NLB (Layer 4, TCP/UDP, IP tĩnh), GLB (Layer 3, appliances).

### Transit Gateway
Kết nối hub-and-spoke cho nhiều VPCs và on-premises.

### Direct Connect
Kết nối riêng chuyên dụng từ on-premises đến AWS. 1 Gbps hoặc 10 Gbps.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | CloudFront vs Global Accelerator? | CloudFront: cache HTTP. Global Accelerator: không cache, TCP/UDP. |
| 2 | Gateway Endpoint miễn phí cho dịch vụ nào? | S3 và DynamoDB |
| 3 | Transit Gateway là gì? | Hub-and-spoke cho nhiều VPCs |
| 4 | VPC Peering có transitive không? | Không |
| 5 | EFA dùng cho gì? | HPC, giao tiếp giữa các node |

---

## Tài liệu tham khảo

- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [AWS Global Accelerator Developer Guide](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html)
- [AWS Transit Gateway Guide](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
