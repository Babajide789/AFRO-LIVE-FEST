

# 🎵 AfroLive Fest

AfroLive Fest is a modern event discovery and ticketing platform focused on African music culture — helping users explore concerts, festivals, and artists across Nigeria.

---

## 🚀 Project Vision

The goal of this project is to build a **scalable, production-ready event platform** that goes beyond static UI:

- Real event data (no mock data)
- Artist & event discovery
- Ticket purchasing system
- Clean, modern UI/UX
- API-driven architecture

---

## 🧠 My Approach (Build in Public)

This project is being built with a **learn → build → refactor → scale** mindset.

Key principles:
- Start simple (mock data)
- Introduce real backend (API + Prisma)
- Refactor for scalability
- Optimize for real-world production

---

## ⚙️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Next.js API Routes
- Prisma ORM
- Neon PostgreSQL

### State Management
- React Context API (Cart system)

---

## 🏗️ Architecture Evolution

### Phase 1: Static UI
- Built UI using mock data
- Focus on layout, responsiveness, and UX

### Phase 2: API Integration ✅
- Replaced `mockData.ts` with real API
- Created `/api/artists` endpoint
- Connected Prisma to Neon database
- Seeded database with artist data

### Key Learning:
> UI ≠ Product  
> Data flow and architecture matter more than visuals.

---

## 🔥 Challenges Faced

### 1. Empty API Response
- API returned `[]`
- Root cause: Database had no seeded data
- Fix: Created and ran Prisma seed script

---

### 2. Prisma Type Errors
- `Property 'artist' does not exist on PrismaClient`
- Fix: Updated Prisma schema + ran:
  ```bash
  npx prisma generate