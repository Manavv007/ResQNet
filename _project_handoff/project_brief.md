# Project Brief: Disaster Response System

## What the Project Is
A multi-portal, cloud-based disaster response management system designed to connect citizens reporting incidents, authority figures dispatching help, and field rescue teams responding to emergencies. 

## Final Goal
To seamlessly orchestrate disaster reporting and response through a highly available, robust web system. 

## Tech Stack
- **Backend:** Python / Flask
- **Database / Storage:** AWS DynamoDB (for reports and teams), AWS S3 (for image uploads)
- **Frontend:** React + Vite (Split into 3 separate Apps: Public, Authority, Rescue)
- **Deployment & Orchestration:** Docker & Docker Compose, Nginx

## Constraints
- The system must support role-based isolated frontends.
- Needs to be production-ready, ensuring high availability (which is why we are looking into adding a CDN next).
- Passwords and auth tokens (currently handled simply via headers/bcrypt) must be managed securely.
