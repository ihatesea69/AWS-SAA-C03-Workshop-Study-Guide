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

1. Go to [https://aws.amazon.com/](https://aws.amazon.com/) and click "Create an AWS Account"
2. Follow the registration process (requires email, credit card, and phone verification)
3. Sign in to the AWS Management Console at [https://console.aws.amazon.com/](https://console.aws.amazon.com/)

**Important:** Some labs may incur small charges. Always follow the cleanup instructions at the end of each lab to avoid unexpected costs. Most exercises can be completed within the AWS Free Tier.

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

## AWS Free Tier

Many AWS services offer a Free Tier that allows you to explore and try services at no cost:

- **Amazon EC2:** 750 hours/month of t2.micro or t3.micro instances
- **Amazon S3:** 5 GB of standard storage
- **Amazon RDS:** 750 hours/month of db.t2.micro or db.t3.micro
- **AWS Lambda:** 1 million free requests per month
- **Amazon DynamoDB:** 25 GB of storage, 25 read/write capacity units

Check the full list at [https://aws.amazon.com/free/](https://aws.amazon.com/free/)

## Cost Warning

While most labs in this workshop can be completed within the Free Tier, some exercises involving services like NAT Gateways, Direct Connect simulations, or multi-AZ deployments may incur charges. Always:

1. Follow cleanup instructions after each lab
2. Set up AWS Budgets to monitor spending
3. Check the AWS Cost Explorer regularly
4. Delete any resources you created when done
