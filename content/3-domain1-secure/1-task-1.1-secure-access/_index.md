+++
title = "Task 1.1: Secure Access to AWS Resources"
date = 2025
weight = 1
chapter = false
pre = "<b>3.1 </b>"
+++

## Theory

### AWS Identity and Access Management (IAM)

IAM is the core service for managing access to AWS resources. It enables you to control who (authentication) can do what (authorization) on which resources.

**Key Components:**

- **Users** — Individual identities with long-term credentials (access keys, passwords). Best practice: create individual users, never share credentials.
- **Groups** — Collections of users. Attach policies to groups rather than individual users for easier management.
- **Roles** — Temporary identities assumed by users, applications, or AWS services. Roles use temporary security credentials via STS.
- **Policies** — JSON documents that define permissions. Types include:
  - **Identity-based policies** — Attached to users, groups, or roles
  - **Resource-based policies** — Attached to resources (S3 buckets, SQS queues, etc.)
  - **Permission boundaries** — Set maximum permissions an identity can have
  - **Service control policies (SCPs)** — Organization-wide permission guardrails
  - **Session policies** — Limit permissions for a specific session

**Policy Evaluation Logic:**

1. By default, all requests are denied (implicit deny)
2. An explicit allow in a policy overrides the default deny
3. An explicit deny in any policy overrides any allow
4. Permission boundaries and SCPs further restrict effective permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

### Multi-Factor Authentication (MFA)

MFA adds a second layer of authentication beyond username and password.

- **Virtual MFA** — Apps like Google Authenticator, Authy (free)
- **Hardware MFA** — Physical key fob or display card
- **U2F Security Key** — YubiKey or similar USB device
- **Best Practice:** Enable MFA on the root account and all IAM users with console access

### AWS Security Token Service (STS)

STS provides temporary, limited-privilege credentials for IAM users or federated users.

**Key API Calls:**
- `AssumeRole` — Assume an IAM role (cross-account or same account)
- `AssumeRoleWithSAML` — Assume a role using SAML assertion
- `AssumeRoleWithWebIdentity` — Assume a role using web identity token (Cognito, Google, Facebook)
- `GetSessionToken` — Get temporary credentials for MFA-protected API access

**Temporary credentials include:** Access Key ID, Secret Access Key, and Session Token. Default duration: 1 hour (configurable 15 min to 12 hours).

### Cross-Account Access

Cross-account access allows users in one AWS account to access resources in another account using IAM roles.

**How it works:**
1. Account B creates an IAM role with a trust policy allowing Account A
2. Account A creates a policy allowing its users to assume the role in Account B
3. User in Account A calls `sts:AssumeRole` to get temporary credentials
4. User accesses Account B resources using temporary credentials

### Service Control Policies (SCPs)

SCPs are a feature of AWS Organizations that set permission guardrails for member accounts.

- SCPs do NOT grant permissions — they only restrict what is allowed
- SCPs affect all users and roles in the account, including the root user
- SCPs do not affect service-linked roles
- Applied at the OU (Organizational Unit) or account level
- Use deny lists (allow all, deny specific) or allow lists (deny all, allow specific)

### AWS Control Tower

Control Tower automates the setup and governance of a multi-account AWS environment.

- Sets up a landing zone with best-practice multi-account structure
- Implements guardrails (preventive via SCPs, detective via AWS Config rules)
- Provides a dashboard for compliance visibility
- Integrates with AWS Organizations, IAM Identity Center, CloudTrail, and Config

### Resource Policies

Resource-based policies are attached directly to AWS resources (not to identities).

**Services supporting resource policies:**
- Amazon S3 (bucket policies)
- Amazon SQS (queue policies)
- Amazon SNS (topic policies)
- AWS Lambda (function policies)
- AWS KMS (key policies)
- Amazon ECR (repository policies)

**Key difference from identity policies:** Resource policies can grant cross-account access without requiring a role assumption.

### Federation with Directory Services

Federation allows external identities to access AWS resources without creating IAM users.

- **AWS IAM Identity Center (SSO)** — Centralized access management for multiple AWS accounts and business applications. Supports SAML 2.0, built-in directory, or connect to Active Directory.
- **SAML 2.0 Federation** — Integrate with corporate identity providers (ADFS, Okta, etc.)
- **Web Identity Federation** — Use social identity providers (Google, Facebook, Amazon) via Cognito
- **AWS Directory Service** — Managed Microsoft Active Directory or AD Connector


## Hands-On Lab: Create IAM Policies and Roles

### Objective
Create an IAM policy, attach it to a role, and test cross-account role assumption using the AWS CLI.

### Prerequisites
- AWS CLI configured with admin credentials
- An AWS account

### Estimated Time
20 minutes

### Steps

**Step 1: Create a custom IAM policy**

```bash
aws iam create-policy \
  --policy-name S3ReadOnlyCustom \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        "Resource": [
          "arn:aws:s3:::my-study-bucket",
          "arn:aws:s3:::my-study-bucket/*"
        ]
      }
    ]
  }'
```

**Step 2: Create an IAM role with a trust policy**

```bash
aws iam create-role \
  --role-name S3ReadOnlyRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::ACCOUNT_ID:root"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }'
```

**Step 3: Attach the policy to the role**

```bash
aws iam attach-role-policy \
  --role-name S3ReadOnlyRole \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/S3ReadOnlyCustom
```

**Step 4: Assume the role**

```bash
aws sts assume-role \
  --role-arn arn:aws:iam::ACCOUNT_ID:role/S3ReadOnlyRole \
  --role-session-name test-session
```

**Step 5: Verify the assumed role credentials**

```bash
# Export the temporary credentials from the assume-role output
export AWS_ACCESS_KEY_ID=<AccessKeyId>
export AWS_SECRET_ACCESS_KEY=<SecretAccessKey>
export AWS_SESSION_TOKEN=<SessionToken>

# Verify identity
aws sts get-caller-identity
```

### Cleanup

```bash
aws iam detach-role-policy \
  --role-name S3ReadOnlyRole \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/S3ReadOnlyCustom

aws iam delete-role --role-name S3ReadOnlyRole

aws iam delete-policy \
  --policy-arn arn:aws:iam::ACCOUNT_ID:policy/S3ReadOnlyCustom
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the default effect of IAM policies? | All requests are implicitly denied by default |
| 2 | What overrides an explicit allow in IAM? | An explicit deny always overrides an allow |
| 3 | What does STS AssumeRole return? | Temporary Access Key ID, Secret Access Key, and Session Token |
| 4 | What is the default duration of STS temporary credentials? | 1 hour (configurable 15 min to 12 hours) |
| 5 | Do SCPs grant permissions? | No, SCPs only restrict permissions. They set maximum permission boundaries. |
| 6 | What is the difference between identity-based and resource-based policies? | Identity-based attach to users/groups/roles. Resource-based attach to resources and can grant cross-account access without role assumption. |
| 7 | What MFA types does AWS support? | Virtual MFA, hardware MFA, U2F security keys |
| 8 | What does AWS Control Tower provide? | Automated multi-account setup with guardrails (preventive SCPs + detective Config rules) |
| 9 | What is a permission boundary? | A policy that sets the maximum permissions an IAM entity can have, regardless of identity-based policies |
| 10 | What is the recommended way to manage access for multiple AWS accounts? | AWS IAM Identity Center (SSO) with AWS Organizations |

---

## Mock Exam Questions

### Question 1

A company has multiple AWS accounts managed through AWS Organizations. The security team wants to ensure that no IAM user in any member account can create IAM access keys for the root user. Which approach should a solutions architect recommend?

- A) Create an IAM policy in each account that denies root access key creation
- B) Apply a Service Control Policy (SCP) at the organization root that denies the `iam:CreateAccessKey` action for the root user
- C) Enable AWS Config rules in each account to detect root access key usage
- D) Use AWS CloudTrail to monitor and alert on root access key creation

<details><summary>Answer</summary>

**Correct: B**

SCPs are the correct mechanism for enforcing organization-wide restrictions. An SCP applied at the organization root affects all member accounts. SCPs can restrict actions even for the root user in member accounts (though not in the management account). Option A would require manual policy management in each account. Options C and D are detective controls, not preventive.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 2

A company wants to allow users from their corporate Active Directory to access AWS resources without creating individual IAM users. The company uses SAML 2.0. Which solution meets this requirement?

- A) Create IAM users for each AD user and sync passwords
- B) Configure AWS IAM Identity Center with SAML 2.0 federation to the corporate identity provider
- C) Use AWS Directory Service to replicate the entire AD to AWS
- D) Create a Lambda function to automatically create IAM users when AD users log in

<details><summary>Answer</summary>

**Correct: B**

AWS IAM Identity Center (formerly AWS SSO) supports SAML 2.0 federation, allowing corporate AD users to access AWS accounts and applications using their existing credentials. This eliminates the need to create individual IAM users. Option A defeats the purpose of federation. Option C is for extending AD to AWS, not for federation. Option D is overly complex and creates IAM users unnecessarily.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 3

A solutions architect needs to grant a Lambda function in Account A access to an S3 bucket in Account B. What is the most secure approach?

- A) Create an IAM user in Account B with S3 access and store the credentials in the Lambda function
- B) Make the S3 bucket public
- C) Create an IAM role in Account B with S3 access and configure the Lambda function to assume that role using STS
- D) Copy the data from Account B to Account A

<details><summary>Answer</summary>

**Correct: C**

Cross-account access via IAM roles and STS is the recommended approach. The Lambda function assumes a role in Account B that has the necessary S3 permissions. This uses temporary credentials and follows the principle of least privilege. Option A uses long-term credentials (insecure). Option B exposes data publicly. Option D creates data duplication and does not solve the access problem.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 4

A company is setting up a new multi-account AWS environment. They need automated account provisioning with built-in security guardrails. Which service should they use?

- A) AWS Organizations alone
- B) AWS Control Tower
- C) AWS CloudFormation StackSets
- D) AWS Service Catalog

<details><summary>Answer</summary>

**Correct: B**

AWS Control Tower provides automated multi-account setup with a landing zone, built-in guardrails (preventive SCPs and detective AWS Config rules), and a compliance dashboard. While AWS Organizations is a component of Control Tower, it alone does not provide the automated setup and guardrails. CloudFormation StackSets can deploy resources across accounts but do not provide governance guardrails. Service Catalog is for managing approved products.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

### Question 5

An application running on an EC2 instance needs to access an S3 bucket. What is the most secure way to provide these credentials?

- A) Store AWS access keys in the application configuration file
- B) Store AWS access keys in environment variables on the EC2 instance
- C) Attach an IAM role with the necessary S3 permissions to the EC2 instance
- D) Store AWS access keys in AWS Secrets Manager and retrieve them at runtime

<details><summary>Answer</summary>

**Correct: C**

Attaching an IAM role to an EC2 instance is the most secure approach. The instance receives temporary credentials automatically via the instance metadata service, and these credentials are rotated automatically. Options A and B use long-term credentials that could be compromised. Option D adds unnecessary complexity when IAM roles provide the same functionality natively.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.1

</details>

---

## References

- [IAM User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
- [AWS STS Documentation](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html)
- [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS Control Tower User Guide](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html)
- [IAM Identity Center User Guide](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)
- [AWS Security Best Practices Whitepaper](https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html)
