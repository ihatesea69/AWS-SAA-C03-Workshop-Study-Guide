+++
title = "Comparison Tables"
date = 2025
weight = 7
chapter = false
pre = "<b>7. </b>"
+++

## Service Comparison Tables

Quick-reference comparison tables for commonly confused AWS services on the SAA-C03 exam.

### S3 vs EBS vs EFS

| Feature | S3 | EBS | EFS |
|---------|-----|-----|-----|
| Use Case | Object storage, backups, static hosting | Boot volumes, databases | Shared file system (Linux) |
| Pricing | Per GB stored + requests | Per GB provisioned | Per GB used |
| Performance | 3,500 PUT / 5,500 GET per prefix | Up to 256K IOPS (io2) | Elastic throughput |
| Exam Tip | Default for object storage, lifecycle policies | Attached to single EC2 (except Multi-Attach io1/io2) | Multi-AZ shared NFS |

### ALB vs NLB vs GLB

| Feature | ALB | NLB | GLB |
|---------|-----|-----|-----|
| Use Case | HTTP/HTTPS web apps | TCP/UDP, ultra-low latency | Third-party appliances |
| Pricing | ~$0.0225/hr + LCU | ~$0.0225/hr + NLCU | ~$0.0125/hr + GLCU |
| Performance | Path/host routing, WebSocket | Millions req/s, static IP | IP-level routing |
| Exam Tip | Default for web apps | When static IP or TCP needed | Firewalls, IDS/IPS |

### SQS vs SNS vs EventBridge

| Feature | SQS | SNS | EventBridge |
|---------|-----|-----|-------------|
| Use Case | Queue (point-to-point) | Pub/sub (fan-out) | Event routing |
| Pricing | Per request | Per publish + delivery | Per event |
| Performance | Standard: unlimited. FIFO: 300/s | Millions of subscribers | 2,400 events/s default |
| Exam Tip | Decouple components | Fan-out to multiple targets | Event-driven, SaaS integration |

### Aurora vs RDS vs DynamoDB

| Feature | Aurora | RDS | DynamoDB |
|---------|--------|-----|----------|
| Use Case | High-perf relational | Standard relational | Key-value, NoSQL |
| Pricing | Per ACU or instance | Per instance hour | Per request or RCU/WCU |
| Performance | 5x MySQL, 15 replicas | Up to 5 replicas | Single-digit ms, DAX for microseconds |
| Exam Tip | Default for high-perf relational | Oracle/SQL Server | Serverless, variable traffic |

### Security Groups vs NACLs

| Feature | Security Groups | NACLs |
|---------|----------------|-------|
| Use Case | Instance-level firewall | Subnet-level firewall |
| Pricing | Free | Free |
| Performance | Stateful (return traffic auto-allowed) | Stateless (must allow return traffic) |
| Exam Tip | Allow rules only | Allow and deny rules, evaluated in order |

### NAT Gateway vs NAT Instance

| Feature | NAT Gateway | NAT Instance |
|---------|-------------|--------------|
| Use Case | Production private subnet internet | Dev/test cost savings |
| Pricing | ~$0.045/hr + $0.045/GB | EC2 instance cost |
| Performance | Up to 100 Gbps, managed HA | Depends on instance type |
| Exam Tip | Default for production | Cost optimization for dev/test |

### Direct Connect vs VPN

| Feature | Direct Connect | Site-to-Site VPN |
|---------|---------------|-----------------|
| Use Case | High-volume, consistent traffic | Low-volume, quick setup |
| Pricing | Port fee + data transfer | ~$0.05/hr per connection |
| Performance | Consistent latency, dedicated | Variable (over internet) |
| Exam Tip | Not encrypted by default (add VPN) | Encrypted, minutes to set up |

### Reserved Instances vs Savings Plans vs Spot

| Feature | Reserved Instances | Savings Plans | Spot Instances |
|---------|-------------------|---------------|----------------|
| Use Case | Steady-state, specific type | Flexible commitment | Fault-tolerant batch |
| Pricing | Up to 72% discount | Up to 72% discount | Up to 90% discount |
| Performance | Guaranteed capacity | No capacity guarantee | Can be interrupted (2-min warning) |
| Exam Tip | Standard (locked) vs Convertible (flexible) | Compute (most flexible) vs EC2 Instance | Batch, CI/CD, data analysis |
