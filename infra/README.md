# Infrastructure

AWS deployment is **out of scope** for Milestone 1. This tree is a placeholder so platform work has a home.

Planned later:

- Amazon ECS/Fargate services for `backend` and `frontend`
- Application Load Balancer
- IAM task role with `bedrock:InvokeModel` (no GitLab token in images — Secrets Manager)
- Optional VPC endpoints for Bedrock

Do not `terraform apply` from this folder yet. `terraform/` contains versions and variable names only.
