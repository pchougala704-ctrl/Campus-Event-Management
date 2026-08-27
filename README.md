# Campus Event Management System

A beginner-to-intermediate MERN Stack project for BCA freshers. Students can discover and register for campus events; admins can manage events and inspect participation statistics.

## Stack

React + Vite + Bootstrap, Express, MongoDB + Mongoose, JWT, and REST APIs.

## Project structure

```text
client/                 React single-page frontend
server/src/config       Database connection
server/src/controllers  Request/business logic
server/src/middleware   JWT roles and error handling
server/src/models       User, Event, Registration schemas
server/src/routes       REST route definitions
server/src/seed         Demo data and admin account
```

## Run locally

Prerequisites: Node.js 18+, MongoDB running locally or a MongoDB Atlas URI.

```bash
cd server
copy .env.example .env
npm install
npm run seed
npm run dev
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. The seed admin is `admin@campus.test` with password `admin123`. Change this demo password before deploying.

## API overview

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create a student |
| POST | `/api/auth/login` | Public | Return a JWT |
| GET | `/api/events?search=&category=` | Public | Search and filter events |
| GET | `/api/events/:id` | Public | Event details |
| POST/PUT/DELETE | `/api/events` or `/api/events/:id` | Admin | Event CRUD |
| POST | `/api/registrations/:eventId` | Student | Register for an event |
| GET/DELETE | `/api/registrations/mine`, `/api/registrations/:id` | Student | View/cancel registrations |
| GET | `/api/registrations/event/:eventId` | Admin | View registered students |
| GET | `/api/events/stats` | Admin | Aggregated event statistics |

Protected requests use `Authorization: Bearer <token>`. Mongoose references connect registrations to users and events; a compound unique index prevents duplicate registrations.

## Learning path

Start with `server/src/server.js`, then follow a route into its controller and model. On the frontend, `client/src/App.jsx` provides the student experience and `client/src/Dashboard.jsx` provides the admin experience. Students can authenticate, register for events, view their schedule, and cancel registrations. Admins can authenticate, create, edit, delete, and inspect events and attendees. The JWT token is stored in local storage for this learning project; a larger production app could move this into an auth context and use secure cookies.