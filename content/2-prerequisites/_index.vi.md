+++
title = "Điều kiện tiên quyết"
date = 2025
weight = 2
chapter = false
pre = "<b>2. </b>"
+++

## Điều kiện tiên quyết

Trước khi bắt đầu workshop, hãy đảm bảo bạn đã chuẩn bị đầy đủ các yêu cầu sau.

## Tài khoản AWS

Bạn cần một tài khoản AWS với quyền quản trị (Administrator Access) để thực hành các bài lab.

1. Truy cập [https://aws.amazon.com/free/](https://aws.amazon.com/free/) và nhấn "Create a Free Account"
2. Hoàn tất đăng ký (cần email, thẻ tín dụng và xác minh số điện thoại)
3. Đăng nhập vào AWS Management Console tại [https://console.aws.amazon.com/](https://console.aws.amazon.com/)

## AWS Free Tier 2025 — Mô hình Credit mới

{{% notice info %}}
**Cập nhật quan trọng (15/07/2025):** AWS đã thay đổi hoàn toàn chương trình Free Tier. Thay vì giới hạn theo giờ sử dụng, tài khoản mới sẽ nhận **credit trực tiếp** để tự do khám phá các dịch vụ AWS.
{{% /notice %}}

### Có gì mới?

| Tiêu chí | Free Tier cũ (trước 15/07/2025) | Free Tier mới (từ 15/07/2025) |
|---|---|---|
| Thời hạn | 12 tháng miễn phí | 6 tháng (hoặc đến khi hết credit) |
| Cơ chế | Miễn phí theo hạn mức (VD: 750 giờ EC2 t2.micro) | $100 credit ngay + tối đa $100 từ nhiệm vụ |
| Cách dùng | Dùng trong hạn mức, vượt thì bị tính phí | Tự do sử dụng trong phạm vi credit |
| Kết thúc | Tài khoản vẫn hoạt động, tính phí nếu vượt mức | Tài khoản bị đóng nếu không nâng cấp sau 6 tháng |
| Phân loại | Một loại duy nhất | Hai loại: **Free Plan** và **Paid Plan** |
| Always Free | Có (30+ dịch vụ) | Có (30+ dịch vụ, không thay đổi) |

### So sánh Free Plan và Paid Plan

| Tiêu chí | Free Plan (Gói Miễn phí) | Paid Plan (Gói Trả phí) |
|---|---|---|
| Credit ban đầu | $100 khi tạo tài khoản | $100 khi tạo tài khoản |
| Thưởng thêm | Tối đa $100 (5 nhiệm vụ × $20) | Tối đa $100 (5 nhiệm vụ × $20) |
| Truy cập dịch vụ | Chỉ các dịch vụ phổ biến, một số bị giới hạn | Toàn quyền truy cập 150+ dịch vụ |
| Tính phí | Không bị tính phí cho đến khi hết credit hoặc 6 tháng | Tính phí on-demand sau khi hết credit |
| Thời hạn | 6 tháng hoặc đến khi hết credit | Không giới hạn |
| Sau khi hết credit | Tài khoản bị đóng (90 ngày để nâng cấp) | Tiếp tục tính phí theo giá on-demand |
| Phù hợp cho | Học tập, demo, POC | Ứng dụng production |

### Cách nhận thêm $100 Credit

Hoàn thành 5 nhiệm vụ thực hành (mỗi nhiệm vụ $20):

| # | Nhiệm vụ | Dịch vụ |
|---|---|---|
| 1 | Thiết lập ngân sách chi phí | **AWS Budgets** |
| 2 | Khởi chạy và terminate EC2 instance | **Amazon EC2** |
| 3 | Tạo và xóa database RDS | **Amazon RDS** |
| 4 | Tạo web app với Lambda function | **AWS Lambda** |
| 5 | Sử dụng foundation model trong playground | **Amazon Bedrock** |

Theo dõi tiến trình qua widget **Explore AWS** trên trang chủ AWS Management Console.

{{% notice warning %}}
**Quan trọng:** Luôn terminate/xóa tài nguyên sau khi hoàn thành mỗi nhiệm vụ để tránh lãng phí credit!
{{% /notice %}}


### Dịch vụ Always Free (Không giới hạn thời gian)

Các dịch vụ này miễn phí vĩnh viễn bất kể gói nào:

- **AWS Lambda:** 1 triệu request/tháng
- **Amazon DynamoDB:** 25 GB storage + 25 RCU/WCU
- **Amazon S3:** 5 GB standard storage
- **Amazon CloudWatch:** 10 custom metrics + 1 triệu API requests
- **Amazon SNS:** 1 triệu publishes
- **Amazon SQS:** 1 triệu requests

### Dịch vụ cần tránh (Ngốn credit nhanh)

{{% notice warning %}}
Các dịch vụ sau có thể làm hết sạch credit trong vài giờ:
- **EC2 instance lớn:** t3.large, m5.xlarge, GPU instances (p3, p4, g4 — $5-20/giờ)
- **Dedicated Hosts:** Tốn kém nhất, tránh hoàn toàn
- **RDS Multi-AZ:** Gấp đôi chi phí so với single-AZ
- **NAT Gateway:** $0.045/giờ + phí data transfer
- **SageMaker training jobs:** ml.p3.xlarge tốn $4.9/giờ
- **Bedrock với model lớn:** Claude 3 Opus, các foundation model lớn
{{% /notice %}}

### Dịch vụ phù hợp cho học tập

- **EC2 t2.micro/t3.micro:** ~$8.5/tháng
- **RDS t3.micro (Single-AZ):** ~$15/tháng
- **ElastiCache t3.micro:** Redis/Memcached nhỏ
- **API Gateway:** 1 triệu calls đầu tiên rất rẻ
- **Mẹo region:** us-east-1 thường rẻ nhất

### Mẹo tiết kiệm Credit

1. Luôn **terminate EC2 instances** sau khi thực hành
2. Sử dụng **Spot Instances** khi có thể (tiết kiệm 50-90%)
3. Chọn region **us-east-1** để có giá rẻ nhất
4. Xóa tài nguyên không dùng: EBS volumes, Elastic IPs, Load Balancers
5. Thiết lập **billing alerts** ở ngưỡng $50, $100, $150
6. AWS sẽ gửi email thông báo khi bạn dùng 50%, 75%, 90% credit

{{% notice note %}}
**Tài khoản cũ:** Nếu tài khoản được tạo trước 15/07/2025, bạn vẫn ở chương trình Free Tier cũ (giới hạn theo giờ sử dụng trong 12 tháng). Chính sách "Always Free" vẫn áp dụng cho cả hai chương trình.
{{% /notice %}}

## Công cụ cần thiết

### AWS CLI

Cài đặt AWS CLI v2 để chạy các lệnh trong bài lab:

- **Windows:** Tải MSI installer từ [AWS CLI Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **macOS:** `brew install awscli` hoặc tải PKG installer
- **Linux:**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

Cấu hình credentials:

```bash
aws configure
# AWS Access Key ID: [Nhập Access Key]
# AWS Secret Access Key: [Nhập Secret Key]
# Default region name: us-east-1
# Default output format: json
```

### Trình duyệt web

Trình duyệt hiện đại (Chrome, Firefox, Edge hoặc Safari) để truy cập AWS Management Console.

### Trình soạn thảo

Bất kỳ text editor nào để xem JSON policies và CloudFormation templates. Khuyến nghị VS Code.

## Kiến thức nền tảng

- Hiểu biết cơ bản về điện toán đám mây
- Quen thuộc với các khái niệm mạng (TCP/IP, DNS, HTTP/HTTPS, subnets)
- Hiểu biết chung về cơ sở dữ liệu (quan hệ vs phi quan hệ)
- Kinh nghiệm cơ bản với command line

## Liên kết hữu ích

- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Free Tier Documentation](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-free-tier.html)
- [Danh sách dịch vụ Free Plan](https://aws.amazon.com/free/free-plan-services/)
- [AWS Training](https://aws.amazon.com/training/)
