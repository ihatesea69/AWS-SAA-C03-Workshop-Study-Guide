+++
title = "Task 3.1: Giai phap luu tru hieu suat cao"
date = 2025
weight = 1
chapter = false
pre = "<b>5.1 </b>"
+++

## Ly thuyet

### Amazon S3
Luu tru doi tuong voi kha nang mo rong gan nhu khong gioi han. 3,500 PUT va 5,500 GET moi giay moi prefix.

### Amazon EBS
Luu tru khoi cho EC2. gp3 (da dung), io2 Block Express (hieu suat cao nhat, 256K IOPS), st1 (throughput HDD), sc1 (cold HDD).

### Amazon EFS
He thong file NFS duoc quan ly, chia se giua nhieu EC2 instances va AZs. Tu dong mo rong den petabytes.

### Amazon FSx
- **FSx for Lustre:** HPC, ML, tich hop S3
- **FSx for Windows:** SMB, Active Directory

### Hybrid Storage — Storage Gateway
- S3 File Gateway, Volume Gateway, Tape Gateway

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Kich thuoc doi tuong S3 toi da? | 5 TB |
| 2 | gp3 vs io2 khac nhau the nao? | gp3: 16K IOPS. io2 Block Express: 256K IOPS. |
| 3 | EFS vs EBS khac nhau the nao? | EFS: chia se NFS. EBS: khoi gan vao 1 instance. |
| 4 | FSx nao cho HPC? | FSx for Lustre |
| 5 | S3 Transfer Acceleration dung gi? | CloudFront edge locations |

---

## Tai lieu tham khao

- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon EBS User Guide](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html)
- [Amazon EFS User Guide](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
