+++
title = "Task 3.5: Data Ingestion and Transformation"
date = 2025
weight = 5
chapter = false
pre = "<b>5.5 </b>"
+++

## Theory

### Amazon Kinesis

Real-time data streaming platform.

- **Kinesis Data Streams:** Real-time data ingestion. Shards for throughput (1 MB/s in, 2 MB/s out per shard). Retention 1-365 days. Consumers: Lambda, KCL applications, Kinesis Data Analytics.
- **Kinesis Data Firehose:** Near real-time delivery to S3, Redshift, OpenSearch, Splunk. Automatic scaling, no shard management. Can transform data with Lambda. Buffer interval: 60-900 seconds.
- **Kinesis Data Analytics:** SQL or Apache Flink on streaming data. Real-time analytics.

| Feature | Data Streams | Data Firehose |
|---------|-------------|---------------|
| Latency | Real-time (~200ms) | Near real-time (60s+) |
| Scaling | Manual (shards) | Automatic |
| Consumers | Custom | S3, Redshift, OpenSearch, Splunk |
| Data Retention | 1-365 days | No retention |

### AWS Glue

Serverless ETL (Extract, Transform, Load) service.

- **Glue Data Catalog:** Central metadata repository (Hive-compatible metastore)
- **Glue Crawlers:** Automatically discover schemas and populate the Data Catalog
- **Glue ETL Jobs:** Spark-based data transformation (Python or Scala)
- **Glue Studio:** Visual ETL job authoring
- Supports: CSV, JSON, Parquet, ORC, Avro transformations
- Integrates with: S3, RDS, Redshift, DynamoDB

### Amazon Athena

Serverless interactive query service for S3 data.

- Uses standard SQL (Presto engine)
- Pay per query ($5 per TB scanned)
- Best with columnar formats (Parquet, ORC) for cost and performance
- Integrates with Glue Data Catalog for schema management
- Use partitioning and compression to reduce costs

### AWS Lake Formation

Build, secure, and manage data lakes on S3.

- Centralized access control and governance
- Fine-grained permissions (column-level, row-level)
- Built on top of Glue Data Catalog
- Simplifies data ingestion, cataloging, and security

### Amazon QuickSight

Serverless BI (Business Intelligence) and visualization service.

- Interactive dashboards and reports
- ML-powered insights (anomaly detection, forecasting)
- SPICE: In-memory calculation engine
- Pay per session pricing

### Data Transfer Services

- **AWS DataSync:** Automated data transfer between on-premises and AWS (S3, EFS, FSx). Agent-based, scheduled transfers, bandwidth throttling.
- **AWS Storage Gateway:** Hybrid cloud storage (ongoing access pattern)
- **AWS Snow Family:**
  - Snowcone: 8-14 TB, portable
  - Snowball Edge: 80 TB storage, compute capability
  - Snowmobile: 100 PB, exabyte-scale migration

### Data Format Transformations

| Format | Type | Best For |
|--------|------|----------|
| CSV | Row-based | Simple data exchange |
| JSON | Semi-structured | APIs, logs |
| Parquet | Columnar | Analytics queries (Athena, Redshift) |
| ORC | Columnar | Hive workloads |
| Avro | Row-based | Streaming, schema evolution |

- Convert CSV/JSON to Parquet using Glue ETL for better Athena performance
- Compression (gzip, snappy, zstd) reduces storage and query costs

---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | Kinesis Data Streams vs Firehose? | Streams: real-time, manual shards, custom consumers. Firehose: near real-time, auto-scaling, delivers to S3/Redshift. |
| 2 | What does AWS Glue do? | Serverless ETL with Data Catalog, Crawlers, and Spark-based jobs |
| 3 | What is Athena? | Serverless SQL queries on S3 data. Pay per TB scanned. |
| 4 | Best data format for Athena? | Parquet or ORC (columnar) with compression |
| 5 | What is Lake Formation? | Build and manage data lakes with centralized access control |
| 6 | What is QuickSight SPICE? | In-memory calculation engine for fast dashboard performance |
| 7 | DataSync vs Storage Gateway? | DataSync: scheduled transfers. Storage Gateway: ongoing hybrid access. |
| 8 | When to use Snowball? | Large data migrations (TBs to PBs) when network transfer is too slow |
| 9 | What does a Glue Crawler do? | Automatically discovers schemas and populates the Data Catalog |
| 10 | Firehose buffer interval range? | 60 to 900 seconds |

---

## Mock Exam Questions

### Question 1

A company needs to ingest real-time clickstream data and deliver it to S3 for analytics. The solution must scale automatically and require minimal management. Which service should they use?

- A) Kinesis Data Streams
- B) Kinesis Data Firehose
- C) Amazon SQS
- D) Amazon MSK

<details><summary>Answer</summary>

**Correct: B**

Kinesis Data Firehose automatically scales and delivers data to S3 with minimal management. Data Streams requires manual shard management. SQS is a message queue, not designed for streaming to S3. MSK (Kafka) requires more management.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 2

A company stores log data in CSV format on S3 and queries it with Athena. Queries are slow and expensive. What should the architect recommend to improve performance and reduce cost?

- A) Increase Athena query timeout
- B) Convert CSV to Parquet format using Glue ETL and partition the data
- C) Move data to RDS
- D) Use S3 Select

<details><summary>Answer</summary>

**Correct: B**

Converting to Parquet (columnar format) dramatically reduces the amount of data scanned by Athena, improving both performance and cost. Partitioning further reduces scanned data. Increasing timeout does not improve performance. Moving to RDS changes the architecture unnecessarily. S3 Select helps but Parquet + partitioning is more effective.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 3

A company needs to migrate 50 TB of data from on-premises to S3. Their internet connection is 1 Gbps. Which is the fastest transfer method?

- A) AWS DataSync over the internet
- B) S3 multipart upload
- C) AWS Snowball Edge
- D) AWS Direct Connect

<details><summary>Answer</summary>

**Correct: C**

At 1 Gbps, transferring 50 TB would take approximately 5 days over the network. Snowball Edge can be shipped and loaded faster for this data volume. DataSync and multipart upload are limited by the 1 Gbps connection. Direct Connect takes weeks to provision.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 4

A company wants to build a data lake on S3 with centralized access control, including column-level permissions. Which service should they use?

- A) S3 bucket policies
- B) AWS Lake Formation
- C) AWS Glue Data Catalog
- D) Amazon Athena

<details><summary>Answer</summary>

**Correct: B**

Lake Formation provides centralized access control for data lakes, including fine-grained permissions at the column and row level. S3 bucket policies operate at the object level. Glue Data Catalog is for metadata, not access control. Athena is for querying.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

### Question 5

A company needs to process streaming data in real-time using SQL queries. Which service should they use?

- A) Amazon Athena
- B) Amazon Redshift
- C) Kinesis Data Analytics
- D) AWS Glue

<details><summary>Answer</summary>

**Correct: C**

Kinesis Data Analytics allows running SQL or Apache Flink on streaming data in real-time. Athena queries data at rest in S3. Redshift is a data warehouse for batch analytics. Glue is for ETL batch processing.

**Domain:** 3 — Design High-Performing Architectures
**Task:** 3.5

</details>

---

## References

- [Amazon Kinesis Documentation](https://docs.aws.amazon.com/kinesis/)
- [AWS Glue Developer Guide](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
- [Amazon Athena User Guide](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
- [AWS Lake Formation Developer Guide](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html)
- [Amazon QuickSight User Guide](https://docs.aws.amazon.com/quicksight/latest/user/welcome.html)
- [AWS DataSync User Guide](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
