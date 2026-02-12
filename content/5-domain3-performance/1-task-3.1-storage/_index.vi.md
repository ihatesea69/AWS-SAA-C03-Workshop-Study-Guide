+++
title = "Task 3.1: Giải pháp lưu trữ hiệu suất cao"
date = 2025
weight = 1
chapter = false
pre = "<b>5.1 </b>"
+++

## Lý thuyết

### Amazon S3
Lưu trữ đối tượng với khả năng mở rộng gần như không giới hạn. 3,500 PUT và 5,500 GET mỗi giây mỗi prefix.

### Amazon EBS
Lưu trữ khối cho EC2. gp3 (đa dụng), io2 Block Express (hiệu suất cao nhất, 256K IOPS), st1 (throughput HDD), sc1 (cold HDD).

### Amazon EFS
Hệ thống file NFS được quản lý, chia sẻ giữa nhiều EC2 instances và AZs. Tự động mở rộng đến petabytes.

### Amazon FSx
- **FSx for Lustre:** HPC, ML, tích hợp S3
- **FSx for Windows:** SMB, Active Directory

### Hybrid Storage — Storage Gateway
- S3 File Gateway, Volume Gateway, Tape Gateway

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Kích thước đối tượng S3 tối đa? | 5 TB |
| 2 | gp3 vs io2 khác nhau thế nào? | gp3: 16K IOPS. io2 Block Express: 256K IOPS. |
| 3 | EFS vs EBS khác nhau thế nào? | EFS: chia sẻ NFS. EBS: khối gắn vào 1 instance. |
| 4 | FSx nào cho HPC? | FSx for Lustre |
| 5 | S3 Transfer Acceleration dùng gì? | CloudFront edge locations |

---

## Tài liệu tham khảo

- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon EBS User Guide](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html)
- [Amazon EFS User Guide](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
