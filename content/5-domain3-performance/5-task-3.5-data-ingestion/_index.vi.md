+++
title = "Task 3.5: Nhap va chuyen doi du lieu hieu suat cao"
date = 2025
weight = 5
chapter = false
pre = "<b>5.5 </b>"
+++

## Ly thuyet

### Amazon Kinesis
- **Data Streams:** Nhap du lieu thoi gian thuc, quan ly shards thu cong
- **Data Firehose:** Gan thoi gian thuc, tu dong mo rong, giao den S3/Redshift

### AWS Glue
ETL serverless. Data Catalog, Crawlers, Spark ETL jobs. Chuyen doi CSV/JSON sang Parquet.

### Amazon Athena
Truy van SQL serverless tren S3. Tra phi theo TB quet. Tot nhat voi Parquet/ORC.

### AWS Lake Formation
Xay dung data lake tren S3 voi kiem soat truy cap tap trung, quyen cap cot/hang.

### Amazon QuickSight
BI serverless. Dashboards, SPICE engine, ML insights.

### Dich vu truyen du lieu
- **DataSync:** Truyen du lieu tu dong giua on-premises va AWS
- **Snow Family:** Snowcone (8-14 TB), Snowball Edge (80 TB), Snowmobile (100 PB)

---

## Flashcards

| # | Cau hoi | Tra loi |
|---|---------|---------|
| 1 | Kinesis Streams vs Firehose? | Streams: thoi gian thuc, shards thu cong. Firehose: gan thoi gian thuc, tu dong. |
| 2 | Glue lam gi? | ETL serverless voi Data Catalog va Crawlers |
| 3 | Dinh dang tot nhat cho Athena? | Parquet hoac ORC (columnar) |
| 4 | Lake Formation cung cap gi? | Kiem soat truy cap tap trung cho data lake, quyen cap cot |
| 5 | Khi nao dung Snowball? | Di chuyen du lieu lon (TB-PB) khi mang qua cham |

---

## Tai lieu tham khao

- [Amazon Kinesis Documentation](https://docs.aws.amazon.com/kinesis/)
- [AWS Glue Developer Guide](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
- [Amazon Athena User Guide](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
