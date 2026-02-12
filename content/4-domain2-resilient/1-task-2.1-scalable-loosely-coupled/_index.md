+++
title = "Task 2.1: Scalable and Loosely Coupled Architectures"
date = 2025
weight = 1
chapter = false
pre = "<b>4.1 </b>"
+++

## Theory

### Amazon API Gateway

Fully managed service for creating, publishing, and managing REST, HTTP, and WebSocket APIs.

- **REST API:** Full-featured, supports API keys, throttling, caching, request validation
- **HTTP API:** Lower cost, lower latency, simpler features
- **WebSocket API:** Real-time two-way communication
- Integrates with Lambda, HTTP endpoints, AWS services
- Supports throttling (10,000 requests/second default), caching, and usage plans

### Amazon SQS (Simple Queue Service)

Fully managed message queuing service for decoupling components.

- **Standard Queue:** At-least-once delivery, best-effort ordering, nearly unlimited throughput
- **FIFO Queue:** Exactly-once processing, strict ordering, 300 messages/second (3,000 with batching)
- Message retention: 1 minute to 14 days (default 4 days)
- Max message size: 256 KB (use S3 for larger payloads via Extended Client Library)
- Visibility timeout: Prevents other consumers from processing a message while it is being processed (default 30 seconds)
- Dead Letter Queue (DLQ): Captures messages that fail processing after a configured number of attempts
- Long polling: Reduces empty responses and cost by waiting for messages (up to 20 seconds)

### Caching Strategies

- **Amazon ElastiCache:** In-memory caching (Redis or Memcached) for database query results, session data
- **CloudFront:** CDN caching for static and dynamic content at edge locations
- **API Gateway Caching:** Cache API responses to reduce backend calls
- **DAX (DynamoDB Accelerator):** In-memory cache specifically for DynamoDB

### Microservices Design Principles

- **Stateless workloads:** Store session data externally (ElastiCache, DynamoDB). Enables horizontal scaling.
- **Stateful workloads:** Use sticky sessions (ALB) or externalize state. Harder to scale.
- Each microservice owns its data store
- Communicate via APIs, queues, or events

### Event-Driven Architectures

- **Amazon EventBridge:** Serverless event bus for routing events between AWS services, SaaS apps, and custom applications
- **Amazon SNS:** Pub/sub messaging for fan-out patterns (one message to many subscribers)
- **SQS + SNS Fan-out:** SNS publishes to multiple SQS queues for parallel processing
- **Lambda Event Source Mappings:** Lambda triggered by SQS, Kinesis, DynamoDB Streams

### Horizontal vs Vertical Scaling

- **Horizontal (scale out/in):** Add/remove instances. Preferred for distributed systems.
- **Vertical (scale up/down):** Increase/decrease instance size. Limited by max instance size, requires downtime.

### Elastic Load Balancing

- **Application Load Balancer (ALB):** Layer 7, HTTP/HTTPS, path-based and host-based routing, WebSocket support
- **Network Load Balancer (NLB):** Layer 4, TCP/UDP/TLS, ultra-low latency, static IP, millions of requests/second
- **Gateway Load Balancer (GLB):** Layer 3, for third-party virtual appliances (firewalls, IDS/IPS)
- Cross-zone load balancing: Distributes traffic evenly across all registered targets in all AZs

### Serverless Technologies

- **AWS Lambda:** Event-driven compute, 15-minute max execution, 10 GB memory, pay per invocation
- **AWS Fargate:** Serverless containers for ECS and EKS, no EC2 management
- **Step Functions:** Orchestrate Lambda functions and AWS services into workflows

### Container Orchestration

- **Amazon ECS:** AWS-native container orchestration. Launch types: EC2 (you manage instances) or Fargate (serverless).
- **Amazon EKS:** Managed Kubernetes. Launch types: EC2 or Fargate.
- **Amazon ECR:** Container image registry

### Read Replicas

- RDS read replicas: Up to 15 for Aurora, 5 for other engines
- Offload read traffic from the primary database
- Can be cross-region for disaster recovery
- Asynchronous replication (eventual consistency)


## Hands-On Lab: EC2 Auto Scaling with Application Load Balancer

### Objective
Create an Auto Scaling group behind an ALB that scales based on CPU utilization.

### Prerequisites
- AWS CLI configured with admin credentials
- A default VPC with at least 2 subnets

### Estimated Time
30 minutes

### Steps

**Step 1: Create a launch template**

```bash
LT_ID=$(aws ec2 create-launch-template \
  --launch-template-name saa-web-template \
  --launch-template-data '{
    "ImageId": "ami-0c02fb55956c7d316",
    "InstanceType": "t2.micro",
    "UserData": "'$(echo '#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Hello from $(hostname)</h1>" > /var/www/html/index.html' | base64 -w 0)'"
  }' \
  --query 'LaunchTemplate.LaunchTemplateId' --output text)
```

**Step 2: Create a target group**

```bash
TG_ARN=$(aws elbv2 create-target-group \
  --name saa-web-targets \
  --protocol HTTP --port 80 \
  --vpc-id <your-vpc-id> \
  --target-type instance \
  --query 'TargetGroups[0].TargetGroupArn' --output text)
```

**Step 3: Create an ALB**

```bash
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name saa-web-alb \
  --subnets <subnet-1> <subnet-2> \
  --security-groups <sg-id> \
  --query 'LoadBalancers[0].LoadBalancerArn' --output text)

aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP --port 80 \
  --default-actions Type=forward,TargetGroupArn=$TG_ARN
```

**Step 4: Create an Auto Scaling group**

```bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name saa-web-asg \
  --launch-template LaunchTemplateId=$LT_ID,Version='$Latest' \
  --min-size 2 --max-size 4 --desired-capacity 2 \
  --target-group-arns $TG_ARN \
  --availability-zones us-east-1a us-east-1b
```

**Step 5: Create a scaling policy**

```bash
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name saa-web-asg \
  --policy-name cpu-target-tracking \
  --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 50.0
  }'
```

### Cleanup

```bash
aws autoscaling delete-auto-scaling-group --auto-scaling-group-name saa-web-asg --force-delete
aws elbv2 delete-load-balancer --load-balancer-arn $ALB_ARN
aws elbv2 delete-target-group --target-group-arn $TG_ARN
aws ec2 delete-launch-template --launch-template-id $LT_ID
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the difference between SQS Standard and FIFO? | Standard: at-least-once, best-effort ordering, unlimited throughput. FIFO: exactly-once, strict ordering, 300 msg/s. |
| 2 | What is the max SQS message size? | 256 KB. Use Extended Client Library with S3 for larger payloads. |
| 3 | What is a Dead Letter Queue? | A queue that captures messages that fail processing after a configured number of attempts. |
| 4 | What is the difference between ALB and NLB? | ALB: Layer 7, HTTP/HTTPS, path/host routing. NLB: Layer 4, TCP/UDP, ultra-low latency, static IP. |
| 5 | What is the max Lambda execution time? | 15 minutes |
| 6 | What is the difference between ECS EC2 and ECS Fargate launch types? | EC2: you manage the instances. Fargate: serverless, AWS manages infrastructure. |
| 7 | How many read replicas can Aurora have? | Up to 15 |
| 8 | What is the SNS + SQS fan-out pattern? | SNS publishes one message to multiple SQS queues for parallel processing by different consumers. |
| 9 | What does API Gateway caching do? | Caches API responses to reduce backend calls and improve latency. |
| 10 | What is the difference between horizontal and vertical scaling? | Horizontal: add/remove instances. Vertical: increase/decrease instance size. |

---

## Mock Exam Questions

### Question 1

A company has a web application that experiences unpredictable traffic spikes. They need the application to scale automatically and distribute traffic across multiple instances. Which combination of services should the solutions architect recommend?

- A) Amazon EC2 with manual scaling and a Network Load Balancer
- B) Amazon EC2 Auto Scaling with an Application Load Balancer
- C) AWS Lambda with Amazon API Gateway
- D) Amazon ECS on Fargate with a Network Load Balancer

<details><summary>Answer</summary>

**Correct: B**

EC2 Auto Scaling automatically adjusts the number of instances based on demand, and ALB distributes HTTP/HTTPS traffic across instances with advanced routing. This is the standard pattern for scalable web applications. Lambda is better for event-driven workloads. NLB is for TCP/UDP traffic, not HTTP routing.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 2

A solutions architect needs to decouple a web tier from a processing tier. The processing tier takes 5-10 minutes per request and must process each request exactly once. Which service should be used?

- A) Amazon SNS
- B) Amazon SQS Standard Queue
- C) Amazon SQS FIFO Queue
- D) Amazon EventBridge

<details><summary>Answer</summary>

**Correct: C**

SQS FIFO Queue provides exactly-once processing, which is required. Standard Queue provides at-least-once delivery (possible duplicates). SNS is pub/sub (no queuing). EventBridge is for event routing, not guaranteed exactly-once processing.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 3

A company wants to distribute a single notification to multiple downstream systems for parallel processing. Which architecture pattern should be used?

- A) SQS Standard Queue with multiple consumers
- B) SNS topic with multiple SQS queue subscriptions (fan-out)
- C) EventBridge with a single target
- D) API Gateway with multiple Lambda integrations

<details><summary>Answer</summary>

**Correct: B**

The SNS + SQS fan-out pattern publishes a single message to an SNS topic, which delivers it to multiple SQS queues. Each queue processes the message independently. This is the standard fan-out pattern. Option A would have consumers competing for messages, not receiving all of them.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 4

A company is migrating a monolithic application to microservices on AWS. They need a container orchestration service that does not require managing EC2 instances. Which solution should the architect recommend?

- A) Amazon ECS with EC2 launch type
- B) Amazon EKS with EC2 launch type
- C) Amazon ECS with Fargate launch type
- D) Amazon EC2 with Docker installed

<details><summary>Answer</summary>

**Correct: C**

ECS with Fargate launch type is serverless — AWS manages the underlying infrastructure. You only define your containers and resource requirements. EC2 launch types require you to manage the instances. Running Docker directly on EC2 provides no orchestration.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

### Question 5

A company has a read-heavy application using Amazon RDS MySQL. The primary database is experiencing high read latency. What should the solutions architect recommend to improve read performance?

- A) Enable Multi-AZ deployment
- B) Create read replicas and direct read traffic to them
- C) Increase the instance size of the primary database
- D) Enable RDS Proxy

<details><summary>Answer</summary>

**Correct: B**

Read replicas offload read traffic from the primary database, reducing read latency. Multi-AZ is for high availability (failover), not read performance. Increasing instance size (vertical scaling) has limits and is more expensive. RDS Proxy improves connection management but does not offload reads.

**Domain:** 2 — Design Resilient Architectures
**Task:** 2.1

</details>

---

## References

- [Amazon SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Amazon SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
- [Elastic Load Balancing User Guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html)
- [Amazon EC2 Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Amazon ECS Developer Guide](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
- [Amazon API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)
