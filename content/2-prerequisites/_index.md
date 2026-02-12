+++
title = "Prerequisites"
date = 2025
weight = 2
chapter = false
pre = "<b>2. </b>"
+++

## Prerequisites

Before starting this workshop, ensure you have the following set up.

## AWS Account

You need an AWS account with administrative access to complete the hands-on labs.

1. Go to [https://aws.amazon.com/free/](https://aws.amazon.com/free/) and click "Create a Free Account"
2. Follow the registration process (requires email, credit card, and phone verification)
3. Sign in to the AWS Management Console at [https://console.aws.amazon.com/](https://console.aws.amazon.com/)

## AWS Free Tier 2025 — New Credit-Based Model

{{% notice info %}}
**Major Update (July 15, 2025):** AWS has completely revamped the Free Tier program. Instead of per-service usage limits, new accounts now receive **direct credits** to freely explore AWS services.
{{% /notice %}}

### What's New?

| Criteria | Old Free Tier (before 07/15/2025) | New Free Tier (from 07/15/2025) |
|---|---|---|
| Duration | 12 months free | 6 months (or until credits run out) |
| Mechanism | Free usage per service (e.g., 750 hrs EC2 t2.micro) | $100 credit at sign-up + up to $100 more from tasks |
| Usage | Stay within limits or get charged | Freely use supported services within credit balance |
| Expiration | Account stays active, charged if over limits | Account suspended if not upgraded after 6 months or credits depleted |
| Account Types | Single type | Two types: **Free Plan** and **Paid Plan** |
| Always Free | Yes (30+ services) | Yes (30+ services, unchanged) |

### Free Plan vs. Paid Plan

| Criteria | Free Plan | Paid Plan |
|---|---|---|
| Initial Credit | $100 at sign-up | $100 at sign-up |
| Bonus Credit | Up to $100 more (5 tasks × $20) | Up to $100 more (5 tasks × $20) |
| Service Access | Popular services only, some restricted | Full access to all 150+ AWS services |
| Charges | No charges until credits run out or 6 months | Pay-as-you-go after credits are used |
| Duration | 6 months or until credits run out | Unlimited |
| After Credits | Account suspended (90 days to upgrade) | Continue with on-demand pricing |
| Best For | Learning, demos, POC | Production workloads |

### How to Earn an Extra $100 in Credits

Complete 5 hands-on tasks (each worth $20):

| # | Task | Service |
|---|---|---|
| 1 | Set up a cost budget | **AWS Budgets** |
| 2 | Launch and terminate an EC2 instance | **Amazon EC2** |
| 3 | Create and delete an RDS database | **Amazon RDS** |
| 4 | Create a web app with a Lambda function | **AWS Lambda** |
| 5 | Use a foundation model in the playground | **Amazon Bedrock** |

Track your progress via the **Explore AWS** widget on the AWS Management Console homepage.

{{% notice warning %}}
**Important:** Always terminate/delete resources after completing each task to avoid wasting credits!
{{% /notice %}}

### Always Free Services (No Time Limit)

These services remain free regardless of your plan:

- **AWS Lambda:** 1 million requests/month
- **Amazon DynamoDB:** 25 GB storage + 25 RCU/WCU
- **Amazon S3:** 5 GB standard storage
- **Amazon CloudWatch:** 10 custom metrics + 1 million API requests
- **Amazon SNS:** 1 million publishes
- **Amazon SQS:** 1 million requests

### Services to Avoid (Credit Drainers)


{{% notice warning %}}
These services can drain your credits in hours:
- **Large EC2 instances:** t3.large, m5.xlarge, GPU instances (p3, p4, g4 — $5-20/hr)
- **Dedicated Hosts:** Most expensive, avoid completely
- **RDS Multi-AZ:** Doubles the cost vs single-AZ
- **NAT Gateway:** $0.045/hr + data transfer charges
- **SageMaker training jobs:** ml.p3.xlarge costs $4.9/hr
- **Bedrock with large models:** Claude 3 Opus, large foundation models
{{% /notice %}}

### Budget-Friendly Services for Study

- **EC2 t2.micro/t3.micro:** ~$8.5/month
- **RDS t3.micro (Single-AZ):** ~$15/month
- **ElastiCache t3.micro:** Small Redis/Memcached
- **API Gateway:** First 1 million calls are cheap
- **Region tip:** us-east-1 is usually the cheapest

### Cost-Saving Tips

1. Always **terminate EC2 instances** after practice
2. Use **Spot Instances** when possible (50-90% savings)
3. Choose **us-east-1** region for lowest prices
4. Delete unused resources: EBS volumes, Elastic IPs, Load Balancers
5. Set up **billing alerts** at $50, $100, $150 thresholds
6. AWS sends email notifications at 50%, 75%, and 90% credit usage

{{% notice note %}}
**Legacy accounts:** If your account was created before July 15, 2025, you remain on the old Free Tier program (per-service usage limits for 12 months). The "Always Free" tier still applies to both programs.
{{% /notice %}}

## Tools Required

### AWS CLI

Install the AWS CLI v2 for running commands in the hands-on labs:

- **Windows:** Download the MSI installer from [AWS CLI Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **macOS:** `brew install awscli` or download the PKG installer
- **Linux:** `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && unzip awscliv2.zip && sudo ./aws/install`

Configure your credentials:

```bash
aws configure
# Enter your Access Key ID, Secret Access Key, default region (e.g., us-east-1), and output format (json)
```

### Web Browser

A modern web browser (Chrome, Firefox, Edge, or Safari) for accessing the AWS Management Console.

### Text Editor

Any text editor for reviewing JSON policies and CloudFormation templates. VS Code is recommended.

## Recommended Knowledge

- Basic understanding of cloud computing concepts
- Familiarity with networking fundamentals (IP addressing, subnets, DNS, HTTP/HTTPS)
- General understanding of databases (relational vs non-relational)
- Basic command line experience

## Useful Links

- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Free Tier Documentation](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-free-tier.html)
- [AWS Free Plan Services List](https://aws.amazon.com/free/free-plan-services/)
- [AWS Training](https://aws.amazon.com/training/)
