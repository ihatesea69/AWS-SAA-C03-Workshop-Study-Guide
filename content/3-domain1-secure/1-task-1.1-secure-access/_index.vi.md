+++
title = "Task 1.1: Truy cap bao mat den tai nguyen AWS"
date = 2025
weight = 1
chapter = false
pre = "<b>3.1 </b>"
+++

## Ly thuyet

### AWS Identity and Access Management (IAM)

IAM la dich vu cot loi de quan ly truy cap den tai nguyen AWS. No cho phep ban kiem soat ai (xac thuc) co the lam gi (uy quyen) tren tai nguyen nao.

**Thanh phan chinh:**

- **Users** — Danh tinh ca nhan voi thong tin xac thuc dai han
- **Groups** — Tap hop users. Gan policies vao groups thay vi tung user
- **Roles** — Danh tinh tam thoi duoc users, ung dung hoac dich vu AWS su dung
- **Policies** — Tai lieu JSON dinh nghia quyen han

**Logic danh gia Policy:**

1. Mac dinh, tat ca yeu cau bi tu choi (tu choi ngam dinh)
2. Cho phep ro rang ghi de tu choi mac dinh
3. Tu choi ro rang ghi de bat ky cho phep nao

### Multi-Factor Authentication (MFA)

MFA them lop xac thuc thu hai ngoai username va password.

- **Virtual MFA** — Ung dung nhu Google Authenticator, Authy
- **Hardware MFA** — Thiet bi vat ly
- **U2F Security Key** — YubiKey hoac thiet bi USB tuong tu

### AWS Security Token Service (STS)

STS cung cap thong tin xac thuc tam thoi, gioi han quyen cho IAM users hoac federated users.

- `AssumeRole` — Nhan vai tro IAM (cross-account hoac cung account)
- `AssumeRoleWithSAML` — Nhan vai tro su dung SAML
- `AssumeRoleWithWebIdentity` — Nhan vai tro su dung web identity token
- `GetSessionToken` — Lay thong tin xac thuc tam thoi cho MFA

### Cross-Account Access

Cho phep users trong mot tai khoan AWS truy cap tai nguyen trong tai khoan khac thong qua IAM roles.

### Service Control Policies (SCPs)

SCPs la tinh nang cua AWS Organizations dat rao chan quyen han cho cac tai khoan thanh vien. SCPs KHONG cap quyen — chi gioi han nhung gi duoc phep.

### AWS Control Tower

Tu dong hoa thiet lap va quan tri moi truong AWS nhieu tai khoan voi landing zone va guardrails.

### Resource Policies

Policies gan truc tiep vao tai nguyen AWS (S3 bucket policies, SQS queue policies, v.v.)

### Federation

Cho phep danh tinh ben ngoai truy cap tai nguyen AWS ma khong can tao IAM users. Su dung AWS IAM Identity Center, SAML 2.0, hoac Web Identity Federation.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Hieu ung mac dinh cua IAM policies la gi? | Tat ca yeu cau bi tu choi ngam dinh |
| 2 | Gi ghi de cho phep ro rang trong IAM? | Tu choi ro rang luon ghi de cho phep |
| 3 | STS AssumeRole tra ve gi? | Access Key ID, Secret Access Key va Session Token tam thoi |
| 4 | SCPs co cap quyen khong? | Khong, SCPs chi gioi han quyen |
| 5 | Cach tot nhat de cap quyen cho EC2 truy cap S3? | Gan IAM role vao EC2 instance |

---

## Cau hoi thi thu

### Cau 1

Mot cong ty co nhieu tai khoan AWS quan ly qua AWS Organizations. Doi bao mat muon dam bao khong IAM user nao co the tao access keys cho root user. Giai phap nao phu hop?

- A) Tao IAM policy trong moi tai khoan tu choi tao root access key
- B) Ap dung SCP tai organization root tu choi hanh dong `iam:CreateAccessKey` cho root user
- C) Bat AWS Config rules de phat hien su dung root access key
- D) Su dung CloudTrail de giam sat va canh bao

<details><summary>Dap an</summary>

**Dung: B**

SCPs la co che dung de thuc thi gioi han toan to chuc. SCP ap dung tai organization root anh huong tat ca tai khoan thanh vien.

**Domain:** 1
**Task:** 1.1

</details>

---

## Tai lieu tham khao

- [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS STS Documentation](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html)
- [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS Control Tower User Guide](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
