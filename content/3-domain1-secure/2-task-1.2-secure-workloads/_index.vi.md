+++
title = "Task 1.2: Bao mat Workloads va Ung dung"
date = 2025
weight = 2
chapter = false
pre = "<b>3.2 </b>"
+++

## Ly thuyet

### Thanh phan bao mat VPC

Amazon VPC cung cap nhieu lop bao mat mang.

### Security Groups (Stateful)

- Tuong lua ao o **cap instance** (ENI)
- **Stateful:** Neu luu luong vao duoc phep, phan hoi tu dong duoc phep
- Chi ho tro **quy tac cho phep** (khong co quy tac tu choi)

### Network ACLs (Stateless)

- Tuong lua o **cap subnet**
- **Stateless:** Luu luong tra ve phai duoc cho phep ro rang
- Ho tro ca **quy tac cho phep va tu choi**
- Quy tac duoc danh gia theo thu tu so (thap nhat truoc)

### NAT Gateways

Cho phep instances trong private subnets truy cap internet ma khong bi truy cap tu internet.

### AWS Shield

- **Standard:** Mien phi, bao ve DDoS Layer 3/4
- **Advanced:** $3,000/thang, bao ve nang cao, DRT 24/7

### AWS WAF

Bao ve chong SQL injection, XSS tai Layer 7. Trien khai tren CloudFront, ALB, API Gateway.

### AWS Secrets Manager

Luu tru va tu dong xoay vong secrets (database credentials, API keys).

### VPN va Direct Connect

- **Site-to-Site VPN:** Ket noi ma hoa qua internet cong cong
- **Direct Connect:** Ket noi rieng chuyen dung, khong ma hoa mac dinh

### Amazon Cognito, GuardDuty, Macie

- **Cognito:** Xac thuc nguoi dung (User Pools) va uy quyen (Identity Pools)
- **GuardDuty:** Phat hien moi de doa thong minh
- **Macie:** Phat hien du lieu nhay cam trong S3

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Security Groups la stateful hay stateless? | Stateful |
| 2 | NACLs la stateful hay stateless? | Stateless |
| 3 | AWS WAF trien khai o dau? | CloudFront, ALB, API Gateway, AppSync |
| 4 | Direct Connect co ma hoa mac dinh khong? | Khong. Can them VPN de ma hoa. |
| 5 | Macie phat hien gi? | Du lieu nhay cam trong S3 (PII, du lieu tai chinh) |

---

## Tai lieu tham khao

- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS WAF Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html)
- [Amazon GuardDuty User Guide](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html)
