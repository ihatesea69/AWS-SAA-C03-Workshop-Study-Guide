+++
title = "Task 1.1: Truy cập bảo mật đến tài nguyên AWS"
date = 2025
weight = 1
chapter = false
pre = "<b>3.1 </b>"
+++

## Lý thuyết

### AWS Identity and Access Management (IAM)

IAM là dịch vụ cốt lõi để quản lý truy cập đến tài nguyên AWS. Nó cho phép bạn kiểm soát ai (xác thực) có thể làm gì (ủy quyền) trên tài nguyên nào.

**Thành phần chính:**

- **Users** — Danh tính cá nhân với thông tin xác thực dài hạn
- **Groups** — Tập hợp users. Gán policies vào groups thay vì từng user
- **Roles** — Danh tính tạm thời được users, ứng dụng hoặc dịch vụ AWS sử dụng
- **Policies** — Tài liệu JSON định nghĩa quyền hạn

**Logic đánh giá Policy:**

1. Mặc định, tất cả yêu cầu bị từ chối (từ chối ngầm định)
2. Cho phép rõ ràng ghi đè từ chối mặc định
3. Từ chối rõ ràng ghi đè bất kỳ cho phép nào

### Multi-Factor Authentication (MFA)

MFA thêm lớp xác thực thứ hai ngoài username và password.

- **Virtual MFA** — Ứng dụng như Google Authenticator, Authy
- **Hardware MFA** — Thiết bị vật lý
- **U2F Security Key** — YubiKey hoặc thiết bị USB tương tự

### AWS Security Token Service (STS)

STS cung cấp thông tin xác thực tạm thời, giới hạn quyền cho IAM users hoặc federated users.

- `AssumeRole` — Nhận vai trò IAM (cross-account hoặc cùng account)
- `AssumeRoleWithSAML` — Nhận vai trò sử dụng SAML
- `AssumeRoleWithWebIdentity` — Nhận vai trò sử dụng web identity token
- `GetSessionToken` — Lấy thông tin xác thực tạm thời cho MFA

### Cross-Account Access

Cho phép users trong một tài khoản AWS truy cập tài nguyên trong tài khoản khác thông qua IAM roles.

### Service Control Policies (SCPs)

SCPs là tính năng của AWS Organizations đặt rào cản quyền hạn cho các tài khoản thành viên. SCPs KHÔNG cấp quyền — chỉ giới hạn những gì được phép.

### AWS Control Tower

Tự động hóa thiết lập và quản trị môi trường AWS nhiều tài khoản với landing zone và guardrails.

### Resource Policies

Policies gắn trực tiếp vào tài nguyên AWS (S3 bucket policies, SQS queue policies, v.v.)

### Federation

Cho phép danh tính bên ngoài truy cập tài nguyên AWS mà không cần tạo IAM users. Sử dụng AWS IAM Identity Center, SAML 2.0, hoặc Web Identity Federation.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Hiệu ứng mặc định của IAM policies là gì? | Tất cả yêu cầu bị từ chối ngầm định |
| 2 | Gì ghi đè cho phép rõ ràng trong IAM? | Từ chối rõ ràng luôn ghi đè cho phép |
| 3 | STS AssumeRole trả về gì? | Access Key ID, Secret Access Key và Session Token tạm thời |
| 4 | SCPs có cấp quyền không? | Không, SCPs chỉ giới hạn quyền |
| 5 | Cách tốt nhất để cấp quyền cho EC2 truy cập S3? | Gán IAM role vào EC2 instance |

---

## Câu hỏi thi thử

### Câu 1

Một công ty có nhiều tài khoản AWS quản lý qua AWS Organizations. Đội bảo mật muốn đảm bảo không IAM user nào có thể tạo access keys cho root user. Giải pháp nào phù hợp?

- A) Tạo IAM policy trong mỗi tài khoản từ chối tạo root access key
- B) Áp dụng SCP tại organization root từ chối hành động `iam:CreateAccessKey` cho root user
- C) Bật AWS Config rules để phát hiện sử dụng root access key
- D) Sử dụng CloudTrail để giám sát và cảnh báo

<details><summary>Đáp án</summary>

**Đúng: B**

SCPs là cơ chế đúng để thực thi giới hạn toàn tổ chức. SCP áp dụng tại organization root ảnh hưởng tất cả tài khoản thành viên.

**Domain:** 1
**Task:** 1.1

</details>

---

## Tài liệu tham khảo

- [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS STS Documentation](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html)
- [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS Control Tower User Guide](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
