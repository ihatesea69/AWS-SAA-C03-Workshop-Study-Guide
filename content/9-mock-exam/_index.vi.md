+++
title = "De thi thu"
date = 2025
weight = 9
chapter = false
pre = "<b>9. </b>"
+++

# De thi thu SAA-C03

**Huong dan:** De thi thu nay co 65 cau hoi theo trong so domain giong ky thi SAA-C03 that. Hay chon dap an tot nhat cho moi cau hoi.

**Trong so Domain:**
- Domain 1 (Bao mat): 20 cau hoi (30%)
- Domain 2 (Phuc hoi): 17 cau hoi (26%)
- Domain 3 (Hieu suat): 16 cau hoi (24%)
- Domain 4 (Chi phi): 12 cau hoi (20%)

**Diem dat:** 720/1000 (khoang 47/65 cau dung)

---

## Meo thi va Chien luoc

### Quan ly thoi gian
- Ban co 130 phut cho 65 cau hoi (2 phut/cau)
- Danh dau cau kho va quay lai sau
- Khong nen danh qua 3-4 phut cho 1 cau

### Chien luoc tra loi
- Doc ky cau hoi va xac dinh yeu cau chinh
- Loai bo cac dap an sai ro rang truoc
- Tim cac best practices va nguyen tac Well-Architected
- Chon giai phap toi uu chi phi khi co nhieu lua chon

### Cac bay thi thuong gap
- **Over-engineering:** Chon giai phap don gian nhat dap ung yeu cau
- **Chi phi vs Hieu suat:** Can bang dua tren trong tam cau hoi
- **Bao mat:** Khi nghi ngo, chon tuy chon bao mat hon
- **Managed vs Tu quan ly:** AWS uu tien dich vu managed

---

## Cau hoi mau theo Domain

### Domain 1: Thiet ke kien truc bao mat

**Cau 1:** Cong ty can cap quyen truy cap tam thoi vao S3 bucket cho doi tac ben ngoai. Quyen truy cap chi gioi han vao cac object cu the va het han sau 2 gio. Cach nao an toan nhat?

- A) Tao IAM users cho moi doi tac voi quyen S3
- B) Tao pre-signed URLs voi thoi han 2 gio
- C) Cong khai S3 bucket voi bucket policy theo thoi gian
- D) Dung S3 Access Points voi thong tin xac thuc tam thoi

<details><summary>Dap an</summary>

**Dung: B**

Pre-signed URLs cung cap quyen truy cap tam thoi vao cac S3 objects cu the voi thoi han het han co the cau hinh. Khong can tao IAM users hoac cong khai buckets.

**Domain:** 1 — Thiet ke kien truc bao mat
**Task:** 1.1

</details>

### Domain 2: Thiet ke kien truc phuc hoi

**Cau 21:** Cong ty can tach roi he thong xu ly don hang de cac dot tang dot bien don hang khong lam qua tai backend. Ho nen dung pattern kien truc nao?

- A) Goi API dong bo giua cac dich vu
- B) SQS queue giua tiep nhan don hang va xu ly
- C) Ghi truc tiep vao database tu frontend
- D) He thong file chia se giua cac dich vu

<details><summary>Dap an</summary>

**Dung: B**

SQS cung cap loose coupling giua cac thanh phan, cho phep tiep nhan don hang tiep tuc nhan don trong khi backend xu ly theo toc do cua no. Dieu nay xu ly tot cac dot tang traffic.

**Domain:** 2 — Thiet ke kien truc phuc hoi
**Task:** 2.1

</details>

### Domain 3: Kien truc hieu suat cao

**Cau 38:** Cong ty can luu tru 100 TB du lieu se duoc truy cap thuong xuyen voi do tre thap. Ho nen dung S3 storage class nao?

- A) S3 Standard
- B) S3 Intelligent-Tiering
- C) S3 Standard-IA
- D) S3 Glacier

<details><summary>Dap an</summary>

**Dung: A**

S3 Standard cung cap do tre thap va throughput cao cho du lieu truy cap thuong xuyen. Intelligent-Tiering them overhead cho phan tich access pattern. IA va Glacier danh cho truy cap khong thuong xuyen.

**Domain:** 3 — Kien truc hieu suat cao
**Task:** 3.1

</details>

### Domain 4: Toi uu chi phi

**Cau 54:** Cong ty chay EC2 instances 24/7 cho workload production. Ho muon giam chi phi. Tuy chon mua nao tiet kiem nhat?

- A) On-Demand Instances
- B) Spot Instances
- C) Reserved Instances hoac Savings Plans
- D) Dedicated Hosts

<details><summary>Dap an</summary>

**Dung: C**

Reserved Instances va Savings Plans giam toi 72% cho workloads on dinh. Spot re hon nhung co the bi gian doan. On-Demand la gia day du. Dedicated Hosts danh cho compliance.

**Domain:** 4 — Toi uu chi phi
**Task:** 4.2

</details>

---

*Xem phien ban tieng Anh de co day du 65 cau hoi.*
