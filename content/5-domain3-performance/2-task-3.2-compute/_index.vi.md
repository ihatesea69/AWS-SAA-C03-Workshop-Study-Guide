+++
title = "Task 3.2: Giải pháp tính toán hiệu suất cao"
date = 2025
weight = 2
chapter = false
pre = "<b>5.2 </b>"
+++

## Lý thuyết

### EC2 Instance Types
- General Purpose (M, T), Compute Optimized (C), Memory Optimized (R, X), Storage Optimized (I, D), Accelerated (P, G)
- Placement Groups: Cluster (HPC), Spread (HA), Partition (distributed)

### EC2 Auto Scaling
Target Tracking, Step, Scheduled, Predictive Scaling. Warm Pools cho scale-out nhanh.

### AWS Lambda
Serverless, tối đa 15 phút, 10 GB memory, 1000 concurrent. Provisioned Concurrency tránh cold starts.

### AWS Fargate
Container serverless cho ECS/EKS. Không quản lý EC2.

### AWS Batch
Xử lý batch quy mô lớn. Tự động provision EC2 hoặc Fargate.

### Amazon EMR
Big data (Hadoop, Spark). Chạy trên EC2, EKS hoặc serverless.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Lambda chạy tối đa bao lâu? | 15 phút |
| 2 | Instance family nào cho compute? | C family |
| 3 | Provisioned Concurrency là gì? | Môi trường Lambda được làm nóng trước |
| 4 | Ba loại placement group? | Cluster, Spread, Partition |
| 5 | ECS vs EKS? | ECS: AWS-native. EKS: Kubernetes. |

---

## Tài liệu tham khảo

- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Batch User Guide](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html)
