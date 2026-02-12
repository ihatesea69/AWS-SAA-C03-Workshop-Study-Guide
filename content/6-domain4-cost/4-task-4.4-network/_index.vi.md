+++
title = "Task 4.4: Mang toi uu chi phi"
date = 2025
weight = 4
chapter = false
pre = "<b>6.4 </b>"
+++

## Ly thuyet

### NAT Gateway vs NAT Instance
NAT Gateway: ~$32/thang, quan ly day du. NAT Instance: ~$3.80/thang (t3.nano), tu quan ly. Dung NAT Instance cho dev/test.

### Direct Connect vs VPN
Direct Connect: chi phi cao hon nhung on dinh. VPN: re hon cho luu luong thap.

### VPC Peering vs Transit Gateway
Peering: mien phi theo gio, tot cho 2-5 VPCs. Transit Gateway: $0.05/gio, tot cho 10+ VPCs.

### VPC Endpoints
Gateway Endpoints (S3, DynamoDB): Mien phi. Loai bo chi phi xu ly du lieu NAT Gateway.

### Chi phi truyen du lieu
Vao: Mien phi. Cung AZ: Mien phi. Cross-AZ: $0.01/GB. Cross-Region: $0.02/GB.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | NAT Gateway vs NAT Instance chi phi? | Gateway: ~$32/thang. Instance: ~$3.80/thang. |
| 2 | Gateway Endpoint co mien phi khong? | Co (chi S3 va DynamoDB) |
| 3 | Du lieu vao AWS co mien phi khong? | Co |
| 4 | Cross-AZ data transfer? | $0.01/GB moi chieu |
| 5 | CloudFront giam chi phi the nao? | Gia data transfer thap hon, cache tai edge |

---

## Tai lieu tham khao

- [AWS Data Transfer Pricing](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer)
- [NAT Gateway Pricing](https://aws.amazon.com/vpc/pricing/)
- [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)
