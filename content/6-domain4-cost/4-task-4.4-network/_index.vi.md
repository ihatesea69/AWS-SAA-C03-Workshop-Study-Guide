+++
title = "Task 4.4: Mạng tối ưu chi phí"
date = 2025
weight = 4
chapter = false
pre = "<b>6.4 </b>"
+++

## Lý thuyết

### NAT Gateway vs NAT Instance
NAT Gateway: ~$32/tháng, quản lý đầy đủ. NAT Instance: ~$3.80/tháng (t3.nano), tự quản lý. Dùng NAT Instance cho dev/test.

### Direct Connect vs VPN
Direct Connect: chi phí cao hơn nhưng ổn định. VPN: rẻ hơn cho lưu lượng thấp.

### VPC Peering vs Transit Gateway
Peering: miễn phí theo giờ, tốt cho 2-5 VPCs. Transit Gateway: $0.05/giờ, tốt cho 10+ VPCs.

### VPC Endpoints
Gateway Endpoints (S3, DynamoDB): Miễn phí. Loại bỏ chi phí xử lý dữ liệu NAT Gateway.

### Chi phí truyền dữ liệu
Vào: Miễn phí. Cùng AZ: Miễn phí. Cross-AZ: $0.01/GB. Cross-Region: $0.02/GB.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | NAT Gateway vs NAT Instance chi phí? | Gateway: ~$32/tháng. Instance: ~$3.80/tháng. |
| 2 | Gateway Endpoint có miễn phí không? | Có (chỉ S3 và DynamoDB) |
| 3 | Dữ liệu vào AWS có miễn phí không? | Có |
| 4 | Cross-AZ data transfer? | $0.01/GB mỗi chiều |
| 5 | CloudFront giảm chi phí thế nào? | Giá data transfer thấp hơn, cache tại edge |

---

## Tài liệu tham khảo

- [AWS Data Transfer Pricing](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer)
- [NAT Gateway Pricing](https://aws.amazon.com/vpc/pricing/)
- [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)
