+++
title = "Task 3.1: High-Performing Storage Solutions"
date = 2025
weight = 1
chapter = false
pre = "<b>5.1 </b>"
+++

## Theory

### Amazon S3 (Simple Storage Service)

Object storage with virtually unlimited scalability.

**Performance:**
- 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second per prefix
- No limit on number of prefixes — use multiple prefixes to scale
- Multipart upload: Required for objects over 5 GB, recommended for over 100 MB
- S3 Transfer Acceleration: Uses CloudFront edge locations for faster uploads across long distances
- S3 Byte-Range Fetches: Download specific byte ranges in parallel for faster downloads

**Storage Classes:**

| Class | Use Case | Availability | Min Duration |
|-------|----------|-------------|--------------|
| S3 Standard | Frequently accessed | 99.99% | None |
| S3 Intelligent-Tiering | Unknown/changing access | 99.9% | None |
| S3 Standard-IA | Infrequent access | 99.9% | 30 days |
| S3 One Zone-IA | Infrequent, non-critical | 99.5% | 30 days |
| S3 Glacier Instant Retrieval | Archive, millisecond access | 99.9% | 90 days |
| S3 Glacier Flexible Retrieval | Archive, minutes-hours | 99.99% | 90 days |
| S3 Glacier Deep Archive | Long-term archive | 99.99% | 180 days |

### Amazon EBS (Elastic Block Store)

Block storage for EC2 instances. Attached to a single instance (except io1/io2 Multi-Attach).

| Volume Type | Use Case | Max IOPS | Max Throughput |
|-------------|----------|----------|----------------|
| gp3 | General purpose SSD | 16,000 | 1,000 MB/s |
| gp2 | General purpose SSD | 16,000 | 250 MB/s |
| io2 Block Express | High-performance SSD | 256,000 | 4,000 MB/s |
| io1 | Provisioned IOPS SSD | 64,000 | 1,000 MB/s |
| st1 | Throughput-optimized HDD | 500 | 500 MB/s |
| sc1 | Cold HDD | 250 | 250 MB/s |

- gp3: Baseline 3,000 IOPS, independently provision up to 16,000 IOPS
- io2 Block Express: For the most demanding workloads (databases)
- st1: Big data, data warehouses, log processing (sequential reads)
- sc1: Lowest cost, infrequent access

### Amazon EFS (Elastic File System)

Managed NFS file system for Linux workloads. Shared across multiple EC2 instances and AZs.

- **Performance Modes:** General Purpose (low latency) vs Max I/O (higher throughput, higher latency)
- **Throughput Modes:** Bursting (scales with size), Provisioned (fixed), Elastic (auto-scales)
- **Storage Classes:** Standard, Infrequent Access (EFS-IA) — use lifecycle policies to transition
- Scales automatically to petabytes
- Regional service (multi-AZ by default)

### Amazon FSx

Managed file systems for specific workloads:
- **FSx for Windows File Server:** SMB protocol, Active Directory integration, Windows workloads
- **FSx for Lustre:** High-performance computing (HPC), machine learning, media processing. Integrates with S3.
- **FSx for NetApp ONTAP:** Multi-protocol (NFS, SMB, iSCSI), data management features
- **FSx for OpenZFS:** Linux workloads, snapshots, data compression

### Hybrid Storage

- **AWS Storage Gateway:** Bridge between on-premises and cloud storage
  - **S3 File Gateway:** NFS/SMB interface to S3
  - **FSx File Gateway:** Low-latency access to FSx for Windows
  - **Volume Gateway:** iSCSI block storage backed by S3 (Cached or Stored mode)
  - **Tape Gateway:** Virtual tape library backed by S3/Glacier

### Storage Type Selection

| Requirement | Service |
|-------------|---------|
| Object storage, web content, backups | S3 |
| Boot volumes, databases on EC2 | EBS |
| Shared file system (Linux) | EFS |
| Shared file system (Windows) | FSx for Windows |
| HPC, ML training data | FSx for Lustre |
| Hybrid cloud storage | Storage Gateway |


## Hands-On Lab: S3 Performance Optimization

### Objective
Create an S3 bucket, enable Transfer Acceleration, and test multipart upload.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
15 minutes

### Steps

**Step 1: Create an S3 bucket with Transfer Acceleration**

```bash
BUCKET="saa-perf-test-$(date +%s)"
aws s3api create-bucket --bucket $BUCKET --region us-east-1
aws s3api put-bucket-accelerate-configuration \
  --bucket $BUCKET \
  --accelerate-configuration Status=Enabled
```

**Step 2: Create a test file and upload with multipart**

```bash
# Create a 100MB test file
dd if=/dev/zero of=testfile bs=1M count=100

# Upload using multipart (automatic with aws s3 cp for large files)
aws s3 cp testfile s3://$BUCKET/testfile --region us-east-1
```

**Step 3: Verify Transfer Acceleration endpoint**

```bash
echo "Accelerated endpoint: $BUCKET.s3-accelerate.amazonaws.com"
aws s3api get-bucket-accelerate-configuration --bucket $BUCKET
```

### Cleanup

```bash
aws s3 rm s3://$BUCKET --recursive
aws s3api delete-bucket --bucket $BUCKET
rm testfile
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the max S3 object size? | 5 TB (single PUT limit is 5 GB, use multipart for larger) |
| 2 | How many requests/second per S3 prefix? | 3,500 PUT and 5,500 GET per second per prefix |
| 3 | What is the difference between gp3 and io2? | gp3: general purpose, 16K IOPS max. io2 Block Express: 256K IOPS for demanding workloads. |
| 4 | When should you use st1 vs sc1? | st1: throughput-optimized for big data/logs. sc1: cold storage, lowest cost. |
| 5 | What is the difference between EFS and EBS? | EFS: shared NFS across instances/AZs. EBS: block storage attached to single instance. |
| 6 | Which FSx type is for HPC? | FSx for Lustre |
| 7 | What does S3 Transfer Acceleration use? | CloudFront edge locations for faster long-distance uploads |
| 8 | What are the Storage Gateway types? | S3 File Gateway, FSx File Gateway, Volume Gateway, Tape Gateway |
| 9 | What is EBS Multi-Attach? | io1/io2 volumes attached to multiple EC2 instances in the same AZ |
| 10 | What EFS throughput mode auto-scales? | Elastic throughput mode |

---

## Mock Exam Questions

### Question 1

A company needs to store 500 TB of log data that is accessed infrequently but must be available within milliseconds when needed. Which S3 storage class is most cost-effective?

- A) S3 Standard
- B) S3 Standard-IA
- C) S3 Glacier Instant Retrieval
- D) S3 Glacier Flexible Retrieval

<details><summary>Answer</summary>

**Correct: C**

S3 Glacier Instant Retrieval provides millisecond access for data accessed once per quarter, at a lower cost than Standard-IA. Standard is too expensive for infrequent access. Standard-IA is more expensive than Glacier Instant Retrieval. Glacier Flexible Retrieval has minutes-to-hours retrieval time.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 2

A company runs a database on EC2 that requires 100,000 IOPS with sub-millisecond latency. Which EBS volume type should be used?

- A) gp3
- B) io1
- C) io2 Block Express
- D) st1

<details><summary>Answer</summary>

**Correct: C**

io2 Block Express supports up to 256,000 IOPS with sub-millisecond latency, designed for the most demanding database workloads. gp3 maxes out at 16,000 IOPS. io1 maxes at 64,000 IOPS. st1 is HDD, not suitable for high IOPS.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 3

A company needs a shared file system accessible by multiple Linux EC2 instances across multiple AZs. Which service should they use?

- A) Amazon EBS with Multi-Attach
- B) Amazon EFS
- C) Amazon FSx for Windows
- D) Amazon S3

<details><summary>Answer</summary>

**Correct: B**

Amazon EFS is a managed NFS file system that can be shared across multiple EC2 instances and AZs. EBS Multi-Attach is limited to the same AZ and io1/io2 volumes only. FSx for Windows uses SMB, not NFS. S3 is object storage, not a file system.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 4

A company needs to process large datasets for machine learning training. The data is stored in S3 and needs to be accessed with high throughput by a compute cluster. Which storage solution provides the best performance?

- A) Amazon EFS
- B) Amazon EBS io2
- C) Amazon FSx for Lustre integrated with S3
- D) Amazon S3 directly

<details><summary>Answer</summary>

**Correct: C**

FSx for Lustre is designed for HPC and ML workloads, providing high-throughput parallel file system access. It integrates natively with S3, allowing transparent access to S3 data. EFS has lower throughput. EBS is single-instance. Direct S3 access lacks the POSIX file system interface needed by ML frameworks.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

### Question 5

A company needs to migrate on-premises NFS file shares to AWS while maintaining low-latency access for on-premises applications during the transition. Which service should they use?

- A) AWS DataSync
- B) AWS Storage Gateway (S3 File Gateway)
- C) Amazon EFS
- D) AWS Transfer Family

<details><summary>Answer</summary>

**Correct: B**

S3 File Gateway provides an NFS interface to S3, caching frequently accessed data locally for low-latency access. This allows on-premises applications to continue using NFS while data is stored in S3. DataSync is for one-time or scheduled transfers, not ongoing access. EFS requires network connectivity. Transfer Family is for SFTP/FTP.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.1

</details>

---

## References

- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon EBS User Guide](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html)
- [Amazon EFS User Guide](https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html)
- [Amazon FSx Documentation](https://docs.aws.amazon.com/fsx/)
- [AWS Storage Gateway User Guide](https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html)
