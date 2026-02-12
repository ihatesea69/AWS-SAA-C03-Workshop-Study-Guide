# AWS SAA-C03 Workshop Study Guide

[![Hugo](https://img.shields.io/badge/Hugo-0.128.0-ff4088?logo=hugo&logoColor=white)](https://gohugo.io/)
[![AWS SAA-C03](https://img.shields.io/badge/AWS-SAA--C03-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=github)](https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/)
[![Bilingual](https://img.shields.io/badge/Language-EN%20|%20VI-4CAF50)](https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A comprehensive, bilingual (English/Vietnamese) study guide for the AWS Solutions Architect Associate (SAA-C03) certification exam. Built with Hugo and deployed on GitHub Pages, this workshop covers all four exam domains with theory, hands-on labs, mock exams, cheat sheets, flashcards, and service comparison tables.

**Live Site:** [https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/](https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/)

---

## Table of Contents

- [About the Exam](#about-the-exam)
- [Workshop Structure](#workshop-structure)
- [Features](#features)
- [Getting Started](#getting-started)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## About the Exam

The AWS Certified Solutions Architect - Associate (SAA-C03) validates the ability to design distributed systems on AWS following the Well-Architected Framework.

| Domain | Weight | Task Statements |
|--------|--------|-----------------|
| Design Secure Architectures | 30% | 1.1, 1.2, 1.3 |
| Design Resilient Architectures | 26% | 2.1, 2.2 |
| Design High-Performing Architectures | 24% | 3.1, 3.2, 3.3, 3.4, 3.5 |
| Design Cost-Optimized Architectures | 20% | 4.1, 4.2, 4.3, 4.4 |

- **Format:** 65 questions (50 scored, 15 unscored)
- **Duration:** 130 minutes
- **Passing Score:** 720 / 1000
- **Cost:** USD 150

---

## Workshop Structure

```
AWS-SAA-C03-Workshop-Study-Guide/
|-- 1. Workshop Outline
|-- 2. Prerequisites
|-- 3. Domain 1: Design Secure Architectures (30%)
|   |-- Task 1.1: Secure Access to AWS Resources
|   |-- Task 1.2: Secure Workloads and Applications
|   +-- Task 1.3: Data Security Controls
|-- 4. Domain 2: Design Resilient Architectures (26%)
|   |-- Task 2.1: Scalable and Loosely Coupled Architectures
|   +-- Task 2.2: Highly Available and Fault-Tolerant Architectures
|-- 5. Domain 3: Design High-Performing Architectures (24%)
|   |-- Task 3.1: Storage Solutions
|   |-- Task 3.2: Compute Solutions
|   |-- Task 3.3: Database Solutions
|   |-- Task 3.4: Network Architectures
|   +-- Task 3.5: Data Ingestion and Transformation
|-- 6. Domain 4: Design Cost-Optimized Architectures (20%)
|   |-- Task 4.1: Cost-Optimized Storage
|   |-- Task 4.2: Cost-Optimized Compute
|   |-- Task 4.3: Cost-Optimized Database
|   +-- Task 4.4: Cost-Optimized Network
|-- 7. Comparison Tables
|-- 8. Cheat Sheets and Flashcards
|-- 9. Mock Exam (65 questions)
|-- 10. Conclusion and Exam Tips
+-- 11. Resources and References
```

---

## Features

- **14 Task Pages** aligned with the official SAA-C03 exam guide, each containing theory, labs, flashcards, and practice questions
- **Hands-On Labs** with step-by-step AWS CLI commands and Console instructions
- **65 Mock Exam Questions** weighted by domain (30/26/24/20) with detailed explanations
- **Cheat Sheets** with decision trees, key limits, and quick-reference tables per domain
- **80+ Flashcards** covering critical facts, service comparisons, and exam scenarios
- **8 Comparison Tables** for commonly confused service pairs (S3 vs EBS vs EFS, ALB vs NLB vs GLB, SQS vs SNS vs EventBridge, etc.)
- **Bilingual Content** in English and Vietnamese
- **Automated Deployment** via GitHub Actions to GitHub Pages

---

## Getting Started

### Prerequisites

- An AWS account with administrative access
- AWS CLI v2 installed and configured
- Basic understanding of cloud computing concepts
- Hugo v0.128.0 or later (for local development only)

### Access the Workshop

Visit the live site: [https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/](https://ihatesea69.github.io/AWS-SAA-C03-Workshop-Study-Guide/)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/ihatesea69/AWS-SAA-C03-Workshop-Study-Guide.git
cd AWS-SAA-C03-Workshop-Study-Guide

# Initialize the theme submodule
git submodule update --init --recursive

# Start the local development server
hugo server -D

# Open http://localhost:1313 in your browser
```

### Run Tests

```bash
npm install
npm test
```

---

## Project Structure

```
.
|-- .github/workflows/hugo.yml   # GitHub Actions CI/CD pipeline
|-- archetypes/                   # Hugo content templates
|-- content/                      # Markdown content (EN + VI)
|-- layouts/                      # Custom Hugo layout overrides
|-- static/                       # Static assets (CSS, fonts, images)
|-- tests/                        # Vitest + fast-check test suite
|-- themes/hugo-theme-learn/      # Hugo Learn theme (git submodule)
|-- hugo.toml                     # Hugo configuration
|-- package.json                  # Node.js test dependencies
|-- LICENSE                       # MIT License
+-- README.md
```

---

## Deployment

This site is automatically built and deployed to GitHub Pages on every push to the `main` branch using GitHub Actions.

The workflow installs Hugo v0.128.0 (extended), builds the site with `--minify`, and deploys via `actions/deploy-pages@v4`.

To enable GitHub Pages on a fork:
1. Go to **Settings** > **Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` to trigger the deployment

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m "Add improvement"`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

For bug reports or content corrections, please open an issue.

---

## References

- [AWS SAA-C03 Exam Guide](https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [First Cloud Journey](https://cloudjourney.awsstudygroup.com/)

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
