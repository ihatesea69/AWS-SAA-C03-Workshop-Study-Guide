+++
title = "Task 3.5: Nhập và chuyển đổi dữ liệu hiệu suất cao"
date = 2025
weight = 5
chapter = false
pre = "<b>5.5 </b>"
+++

## Lý thuyết

### Amazon Kinesis
- **Data Streams:** Nhập dữ liệu thời gian thực, quản lý shards thủ công
- **Data Firehose:** Gần thời gian thực, tự động mở rộng, giao đến S3/Redshift

### AWS Glue
ETL serverless. Data Catalog, Crawlers, Spark ETL jobs. Chuyển đổi CSV/JSON sang Parquet.

### Amazon Athena
Truy vấn SQL serverless trên S3. Trả phí theo TB quét. Tốt nhất với Parquet/ORC.

### AWS Lake Formation
Xây dựng data lake trên S3 với kiểm soát truy cập tập trung, quyền cấp cột/hàng.

### Amazon QuickSight
BI serverless. Dashboards, SPICE engine, ML insights.

### Dịch vụ truyền dữ liệu
- **DataSync:** Truyền dữ liệu tự động giữa on-premises và AWS
- **Snow Family:** Snowcone (8-14 TB), Snowball Edge (80 TB), Snowmobile (100 PB)

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Kinesis Streams vs Firehose? | Streams: thời gian thực, shards thủ công. Firehose: gần thời gian thực, tự động. |
| 2 | Glue làm gì? | ETL serverless với Data Catalog và Crawlers |
| 3 | Định dạng tốt nhất cho Athena? | Parquet hoặc ORC (columnar) |
| 4 | Lake Formation cung cấp gì? | Kiểm soát truy cập tập trung cho data lake, quyền cấp cột |
| 5 | Khi nào dùng Snowball? | Di chuyển dữ liệu lớn (TB-PB) khi mạng quá chậm |

---

## Tài liệu tham khảo

- [Amazon Kinesis Documentation](https://docs.aws.amazon.com/kinesis/)
- [AWS Glue Developer Guide](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
- [Amazon Athena User Guide](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
