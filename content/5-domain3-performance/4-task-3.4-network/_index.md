+++
title = "Task 3.4: High-Performing Network Architectures"
date = 2025
weight = 4
chapter = false
pre = "<b>5.4 </b>"
+++

## Theory

### Amazon CloudFront

Global CDN that caches content at 400+ edge locations.

- Caches static and dynamic content
- Origin types: S3, ALB, EC2, custom HTTP origin
- **Origin Access Control (OAC):** Restrict S3 access to CloudFront only
- **Lambda@Edge:** Run code at edge locations (viewer request/response, origin request/response)
- **CloudFront Functions:** Lightweight functions for simple transformations (header manipulation, URL rewrites)
- **Field-Level Encryption:** Encrypt specific POST fields at the edge
- Cache behaviors: Path-based routing to different origins

### AWS Global Accelerator

Routes traffic through the AWS global network to optimal endpoints.

- Provides 2 static anycast IP addresses
- Routes to ALB, NLB, EC2, or Elastic IP endpoints
- Improves performance by up to 60% for global users
- Automatic failover between endpoints in seconds
- **CloudFront vs Global Accelerator:**
  - CloudFront: Caches content, best for HTTP/HTTPS content delivery
  - Global Accelerator: No caching, best for TCP/UDP, gaming, IoT, VoIP

### AWS PrivateLink (VPC Endpoints)

Private connectivity between VPCs and AWS services without traversing the internet.

- **Interface Endpoints:** ENI with private IP, powered by PrivateLink. For most AWS services.
- **Gateway Endpoints:** Route table entry. Only for S3 and DynamoDB. Free.
- Keeps traffic within the AWS network, improves security and performance

### Load Balancing for Performance

| Load Balancer | Layer | Best For |
|---------------|-------|----------|
| ALB | 7 (HTTP/HTTPS) | Web apps, microservices, path/host routing |
| NLB | 4 (TCP/UDP) | Ultra-low latency, millions of requests/s, static IP |
| GLB | 3 (IP) | Third-party appliances (firewalls, IDS) |

- **Cross-zone load balancing:** Distributes evenly across all targets in all AZs
- **Connection draining (deregistration delay):** Complete in-flight requests before removing targets

### Network Design

- **Subnet tiers:** Public (web), Private (app), Isolated (database)
- **Transit Gateway:** Hub-and-spoke connectivity for multiple VPCs and on-premises networks
- **VPC Peering:** Direct connection between two VPCs (non-transitive)
- **Enhanced Networking:** SR-IOV for higher PPS, lower latency on supported instance types
- **Elastic Fabric Adapter (EFA):** For HPC, OS-bypass for inter-node communication

### Direct Connect

- Dedicated private connection from on-premises to AWS
- 1 Gbps or 10 Gbps dedicated connections
- Sub-1 Gbps via Direct Connect partners
- Consistent network performance, lower latency than VPN
- **Direct Connect Gateway:** Connect to multiple VPCs across regions

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | CloudFront vs Global Accelerator? | CloudFront: caches HTTP content. Global Accelerator: no caching, TCP/UDP, static IPs. |
| 2 | What are the two VPC endpoint types? | Interface Endpoints (ENI, PrivateLink) and Gateway Endpoints (S3, DynamoDB only). |
| 3 | Which endpoint type is free? | Gateway Endpoints (S3 and DynamoDB) |
| 4 | What is Transit Gateway? | Hub-and-spoke connectivity for multiple VPCs and on-premises |
| 5 | What is Enhanced Networking? | SR-IOV for higher packets per second and lower latency |
| 6 | What is EFA? | Elastic Fabric Adapter for HPC inter-node communication |
| 7 | NLB provides what that ALB does not? | Static IP addresses and ultra-low latency at Layer 4 |
| 8 | What is Origin Access Control? | Restricts S3 bucket access to CloudFront only |
| 9 | What is Direct Connect Gateway? | Connects to multiple VPCs across regions via a single Direct Connect |
| 10 | Is VPC Peering transitive? | No. Each VPC pair needs its own peering connection. |

---

## Mock Exam Questions

### Question 1

A company serves a global user base and wants to reduce latency for their static website hosted on S3. Which service should they use?

- A) AWS Global Accelerator
- B) Amazon CloudFront with S3 origin
- C) S3 Transfer Acceleration
- D) Route 53 latency-based routing

<details><summary>Answer</summary>

**Correct: B**

CloudFront caches static content at 400+ edge locations worldwide, providing the lowest latency for static website delivery. Global Accelerator does not cache content. Transfer Acceleration is for uploads, not content delivery. Route 53 routes to the closest region but does not cache content.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 2

A company has a real-time gaming application that requires ultra-low latency TCP connections with static IP addresses for global users. Which service is most appropriate?

- A) Amazon CloudFront
- B) AWS Global Accelerator
- C) Application Load Balancer
- D) Amazon Route 53

<details><summary>Answer</summary>

**Correct: B**

Global Accelerator provides static anycast IPs and routes TCP/UDP traffic through the AWS global network for ultra-low latency. It is ideal for gaming and real-time applications. CloudFront is for HTTP content caching. ALB does not provide global routing. Route 53 is DNS-level routing.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 3

A company wants to access S3 from EC2 instances in a private subnet without using the internet. Which is the most cost-effective solution?

- A) NAT Gateway
- B) VPC Interface Endpoint for S3
- C) VPC Gateway Endpoint for S3
- D) AWS PrivateLink

<details><summary>Answer</summary>

**Correct: C**

Gateway Endpoints for S3 are free and provide private access to S3 via route table entries. Interface Endpoints cost money (hourly + data processing). NAT Gateway costs money and routes through the internet. PrivateLink is the technology behind Interface Endpoints.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 4

A company has 20 VPCs that need to communicate with each other and with an on-premises data center. Which networking solution simplifies this connectivity?

- A) VPC Peering between all VPCs
- B) AWS Transit Gateway
- C) AWS Direct Connect to each VPC
- D) VPN connections between all VPCs

<details><summary>Answer</summary>

**Correct: B**

Transit Gateway provides hub-and-spoke connectivity, connecting all VPCs and on-premises networks through a single gateway. VPC Peering would require 190 peering connections (n*(n-1)/2) and is non-transitive. Individual Direct Connect or VPN connections to each VPC are impractical.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

### Question 5

A company needs to ensure that traffic between their application and an AWS service stays within the AWS network and does not traverse the public internet. Which feature should they use?

- A) VPN connection
- B) VPC Endpoint (Interface or Gateway)
- C) NAT Gateway
- D) Internet Gateway

<details><summary>Answer</summary>

**Correct: B**

VPC Endpoints (both Interface and Gateway) keep traffic within the AWS network. VPN encrypts traffic but still traverses the internet (for Site-to-Site VPN over internet). NAT Gateway and Internet Gateway route traffic through the public internet.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.4

</details>

---

## References

- [Amazon CloudFront Developer Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
- [AWS Global Accelerator Developer Guide](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html)
- [VPC Endpoints Documentation](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html)
- [AWS Transit Gateway Guide](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
- [AWS Direct Connect User Guide](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html)
