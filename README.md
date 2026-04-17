# 🌪️ Smart Disaster Response System

A cloud-based disaster management system built with **React + Flask + Docker**.

## Team Members
| Name | Role |
|------|------|
| Member 1 | Backend (Flask API) + Docker + GitHub Setup |
| Member 2 | Frontend (React UI + Dashboard) |
| Member 3 | Report + Architecture Diagram + Cloud Config |

---

## 🏗️ Architecture

```
User Browser
    │
    ▼
Frontend (React) ──── Docker Container (nginx) ──── Port 3000
    │
    ▼  (API calls)
Backend (Flask)  ──── Docker Container (python) ──── Port 5000
    │
    ▼
SQLite Database  ──── Docker Volume (disaster-data)
    │
    ▼  (in cloud deployment)
AWS S3           ──── Image/Video Storage
AWS SNS          ──── Alert Notifications
AWS DynamoDB     ──── Production Database
```

---

## 🚀 Running the Demo (Local)

### Prerequisites
- Docker Desktop installed
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/smart-disaster-response.git
cd smart-disaster-response

# 2. Start everything with one command
docker-compose up --build

# 3. Open in browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/health
```

That's it. One command. ✅

---

## 🛑 Stopping

```bash
docker-compose down
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/reports` | Get all reports |
| GET | `/api/reports?status=pending` | Filter by status |
| POST | `/api/reports` | Submit new report |
| GET | `/api/reports/:id` | Get single report |
| PATCH | `/api/reports/:id/status` | Update report status |
| GET | `/api/stats` | Dashboard statistics |

---

## 🧰 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | React + Vite | User Interface |
| Backend | Python Flask | REST API |
| Database | SQLite (local) / DynamoDB (cloud) | Data Storage |
| Containerization | Docker + Docker Compose | Packaging & Deployment |
| Web Server | Nginx | Serve React + Proxy API |
| Cloud (design) | AWS S3, SNS, DynamoDB | Production Infrastructure |
| Auth (design) | JWT Tokens | Secure Login |

---


## 📁 Project Structure

```
smart-disaster-response/
├── backend/
│   ├── app.py              # Flask REST API
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main app
│   │   ├── App.css         # Styles
│   │   └── components/
│   │       ├── Dashboard.jsx   # Reports dashboard
│   │       └── ReportForm.jsx  # Disaster report form
│   ├── Dockerfile          # Frontend container (nginx)
│   ├── nginx.conf          # Nginx configuration
│   └── package.json
├── docker-compose.yml      # Orchestrates all containers
└── README.md
```
