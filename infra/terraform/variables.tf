variable "aws_region" {
  type        = string
  description = "AWS region for a future ECS/Bedrock deployment."
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Name prefix for future resources."
  default     = "gitlab-ai-devops-intelligence"
}
