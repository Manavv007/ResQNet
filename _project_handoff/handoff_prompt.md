# LLM Context Handoff Prompt

*Copy and paste the text below to quickly context-load an LLM for this project:*

---

**Role & Context:**
You are an expert full-stack cloud engineer. We are working on a "Disaster Response System" project. It contains a Python Flask Backend (using AWS DynamoDB for structured data and AWS S3 for image uploads), and three isolated React (Vite) Frontends (Public, Authority, Rescue). Everything is containerized and orchestrated via Docker Compose.

**Current State:**
The basic architecture is complete and the Docker containers successfully spin up, binding to ports 5000 (API), 3000 (Public), 3001 (Authority), and 3002 (Rescue). Our frontends are currently served out of Nginx containers.

**Current Objective:**
We want to integrate a CDN (Content Delivery Network) into this current project, likely to serve frontend assets globally and accelerate S3 media load times. 

**Next Action Needed:**
Based on this context, guide me step-by-step on the best approach to integrate a CDN (e.g., AWS CloudFront or Cloudflare). Let me know the architectural changes needed, how it relates to our Docker Nginx setup natively,. and how we should configure our Vite build or S3 buckets to support the CDN integration. Let's start with your proposed strategy.
