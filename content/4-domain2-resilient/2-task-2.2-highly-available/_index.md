+++
title = "Task 2.2: Highly Available and Fault-Tolerant Architectures"
date = 2025
weight = 2
chapter = false
pre = "<b>4.2 </b>"
+++

## Theory

### AWS Global Infrastructure

- **Regions:** Geographic areas with 2+ Availability Zones. Choose based on compliance, latency, service availability, and cost.
- **Availability Zones (AZs):** One or more discrete data centers with redundant power, networking, and connectivity. AZs within a region are connected via low-latency links.
- **Edge Locations:** CloudFront and Route 53 endpoints for content delivery and DNS.

### Amazon Route 53

Highly available DNS service with health checking and routing policies.

**Routing Policies:**
- **Simple:** Single resource, no health checks
- **Weighted:** Distribute traffic by percentage across resources
- **Latency-based:** Route to the region with lowest latency
- **Failover:** Active-passive failover using health checks
- **Geolocation:** Route based on user geographic location
- **Geoproximity:** Route based on geographic distance (with bias)
- **Multi-value answer:** Return multiple healthy records (up to 8)

**Health Checks:** Monitor endpoint health, trigger failover. Can monitor endpoints, other health checks, or CloudWatch alarms.

### Disaster Recovery Strategies

| Strategy | RPO | RTO | Cost | Description |
|----------|-----|-----|------|-------------|
| Backup and Restore | Hours | Hours | Lowest | Back up data, restore when needed |
| Pilot Light | Minutes | Tens of minutes | Low | Core services running at minimum, scale up when needed |
| Warm Standby | Seconds-Minutes | Minutes | Medium | Scaled-down version running, scale up when needed |
| Active-Active (Multi-Site) | Near zero | Near zero | Highest | Full production in multiple regions |

**RPO (Recovery Point Objective):** Maximum acceptable data loss measured in time.
**RTO (Recovery Time Objective):** Maximum acceptable downtime.

### RDS High Availability

- **Multi-AZ Deployment:** Synchronous replication to a standby in another AZ. Automatic failover (1-2 minutes). Standby is NOT used for reads.
- **Aurora Multi-AZ:** 6 copies of data across 3 AZs. Automatic failover to read replica (typically under 30 seconds).
- **Aurora Global Database:** Cross-region replication with RPO of 1 second, RTO under 1 minute.

### Amazon RDS Proxy

- Fully managed database proxy for RDS and Aurora
- Pools and shares database connections, reducing connection overhead
- Improves application resilience by automatically connecting to standby during failover
- Reduces failover time by up to 66%
- Enforces IAM authentication for database access

### Immutable Infrastructure

- Replace instances instead of updating them in place
- Use launch templates, AMIs, and Auto Scaling for consistent deployments
- Blue/green deployments: Run two identical environments, switch traffic
- Benefits: Consistency, easy rollback, no configuration drift

### Service Quotas and Throttling

- Every AWS service has default quotas (limits)
- Use AWS Service Quotas to view and request increases
- Design for throttling: Implement exponential backoff and retry logic
- Pre-provision capacity in standby environments for DR

### AWS X-Ray

- Distributed tracing service for analyzing and debugging applications
- Traces requests across microservices (Lambda, ECS, EC2, API Gateway)
- Identifies performance bottlenecks and errors
- Service map visualization


## Hands-On Lab: Create a Multi-AZ RDS Instance

### Objective
Create a Multi-AZ RDS MySQL instance and verify failover behavior.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
20 minutes

### Steps

**Step 1: Create a DB subnet group**

```bash
aws rds create-db-subnet-group \
  --db-subnet-group-name saa-db-subnet-group \
  --db-subnet-group-description "SAA Study DB Subnet Group" \
  --subnet-ids <subnet-1> <subnet-2>
```

**Step 2: Create a Multi-AZ RDS instance**

```bash
aws rds create-db-instance \
  --db-instance-identifier saa-study-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password StudyPass123 \
  --allocated-storage 20 \
  --multi-az \
  --db-subnet-group-name saa-db-subnet-group \
  --no-publicly-accessible
```

**Step 3: Check the instance status and AZ**

```bash
aws rds describe-db-instances \
  --db-instance-identifier saa-study-db \
  --query 'DBInstances[0].[DBInstanceStatus,AvailabilityZone,MultiAZ,SecondaryAvailabilityZone]'
```

**Step 4: Simulate failover (optional)**

```bash
aws rds reboot-db-instance \
  --db-instance-identifier saa-study-db \
  --force-failover
```

### Cleanup

```bash
aws rds delete-db-instance \
  --db-instance-identifier saa-study-db \
  --skip-final-snapshot
# Wait for deletion to complete
aws rds delete-db-subnet-group --db-subnet-group-name saa-db-subnet-group
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the difference between RPO and RTO? | RPO: max acceptable data loss (time). RTO: max acceptable downtime. |
| 2 | Which DR strategy has the lowest cost? | Backup and Restore |
| 3 | Which DR strategy has near-zero RPO and RTO? | Active-Active (Multi-Site) |
| 4 | Can you read from an RDS Multi-AZ standby? | No. The standby is for failover only. Use read replicas for read scaling. |
| 5 | How many copies of data does Aurora maintain? | 6 copies across 3 AZs |
| 6 | What does RDS Proxy do? | Pools database connections, reduces failover time by up to 66%, enforces IAM auth |
| 7 | What is Route 53 failover routing? | Active-passive failover using health checks to route traffic to healthy endpoints |
| 8 | What is immutable infrastructure? | Replace instances instead of updating in place. Use AMIs and Auto Scaling. |
| 9 | What does AWS X-Ray do? | Distributed tracing for analyzing requests across microservices |
| 10 | What is Aurora Global Database RPO? | 1 second |

---

## Mock Exam Questions

### Question 1

A company requires a disaster recovery solution with an RTO of less than 1 minute and an RPO of less than 5 seconds for their critical database. Which solution meets these requirements?

- A) RDS Multi-AZ with automated backups
- B) RDS with cross-region read replicas
- C) Aurora Global Database
- D) DynamoDB Global Tables

<details><summary>Answer</summary>

**Correct: C**

Aurora Global Database provides cross-region replication with RPO of 1 second and RTO under 1 minute. RDS Multi-AZ provides HA within a region but not cross-region DR with sub-minute RTO. Cross-region read replicas have higher promotion time. DynamoDB Global Tables are for DynamoDB, not RDS workloads.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 2

A company has a web application deployed in us-east-1. They want to route users to the closest region for lowest latency, with automatic failover if a region becomes unhealthy. Which Route 53 routing policy should they use?

- A) Simple routing
- B) Weighted routing
- C) Latency-based routing with health checks
- D) Geolocation routing

<details><summary>Answer</summary>

**Correct: C**

Latency-based routing directs users to the region with the lowest latency. Combined with health checks, it provides automatic failover to the next-best region if the primary becomes unhealthy. Simple routing does not support health checks. Weighted routing distributes by percentage, not latency. Geolocation routes by location, not latency.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 3

A company has a Lambda-based application that connects to an RDS database. During traffic spikes, the database runs out of connections. Which service should the architect recommend?

- A) ElastiCache
- B) Amazon RDS Proxy
- C) DynamoDB
- D) Aurora Serverless

<details><summary>Answer</summary>

**Correct: B**

RDS Proxy pools and shares database connections, preventing connection exhaustion during traffic spikes. It is specifically designed for Lambda-to-RDS scenarios where many short-lived connections are created. ElastiCache caches data but does not manage connections. Migrating to DynamoDB or Aurora Serverless is a larger change than needed.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 4

A company wants to deploy their application across multiple AZs with automatic recovery if an AZ fails. The application runs on EC2 instances. Which combination provides this capability?

- A) EC2 instances in a single AZ with EBS snapshots
- B) EC2 Auto Scaling group spanning multiple AZs with an ALB
- C) EC2 instances with Elastic IPs in multiple AZs
- D) EC2 instances with CloudWatch alarms

<details><summary>Answer</summary>

**Correct: B**

An Auto Scaling group spanning multiple AZs automatically replaces unhealthy instances and maintains desired capacity across AZs. The ALB distributes traffic to healthy instances. Single AZ deployment has no AZ-level resilience. Elastic IPs do not provide automatic recovery. CloudWatch alarms detect issues but do not automatically recover.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 5

A company needs a DR strategy for their production environment. They want to minimize cost while maintaining the ability to recover within 10 minutes. Which DR strategy is most appropriate?

- A) Backup and Restore
- B) Pilot Light
- C) Warm Standby
- D) Active-Active

<details><summary>Answer</summary>

**Correct: C**

Warm Standby runs a scaled-down version of the production environment that can be quickly scaled up. It provides RTO in minutes, meeting the 10-minute requirement. Backup and Restore has RTO in hours. Pilot Light may take longer than 10 minutes to scale up. Active-Active is the most expensive option and exceeds the requirement.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

---

## References

- [Amazon Route 53 Developer Guide](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [AWS Disaster Recovery Whitepaper](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html)
- [Amazon RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [Amazon Aurora User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Amazon RDS Proxy Documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
- [AWS X-Ray Developer Guide](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)
