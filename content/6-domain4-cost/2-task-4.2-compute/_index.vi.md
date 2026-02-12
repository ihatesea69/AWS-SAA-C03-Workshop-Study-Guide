+++
title = "Task 4.2: Tính toán tối ưu chi phí"
date = 2025
weight = 2
chapter = false
pre = "<b>6.2 </b>"
+++

## Lý thuyết

### Tùy chọn mua EC2
- **On-Demand:** Không cam kết, không giảm giá
- **Reserved Instances:** Giảm tới 72%, cam kết 1-3 năm
- **Savings Plans:** Giảm tới 72%, linh hoạt hơn RI
- **Spot Instances:** Giảm tới 90%, có thể bị gián đoạn

### Right-Sizing
Dùng Compute Optimizer để xác định instances quá lớn. Graviton cho giá-hiệu suất tốt hơn 20-40%.

### Serverless
Lambda trả theo invocation. Fargate trả theo vCPU-giây. Loại bỏ chi phí compute nhàn rỗi.

---

## Flashcards

| # | Câu hỏi | Trả lời |
|---|---------|---------|
| 1 | Spot giảm tối đa bao nhiêu? | 90% |
| 2 | Cảnh báo gián đoạn Spot? | 2 phút |
| 3 | Compute Optimizer làm gì? | Khuyến nghị right-sizing instances |
| 4 | Lambda free tier? | 1 triệu requests/tháng |
| 5 | Graviton là gì? | Instances ARM với giá-hiệu suất tốt hơn 20-40% |

---

## Tài liệu tham khảo

- [EC2 Pricing](https://aws.amazon.com/ec2/pricing/)
- [Savings Plans User Guide](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
- [Spot Instances User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html)
