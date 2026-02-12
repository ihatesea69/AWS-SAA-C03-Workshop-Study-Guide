+++
title = "Task 1.3: Data Security Controls"
date = 2025
weight = 3
chapter = false
pre = "<b>3.3 </b>"
+++

## Theory

### Encryption at Rest — AWS KMS

AWS Key Management Service (KMS) is the central service for managing encryption keys.

**Key Types:**
- **AWS Managed Keys** — Created and managed by AWS for specific services (e.g., `aws/s3`, `aws/ebs`). Free, automatic rotation every year.
- **Customer Managed Keys (CMKs)** — Created and managed by you. $1/month per key + API call charges. You control rotation, policies, and grants.
- **AWS Owned Keys** — Used by AWS services internally. Not visible in your account.

**Key Features:**
- Symmetric keys (AES-256) — Single key for encrypt/decrypt. Most common, used by AWS services.
- Asymmetric keys (RSA, ECC) — Public/private key pair. Used for sign/verify or encrypt outside AWS.
- Envelope encryption: KMS encrypts a data key, which encrypts your data. Only the encrypted data key is stored with the data.
- Key policies control access to KMS keys (required, unlike IAM policies)
- Grants provide temporary, granular access to KMS keys

**Services with KMS Integration:**
- S3 (SSE-KMS), EBS, RDS, DynamoDB, Redshift, EFS, CloudTrail, SQS, SNS, Secrets Manager, Systems Manager Parameter Store

### Encryption in Transit — ACM and TLS

AWS Certificate Manager (ACM) manages SSL/TLS certificates.

- **Public certificates:** Free, auto-renewed, for use with AWS services (ALB, CloudFront, API Gateway)
- **Private certificates:** Via ACM Private CA, for internal services
- ACM certificates cannot be exported (except Private CA certificates)
- For EC2, you must use third-party certificates or ACM Private CA

**TLS Termination Points:**
- ALB — Terminates TLS, forwards HTTP to targets
- CloudFront — TLS between client and CloudFront, separate TLS to origin
- API Gateway — Built-in TLS support

### Key Management Best Practices

- Enable automatic key rotation for CMKs (rotates every year, keeps old key material for decryption)
- Use key policies + IAM policies for access control
- Use separate keys for different data classifications
- Monitor key usage with CloudTrail
- Use grants for temporary access rather than modifying key policies

### Data Backup and Replication

- **AWS Backup** — Centralized backup service for EC2, EBS, RDS, DynamoDB, EFS, FSx, Storage Gateway
- **Cross-region replication:** S3 CRR, RDS cross-region read replicas, DynamoDB Global Tables
- **Backup encryption:** Backups inherit encryption from the source resource
- **Backup Vault Lock:** WORM (Write Once Read Many) compliance for backups

### Data Lifecycle and Protection

- **S3 Lifecycle Policies:** Transition objects between storage classes, expire objects after a period
- **S3 Object Lock:** WORM compliance, prevent deletion for a retention period
- **S3 Versioning:** Protect against accidental deletion, MFA Delete for extra protection
- **DynamoDB Point-in-Time Recovery (PITR):** Continuous backups with restore to any second in the last 35 days
- **RDS Automated Backups:** Daily snapshots + transaction logs, retention 1-35 days

### Key Rotation and Certificate Renewal

- **KMS Automatic Rotation:** Enabled per CMK, rotates key material annually, old material retained
- **KMS Manual Rotation:** Create a new key and update aliases
- **ACM Certificate Renewal:** Automatic for ACM-issued public certificates (DNS or email validation)
- **Secrets Manager Rotation:** Automatic rotation with Lambda functions, configurable schedule


## Hands-On Lab: Create and Use a KMS Key for S3 Encryption

### Objective
Create a customer managed KMS key, use it to encrypt an S3 bucket, and verify encryption.

### Prerequisites
- AWS CLI configured with admin credentials

### Estimated Time
15 minutes

### Steps

**Step 1: Create a KMS key**

```bash
KEY_ID=$(aws kms create-key \
  --description "SAA-C03 Study Key" \
  --query 'KeyMetadata.KeyId' --output text)
echo "Key ID: $KEY_ID"

aws kms create-alias \
  --alias-name alias/saa-study-key \
  --target-key-id $KEY_ID
```

**Step 2: Create an S3 bucket with KMS encryption**

```bash
BUCKET_NAME="saa-study-encrypted-$(date +%s)"
aws s3api create-bucket --bucket $BUCKET_NAME --region us-east-1

aws s3api put-bucket-encryption --bucket $BUCKET_NAME \
  --server-side-encryption-configuration '{
    "Rules": [
      {
        "ApplyServerSideEncryptionByDefault": {
          "SSEAlgorithm": "aws:kms",
          "KMSMasterKeyID": "'$KEY_ID'"
        }
      }
    ]
  }'
```

**Step 3: Upload a file and verify encryption**

```bash
echo "Test encryption content" > test-file.txt
aws s3 cp test-file.txt s3://$BUCKET_NAME/test-file.txt

aws s3api head-object --bucket $BUCKET_NAME --key test-file.txt
# Verify ServerSideEncryption is "aws:kms" and SSEKMSKeyId matches your key
```

**Step 4: Enable automatic key rotation**

```bash
aws kms enable-key-rotation --key-id $KEY_ID
aws kms get-key-rotation-status --key-id $KEY_ID
```

### Cleanup

```bash
aws s3 rm s3://$BUCKET_NAME --recursive
aws s3api delete-bucket --bucket $BUCKET_NAME
aws kms disable-key --key-id $KEY_ID
aws kms schedule-key-deletion --key-id $KEY_ID --pending-window-in-days 7
aws kms delete-alias --alias-name alias/saa-study-key
rm test-file.txt
```

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What are the three types of KMS keys? | AWS Managed Keys, Customer Managed Keys (CMKs), AWS Owned Keys |
| 2 | How much does a Customer Managed Key cost? | $1/month per key + API call charges |
| 3 | What is envelope encryption? | KMS encrypts a data key, which encrypts your data. Only the encrypted data key is stored with the data. |
| 4 | Are ACM public certificates free? | Yes, and they auto-renew |
| 5 | Can you export ACM public certificates? | No. Only ACM Private CA certificates can be exported. |
| 6 | How often does KMS automatic rotation rotate key material? | Every year (365 days) |
| 7 | What is S3 Object Lock? | WORM compliance that prevents object deletion for a retention period |
| 8 | What does AWS Backup support? | EC2, EBS, RDS, DynamoDB, EFS, FSx, Storage Gateway |
| 9 | What is DynamoDB PITR? | Point-in-Time Recovery — continuous backups with restore to any second in the last 35 days |
| 10 | What is MFA Delete in S3? | Requires MFA to permanently delete versioned objects or change versioning state |

---

## Mock Exam Questions

### Question 1

A company needs to encrypt data at rest in an S3 bucket using a key they manage and can audit. They want automatic annual key rotation. Which encryption option should they use?

- A) SSE-S3 (AES-256)
- B) SSE-KMS with an AWS managed key
- C) SSE-KMS with a customer managed key (CMK) and automatic rotation enabled
- D) SSE-C (customer-provided key)

<details><summary>Answer</summary>

**Correct: C**

SSE-KMS with a customer managed key gives the company full control over the key, including audit via CloudTrail and automatic rotation. SSE-S3 uses AWS-managed keys with no customer control. AWS managed KMS keys rotate automatically but cannot be audited at the same level. SSE-C requires the customer to manage key rotation manually.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 2

A company needs to ensure that SSL/TLS certificates for their ALB are automatically renewed. Which service should they use?

- A) AWS KMS
- B) AWS Certificate Manager (ACM)
- C) AWS Secrets Manager
- D) AWS CloudHSM

<details><summary>Answer</summary>

**Correct: B**

ACM provides free public SSL/TLS certificates that are automatically renewed when used with supported AWS services like ALB, CloudFront, and API Gateway. KMS manages encryption keys, not certificates. Secrets Manager stores secrets but does not issue certificates. CloudHSM is for hardware-based key management.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 3

A company must comply with regulations requiring that backup data cannot be deleted for 7 years. Which AWS feature supports this requirement?

- A) S3 Lifecycle Policies
- B) S3 Versioning
- C) AWS Backup Vault Lock
- D) S3 Intelligent-Tiering

<details><summary>Answer</summary>

**Correct: C**

AWS Backup Vault Lock provides WORM (Write Once Read Many) compliance, preventing backup deletion for a specified retention period. This meets regulatory requirements for immutable backups. S3 Lifecycle Policies manage transitions and expiration but do not prevent deletion. Versioning protects against accidental deletion but versions can still be deleted. Intelligent-Tiering is a storage class, not a compliance feature.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 4

A solutions architect needs to protect S3 objects from accidental deletion while maintaining the ability to recover previous versions. Which combination of features should be enabled?

- A) S3 Versioning and S3 Object Lock
- B) S3 Versioning and MFA Delete
- C) S3 Lifecycle Policies and Cross-Region Replication
- D) S3 Encryption and Access Logging

<details><summary>Answer</summary>

**Correct: B**

S3 Versioning preserves all versions of objects, allowing recovery of previous versions. MFA Delete adds an extra layer of protection by requiring MFA to permanently delete versioned objects or change the versioning state. Object Lock is for WORM compliance (more restrictive than needed). Lifecycle Policies and CRR do not prevent deletion. Encryption and logging are unrelated to deletion protection.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

### Question 5

A company uses Amazon RDS with sensitive data. They need to encrypt existing unencrypted RDS instances. What is the correct approach?

- A) Enable encryption on the existing RDS instance
- B) Create an encrypted snapshot of the unencrypted instance, then restore a new encrypted instance from the snapshot
- C) Use AWS KMS to encrypt the RDS instance directly
- D) Enable TLS on the RDS instance

<details><summary>Answer</summary>

**Correct: B**

You cannot enable encryption on an existing unencrypted RDS instance. The correct approach is to create a snapshot, copy the snapshot with encryption enabled (using KMS), and then restore a new instance from the encrypted snapshot. Option A is not possible. Option C is not how RDS encryption works. Option D enables encryption in transit, not at rest.

**Domain:** 1 — Design Secure Architectures
**Task:** 1.3

</details>

---

## References

- [AWS KMS Developer Guide](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html)
- [AWS Certificate Manager User Guide](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
- [AWS Backup Developer Guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
- [S3 Object Lock Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
- [S3 Versioning Documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
- [Encrypting Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html)
