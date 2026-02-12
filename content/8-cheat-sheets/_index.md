+++
title = "Cheat Sheets and Flashcards"
date = 2025
weight = 8
chapter = false
pre = "<b>8. </b>"
+++

## Domain 1: Design Secure Architectures (30%) — Cheat Sheet

**IAM Decision Tree:**
- Need temporary credentials? -> IAM Roles + STS
- Need cross-account access? -> IAM Role with trust policy
- Need organization-wide restrictions? -> SCPs
- Need to federate corporate users? -> IAM Identity Center + SAML 2.0
- Need web identity federation? -> Cognito

**Key Limits:**
- IAM policies per user: 10 managed policies
- STS default session: 1 hour (15 min - 12 hours)
- SCPs: Do NOT grant permissions, only restrict

**Encryption Quick Reference:**
- At rest: KMS (SSE-KMS, SSE-S3), CloudHSM
- In transit: ACM (TLS/SSL), VPN
- Key rotation: KMS auto-rotates annually for CMKs
- ACM public certs: Free, auto-renewed

**Network Security:**
- Security Groups: Stateful, allow only, instance-level
- NACLs: Stateless, allow+deny, subnet-level
- WAF: Layer 7 (SQL injection, XSS) on ALB/CloudFront/API Gateway
- Shield Standard: Free DDoS (L3/L4). Advanced: $3K/month

---

## Domain 2: Design Resilient Architectures (26%) — Cheat Sheet

**DR Strategy Selection:**

| RPO/RTO Need | Strategy | Cost |
|-------------|----------|------|
| Hours | Backup and Restore | $ |
| Minutes | Pilot Light | $$ |
| Seconds-Minutes | Warm Standby | $$$ |
| Near zero | Active-Active | $$$$ |

**Key Limits:**
- SQS message size: 256 KB (Extended Client for larger)
- SQS FIFO: 300 msg/s (3,000 with batching)
- Lambda max execution: 15 minutes
- Aurora read replicas: 15
- RDS read replicas: 5

**Scaling Decision:**
- Predictable traffic? -> Scheduled Scaling
- Maintain metric target? -> Target Tracking
- Variable thresholds? -> Step Scaling
- ML-based? -> Predictive Scaling

**Load Balancer Selection:**
- HTTP/HTTPS? -> ALB
- TCP/UDP or static IP? -> NLB
- Third-party appliances? -> GLB

---

## Domain 3: Design High-Performing Architectures (24%) — Cheat Sheet

**Storage Selection:**

| Need | Service |
|------|---------|
| Objects, web content | S3 |
| Boot volumes, databases | EBS |
| Shared Linux files | EFS |
| Shared Windows files | FSx for Windows |
| HPC, ML | FSx for Lustre |
| Hybrid | Storage Gateway |

**EBS Quick Reference:**
- gp3: 3,000 baseline IOPS, up to 16,000
- io2 Block Express: Up to 256,000 IOPS
- st1: Throughput HDD (big data)
- sc1: Cold HDD (lowest cost)

**Database Selection:**
- High-perf relational? -> Aurora
- Standard relational? -> RDS
- Key-value, serverless? -> DynamoDB
- In-memory cache? -> ElastiCache Redis
- Graph? -> Neptune

**Caching:**
- DynamoDB? -> DAX (microseconds)
- General? -> ElastiCache Redis (persistence, replication)
- Simple? -> ElastiCache Memcached (multi-threaded)

---

## Domain 4: Design Cost-Optimized Architectures (20%) — Cheat Sheet

**EC2 Purchasing Decision:**
- Steady 24/7? -> Reserved or Savings Plans (72% off)
- Flexible commitment? -> Compute Savings Plans
- Fault-tolerant batch? -> Spot (90% off)
- Short-term, unpredictable? -> On-Demand

**S3 Cost Optimization:**
- Use lifecycle policies to transition storage classes
- Glacier Deep Archive: $0.00099/GB/month (cheapest)
- Gateway Endpoints for S3: Free (avoid NAT Gateway charges)
- Intelligent-Tiering: Auto-moves based on access patterns

**Network Cost Savings:**
- S3/DynamoDB access? -> Gateway Endpoint (free)
- Few VPCs? -> VPC Peering (no hourly charge)
- Many VPCs? -> Transit Gateway
- Dev/test NAT? -> NAT Instance (~$3.80/month vs $32/month)
- Content delivery? -> CloudFront (cheaper than direct S3)

**Key Numbers:**
- Data in: Free
- Same AZ (private IP): Free
- Cross-AZ: $0.01/GB
- Cross-Region: $0.02/GB
- Internet out: $0.09/GB (first 10 TB)
