+++
title = "Task 3.2: High-Performing Compute Solutions"
date = 2025
weight = 2
chapter = false
pre = "<b>5.2 </b>"
+++

## Theory

### EC2 Instance Types and Families

| Family | Prefix | Use Case |
|--------|--------|----------|
| General Purpose | M, T | Web servers, small databases, dev/test |
| Compute Optimized | C | Batch processing, ML inference, gaming, HPC |
| Memory Optimized | R, X, z | In-memory databases, real-time big data analytics |
| Storage Optimized | I, D, H | Data warehousing, distributed file systems, OLTP |
| Accelerated Computing | P, G, Inf, Trn | GPU workloads, ML training, video encoding |

- **T instances:** Burstable performance with CPU credits. T3/T3a for variable workloads.
- **Placement Groups:**
  - Cluster: Low latency, single AZ (HPC)
  - Spread: Max 7 instances per AZ, critical instances on distinct hardware
  - Partition: Large distributed workloads (Hadoop, Cassandra, Kafka)

### Amazon EC2 Auto Scaling

- **Scaling Policies:**
  - Target Tracking: Maintain a metric at a target value (e.g., CPU at 50%)
  - Step Scaling: Scale based on CloudWatch alarm thresholds
  - Simple Scaling: Single adjustment, cooldown period
  - Scheduled Scaling: Scale at specific times
  - Predictive Scaling: ML-based forecasting
- **Cooldown Period:** Prevents rapid scaling oscillation (default 300 seconds)
- **Warm Pools:** Pre-initialized instances for faster scale-out

### AWS Lambda

- Event-driven, serverless compute
- Max execution: 15 minutes, max memory: 10 GB
- Concurrency: 1,000 concurrent executions per region (default, can request increase)
- **Provisioned Concurrency:** Pre-warm execution environments to avoid cold starts
- **Lambda@Edge / CloudFront Functions:** Run code at edge locations
- Pay per invocation + duration (GB-seconds)

### AWS Fargate

- Serverless compute for containers (ECS and EKS)
- No EC2 instance management
- Pay for vCPU and memory per second
- Right-size containers independently

### AWS Batch

- Managed batch processing at any scale
- Dynamically provisions EC2 or Fargate compute
- Job queues, job definitions, compute environments
- Use for: Large-scale parallel processing, genomics, financial modeling

### Amazon EMR (Elastic MapReduce)

- Managed big data platform (Hadoop, Spark, Hive, Presto)
- Runs on EC2, EKS, or serverless
- Use for: Log analysis, data transformations, ML, ETL

### Container Orchestration

- **ECS:** AWS-native, simpler, tight AWS integration
- **EKS:** Kubernetes-based, portable, community ecosystem
- Both support EC2 and Fargate launch types

### Scaling Strategies

| Strategy | When to Use |
|----------|-------------|
| Target Tracking | Maintain a specific metric value |
| Step Scaling | Different scaling amounts for different thresholds |
| Scheduled | Predictable traffic patterns |
| Predictive | ML-based, learns from historical patterns |


## Hands-On Lab: Lambda Function with API Gateway

### Objective
Create a Lambda function exposed via API Gateway HTTP API.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
20 minutes

### Steps

**Step 1: Create the Lambda function**

```bash
# Create function code
cat > lambda_function.py << 'EOF'
import json
def handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Hello from SAA-C03 Study Guide!'})
    }
EOF

zip function.zip lambda_function.py

ROLE_ARN=$(aws iam create-role \
  --role-name saa-lambda-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{"Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]
  }' --query 'Role.Arn' --output text)

aws iam attach-role-policy --role-name saa-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

sleep 10

FUNC_ARN=$(aws lambda create-function \
  --function-name saa-study-function \
  --runtime python3.12 \
  --handler lambda_function.handler \
  --role $ROLE_ARN \
  --zip-file fileb://function.zip \
  --query 'FunctionArn' --output text)
```

**Step 2: Create an HTTP API in API Gateway**

```bash
API_ID=$(aws apigatewayv2 create-api \
  --name saa-study-api \
  --protocol-type HTTP \
  --target $FUNC_ARN \
  --query 'ApiId' --output text)

echo "API Endpoint: https://$API_ID.execute-api.us-east-1.amazonaws.com"
```

**Step 3: Add Lambda permission for API Gateway**

```bash
aws lambda add-permission \
  --function-name saa-study-function \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:*:$API_ID/*"
```

**Step 4: Test the endpoint**

```bash
curl https://$API_ID.execute-api.us-east-1.amazonaws.com
```

### Cleanup

```bash
aws apigatewayv2 delete-api --api-id $API_ID
aws lambda delete-function --function-name saa-study-function
aws iam detach-role-policy --role-name saa-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name saa-lambda-role
rm function.zip lambda_function.py
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the max Lambda execution time? | 15 minutes |
| 2 | What is the default Lambda concurrency limit? | 1,000 per region |
| 3 | What is Provisioned Concurrency? | Pre-warmed Lambda environments to avoid cold starts |
| 4 | Which instance family is compute optimized? | C family (C5, C6g, C7g) |
| 5 | Which instance family is memory optimized? | R family (R5, R6g, R7g) and X family |
| 6 | What are the three placement group types? | Cluster (low latency), Spread (distinct hardware), Partition (distributed workloads) |
| 7 | What is the difference between ECS and EKS? | ECS: AWS-native, simpler. EKS: Kubernetes-based, portable. |
| 8 | What does AWS Batch do? | Managed batch processing that dynamically provisions compute |
| 9 | What is a Warm Pool in Auto Scaling? | Pre-initialized instances for faster scale-out |
| 10 | What is Predictive Scaling? | ML-based Auto Scaling that learns from historical patterns |

---

## Mock Exam Questions

### Question 1

A company runs a batch processing job that processes millions of images. The job is not time-sensitive and can tolerate interruptions. Which compute option is most cost-effective?

- A) On-Demand EC2 instances
- B) Reserved Instances
- C) Spot Instances with AWS Batch
- D) Lambda functions

<details><summary>Answer</summary>

**Correct: C**

Spot Instances offer up to 90% discount and are ideal for fault-tolerant batch workloads. AWS Batch manages the job scheduling and Spot Instance lifecycle. On-Demand is more expensive. Reserved Instances require commitment. Lambda has a 15-minute limit which may not suit long image processing.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 2

A company has a Lambda function that experiences cold start latency issues for their latency-sensitive API. What should the architect recommend?

- A) Increase Lambda memory
- B) Enable Provisioned Concurrency
- C) Use Lambda@Edge
- D) Increase the timeout

<details><summary>Answer</summary>

**Correct: B**

Provisioned Concurrency keeps execution environments pre-warmed, eliminating cold starts. Increasing memory improves execution speed but not cold start time. Lambda@Edge is for edge computing. Increasing timeout does not address cold starts.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 3

A company needs to run a tightly coupled HPC workload that requires low-latency communication between instances. Which placement group type should be used?

- A) Spread
- B) Partition
- C) Cluster
- D) Default (no placement group)

<details><summary>Answer</summary>

**Correct: C**

Cluster placement groups place instances close together in a single AZ for the lowest network latency, ideal for HPC. Spread maximizes availability across hardware. Partition is for distributed workloads. Default provides no placement optimization.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 4

A company wants to run containers without managing EC2 instances. They use Docker and need tight integration with other AWS services. Which solution is best?

- A) ECS with EC2 launch type
- B) ECS with Fargate launch type
- C) EKS with EC2 launch type
- D) Docker on EC2

<details><summary>Answer</summary>

**Correct: B**

ECS with Fargate is serverless (no EC2 management) and provides tight AWS integration. ECS EC2 requires managing instances. EKS is Kubernetes-based with more complexity. Docker on EC2 has no orchestration.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

### Question 5

A company has predictable traffic that increases every weekday at 9 AM and decreases at 6 PM. Which Auto Scaling approach is most appropriate?

- A) Target Tracking Scaling
- B) Step Scaling
- C) Scheduled Scaling
- D) Manual Scaling

<details><summary>Answer</summary>

**Correct: C**

Scheduled Scaling is designed for predictable, time-based traffic patterns. It scales proactively before the traffic arrives. Target Tracking and Step Scaling are reactive. Manual Scaling requires human intervention.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.2

</details>

---

## References

- [Amazon EC2 Instance Types](https://aws.amazon.com/ec2/instance-types/)
- [EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS Batch User Guide](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html)
- [Amazon EMR Documentation](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html)
