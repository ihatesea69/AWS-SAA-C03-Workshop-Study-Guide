+++
title = "Task 1.3: Kiem soat bao mat du lieu"
date = 2025
weight = 3
chapter = false
pre = "<b>3.3 </b>"
+++

## Ly thuyet

### Ma hoa tai cho — AWS KMS

AWS KMS la dich vu trung tam de quan ly khoa ma hoa.

**Loai khoa:**
- **AWS Managed Keys** — AWS tao va quan ly. Mien phi, tu dong xoay vong hang nam.
- **Customer Managed Keys (CMKs)** — Ban tao va quan ly. $1/thang moi khoa.
- **AWS Owned Keys** — AWS su dung noi bo. Khong hien thi trong tai khoan ban.

**Envelope Encryption:** KMS ma hoa data key, data key ma hoa du lieu cua ban.

### Ma hoa khi truyen — ACM va TLS

AWS Certificate Manager (ACM) quan ly chung chi SSL/TLS.
- Chung chi cong khai: Mien phi, tu dong gia han
- Diem ket thuc TLS: ALB, CloudFront, API Gateway

### Sao luu va Nhan ban du lieu

- **AWS Backup** — Dich vu sao luu tap trung
- **S3 CRR** — Nhan ban cross-region
- **Backup Vault Lock** — Tuan thu WORM

### Vong doi du lieu

- **S3 Lifecycle Policies** — Chuyen doi storage classes
- **S3 Object Lock** — Ngan xoa doi tuong
- **S3 Versioning** — Bao ve chong xoa nham

### Xoay vong khoa va Gia han chung chi

- KMS tu dong xoay vong: Hang nam
- ACM tu dong gia han chung chi cong khai

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Ba loai khoa KMS la gi? | AWS Managed, Customer Managed, AWS Owned |
| 2 | Envelope encryption la gi? | KMS ma hoa data key, data key ma hoa du lieu |
| 3 | Chung chi ACM cong khai co mien phi khong? | Co, va tu dong gia han |
| 4 | S3 Object Lock la gi? | Tuan thu WORM ngan xoa doi tuong |
| 5 | Co the ma hoa RDS instance hien tai khong? | Khong. Phai tao snapshot ma hoa roi restore instance moi |

---

## Tai lieu tham khao

- [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)
- [AWS Certificate Manager User Guide](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
- [AWS Backup Developer Guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
