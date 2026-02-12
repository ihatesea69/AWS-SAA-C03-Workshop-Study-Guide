+++
title = "Task 1.2: Secure Workloads and Applications"
date = 2025
weight = 2
chapter = false
pre = "<b>3.2 </b>"
+++

## Theory

### VPC Security Components

Amazon VPC provides multiple layers of network security.

### Security Groups (Stateful)

- Act as virtual firewalls at the **instance level** (ENI level)
- **Stateful:** If inbound traffic is allowed, the response is automatically allowed
- **Default behavior:** All inbound denied, all outbound allowed
- Only support **allow rules** (no deny rules)
- Can reference other security groups as sources
- Changes take effect immediately

### Network ACLs (Stateless)

- Act as firewalls at the **subnet level**
- **Stateless:** Return traffic must be explicitly allowed
- **Default NACL:** Allows all inbound and outbound traffic
- **Custom NACL:** Denies all inbound and outbound by default
- Support both **allow and deny rules**
- Rules evaluated in order by rule number (lowest first)
- Ephemeral ports (1024-65535) must be allowed for return traffic

| Feature | Security Groups | Network ACLs |
|---------|----------------|--------------|
| Level | Instance (ENI) | Subnet |
| State | Stateful | Stateless |
| Rules | Allow only | Allow and Deny |
| Default | Deny inbound, allow outbound | Allow all (default NACL) |
| Evaluation | All rules evaluated | Rules evaluated in order |

### NAT Gateways and NAT Instances

Allow instances in private subnets to access the internet while remaining unreachable from the internet.

- **NAT Gateway** (managed): Highly available within an AZ, scales automatically, no security groups needed
- **NAT Instance** (self-managed): EC2 instance, must disable source/destination check, can use security groups

### Network Segmentation

- **Public subnets:** Route table has a route to an Internet Gateway (IGW)
- **Private subnets:** No direct route to IGW, use NAT Gateway for outbound internet
- **Isolated subnets:** No internet access at all, used for databases
- Best practice: Place web servers in public subnets, application servers in private subnets, databases in isolated subnets

### AWS Shield

- **Shield Standard:** Free, automatic protection against common DDoS attacks (Layer 3/4)
- **Shield Advanced:** $3,000/month, enhanced DDoS protection, 24/7 DDoS Response Team (DRT), cost protection for scaling during attacks, available for CloudFront, ALB, Route 53, Global Accelerator, EC2

### AWS WAF (Web Application Firewall)

- Protects against common web exploits (Layer 7): SQL injection, XSS, etc.
- Deployed on: CloudFront, ALB, API Gateway, AppSync
- Uses **Web ACLs** with rules to allow, block, or count requests
- Can use managed rule groups (AWS Managed Rules, AWS Marketplace)
- Rate-based rules for DDoS protection at the application layer

### AWS Secrets Manager

- Stores and rotates secrets (database credentials, API keys, etc.)
- Automatic rotation with Lambda functions
- Integrates with RDS, Redshift, DocumentDB for native rotation
- Encrypted using KMS
- Cross-account access via resource policies

### VPN and Direct Connect

- **AWS Site-to-Site VPN:** Encrypted connection over the public internet between on-premises and AWS VPC. Uses Virtual Private Gateway (VGW) or Transit Gateway.
- **AWS Client VPN:** Managed VPN for remote users to connect to AWS or on-premises networks
- **AWS Direct Connect:** Dedicated private connection from on-premises to AWS. Not encrypted by default (add VPN over Direct Connect for encryption). Consistent network performance, lower latency.

### Amazon Cognito

- **User Pools:** User directory for sign-up/sign-in, supports MFA, social identity providers
- **Identity Pools:** Provide temporary AWS credentials to access AWS services directly
- Common pattern: User Pool for authentication, Identity Pool for authorization

### Amazon GuardDuty

- Intelligent threat detection service
- Analyzes: CloudTrail logs, VPC Flow Logs, DNS logs, S3 data events, EKS audit logs
- Detects: Compromised instances, reconnaissance, account compromise, malicious IP access
- No agents or software to deploy

### Amazon Macie

- Uses machine learning to discover, classify, and protect sensitive data in S3
- Detects PII (personally identifiable information), financial data, credentials
- Generates findings and alerts for sensitive data exposure


## Hands-On Lab: Create a VPC with Public and Private Subnets

### Objective
Create a VPC with public and private subnets, configure security groups and NACLs, and verify network isolation.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
25 minutes

### Steps

**Step 1: Create a VPC**

```bash
VPC_ID=$(aws ec2 create-vpc \
  --cidr-block 10.0.0.0/16 \
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=StudyVPC}]' \
  --query 'Vpc.VpcId' --output text)
echo "VPC ID: $VPC_ID"
```

**Step 2: Create public and private subnets**

```bash
PUBLIC_SUBNET=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.1.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=PublicSubnet}]' \
  --query 'Subnet.SubnetId' --output text)

PRIVATE_SUBNET=$(aws ec2 create-subnet \
  --vpc-id $VPC_ID \
  --cidr-block 10.0.2.0/24 \
  --availability-zone us-east-1a \
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=PrivateSubnet}]' \
  --query 'Subnet.SubnetId' --output text)
```

**Step 3: Create and attach an Internet Gateway**

```bash
IGW_ID=$(aws ec2 create-internet-gateway \
  --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID
```

**Step 4: Create a route table for the public subnet**

```bash
PUBLIC_RT=$(aws ec2 create-route-table \
  --vpc-id $VPC_ID \
  --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $PUBLIC_RT \
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID
aws ec2 associate-route-table --route-table-id $PUBLIC_RT --subnet-id $PUBLIC_SUBNET
```

**Step 5: Create a security group for web servers**

```bash
WEB_SG=$(aws ec2 create-security-group \
  --group-name WebServerSG \
  --description "Allow HTTP and HTTPS" \
  --vpc-id $VPC_ID \
  --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $WEB_SG \
  --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $WEB_SG \
  --protocol tcp --port 443 --cidr 0.0.0.0/0
```

### Cleanup

```bash
aws ec2 delete-security-group --group-id $WEB_SG
aws ec2 delete-subnet --subnet-id $PUBLIC_SUBNET
aws ec2 delete-subnet --subnet-id $PRIVATE_SUBNET
aws ec2 detach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID
aws ec2 delete-internet-gateway --internet-gateway-id $IGW_ID
aws ec2 delete-route-table --route-table-id $PUBLIC_RT
aws ec2 delete-vpc --vpc-id $VPC_ID
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | Are Security Groups stateful or stateless? | Stateful — return traffic is automatically allowed |
| 2 | Are NACLs stateful or stateless? | Stateless — return traffic must be explicitly allowed |
| 3 | What is the default behavior of a custom NACL? | Denies all inbound and outbound traffic |
| 4 | Can Security Groups have deny rules? | No, Security Groups only support allow rules |
| 5 | What is the difference between Shield Standard and Shield Advanced? | Standard is free (Layer 3/4 DDoS). Advanced is $3K/month with DRT, cost protection, and enhanced detection. |
| 6 | Where can AWS WAF be deployed? | CloudFront, ALB, API Gateway, AppSync |
| 7 | What does Amazon GuardDuty analyze? | CloudTrail logs, VPC Flow Logs, DNS logs, S3 data events, EKS audit logs |
| 8 | What is the difference between Cognito User Pools and Identity Pools? | User Pools handle authentication (sign-up/sign-in). Identity Pools provide temporary AWS credentials for authorization. |
| 9 | Is Direct Connect encrypted by default? | No. Add VPN over Direct Connect for encryption. |
| 10 | What does Amazon Macie detect? | Sensitive data in S3 (PII, financial data, credentials) using machine learning |

---

## Mock Exam Questions

### Question 1

A company needs to protect its web application from SQL injection and cross-site scripting attacks. The application is served through an Application Load Balancer. Which AWS service should the solutions architect recommend?

- A) AWS Shield Standard
- B) Amazon GuardDuty
- C) AWS WAF deployed on the ALB
- D) Security Groups with deny rules

<details><summary>Answer</summary>

**Correct: C**

AWS WAF protects against Layer 7 attacks including SQL injection and XSS. It can be deployed directly on an ALB. Shield Standard protects against DDoS (Layer 3/4), not application-layer attacks. GuardDuty is a threat detection service, not a firewall. Security Groups do not support deny rules or application-layer filtering.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 2

A solutions architect is designing a VPC for a three-tier web application. The database tier must not be accessible from the internet. Which configuration achieves this?

- A) Place the database in a public subnet with a restrictive security group
- B) Place the database in a private subnet with no route to an Internet Gateway
- C) Place the database in a public subnet and use NACLs to block internet traffic
- D) Place the database in a public subnet and disable the public IP

<details><summary>Answer</summary>

**Correct: B**

Placing the database in a private subnet (no route to IGW) ensures it cannot be reached from the internet. This is the standard network segmentation pattern. Options A, C, and D all place the database in a public subnet, which is not a best practice even with additional controls.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 3

A company stores database credentials in application configuration files on EC2 instances. The security team wants to centralize credential management with automatic rotation. Which service should be used?

- A) AWS Systems Manager Parameter Store
- B) AWS Secrets Manager
- C) AWS KMS
- D) Amazon S3 with server-side encryption

<details><summary>Answer</summary>

**Correct: B**

AWS Secrets Manager is designed for storing and automatically rotating secrets like database credentials. It integrates natively with RDS, Redshift, and DocumentDB for automatic rotation. Parameter Store can store secrets but does not have built-in rotation. KMS manages encryption keys, not credentials. S3 is not designed for credential management.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 4

A company needs a dedicated, private network connection from their on-premises data center to AWS with consistent performance. The connection must also be encrypted. What should the solutions architect recommend?

- A) AWS Site-to-Site VPN only
- B) AWS Direct Connect only
- C) AWS Direct Connect with a VPN connection over it
- D) AWS Client VPN

<details><summary>Answer</summary>

**Correct: C**

Direct Connect provides a dedicated private connection with consistent performance, but it is not encrypted by default. Adding a VPN connection over Direct Connect provides both the dedicated bandwidth and encryption. VPN alone goes over the public internet (inconsistent performance). Client VPN is for remote user access, not site-to-site connectivity.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

### Question 5

A company wants to detect if any of their S3 buckets contain personally identifiable information (PII). Which AWS service should they use?

- A) Amazon GuardDuty
- B) Amazon Inspector
- C) Amazon Macie
- D) AWS Config

<details><summary>Answer</summary>

**Correct: C**

Amazon Macie uses machine learning to discover, classify, and protect sensitive data in S3, including PII. GuardDuty detects threats but does not classify data content. Inspector assesses EC2 and container vulnerabilities. Config tracks resource configuration changes.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.2

</details>

---

## References

- [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [Security Groups Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
- [Network ACLs Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [AWS WAF Developer Guide](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html)
- [AWS Shield Documentation](https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html)
- [AWS Secrets Manager User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html)
- [Amazon GuardDuty User Guide](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html)
- [Amazon Macie User Guide](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html)
