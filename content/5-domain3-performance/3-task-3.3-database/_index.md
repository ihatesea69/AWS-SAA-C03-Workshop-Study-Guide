+++
title = "Task 3.3: High-Performing Database Solutions"
date = 2025
weight = 3
chapter = false
pre = "<b>5.3 </b>"
+++

## Theory

### Amazon RDS (Relational Database Service)

Managed relational databases: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.

- **Multi-AZ:** Synchronous standby for HA (not for reads)
- **Read Replicas:** Asynchronous, up to 5 replicas, can be cross-region
- **Storage:** gp3, io1, io2 (Provisioned IOPS for high-performance)
- **RDS Proxy:** Connection pooling, reduces failover time, IAM auth

### Amazon Aurora

MySQL and PostgreSQL compatible, 5x MySQL and 3x PostgreSQL performance.

- 6 copies of data across 3 AZs, self-healing storage
- Up to 15 read replicas with sub-10ms replica lag
- **Aurora Serverless v2:** Auto-scales capacity in fine-grained increments (0.5 ACU)
- **Aurora Global Database:** Cross-region, RPO 1 second, RTO under 1 minute
- **Aurora Cloning:** Create a full copy in seconds using copy-on-write

### Amazon DynamoDB

Fully managed NoSQL key-value and document database.

- Single-digit millisecond latency at any scale
- **Capacity Modes:**
  - On-Demand: Pay per request, auto-scales
  - Provisioned: Specify RCU/WCU, use Auto Scaling
- **DynamoDB Accelerator (DAX):** In-memory cache, microsecond latency
- **Global Tables:** Multi-region, multi-active replication
- **DynamoDB Streams:** Capture item-level changes for event-driven processing
- **Partition Key Design:** Distribute reads/writes evenly across partitions

### Amazon ElastiCache

Managed in-memory caching.

- **Redis:** Rich data types, persistence, replication, pub/sub, Lua scripting, sorted sets
- **Memcached:** Simple key-value, multi-threaded, no persistence, no replication

| Feature | Redis | Memcached |
|---------|-------|-----------|
| Persistence | Yes | No |
| Replication | Yes (Multi-AZ) | No |
| Data Types | Rich (strings, lists, sets, hashes) | Simple (strings) |
| Pub/Sub | Yes | No |
| Multi-threaded | No (single-threaded) | Yes |

**Caching Strategies:**
- **Lazy Loading:** Load data into cache on cache miss. Stale data possible.
- **Write-Through:** Write to cache and DB simultaneously. No stale data, higher write latency.
- **TTL (Time to Live):** Expire cached data after a period.

### Database Engine Selection

| Requirement | Recommended Engine |
|-------------|-------------------|
| MySQL/PostgreSQL compatible, high performance | Aurora |
| Oracle or SQL Server | RDS |
| Key-value, millisecond latency, serverless | DynamoDB |
| Graph data, relationships | Neptune |
| Time-series data | Timestream |
| Ledger, immutable records | QLDB |
| Wide-column (Cassandra compatible) | Keyspaces |


## Hands-On Lab: Create an ElastiCache Redis Cluster

### Objective
Create an ElastiCache Redis cluster and test basic caching operations.

### Prerequisites
- AWS CLI configured with admin credentials
- A VPC with subnets

### Estimated Time
20 minutes

### Steps

**Step 1: Create a cache subnet group**

```bash
aws elasticache create-cache-subnet-group \
  --cache-subnet-group-name saa-cache-subnet \
  --cache-subnet-group-description "SAA Study Cache Subnet" \
  --subnet-ids <subnet-1> <subnet-2>
```

**Step 2: Create a Redis cluster**

```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id saa-redis-cluster \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1 \
  --cache-subnet-group-name saa-cache-subnet
```

**Step 3: Check cluster status**

```bash
aws elasticache describe-cache-clusters \
  --cache-cluster-id saa-redis-cluster \
  --show-cache-node-info \
  --query 'CacheClusters[0].[CacheClusterStatus,CacheNodes[0].Endpoint]'
```

### Cleanup

```bash
aws elasticache delete-cache-cluster --cache-cluster-id saa-redis-cluster
# Wait for deletion
aws elasticache delete-cache-subnet-group --cache-subnet-group-name saa-cache-subnet
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | How many read replicas can Aurora have? | Up to 15 |
| 2 | What is Aurora Serverless v2 minimum ACU? | 0.5 ACU |
| 3 | What is DynamoDB DAX? | In-memory cache for DynamoDB with microsecond latency |
| 4 | What is the difference between Redis and Memcached? | Redis: persistence, replication, rich data types. Memcached: simple, multi-threaded, no persistence. |
| 5 | What is Lazy Loading caching strategy? | Load data into cache only on cache miss. Stale data possible. |
| 6 | What is Write-Through caching? | Write to cache and DB simultaneously. No stale data. |
| 7 | What is DynamoDB On-Demand mode? | Pay per request, auto-scales, no capacity planning needed |
| 8 | What is Aurora Global Database RPO? | 1 second |
| 9 | What database is best for graph data? | Amazon Neptune |
| 10 | How many RDS read replicas (non-Aurora)? | Up to 5 |

---

## Mock Exam Questions

### Question 1

A company has a read-heavy application with a MySQL database. They need to improve read performance and achieve 5x better throughput than standard MySQL. Which solution is best?

- A) RDS MySQL with read replicas
- B) Amazon Aurora MySQL with read replicas
- C) DynamoDB
- D) ElastiCache Redis

<details><summary>Answer</summary>

**Correct: B**

Aurora MySQL provides 5x the throughput of standard MySQL and supports up to 15 read replicas with sub-10ms lag. RDS MySQL is standard performance. DynamoDB is NoSQL, not a drop-in MySQL replacement. ElastiCache is a cache, not a database replacement.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 2

A company needs a database for a high-traffic e-commerce application that requires single-digit millisecond latency for key-value lookups. The traffic is unpredictable. Which solution is most appropriate?

- A) RDS PostgreSQL
- B) Aurora Serverless
- C) DynamoDB with On-Demand capacity
- D) ElastiCache Memcached

<details><summary>Answer</summary>

**Correct: C**

DynamoDB provides single-digit millisecond latency for key-value lookups. On-Demand capacity mode handles unpredictable traffic without capacity planning. RDS and Aurora are relational and have higher latency for key-value patterns. Memcached is a cache, not a primary database.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 3

A company wants to reduce database query latency from milliseconds to microseconds for frequently accessed data. The data is stored in DynamoDB. Which service should they add?

- A) ElastiCache Redis
- B) DynamoDB Accelerator (DAX)
- C) CloudFront
- D) RDS Proxy

<details><summary>Answer</summary>

**Correct: B**

DAX is an in-memory cache specifically designed for DynamoDB, providing microsecond read latency. It is a drop-in replacement requiring minimal code changes. ElastiCache works but requires more application changes. CloudFront caches HTTP responses, not database queries. RDS Proxy is for RDS, not DynamoDB.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 4

A company needs to cache session data for a web application. The cache must support replication for high availability and complex data structures. Which ElastiCache engine should they choose?

- A) Memcached
- B) Redis
- C) Either engine works equally well
- D) Neither — use DynamoDB instead

<details><summary>Answer</summary>

**Correct: B**

Redis supports replication (Multi-AZ), persistence, and rich data structures (hashes, lists, sets). Memcached does not support replication or complex data types. While DynamoDB can store sessions, ElastiCache Redis provides lower latency for session caching.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

### Question 5

A company has a variable workload that ranges from 0 to thousands of requests per second. They need a relational database that automatically scales capacity. Which solution is best?

- A) RDS MySQL with Auto Scaling storage
- B) Aurora Serverless v2
- C) DynamoDB On-Demand
- D) RDS with read replicas

<details><summary>Answer</summary>

**Correct: B**

Aurora Serverless v2 automatically scales compute capacity in fine-grained increments (0.5 ACU) based on demand. It is relational (MySQL/PostgreSQL compatible) and handles variable workloads. RDS Auto Scaling only scales storage, not compute. DynamoDB is NoSQL. Read replicas require manual management.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.3

</details>

---

## References

- [Amazon Aurora User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html)
- [Amazon DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Amazon ElastiCache User Guide](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html)
- [Amazon RDS User Guide](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
- [DAX Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html)
