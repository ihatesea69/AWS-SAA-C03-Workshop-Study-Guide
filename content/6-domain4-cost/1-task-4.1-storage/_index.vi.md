+++
title = "Task 4.1: Luu tru toi uu chi phi"
date = 2025
weight = 1
chapter = false
pre = "<b>6.1 </b>"
+++

## Ly thuyet

### S3 Storage Classes
Standard > Intelligent-Tiering > Standard-IA > One Zone-IA > Glacier Instant > Glacier Flexible > Deep Archive. Lifecycle policies tu dong chuyen doi.

### Cong cu quan ly chi phi
- **Cost Explorer:** Phan tich chi tieu
- **Budgets:** Dat ngan sach voi canh bao
- **Cost Allocation Tags:** Theo doi chi phi theo du an/nhom

### EBS toi uu chi phi
gp3 re hon gp2 20%. Xoa volumes khong su dung. DLM cho snapshots.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | S3 class re nhat? | Glacier Deep Archive |
| 2 | gp3 vs gp2 chi phi? | gp3 re hon 20% |
| 3 | Requester Pays la gi? | Nguoi yeu cau tra phi thay vi chu bucket |
| 4 | Budgets lam gi? | Dat ngan sach voi canh bao |
| 5 | Min ngay truoc khi chuyen Standard sang IA? | 30 ngay |

---

## Tai lieu tham khao

- [S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
