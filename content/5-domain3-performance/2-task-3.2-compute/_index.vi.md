+++
title = "Task 3.2: Giai phap tinh toan hieu suat cao"
date = 2025
weight = 2
chapter = false
pre = "<b>5.2 </b>"
+++

## Ly thuyet

### EC2 Instance Types
- General Purpose (M, T), Compute Optimized (C), Memory Optimized (R, X), Storage Optimized (I, D), Accelerated (P, G)
- Placement Groups: Cluster (HPC), Spread (HA), Partition (distributed)

### EC2 Auto Scaling
Target Tracking, Step, Scheduled, Predictive Scaling. Warm Pools cho scale-out nhanh.

### AWS Lambda
Serverless, toi da 15 phut, 10 GB memory, 1000 concurrent. Provisioned Concurrency tranh cold starts.

### AWS Fargate
Container serverless cho ECS/EKS. Khong quan ly EC2.

### AWS Batch
Xu ly batch quy mo lon. Tu dong provision EC2 hoac Fargate.

### Amazon EMR
Big data (Hadoop, Spark). Chay tren EC2, EKS hoac serverless.

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Lambda chay toi da bao lau? | 15 phut |
| 2 | Instance family nao cho compute? | C family |
| 3 | Provisioned Concurrency la gi? | Moi truong Lambda duoc lam nong truoc |
| 4 | Ba loai placement group? | Cluster, Spread, Partition |
| 5 | ECS vs EKS? | ECS: AWS-native. EKS: Kubernetes. |

---

## Tai lieu tham khao

- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Batch User Guide](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html)
