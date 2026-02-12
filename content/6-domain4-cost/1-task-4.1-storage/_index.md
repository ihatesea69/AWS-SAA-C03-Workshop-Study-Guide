+++
title = "Task 4.1: Cost-Optimized Storage"
date = 2025
weight = 1
chapter = false
pre = "<b>6.1 </b>"
+++

## Theory

### S3 Storage Classes and Cost Optimization

| Class | Cost (per GB/month) | Retrieval Cost | Best For |
|-------|-------------------|----------------|----------|
| Standard | ~$0.023 | None | Frequently accessed |
| Intelligent-Tiering | ~$0.023 + monitoring fee | None | Unknown access patterns |
| Standard-IA | ~$0.0125 | Per GB retrieved | Infrequent but rapid access |
| One Zone-IA | ~$0.01 | Per GB retrieved | Non-critical infrequent data |
| Glacier Instant | ~$0.004 | Per GB retrieved | Archive, millisecond access |
| Glacier Flexible | ~$0.0036 | Per retrieval request | Archive, minutes-hours |
| Glacier Deep Archive | ~$0.00099 | Per retrieval request | Long-term archive, 12+ hours |

### S3 Lifecycle Policies

Automate transitions between storage classes and object expiration.

- Transition actions: Move objects to cheaper classes after N days
- Expiration actions: Delete objects after N days
- Example: Standard -> Standard-IA (30 days) -> Glacier (90 days) -> Delete (365 days)
- Minimum 30 days before transitioning from Standard to IA classes

### AWS Cost Management Tools

- **AWS Cost Explorer:** Visualize and analyze spending patterns, forecast future costs
- **AWS Budgets:** Set custom budgets with alerts (cost, usage, reservation, Savings Plans)
- **Cost and Usage Report (CUR):** Most detailed cost data, delivered to S3
- **Cost Allocation Tags:** Tag resources for cost tracking by project, team, environment

### EBS Volume Cost Optimization

- **gp3 vs gp2:** gp3 is 20% cheaper with independently configurable IOPS/throughput
- **Delete unused volumes:** Unattached EBS volumes still incur charges
- **Snapshot lifecycle:** Use DLM (Data Lifecycle Manager) to automate snapshot creation/deletion
- **Right-size volumes:** Monitor IOPS and throughput usage, downsize if underutilized

### Hybrid Storage Cost

- **Storage Gateway:** Reduces on-premises storage costs by tiering to S3
- **DataSync:** Efficient scheduled transfers (pay per GB transferred)
- **S3 Requester Pays:** Bucket owner does not pay for data transfer and requests


## Hands-On Lab: Configure S3 Lifecycle Policies

### Objective
Create an S3 bucket with lifecycle policies to automatically transition and expire objects.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
10 minutes

### Steps

**Step 1: Create an S3 bucket**

```bash
BUCKET="saa-lifecycle-$(date +%s)"
aws s3api create-bucket --bucket $BUCKET --region us-east-1
```

**Step 2: Apply a lifecycle policy**

```bash
aws s3api put-bucket-lifecycle-configuration --bucket $BUCKET \
  --lifecycle-configuration '{
    "Rules": [
      {
        "ID": "TransitionToIA",
        "Status": "Enabled",
        "Filter": {"Prefix": "logs/"},
        "Transitions": [
          {"Days": 30, "StorageClass": "STANDARD_IA"},
          {"Days": 90, "StorageClass": "GLACIER"}
        ],
        "Expiration": {"Days": 365}
      }
    ]
  }'
```

**Step 3: Verify the lifecycle configuration**

```bash
aws s3api get-bucket-lifecycle-configuration --bucket $BUCKET
```

### Cleanup

```bash
aws s3 rb s3://$BUCKET --force
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | Cheapest S3 storage class? | Glacier Deep Archive (~$0.00099/GB/month) |
| 2 | Min days before transitioning Standard to IA? | 30 days |
| 3 | What is S3 Intelligent-Tiering? | Auto-moves objects between access tiers based on usage patterns |
| 4 | What is AWS Budgets? | Set custom cost/usage budgets with alerts |
| 5 | gp3 vs gp2 cost? | gp3 is 20% cheaper with configurable IOPS |
| 6 | What are cost allocation tags? | Tags for tracking costs by project, team, or environment |
| 7 | What is Requester Pays? | Requester pays for data transfer and requests instead of bucket owner |
| 8 | What is DLM? | Data Lifecycle Manager — automates EBS snapshot creation/deletion |
| 9 | What does Cost Explorer do? | Visualize spending patterns and forecast future costs |
| 10 | What is CUR? | Cost and Usage Report — most detailed cost data delivered to S3 |

---

## Mock Exam Questions

### Question 1

A company stores application logs in S3 Standard. Logs are accessed frequently for the first 30 days, occasionally for the next 60 days, and rarely after that. They must be retained for 1 year. Which lifecycle policy minimizes cost?

- A) Keep all logs in S3 Standard for 1 year
- B) Transition to Standard-IA after 30 days, Glacier after 90 days, delete after 365 days
- C) Transition to Glacier Deep Archive after 30 days
- D) Use S3 Intelligent-Tiering for all logs

<details><summary>Answer</summary>

**Correct: B**

This lifecycle matches the access pattern: Standard for frequent access (30 days), Standard-IA for occasional access (30-90 days), Glacier for rare access (90-365 days), then delete. Keeping in Standard is expensive. Deep Archive after 30 days would make occasional access slow and costly. Intelligent-Tiering works but the known pattern makes explicit transitions more cost-effective.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 2

A company has hundreds of unattached EBS volumes across multiple accounts. How should they identify and reduce this waste?

- A) Use AWS Config rules to detect unattached volumes
- B) Use AWS Trusted Advisor to identify idle resources
- C) Use AWS Cost Explorer to find unused resources
- D) Both A and B

<details><summary>Answer</summary>

**Correct: D**

Both AWS Config (with rules for unattached volumes) and Trusted Advisor (which checks for idle resources including unattached EBS volumes) can identify this waste. Cost Explorer shows spending but does not specifically identify unattached volumes.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 3

A company wants to archive compliance data that must be retained for 7 years but is almost never accessed. Retrieval within 12 hours is acceptable. Which storage class is most cost-effective?

- A) S3 Standard-IA
- B) S3 Glacier Flexible Retrieval
- C) S3 Glacier Deep Archive
- D) S3 One Zone-IA

<details><summary>Answer</summary>

**Correct: C**

Glacier Deep Archive is the cheapest storage class and supports retrieval within 12 hours (standard retrieval). Standard-IA and One Zone-IA are more expensive for rarely accessed data. Glacier Flexible Retrieval is cheaper than IA but more expensive than Deep Archive.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 4

A company migrated to gp2 EBS volumes but wants to reduce storage costs without changing performance. What should they do?

- A) Switch to st1 volumes
- B) Migrate to gp3 volumes
- C) Enable EBS encryption
- D) Use EBS snapshots instead

<details><summary>Answer</summary>

**Correct: B**

gp3 volumes are 20% cheaper than gp2 with the same or better baseline performance. IOPS and throughput can be independently configured. st1 is HDD and would change performance characteristics. Encryption does not reduce cost. Snapshots are for backup, not active storage.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 5

A company hosts a public dataset on S3 and wants to avoid paying for data transfer when external users download the data. Which S3 feature should they enable?

- A) S3 Transfer Acceleration
- B) S3 Requester Pays
- C) S3 Cross-Region Replication
- D) CloudFront distribution

<details><summary>Answer</summary>

**Correct: B**

Requester Pays shifts the cost of data transfer and request charges to the requester instead of the bucket owner. Transfer Acceleration speeds up uploads but does not shift costs. CRR creates copies in another region. CloudFront caches content but the bucket owner still pays for origin requests.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

---

## References

- [S3 Storage Classes](https://aws.amazon.com/s3/storage-classes/)
- [S3 Lifecycle Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)
- [AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
- [AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)
- [EBS Volume Types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
