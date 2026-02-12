+++
title = "Điều kiện tiên quyết"
date = 2025
weight = 2
chapter = false
pre = "<b>2. </b>"
+++

# Điều kiện tiên quyết

## Yêu cầu tài khoản AWS

- Tài khoản AWS với quyền quản trị (Administrator Access)
- Nên sử dụng tài khoản AWS Free Tier để thực hành
- Bật MFA cho tài khoản root

## Công cụ cần thiết

- **AWS CLI v2** — Giao diện dòng lệnh AWS
- **Trình duyệt web** — Chrome, Firefox hoặc Edge phiên bản mới nhất
- **Trình soạn thảo văn bản** — VS Code hoặc tương đương

## Cài đặt AWS CLI

```bash
# Windows
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# macOS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

## Cấu hình AWS CLI

```bash
aws configure
# AWS Access Key ID: [Nhập Access Key]
# AWS Secret Access Key: [Nhập Secret Key]
# Default region name: ap-southeast-1
# Default output format: json
```

## Kiến thức nền tảng

- Hiểu biết cơ bản về điện toán đám mây
- Quen thuộc với các khái niệm mạng (TCP/IP, DNS, HTTP)
- Kinh nghiệm cơ bản với Linux/Windows command line
