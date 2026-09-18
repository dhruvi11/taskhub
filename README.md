cat > README.md <<'EOF'
# TaskHub

TaskHub is a full-stack task management application built with a modern web, mobile, and backend architecture.

It provides authentication, Google OAuth, project management, project members and roles, task management, notifications, cloud services, monitoring, testing, and deployment support.

## Features

- User registration and login
- JWT authentication
- Refresh token authentication
- Google OAuth
- User profile management
- Project management
- Project members and role-based permissions
- Task management
- Task assignment
- Task completion
- Push notifications
- Firebase Cloud Messaging
- Firebase Analytics
- Firebase Crashlytics
- AWS SES email integration
- AWS CloudWatch monitoring
- Sentry error monitoring
- PostgreSQL database
- Prisma ORM
- REST APIs
- API validation and security middleware
- Rate limiting
- Helmet security
- CORS protection
- Automated backend tests
- ESLint and Prettier
- GitHub Actions
- Docker
- Production deployment
- Next.js web application
- React Native mobile application

---

## Technology Stack

### Backend

- Node.js
- Express.js
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Passport
- Google OAuth
- Firebase Admin
- AWS SES
- AWS CloudWatch
- Sentry
- Jest
- Supertest
- Swagger

### Web

- Next.js
- React
- TypeScript
- Tailwind CSS
- Material UI
- Redux Toolkit
- RTK Query

### Mobile

- React Native
- Expo
- Expo Router
- TypeScript
- Redux Toolkit
- React Native Firebase
- Firebase Cloud Messaging
- Firebase Analytics
- Firebase Crashlytics
- Sentry

### DevOps

- Docker
- GitHub Actions
- Render
- Vercel
- PostgreSQL

---

# Project Structure

```text
taskhub/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── mobile/
│       ├── app/
│       ├── src/
│       └── package.json
│
├── docs/
├── package.json
└── README.md

cat > README.md <<'EOF'
# TaskHub

> A production-oriented full-stack task management platform built with React, React Native, Next.js, Express, TypeScript, Prisma, and PostgreSQL.

TaskHub demonstrates the complete software development lifecycle — from local development and database design to authentication, authorization, testing, CI/CD, Docker, cloud services, monitoring, and production deployment.

---

## 🚀 Live Project

### Web Application

Production frontend:

https://taskhub-f0igrxx9-dhruvi11s-projects.vercel.app

### Backend API

Production backend:

https://taskhub-zp9p.onrender.com

### Health Check

https://taskhub-zp9p.onrender.com/api/v1/health

---

# 📌 Project Overview

TaskHub is a full-stack project and task management platform.

Users can:

- Register and log in
- Authenticate using Google
- Manage their profile
- Create projects
- Manage project members
- Assign project roles
- Create tasks
- Assign tasks
- Update task status
- Set task priorities
- Complete tasks
- Receive notifications
- View dashboard information

The platform also includes administrative functionality, monitoring, automated testing, CI/CD, Docker support, and cloud integrations.

---

# 🎯 Why I Built TaskHub

I built TaskHub to demonstrate more than frontend development.

The project covers the complete engineering lifecycle:

```text
Requirements
     ↓
Architecture
     ↓
Database Design
     ↓
Backend APIs
     ↓
Authentication
     ↓
Authorization
     ↓
Web Application
     ↓
Mobile Application
     ↓
Cloud Services
     ↓
Testing
     ↓
CI/CD
     ↓
Docker
     ↓
Deployment
     ↓
Monitoring
     ↓
Documentation