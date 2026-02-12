+++
title = "Task 4.2: Tinh toan toi uu chi phi"
date = 2025
weight = 2
chapter = false
pre = "<b>6.2 </b>"
+++

## Ly thuyet

### Tuy chon mua EC2
- **On-Demand:** Khong cam ket, khong giam gia
- **Reserved Instances:** Giam toi 72%, cam ket 1-3 nam
- **Savings Plans:** Giam toi 72%, linh hoat hon RI
- **Spot Instances:** Giam toi 90%, co the bi gian doan

### Right-Sizing
Dung Compute Optimizer de xac dinh instances qua lon. Graviton cho gia-hieu suat tot hon 20-40%.

### Serverless
Lambda tra theo invocation. Fargate tra theo vCPU-giay. Loai bo chi phi compute nhan roi.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Spot giam toi da bao nhieu? | 90% |
| 2 | Canh bao gian doan Spot? | 2 phut |
| 3 | Compute Optimizer lam gi? | Khuyen nghi right-sizing instances |
| 4 | Lambda free tier? | 1 trieu requests/thang |
| 5 | Graviton la gi? | Instances ARM voi gia-hieu suat tot hon 20-40% |

---

## Tai lieu tham khao

- [EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- [Savings Plans User Guide](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [Spot Instances User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)
