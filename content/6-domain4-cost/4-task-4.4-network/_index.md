+++
title = "Task 4.4: Cost-Optimized Network"
date = 2025
weight = 4
chapter = false
pre = "<b>6.4 </b>"
+++

## Theory

### NAT Gateway vs NAT Instance

| Factor | NAT Gateway | NAT Instance |
|--------|-------------|--------------|
| Cost | ~$0.045/hour + $0.045/GB processed | EC2 instance cost only |
| Management | Fully managed | Self-managed |
| Availability | HA within AZ | Must configure HA yourself |
| Bandwidth | Up to 100 Gbps | Depends on instance type |
| Best For | Production workloads | Dev/test, cost-sensitive |

- For cost savings in dev/test: Use a t3.nano NAT instance (~$3.80/month vs ~$32/month for NAT Gateway)
- For production: NAT Gateway is recommended despite higher cost (managed, HA)
- Share a single NAT Gateway across AZs to save cost (trade-off: single AZ failure risk)

### Direct Connect vs VPN Cost

| Factor | Direct Connect | Site-to-Site VPN |
|--------|---------------|-----------------|
| Monthly Cost | Port fee ($0.03-$0.22/hour) + data transfer | VPN connection fee (~$0.05/hour) |
| Setup | Weeks to provision | Minutes |
| Data Transfer | Lower rates than internet | Standard internet rates |
| Best For | High-volume, consistent traffic | Low-volume, occasional |

### VPC Peering vs Transit Gateway

| Factor | VPC Peering | Transit Gateway |
|--------|-------------|-----------------|
| Cost | Free (no hourly charge), data transfer only | $0.05/hour + $0.02/GB |
| Scalability | Non-transitive, N*(N-1)/2 connections | Hub-and-spoke, single attachment per VPC |
| Best For | Few VPCs (2-5) | Many VPCs (10+) |

### VPC Endpoints for Cost

- **Gateway Endpoints (S3, DynamoDB):** Free. Eliminates NAT Gateway data processing charges for S3/DynamoDB traffic.
- **Interface Endpoints:** $0.01/hour + $0.01/GB. Still cheaper than NAT Gateway for high-volume AWS service access.
- Key savings: Route S3 traffic through Gateway Endpoint instead of NAT Gateway

### Data Transfer Costs

- **Inbound:** Free (data into AWS)
- **Same AZ:** Free (using private IPs)
- **Cross-AZ:** $0.01/GB each way
- **Cross-Region:** $0.02/GB (varies by region)
- **Internet outbound:** $0.09/GB (first 10 TB), decreasing tiers
- **CloudFront:** Lower data transfer rates than direct internet ($0.085/GB)

### CDN Cost Optimization

- CloudFront reduces origin data transfer costs
- Use CloudFront for S3 content delivery (cheaper than direct S3 transfer)
- Cache-Control headers to maximize cache hit ratio
- Price classes: Use Price Class 100 (cheapest regions only) if users are in US/Europe

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | NAT Gateway vs NAT Instance cost? | NAT Gateway: ~$32/month + data. NAT Instance: EC2 cost only (~$3.80/month for t3.nano). |
| 2 | Is VPC Peering free? | No hourly charge, but data transfer costs apply |
| 3 | Gateway Endpoint cost? | Free (S3 and DynamoDB only) |
| 4 | Is inbound data transfer free? | Yes |
| 5 | Cross-AZ data transfer cost? | $0.01/GB each way |
| 6 | How does CloudFront reduce costs? | Lower data transfer rates than direct internet, caches content at edge |
| 7 | When is Transit Gateway more cost-effective than VPC Peering? | When connecting 10+ VPCs (management simplicity outweighs per-hour cost) |
| 8 | How to save on S3 data transfer? | Use Gateway Endpoint (free) instead of NAT Gateway |
| 9 | What is CloudFront Price Class 100? | Cheapest edge locations only (US, Europe) |
| 10 | Direct Connect vs VPN for low-volume traffic? | VPN is cheaper for low-volume, occasional traffic |

---

## Mock Exam Questions

### Question 1

A company has EC2 instances in private subnets that frequently access S3. They are using a NAT Gateway for internet access. How can they reduce data transfer costs for S3 traffic?

- A) Use S3 Transfer Acceleration
- B) Create a VPC Gateway Endpoint for S3
- C) Move instances to public subnets
- D) Use a NAT Instance instead

<details><summary>Answer</summary>

**Correct: B**

A Gateway Endpoint for S3 is free and routes S3 traffic directly through the AWS network, bypassing the NAT Gateway. This eliminates NAT Gateway data processing charges ($0.045/GB) for S3 traffic. Transfer Acceleration is for uploads. Public subnets expose instances. NAT Instance reduces hourly cost but not data processing.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 2

A company has 3 VPCs that need to communicate. They want the lowest cost networking solution. Which should they use?

- A) AWS Transit Gateway
- B) VPC Peering
- C) AWS PrivateLink
- D) VPN connections between VPCs

<details><summary>Answer</summary>

**Correct: B**

VPC Peering has no hourly charge (only data transfer costs). For 3 VPCs, only 3 peering connections are needed. Transit Gateway charges $0.05/hour per attachment. PrivateLink is for service access, not VPC-to-VPC. VPN adds unnecessary complexity and cost.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 3

A company serves static content from S3 to users worldwide. They want to reduce data transfer costs. Which approach is most cost-effective?

- A) Enable S3 Transfer Acceleration
- B) Use CloudFront with S3 as origin
- C) Create S3 buckets in every region
- D) Use Global Accelerator

<details><summary>Answer</summary>

**Correct: B**

CloudFront has lower data transfer rates than direct S3 access and caches content at edge locations, reducing origin requests. Transfer Acceleration is for uploads. Multiple S3 buckets increase management complexity and storage costs. Global Accelerator does not cache content.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 4

A development team uses a NAT Gateway in their dev/test VPC. The monthly cost is $32+ for the NAT Gateway alone. How can they reduce this cost?

- A) Use a VPC Endpoint instead
- B) Replace the NAT Gateway with a t3.nano NAT Instance
- C) Remove internet access entirely
- D) Use a larger NAT Gateway

<details><summary>Answer</summary>

**Correct: B**

A t3.nano NAT Instance costs ~$3.80/month, significantly less than a NAT Gateway. For dev/test environments where managed HA is not critical, this is a valid cost optimization. VPC Endpoints only work for AWS services, not general internet access. Removing internet access may break functionality.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

### Question 5

A company has a multi-region application. They want to minimize cross-region data transfer costs between their databases. Which approach helps?

- A) Use VPC Peering between regions
- B) Replicate only necessary data and use caching to reduce cross-region reads
- C) Use Transit Gateway inter-region peering
- D) Move all databases to a single region

<details><summary>Answer</summary>

**Correct: B**

Minimizing the amount of data transferred cross-region is the most effective cost reduction. Caching frequently accessed data locally reduces cross-region reads. VPC Peering and Transit Gateway still incur cross-region data transfer charges. Moving to a single region increases latency for global users.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.4

</details>

---

## References

- [AWS Data Transfer Pricing](https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer)
- [NAT Gateway Pricing](https://aws.amazon.com/vpc/pricing/)
- [VPC Endpoints Documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)
- [AWS Transit Gateway Pricing](https://aws.amazon.com/transit-gateway/pricing/)
- [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)
