+++
title = "Mock Exam"
date = 2025
weight = 9
chapter = false
pre = "<b>9. </b>"
+++

# SAA-C03 Mock Exam

**Instructions:** This mock exam contains 65 questions weighted by domain to match the actual SAA-C03 exam. Take your time and select the best answer for each question.

**Domain Weighting:**
- Domain 1 (Security): 20 questions (30%)
- Domain 2 (Resilience): 17 questions (26%)
- Domain 3 (Performance): 16 questions (24%)
- Domain 4 (Cost): 12 questions (20%)

**Passing Score:** 720/1000 (approximately 47/65 questions correct)

---

## Domain 1: Design Secure Architectures (Questions 1-20)

### Question 1
A company needs to grant temporary access to an S3 bucket for external partners. The access should be limited to specific objects and expire after 2 hours. Which approach is most secure?

- A) Create IAM users for each partner with S3 permissions
- B) Generate pre-signed URLs with 2-hour expiration
- C) Make the S3 bucket public with a time-based bucket policy
- D) Use S3 Access Points with temporary credentials

<details><summary>Answer</summary>

**Correct: B**

Pre-signed URLs provide temporary access to specific S3 objects with configurable expiration times. They don't require creating IAM users or making buckets public.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 2
A company wants to ensure that all EC2 instances in their organization cannot access the internet directly, even if someone creates an Internet Gateway. Which service should they use?

- A) AWS Config rules
- B) Service Control Policies (SCPs)
- C) IAM policies
- D) VPC Flow Logs

<details><summary>Answer</summary>

**Correct: B**

SCPs can deny the creation of Internet Gateways or attachment of IGWs to VPCs across all accounts in an organization. Config rules detect violations but don't prevent them. IAM policies apply to users/roles, not organizational restrictions.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 3
A web application needs to authenticate users against an existing Active Directory. The application runs on AWS and should not store user credentials. Which solution is most appropriate?

- A) AWS Directory Service with AD Connector
- B) Amazon Cognito User Pools
- C) IAM Identity Center with SAML federation
- D) AWS Secrets Manager

<details><summary>Answer</summary>

**Correct: C**

IAM Identity Center (formerly AWS SSO) with SAML federation allows users to authenticate against existing Active Directory without storing credentials in AWS. AD Connector extends AD to AWS but doesn't provide web app authentication.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 4
A company needs to encrypt data in DynamoDB and wants full control over the encryption keys, including key rotation. Which encryption option should they choose?

- A) DynamoDB default encryption
- B) AWS managed KMS key
- C) Customer managed KMS key
- D) Client-side encryption

<details><summary>Answer</summary>

**Correct: C**

Customer managed KMS keys provide full control over key policies, rotation, and access. Default encryption uses AWS owned keys (no customer control). AWS managed keys are controlled by AWS.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 5
A company has a VPC with public and private subnets. They want to allow instances in private subnets to download software updates but prevent inbound internet access. Which combination provides this capability?

- A) Internet Gateway + Route Tables
- B) NAT Gateway + Route Tables
- C) VPC Endpoints + Route Tables
- D) Direct Connect + Route Tables

<details><summary>Answer</summary>

**Correct: B**

NAT Gateway in a public subnet allows outbound internet access for private subnet instances while preventing inbound access. Route tables direct traffic from private subnets to the NAT Gateway.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 6
An application stores sensitive customer data in S3. The security team requires that all data be encrypted with keys that automatically rotate annually. Which solution meets this requirement with the LEAST operational overhead?

- A) SSE-S3 with manual key rotation
- B) SSE-KMS with AWS managed key
- C) SSE-KMS with customer managed key and automatic rotation enabled
- D) Client-side encryption with AWS Encryption SDK

<details><summary>Answer</summary>

**Correct: C**

SSE-KMS with customer managed keys supports automatic annual rotation. AWS managed keys also rotate automatically but don't provide the same level of control. SSE-S3 doesn't support customer-controlled rotation.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 7
A company needs to protect their web application from SQL injection and cross-site scripting attacks. The application is behind an Application Load Balancer. Which AWS service should they use?

- A) AWS Shield Standard
- B) AWS WAF
- C) Amazon GuardDuty
- D) AWS Network Firewall

<details><summary>Answer</summary>

**Correct: B**

AWS WAF provides Layer 7 protection against SQL injection, XSS, and other web exploits. It can be attached to ALB, CloudFront, and API Gateway. Shield protects against DDoS. GuardDuty is for threat detection.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 8
A company wants to centrally manage access to multiple AWS accounts for their employees. Employees should use their corporate credentials to access AWS. Which solution provides this capability?

- A) IAM users in each account with cross-account roles
- B) IAM Identity Center with identity provider integration
- C) Amazon Cognito Identity Pools
- D) AWS Directory Service Simple AD

<details><summary>Answer</summary>

**Correct: B**

IAM Identity Center provides centralized access management across multiple AWS accounts with support for external identity providers (SAML 2.0). It's the recommended solution for workforce identity federation.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 9
A security team needs to detect when AWS credentials are being used from unusual locations or at unusual times. Which service provides this capability?

- A) AWS CloudTrail
- B) Amazon GuardDuty
- C) AWS Config
- D) Amazon Inspector

<details><summary>Answer</summary>

**Correct: B**

GuardDuty uses machine learning to detect anomalous API activity, including unusual credential usage patterns. CloudTrail logs API calls but doesn't analyze them for anomalies. Config tracks resource configurations.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 10
A company needs to store database credentials securely and rotate them automatically every 30 days. Which AWS service should they use?

- A) AWS Systems Manager Parameter Store
- B) AWS Secrets Manager
- C) AWS KMS
- D) AWS Certificate Manager

<details><summary>Answer</summary>

**Correct: B**

Secrets Manager provides automatic rotation of database credentials with built-in rotation functions for RDS, Redshift, and DocumentDB. Parameter Store can store secrets but doesn't provide automatic rotation.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 11
A company has a hybrid architecture with on-premises servers that need to access AWS services privately without going over the internet. Which solution provides this capability?

- A) AWS Site-to-Site VPN
- B) AWS Direct Connect with private VIF
- C) AWS Transit Gateway
- D) VPC Peering

<details><summary>Answer</summary>

**Correct: B**

Direct Connect with a private virtual interface provides dedicated, private connectivity from on-premises to AWS VPCs. Site-to-Site VPN goes over the internet (encrypted). Transit Gateway connects VPCs but doesn't provide on-premises connectivity alone.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 12
An application needs to assume an IAM role in another AWS account to access resources. What must be configured for this to work?

- A) IAM user credentials shared between accounts
- B) Trust policy on the role allowing the source account
- C) Resource-based policy on all target resources
- D) VPC peering between the accounts

<details><summary>Answer</summary>

**Correct: B**

Cross-account role assumption requires a trust policy on the target role that specifies the source account/principal that can assume it. The source account also needs permissions to call sts:AssumeRole.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 13
A company wants to ensure that S3 buckets are never made public across all accounts in their organization. Which approach provides preventive control?

- A) AWS Config rule to detect public buckets
- B) S3 Block Public Access at organization level
- C) CloudWatch alarm for public bucket creation
- D) Lambda function to remediate public buckets

<details><summary>Answer</summary>

**Correct: B**

S3 Block Public Access can be enabled at the organization level through AWS Organizations, preventing any bucket from being made public. Config rules are detective, not preventive.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 14
A company needs to encrypt data in transit between their application servers and an RDS database. Which approach should they use?

- A) Enable encryption at rest on RDS
- B) Use SSL/TLS connections to RDS
- C) Enable VPC Flow Logs
- D) Use AWS PrivateLink

<details><summary>Answer</summary>

**Correct: B**

SSL/TLS connections encrypt data in transit between application and database. RDS supports SSL connections with certificates. Encryption at rest protects stored data, not data in transit.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 15
A company wants to restrict which AWS services can be used in their development accounts. Which service provides this capability?

- A) IAM permission boundaries
- B) Service Control Policies (SCPs)
- C) AWS Config rules
- D) AWS Trusted Advisor

<details><summary>Answer</summary>

**Correct: B**

SCPs in AWS Organizations can restrict which services are available in member accounts. Permission boundaries limit individual IAM entities. Config rules detect but don't prevent.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 16
A company needs to discover and protect sensitive data like PII stored in S3 buckets. Which AWS service should they use?

- A) Amazon GuardDuty
- B) Amazon Macie
- C) AWS Config
- D) Amazon Inspector

<details><summary>Answer</summary>

**Correct: B**

Amazon Macie uses machine learning to discover, classify, and protect sensitive data in S3. It can identify PII, financial data, and other sensitive information. GuardDuty focuses on threat detection.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 17
An application running on EC2 needs to access S3 without using access keys. What is the recommended approach?

- A) Store access keys in environment variables
- B) Use an IAM role attached to the EC2 instance
- C) Store access keys in AWS Secrets Manager
- D) Use S3 bucket policies to allow the instance IP

<details><summary>Answer</summary>

**Correct: B**

IAM roles for EC2 provide temporary credentials automatically rotated by AWS. This is more secure than storing access keys. The instance profile allows the EC2 instance to assume the role.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 18
A company needs to ensure that all API calls to AWS are logged for compliance. Which service provides this capability?

- A) Amazon CloudWatch Logs
- B) AWS CloudTrail
- C) VPC Flow Logs
- D) AWS Config

<details><summary>Answer</summary>

**Correct: B**

CloudTrail logs all API calls made to AWS services, including who made the call, when, and from where. It's essential for compliance and security auditing. CloudWatch Logs stores application logs.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 19
A company wants to use their own hardware security module (HSM) for key management while still using AWS services. Which option should they choose?

- A) AWS KMS with customer managed keys
- B) AWS CloudHSM
- C) AWS Secrets Manager
- D) AWS Certificate Manager

<details><summary>Answer</summary>

**Correct: B**

CloudHSM provides dedicated HSM instances in AWS that you control. It's FIPS 140-2 Level 3 validated. KMS uses shared HSMs managed by AWS. CloudHSM is for customers who need direct HSM access.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 20
A company needs to implement network segmentation between different application tiers in a VPC. Which approach provides the MOST granular control?

- A) Separate VPCs for each tier
- B) Security groups with specific rules
- C) Network ACLs on each subnet
- D) AWS Network Firewall

<details><summary>Answer</summary>

**Correct: B**

Security groups provide stateful, instance-level filtering with granular rules. They can reference other security groups for tier-based access. NACLs are stateless and subnet-level. Separate VPCs add complexity.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

---

## Domain 2: Design Resilient Architectures (Questions 21-37)

### Question 21
A company needs to decouple their order processing system so that spikes in orders don't overwhelm the backend. Which architecture pattern should they use?

- A) Synchronous API calls between services
- B) SQS queue between order intake and processing
- C) Direct database writes from the frontend
- D) Shared file system between services

<details><summary>Answer</summary>

**Correct: B**

SQS provides loose coupling between components, allowing the order intake to continue accepting orders while the backend processes them at its own pace. This handles traffic spikes gracefully.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 22
A company wants their application to automatically scale based on CPU utilization, maintaining 70% average CPU. Which Auto Scaling policy type should they use?

- A) Simple scaling
- B) Step scaling
- C) Target tracking scaling
- D) Scheduled scaling

<details><summary>Answer</summary>

**Correct: C**

Target tracking scaling automatically adjusts capacity to maintain a specified metric target (like 70% CPU). It's the simplest and most effective for maintaining a target utilization.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 23
A company needs to ensure their web application remains available if an entire AWS Availability Zone fails. Which architecture provides this capability?

- A) Single AZ deployment with larger instances
- B) Multi-AZ deployment with ALB
- C) Single AZ with Auto Scaling
- D) Reserved Instances in one AZ

<details><summary>Answer</summary>

**Correct: B**

Multi-AZ deployment distributes instances across multiple AZs. ALB automatically routes traffic to healthy instances. If one AZ fails, the application continues running in other AZs.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 24
A company has an RDS database that needs to survive an AZ failure with automatic failover. Which configuration should they use?

- A) RDS with read replicas
- B) RDS Multi-AZ deployment
- C) RDS with manual snapshots
- D) RDS with cross-region replication

<details><summary>Answer</summary>

**Correct: B**

RDS Multi-AZ provides synchronous replication to a standby in another AZ with automatic failover. Read replicas are for scaling reads, not HA. Cross-region is for DR, not AZ failure.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 25
A company needs to process messages in the exact order they were sent, with no duplicates. Which SQS queue type should they use?

- A) Standard queue with deduplication
- B) FIFO queue
- C) Standard queue with visibility timeout
- D) Dead letter queue

<details><summary>Answer</summary>

**Correct: B**

SQS FIFO queues guarantee exactly-once processing and maintain message order. Standard queues provide at-least-once delivery and best-effort ordering. FIFO is limited to 300 msg/s (3,000 with batching).

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 26
A company needs a disaster recovery solution with RPO of 1 hour and RTO of 4 hours. Which DR strategy is most cost-effective?

- A) Active-Active
- B) Warm Standby
- C) Pilot Light
- D) Backup and Restore

<details><summary>Answer</summary>

**Correct: D**

Backup and Restore is the most cost-effective for RPO/RTO in hours. Data is backed up regularly and restored when needed. Pilot Light and Warm Standby cost more but provide faster recovery.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 27
A company wants to route traffic to the AWS region closest to the user for lowest latency. Which Route 53 routing policy should they use?

- A) Simple routing
- B) Weighted routing
- C) Latency-based routing
- D) Geolocation routing

<details><summary>Answer</summary>

**Correct: C**

Latency-based routing directs users to the region with lowest latency. Geolocation routes based on user location (compliance). Weighted distributes traffic by percentage.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 28
A company needs to orchestrate a multi-step workflow that includes Lambda functions, human approval, and error handling. Which service should they use?

- A) Amazon SQS
- B) AWS Step Functions
- C) Amazon EventBridge
- D) AWS Lambda Destinations

<details><summary>Answer</summary>

**Correct: B**

Step Functions provides visual workflow orchestration with built-in error handling, retries, and support for human approval tasks. It's designed for complex, multi-step workflows.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 29
A company's Lambda function occasionally times out when connecting to RDS during traffic spikes. What should they implement to solve this?

- A) Increase Lambda timeout
- B) Use RDS Proxy
- C) Add more read replicas
- D) Increase RDS instance size

<details><summary>Answer</summary>

**Correct: B**

RDS Proxy pools and shares database connections, reducing connection overhead for Lambda. It handles connection management efficiently during traffic spikes. Increasing timeout doesn't solve the root cause.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 30
A company needs to ensure their application can handle a sudden 10x increase in traffic. Which combination provides this capability?

- A) Reserved Instances with fixed capacity
- B) Auto Scaling group with target tracking and ALB
- C) Single large instance with vertical scaling
- D) Spot Instances with scheduled scaling

<details><summary>Answer</summary>

**Correct: B**

Auto Scaling with target tracking automatically adjusts capacity based on demand. ALB distributes traffic across instances. This combination handles sudden traffic increases effectively.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 31
A company wants to run containers without managing servers. Which AWS service should they use?

- A) Amazon ECS on EC2
- B) Amazon EKS on EC2
- C) AWS Fargate
- D) Amazon EC2 with Docker

<details><summary>Answer</summary>

**Correct: C**

Fargate is a serverless compute engine for containers. You don't manage servers or clusters. It works with both ECS and EKS. EC2-based options require server management.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 32
A company needs to distribute traffic across multiple regions for disaster recovery. Which service provides this capability?

- A) Application Load Balancer
- B) Network Load Balancer
- C) Route 53 with health checks
- D) AWS Global Accelerator

<details><summary>Answer</summary>

**Correct: C**

Route 53 with health checks can route traffic to healthy endpoints across regions. Failover routing policy automatically redirects traffic when primary region is unhealthy. ALB/NLB are regional.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 33
A company needs to cache frequently accessed data to reduce database load. The cache must support complex data types and persistence. Which service should they use?

- A) ElastiCache for Memcached
- B) ElastiCache for Redis
- C) DynamoDB DAX
- D) CloudFront

<details><summary>Answer</summary>

**Correct: B**

ElastiCache for Redis supports complex data types (lists, sets, sorted sets), persistence, and replication. Memcached is simpler and doesn't support persistence. DAX is specifically for DynamoDB.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 34
A company wants to trigger actions when specific events occur in their AWS environment, such as EC2 instance state changes. Which service should they use?

- A) Amazon SQS
- B) Amazon SNS
- C) Amazon EventBridge
- D) AWS Lambda

<details><summary>Answer</summary>

**Correct: C**

EventBridge (formerly CloudWatch Events) captures events from AWS services and routes them to targets. It's the central event bus for AWS event-driven architectures.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 35
A company needs their application to continue operating even if the primary database becomes unavailable. Which approach provides the fastest failover?

- A) Manual database restore from backup
- B) Aurora with read replicas
- C) Aurora Global Database
- D) RDS with automated backups

<details><summary>Answer</summary>

**Correct: B**

Aurora automatically promotes a read replica to primary in case of failure, typically within 30 seconds. Aurora Global Database is for cross-region DR. Manual restore takes much longer.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

### Question 36
A company needs to process large files uploaded to S3. The processing takes 20 minutes per file. Which compute option should they use?

- A) Lambda function
- B) EC2 instance triggered by S3 event
- C) AWS Batch
- D) Step Functions

<details><summary>Answer</summary>

**Correct: C**

AWS Batch is designed for batch processing jobs that may take longer than Lambda's 15-minute limit. It automatically provisions compute resources. Lambda has a 15-minute timeout limit.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 37
A company wants to ensure their application can handle the failure of any single component. Which design principle should they follow?

- A) Design for single points of failure
- B) Design for failure with redundancy
- C) Design for maximum performance
- D) Design for minimum cost

<details><summary>Answer</summary>

**Correct: B**

Designing for failure means assuming components will fail and building redundancy. This includes Multi-AZ deployments, load balancing, and automated recovery. It's a core AWS Well-Architected principle.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.2

</details>

---

## Domain 3: Design High-Performing Architectures (Questions 38-53)

### Question 38
A company needs to store 100 TB of data that will be accessed frequently with low latency. Which S3 storage class should they use?

- A) S3 Standard
- B) S3 Intelligent-Tiering
- C) S3 Standard-IA
- D) S3 Glacier

<details><summary>Answer</summary>

**Correct: A**

S3 Standard provides low latency and high throughput for frequently accessed data. Intelligent-Tiering adds overhead for access pattern analysis. IA and Glacier are for infrequent access.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 39
A company needs a shared file system for Linux-based EC2 instances across multiple Availability Zones. Which service should they use?

- A) Amazon EBS
- B) Amazon EFS
- C) Amazon S3
- D) Amazon FSx for Windows

<details><summary>Answer</summary>

**Correct: B**

EFS provides a shared NFS file system accessible from multiple EC2 instances across AZs. EBS is block storage attached to single instances. FSx for Windows is for Windows workloads.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 40
A company needs to achieve 100,000 IOPS for their database workload. Which EBS volume type should they use?

- A) gp3
- B) io2 Block Express
- C) st1
- D) sc1

<details><summary>Answer</summary>

**Correct: B**

io2 Block Express supports up to 256,000 IOPS. gp3 maxes out at 16,000 IOPS. st1 and sc1 are HDD volumes optimized for throughput, not IOPS.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 41
A company needs to run a high-performance computing (HPC) workload with shared storage. Which storage solution provides the best performance?

- A) Amazon EFS
- B) Amazon S3
- C) Amazon FSx for Lustre
- D) Amazon EBS

<details><summary>Answer</summary>

**Correct: C**

FSx for Lustre is designed for HPC workloads with sub-millisecond latencies and hundreds of GB/s throughput. It integrates with S3 for data processing workflows.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 42
A company needs to reduce latency for a globally distributed application. Static content is served from S3. Which service should they use?

- A) S3 Transfer Acceleration
- B) Amazon CloudFront
- C) AWS Global Accelerator
- D) Route 53 latency routing

<details><summary>Answer</summary>

**Correct: B**

CloudFront caches content at edge locations worldwide, reducing latency for static content. S3 Transfer Acceleration speeds uploads. Global Accelerator is for dynamic content and TCP/UDP.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 43
A company needs to run memory-intensive workloads. Which EC2 instance family should they choose?

- A) C-series (Compute optimized)
- B) R-series (Memory optimized)
- C) T-series (Burstable)
- D) I-series (Storage optimized)

<details><summary>Answer</summary>

**Correct: B**

R-series instances are memory optimized with high memory-to-CPU ratios. C-series is for compute-intensive workloads. T-series is for variable workloads. I-series is for storage-intensive workloads.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 44
A company needs microsecond latency for DynamoDB reads. Which solution should they implement?

- A) DynamoDB Global Tables
- B) DynamoDB Accelerator (DAX)
- C) ElastiCache for Redis
- D) DynamoDB Streams

<details><summary>Answer</summary>

**Correct: B**

DAX is an in-memory cache for DynamoDB that provides microsecond latency for reads. It's fully managed and compatible with DynamoDB API. ElastiCache requires application changes.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 45
A company needs to process real-time streaming data from IoT devices. Which service should they use?

- A) Amazon SQS
- B) Amazon Kinesis Data Streams
- C) Amazon SNS
- D) AWS Batch

<details><summary>Answer</summary>

**Correct: B**

Kinesis Data Streams is designed for real-time streaming data ingestion and processing. It can handle millions of records per second. SQS is for message queuing, not streaming.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 46
A company needs to query data in S3 using SQL without loading it into a database. Which service should they use?

- A) Amazon RDS
- B) Amazon Athena
- C) Amazon Redshift
- D) AWS Glue

<details><summary>Answer</summary>

**Correct: B**

Athena is a serverless query service that analyzes data directly in S3 using SQL. No data loading required. You pay per query. Glue is for ETL. Redshift requires data loading.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 47
A company needs to improve database read performance for a read-heavy application. Which approach should they use?

- A) Increase RDS instance size
- B) Add RDS read replicas
- C) Enable Multi-AZ
- D) Increase storage IOPS

<details><summary>Answer</summary>

**Correct: B**

Read replicas offload read traffic from the primary database. They can be in the same region or cross-region. Multi-AZ is for HA, not read scaling. Instance size helps but doesn't scale reads.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 48
A company needs to deliver dynamic content with low latency globally. The content cannot be cached. Which service should they use?

- A) Amazon CloudFront
- B) AWS Global Accelerator
- C) Amazon S3 Transfer Acceleration
- D) Route 53 geolocation routing

<details><summary>Answer</summary>

**Correct: B**

Global Accelerator uses AWS's global network to route traffic to optimal endpoints. It improves performance for dynamic, non-cacheable content. CloudFront is primarily for cacheable content.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 49
A company needs to transform and load data from S3 into a data warehouse. Which service should they use?

- A) AWS Lambda
- B) AWS Glue
- C) Amazon Kinesis
- D) Amazon EMR

<details><summary>Answer</summary>

**Correct: B**

AWS Glue is a serverless ETL service that can discover, transform, and load data. It integrates with S3, Redshift, and other data stores. Lambda has time limits for large transformations.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 50
A company needs to run Apache Spark workloads for big data processing. Which service should they use?

- A) AWS Lambda
- B) Amazon EMR
- C) AWS Batch
- D) Amazon ECS

<details><summary>Answer</summary>

**Correct: B**

EMR (Elastic MapReduce) is designed for big data processing with Spark, Hadoop, and other frameworks. It provides managed clusters optimized for these workloads.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 51
A company needs to connect their VPC to S3 without going over the internet. Which solution provides this with the lowest cost?

- A) NAT Gateway
- B) VPC Gateway Endpoint
- C) VPC Interface Endpoint
- D) AWS PrivateLink

<details><summary>Answer</summary>

**Correct: B**

Gateway Endpoints for S3 are free and provide private connectivity. Interface Endpoints (PrivateLink) have hourly and data processing charges. NAT Gateway has hourly and data charges.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 52
A company needs to load streaming data into S3 with automatic batching and compression. Which service should they use?

- A) Kinesis Data Streams
- B) Kinesis Data Firehose
- C) Amazon SQS
- D) AWS Lambda

<details><summary>Answer</summary>

**Correct: B**

Kinesis Data Firehose automatically batches, compresses, and delivers streaming data to S3, Redshift, or Elasticsearch. It's fully managed with no capacity planning. Data Streams requires custom consumers.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 53
A company needs to improve the performance of SQL queries on large datasets in S3. Which approach should they use?

- A) Use larger Athena query timeout
- B) Convert data to Parquet format and partition by date
- C) Use S3 Standard-IA storage class
- D) Enable S3 versioning

<details><summary>Answer</summary>

**Correct: B**

Parquet is a columnar format that reduces data scanned. Partitioning allows Athena to skip irrelevant data. Together they significantly improve query performance and reduce costs.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

---

## Domain 4: Design Cost-Optimized Architectures (Questions 54-65)

### Question 54
A company runs EC2 instances 24/7 for a production workload. They want to reduce costs. Which purchasing option provides the best savings?

- A) On-Demand Instances
- B) Spot Instances
- C) Reserved Instances or Savings Plans
- D) Dedicated Hosts

<details><summary>Answer</summary>

**Correct: C**

Reserved Instances and Savings Plans provide up to 72% discount for steady-state workloads. Spot is cheaper but can be interrupted. On-Demand is full price. Dedicated Hosts are for compliance.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 55
A company has data that is accessed frequently for the first 30 days, then rarely accessed. Which S3 lifecycle policy should they implement?

- A) Transition to Glacier immediately
- B) Transition to S3 Standard-IA after 30 days
- C) Keep in S3 Standard forever
- D) Delete after 30 days

<details><summary>Answer</summary>

**Correct: B**

S3 Standard-IA is cost-effective for infrequently accessed data that still needs quick retrieval. Glacier has retrieval delays. Standard is expensive for rarely accessed data.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 56
A company runs batch processing jobs that can tolerate interruptions. Which EC2 purchasing option provides the lowest cost?

- A) On-Demand Instances
- B) Reserved Instances
- C) Spot Instances
- D) Savings Plans

<details><summary>Answer</summary>

**Correct: C**

Spot Instances provide up to 90% discount for interruptible workloads. Batch processing is ideal for Spot because jobs can be restarted if interrupted. Reserved/Savings Plans are for steady workloads.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 57
A company wants to reduce NAT Gateway costs for development environments. Which alternative should they consider?

- A) Internet Gateway
- B) NAT Instance
- C) VPC Endpoint
- D) Transit Gateway

<details><summary>Answer</summary>

**Correct: B**

NAT Instance on a small EC2 instance (~$3.80/month for t3.nano) is much cheaper than NAT Gateway (~$32/month). It's suitable for dev/test where high availability isn't critical.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 58
A company needs to archive compliance data for 7 years with rare access. Which storage class is most cost-effective?

- A) S3 Standard
- B) S3 Glacier
- C) S3 Glacier Deep Archive
- D) S3 Intelligent-Tiering

<details><summary>Answer</summary>

**Correct: C**

Glacier Deep Archive is the cheapest storage class (~$0.00099/GB/month) for data that is rarely accessed. Retrieval takes 12-48 hours. It's ideal for compliance archives.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 59
A company wants to optimize costs for a variable workload that has unpredictable access patterns. Which S3 storage class should they use?

- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Intelligent-Tiering
- D) S3 One Zone-IA

<details><summary>Answer</summary>

**Correct: C**

S3 Intelligent-Tiering automatically moves objects between access tiers based on usage patterns. It's ideal when access patterns are unknown or changing. No retrieval fees.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 60
A company wants to reduce data transfer costs between their VPC and S3. Which solution should they implement?

- A) S3 Transfer Acceleration
- B) VPC Gateway Endpoint for S3
- C) AWS Direct Connect
- D) CloudFront distribution

<details><summary>Answer</summary>

**Correct: B**

Gateway Endpoints for S3 are free and keep traffic within AWS network. Transfer Acceleration speeds uploads but costs more. Direct Connect has monthly fees.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 61
A company has multiple VPCs that need to communicate. They want to minimize costs. Which solution should they use for 3 VPCs?

- A) Transit Gateway
- B) VPC Peering
- C) AWS PrivateLink
- D) VPN connections

<details><summary>Answer</summary>

**Correct: B**

VPC Peering has no hourly charges, only data transfer costs. Transit Gateway has hourly attachment fees. For a small number of VPCs, peering is more cost-effective.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 62
A company wants to reduce RDS costs for a development database that's only used during business hours. Which approach should they use?

- A) Reserved Instances
- B) Stop the RDS instance outside business hours
- C) Use smaller instance type
- D) Enable Multi-AZ

<details><summary>Answer</summary>

**Correct: B**

Stopping RDS instances when not in use eliminates compute charges (storage charges continue). This is ideal for dev/test environments. Reserved Instances require 24/7 usage to be cost-effective.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.3

</details>

### Question 63
A company wants flexibility to change EC2 instance types while still getting a discount. Which purchasing option should they choose?

- A) Standard Reserved Instances
- B) Convertible Reserved Instances
- C) Spot Instances
- D) On-Demand Instances

<details><summary>Answer</summary>

**Correct: B**

Convertible Reserved Instances allow changing instance family, OS, and tenancy. They provide less discount than Standard RIs but more flexibility. Spot can be interrupted.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 64
A company wants to track and allocate AWS costs by project. Which feature should they use?

- A) AWS Budgets
- B) Cost allocation tags
- C) AWS Cost Explorer
- D) AWS Trusted Advisor

<details><summary>Answer</summary>

**Correct: B**

Cost allocation tags allow you to categorize and track costs by project, department, or any custom dimension. Cost Explorer visualizes costs. Budgets alert on spending.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.1

</details>

### Question 65
A company wants to get recommendations for right-sizing their EC2 instances. Which service provides this?

- A) AWS Config
- B) AWS Trusted Advisor
- C) AWS Cost Explorer with right-sizing recommendations
- D) Amazon CloudWatch

<details><summary>Answer</summary>

**Correct: C**

Cost Explorer provides right-sizing recommendations based on actual usage patterns. It identifies underutilized instances and suggests appropriate sizes. Trusted Advisor has limited free checks.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

---

## Exam Tips and Strategies

### Time Management
- You have 130 minutes for 65 questions (2 minutes per question)
- Flag difficult questions and return to them
- Don't spend more than 3-4 minutes on any single question

### Question Strategies
- Read the question carefully and identify the key requirement
- Eliminate obviously wrong answers first
- Look for AWS best practices and Well-Architected principles
- Choose the most cost-effective solution when multiple options work

### Common Exam Traps
- **Over-engineering:** Choose the simplest solution that meets requirements
- **Cost vs Performance:** Balance based on what the question emphasizes
- **Security:** When in doubt, choose the more secure option
- **Managed vs Self-managed:** AWS generally prefers managed services
