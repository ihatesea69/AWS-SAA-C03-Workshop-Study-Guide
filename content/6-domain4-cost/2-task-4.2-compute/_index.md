+++
title = "Task 4.2: Cost-Optimized Compute"
date = 2025
weight = 2
chapter = false
pre = "<b>6.2 </b>"
+++

## Theory

### EC2 Purchasing Options

| Option | Discount | Commitment | Best For |
|--------|----------|------------|----------|
| On-Demand | None | None | Short-term, unpredictable workloads |
| Reserved Instances (RI) | Up to 72% | 1 or 3 years | Steady-state workloads |
| Savings Plans | Up to 72% | 1 or 3 years ($/hour) | Flexible across instance types |
| Spot Instances | Up to 90% | None (can be interrupted) | Fault-tolerant, flexible workloads |
| Dedicated Hosts | Varies | On-Demand or Reserved | Licensing, compliance |
| Dedicated Instances | Premium | None | Compliance (hardware isolation) |

**Reserved Instances:**
- Standard RI: Highest discount, specific instance type/region
- Convertible RI: Lower discount, can change instance type/family/OS
- Payment: All Upfront (highest discount) > Partial Upfront > No Upfront

**Savings Plans:**
- Compute Savings Plans: Flexible across EC2, Fargate, Lambda. Any region, family, size, OS.
- EC2 Instance Savings Plans: Specific instance family in a region. Higher discount.

**Spot Instances:**
- Up to 90% discount, can be interrupted with 2-minute warning
- Use for: Batch processing, data analysis, CI/CD, stateless web servers
- Spot Fleet: Collection of Spot and On-Demand instances
- Spot Block: Reserved Spot for 1-6 hours (being deprecated)

### Right-Sizing

- Use AWS Compute Optimizer to identify underutilized instances
- Monitor CPU, memory, network utilization with CloudWatch
- Downsize instances that consistently use less than 40% of resources
- Consider Graviton (ARM) instances for 20-40% better price-performance

### Serverless Cost Optimization

- **Lambda:** Pay per invocation ($0.20/million) + duration (GB-seconds). Free tier: 1M requests/month.
- **Fargate:** Pay per vCPU-second and GB-second. No idle capacity charges.
- Serverless eliminates idle compute costs for variable workloads

### Auto Scaling for Cost

- Scale in during low-demand periods to reduce costs
- Use mixed instance policies (On-Demand + Spot) in Auto Scaling groups
- Scheduled scaling for predictable patterns

### Load Balancer Cost Comparison

| LB Type | Hourly Cost | Best For |
|---------|-------------|----------|
| ALB | ~$0.0225/hour + LCU | HTTP/HTTPS applications |
| NLB | ~$0.0225/hour + NLCU | TCP/UDP, static IP needs |
| GLB | ~$0.0125/hour + GLCU | Third-party appliances |


## Hands-On Lab: Launch a Spot Instance

### Objective
Request a Spot Instance and understand Spot pricing.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
15 minutes

### Steps

**Step 1: Check current Spot pricing**

```bash
aws ec2 describe-spot-price-history \
  --instance-types t3.micro \
  --product-descriptions "Linux/UNIX" \
  --start-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --query 'SpotPriceHistory[0:3].[AvailabilityZone,SpotPrice]' \
  --output table
```

**Step 2: Request a Spot Instance**

```bash
SPOT_REQ=$(aws ec2 request-spot-instances \
  --instance-count 1 \
  --type "one-time" \
  --launch-specification '{
    "ImageId": "ami-0c02fb55956c7d316",
    "InstanceType": "t3.micro"
  }' \
  --query 'SpotInstanceRequests[0].SpotInstanceRequestId' --output text)
echo "Spot Request: $SPOT_REQ"
```

**Step 3: Check Spot request status**

```bash
aws ec2 describe-spot-instance-requests \
  --spot-instance-request-ids $SPOT_REQ \
  --query 'SpotInstanceRequests[0].[State,Status.Code,InstanceId]'
```

### Cleanup

```bash
aws ec2 cancel-spot-instance-requests --spot-instance-request-ids $SPOT_REQ
# If instance was launched, terminate it
INSTANCE_ID=$(aws ec2 describe-spot-instance-requests \
  --spot-instance-request-ids $SPOT_REQ \
  --query 'SpotInstanceRequests[0].InstanceId' --output text)
if [ "$INSTANCE_ID" != "None" ]; then
  aws ec2 terminate-instances --instance-ids $INSTANCE_ID
fi
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | Max Spot Instance discount? | Up to 90% off On-Demand |
| 2 | Spot interruption warning time? | 2 minutes |
| 3 | Standard RI vs Convertible RI? | Standard: higher discount, fixed type. Convertible: lower discount, can change type. |
| 4 | Compute Savings Plans vs EC2 Instance Savings Plans? | Compute: flexible across EC2/Fargate/Lambda. EC2 Instance: specific family/region, higher discount. |
| 5 | What does AWS Compute Optimizer do? | Identifies underutilized instances and recommends right-sizing |
| 6 | Lambda free tier? | 1 million requests/month + 400,000 GB-seconds |
| 7 | What are Graviton instances? | ARM-based instances with 20-40% better price-performance |
| 8 | RI payment options from cheapest to most expensive? | All Upfront > Partial Upfront > No Upfront |
| 9 | When to use Spot Instances? | Fault-tolerant workloads: batch, data analysis, CI/CD |
| 10 | What is a Spot Fleet? | Collection of Spot and On-Demand instances managed together |

---

## Mock Exam Questions

### Question 1

A company has a steady-state production workload running 24/7 on EC2. They want to reduce compute costs by up to 72%. The workload uses various instance types across multiple regions. Which purchasing option is best?

- A) Standard Reserved Instances
- B) Compute Savings Plans
- C) Spot Instances
- D) On-Demand with Auto Scaling

<details><summary>Answer</summary>

**Correct: B**

Compute Savings Plans provide up to 72% discount and are flexible across instance types, families, regions, and even Fargate/Lambda. Standard RIs are locked to specific instance types. Spot Instances can be interrupted. On-Demand provides no discount.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 2

A company runs batch processing jobs that can tolerate interruptions and take 2-4 hours to complete. Which is the most cost-effective compute option?

- A) On-Demand Instances
- B) Reserved Instances
- C) Spot Instances
- D) Dedicated Hosts

<details><summary>Answer</summary>

**Correct: C**

Spot Instances offer up to 90% discount and are ideal for fault-tolerant batch workloads. The 2-minute interruption warning is manageable for batch jobs that can checkpoint and resume. On-Demand and Reserved are more expensive. Dedicated Hosts are for licensing/compliance.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 3

A company notices their EC2 instances consistently use only 10-15% CPU. What should the architect recommend?

- A) Add more instances for redundancy
- B) Use AWS Compute Optimizer to right-size instances
- C) Switch to Spot Instances
- D) Enable Enhanced Monitoring

<details><summary>Answer</summary>

**Correct: B**

Compute Optimizer analyzes utilization metrics and recommends smaller instance types that match actual usage, reducing costs. Adding instances increases cost. Spot Instances address pricing, not sizing. Enhanced Monitoring provides more data but does not recommend changes.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 4

A company has a web application with variable traffic. They want to minimize costs while maintaining availability. Which Auto Scaling strategy should they use?

- A) Fixed capacity with On-Demand instances
- B) Auto Scaling group with mixed instances policy (On-Demand base + Spot for scaling)
- C) All Spot Instances
- D) Reserved Instances for peak capacity

<details><summary>Answer</summary>

**Correct: B**

A mixed instances policy uses On-Demand for the base capacity (availability) and Spot for additional scaling (cost savings). All Spot risks availability during interruptions. Fixed capacity wastes money during low traffic. Reserved for peak over-provisions during normal periods.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

### Question 5

A company wants to run a serverless API that handles 100 requests per day. Which compute option is most cost-effective?

- A) EC2 t3.micro On-Demand
- B) EC2 t3.micro Reserved Instance
- C) AWS Lambda
- D) ECS on Fargate

<details><summary>Answer</summary>

**Correct: C**

Lambda's free tier covers 1 million requests/month. At 100 requests/day (~3,000/month), the workload falls well within the free tier. EC2 instances run 24/7 regardless of traffic. Fargate charges per second of compute used but still more expensive than Lambda for this volume.

**Domain:** 4 — Design Cost-Optimized Architectures
**Task:** 4.2

</details>

---

## References

- [EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- [Savings Plans User Guide](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [Spot Instances User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)
- [AWS Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html)
- [Lambda Pricing](https://aws.amazon.com/lambda/pricing/)
