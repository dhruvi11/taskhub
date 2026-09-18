# TaskHub - Complete Project Documentation

Version: 1.0  
Milestone: M34 - Documentation

---

# 1. Project Overview

TaskHub is a full-stack task management application designed to manage users, projects, project members, tasks, task assignments, notifications, authentication, dashboards, and administrative operations.

The project contains:

- Web application
- Mobile application
- Backend REST API
- PostgreSQL database
- Authentication system
- Google OAuth
- Firebase services
- AWS services
- Sentry monitoring
- Automated testing
- Docker
- GitHub Actions
- Production deployment

---

# 2. Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Passport
- Google OAuth
- Firebase Admin
- Firebase Cloud Messaging
- AWS SES
- AWS CloudWatch
- Sentry
- Jest
- Supertest
- Swagger
- Helmet
- CORS
- Express Rate Limit

## Web

- Next.js
- React
- TypeScript
- Tailwind CSS
- Material UI
- Redux Toolkit
- RTK Query

## Mobile

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

## DevOps

- Docker
- GitHub Actions
- Render
- Vercel
- PostgreSQL

---

# 3. Project Structure

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
│   └── TASKHUB_DOCUMENTATION.md
│
├── package.json
└── README.md