# Decisions Made

1. **Micro-Frontend Architecture:** 
   - *Decision:* Split the frontend into three separate React apps (Public, Authority, Rescue).
   - *Why:* Ensures strict isolation between user roles, simplifies access control, and allows separate scaling or updates depending on usage spikes (e.g., massive traffic on the public app during a disaster wouldn't choke the authority dashboard).

2. **Docker Native Orchestration:**
   - *Decision:* Use Docker and Docker Compose to run all 4 components.
   - *Why:* Prevents "works on my machine" issues across different developers and prepares the application for cloud deployment (ECS/EKS).

3. **Cloud Native Storage (AWS DynamoDB & S3):**
   - *Decision:* Use DynamoDB over SQL/MongoDB and S3 for images.
   - *Why:* High scalability for burst traffic during disaster events without database provisioning bottlenecks.

4. **Nginx for Frontends:**
   - *Decision:* Serve all Vite compiled React chunks through standard Nginx Alpine containers.
   - *Why:* Super lightweight and allows easy routing/port mapping inside Docker.
