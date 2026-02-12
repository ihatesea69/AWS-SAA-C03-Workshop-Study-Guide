+++
title = "Task 3.4: Kien truc mang hieu suat cao"
date = 2025
weight = 4
chapter = false
pre = "<b>5.4 </b>"
+++

## Ly thuyet

### Amazon CloudFront
CDN toan cau, cache noi dung tai 400+ edge locations. Ho tro S3, ALB, EC2 origins.

### AWS Global Accelerator
Dinh tuyen qua mang toan cau AWS. 2 IP tinh anycast. Khong cache. Tot cho TCP/UDP, gaming, IoT.

### VPC Endpoints
- **Gateway Endpoints:** S3 va DynamoDB. Mien phi.
- **Interface Endpoints:** Hau het dich vu AWS. Co phi.

### Load Balancing
ALB (Layer 7, HTTP), NLB (Layer 4, TCP/UDP, IP tinh), GLB (Layer 3, appliances).

### Transit Gateway
Ket noi hub-and-spoke cho nhieu VPCs va on-premises.

### Direct Connect
Ket noi rieng chuyen dung tu on-premises den AWS. 1 Gbps hoac 10 Gbps.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | CloudFront vs Global Accelerator? | CloudFront: cache HTTP. Global Accelerator: khong cache, TCP/UDP. |
| 2 | Gateway Endpoint mien phi cho dich vu nao? | S3 va DynamoDB |
| 3 | Transit Gateway la gi? | Hub-and-spoke cho nhieu VPCs |
| 4 | VPC Peering co transitive khong? | Khong |
| 5 | EFA dung cho gi? | HPC, giao tiep giua cac node |

---

## Tai lieu tham khao

- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [AWS Global Accelerator Developer Guide](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html)
- [AWS Transit Gateway Guide](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
