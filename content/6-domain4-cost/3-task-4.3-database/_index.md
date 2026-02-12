+++
title = "Task 4.3: Cost-Optimized Database"
date = 2025
weight = 3
chapter = false
pre = "<b>6.3 </b>"
+++

## Theory

### DynamoDB vs RDS Cost Comparison

| Factor | DynamoDB | RDS |
|--------|----------|-----|
| Pricing Model | Per request or provisioned RCU/WCU | Instance hours + storage |
| Scaling | Instant (On-Demand) or Auto Scaling | Vertical (instance resize) or read replicas |
| Idle Cost | Zero with On-Demand | Instance runs 24/7 |
| Best For | Variable traffic, key-value | Complex queries, joins, transactions |

### Aurora Serverless

- **v2:** Scales in fine-grained increments (0.5 ACU), always-on, scales to zero not supported
- **v1:** Scales to zero (pauses after inactivity), coarser scaling, being deprecated
- Cost-effective for: Infrequent, intermittent, or unpredictable workloads
- Eliminates over-provisioning of database capacity

### Backup and Retention Cost Optimization

- RDS automated backups: Free storage up to the DB instance size. Retention 1-35 days.
- Manual snapshots: Charged for storage. Delete when no longer needed.
- Aurora backups: Continuous, stored in S3, free up to cluster volume size
- DynamoDB: On-demand backups charged per GB. PITR adds ~20% to table cost.

### Read Replicas for Cost

- Offload reads to replicas instead of scaling up the primary (cheaper than vertical scaling)
- Aurora replicas share the same storage volume (no additional storage cost)
- Cross-region replicas incur data transfer charges

### Database Migration for Cost

- **AWS DMS:** Migrate from expensive commercial databases (Oracle, SQL Server) to open-source (PostgreSQL, MySQL) or Aurora
- **Schema Conversion Tool (SCT):** Convert schemas between database engines
- Migrating from Oracle to Aurora can save 80%+ on licensing costs

### Capacity Planning

- DynamoDB: Use On-Demand for unpredictable, Provisioned + Auto Scaling for predictable
- RDS: Right-size instances using Performance Insights and CloudWatch metrics
- Aurora Serverless v2: Automatic capacity management, pay for what you use

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | DynamoDB On-Demand vs Provisioned? | On-Demand: pay per request, no planning. Provisioned: specify RCU/WCU, cheaper for predictable. |
| 2 | Aurora Serverless v2 min ACU? | 0.5 ACU |
| 3 | RDS free backup storage? | Equal to the DB instance storage size |
| 4 | How to save on Oracle licensing? | Migrate to Aurora/PostgreSQL using DMS and SCT |
| 5 | Do Aurora read replicas cost extra storage? | No, they share the same storage volume |
| 6 | What is DMS? | Database Migration Service for migrating between database engines |
| 7 | What is SCT? | Schema Conversion Tool for converting schemas between engines |
| 8 | DynamoDB PITR cost? | Adds ~20% to table cost |
| 9 | When is Aurora Serverless cost-effective? | Infrequent, intermittent, or unpredictable workloads |
| 10 | How to right-size RDS? | Use Performance Insights and CloudWatch metrics |

---

## Mock Exam Questions

### Question 1

A company runs an Oracle database on-premises with expensive licensing. They want to migrate to AWS and reduce costs. Which approach provides the greatest cost savings?

- A) Migrate to RDS for Oracle
- B) Migrate to Aurora PostgreSQL using DMS and SCT
- C) Run Oracle on EC2 with BYOL
- D) Use DynamoDB

<details><summary>Answer</summary>

**Correct: B**

Migrating from Oracle to Aurora PostgreSQL eliminates Oracle licensing costs (80%+ savings) while providing Aurora's performance benefits. RDS for Oracle still requires licensing. EC2 with BYOL requires managing the database. DynamoDB is NoSQL and may not be compatible.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

### Question 2

A company has a development database that is only used during business hours (8 AM - 6 PM). Which solution minimizes cost?

- A) RDS with Reserved Instances
- B) Aurora Serverless v2
- C) DynamoDB On-Demand
- D) RDS On-Demand with manual stop/start

<details><summary>Answer</summary>

**Correct: B**

Aurora Serverless v2 scales capacity based on demand and can scale down to minimum ACUs during off-hours. RDS Reserved Instances charge 24/7. DynamoDB is NoSQL. Manual stop/start works but requires automation and has a 7-day max stop limit.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

### Question 3

A company has a DynamoDB table with unpredictable traffic that spikes during sales events. Which capacity mode minimizes cost while handling spikes?

- A) Provisioned capacity with high WCU/RCU
- B) Provisioned capacity with Auto Scaling
- C) On-Demand capacity
- D) Provisioned capacity with reserved capacity

<details><summary>Answer</summary>

**Correct: C**

On-Demand capacity instantly handles traffic spikes without pre-provisioning. For truly unpredictable traffic, On-Demand avoids over-provisioning costs. Provisioned with Auto Scaling has a delay in scaling. High fixed provisioned capacity wastes money during low traffic.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

### Question 4

A company wants to reduce RDS costs for a read-heavy application. The primary instance is an r5.2xlarge. What should the architect recommend first?

- A) Upgrade to r5.4xlarge
- B) Add read replicas to offload read traffic
- C) Switch to DynamoDB
- D) Enable Multi-AZ

<details><summary>Answer</summary>

**Correct: B**

Read replicas offload read traffic from the primary, potentially allowing the primary to be downsized. This is cheaper than upgrading. Switching to DynamoDB requires application changes. Multi-AZ is for HA, not read performance.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

### Question 5

A company has multiple RDS manual snapshots from the past 2 years. They only need to retain snapshots from the last 90 days. How can they reduce storage costs?

- A) Enable automated backups with 90-day retention
- B) Delete manual snapshots older than 90 days
- C) Move snapshots to S3 Glacier
- D) Convert manual snapshots to automated backups

<details><summary>Answer</summary>

**Correct: B**

Manual snapshots are charged for storage and persist until explicitly deleted. Deleting old manual snapshots directly reduces costs. Automated backups handle retention automatically but do not affect existing manual snapshots. Snapshots cannot be moved to Glacier or converted.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

---

## References

- [Amazon RDS Pricing](https://aws.amazon.com/rds/pricing/)
- [Amazon Aurora Pricing](https://aws.amazon.com/rds/aurora/pricing/)
- [Amazon DynamoDB Pricing](https://aws.amazon.com/dynamodb/pricing/)
- [AWS DMS User Guide](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
- [Aurora Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html)
