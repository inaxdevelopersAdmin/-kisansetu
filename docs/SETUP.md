# Krishimitara Platform — Setup & Quickstart Guide

This guide walks you through setting up and running Krishimitara on your local machine (Windows / Linux / macOS) as well as connecting to Supabase (PostgreSQL) and Cloudflare Pages / Railway.

---

## Prerequisites
- **Node.js**: v18+ or v20+ (`node -v`)
- **Package Manager**: `npm` (v10+), `pnpm`, or `yarn`
- **Git**

> **Windows Note**: If PowerShell reports an ExecutionPolicy restriction with `npm`, invoke `npm.cmd` and `npx.cmd`.

---

## 1. Backend Setup (Express + TypeScript + Prisma)

### Step 1: Navigate to backend folder
```powershell
cd C:\Users\PARESH\Downloads\kisansetu\backend
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```powershell
cp .env.example .env
```

Key environment variables:
```env
PORT=4000
NODE_ENV=development
JWT_SECRET=krishimitara_super_secret_jwt_key_2026
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Step 3: Install Dependencies
```powershell
npm.cmd install
```

### Step 4: Database Setup (Prisma & Supabase)
1. Sign up for free at [supabase.com](https://supabase.com).
2. Create a new project called `krishimitara`.
3. In Project Settings → Database, copy the **Connection string (URI)** and paste it into `DATABASE_URL` in `.env`.
4. Run migrations:
```powershell
npx.cmd prisma generate
npx.cmd prisma db push
```

### Step 5: Start the Development Server
```powershell
npm.cmd run dev
```
The API is live at **http://localhost:4000**.
Verify via: `http://localhost:4000/api/health`

---

## 2. Frontend Setup (React + Vite + Tailwind CSS + PWA)

### Step 1: Navigate to frontend folder
```powershell
cd C:\Users\PARESH\Downloads\kisansetu\frontend
```

### Step 2: Configure Environment Variables
```powershell
cp .env.example .env
```
Default:
```env
VITE_API_URL=http://localhost:4000/api
```

### Step 3: Install Dependencies
```powershell
npm.cmd install
```

### Step 4: Run Vite Development Server
```powershell
npm.cmd run dev
```
Open your browser to: **http://localhost:5173**

---

## 3. Static Marketing Website

To preview the landing site:
1. Open `C:\Users\PARESH\Downloads\kisansetu\krishimitara-website\index.html` directly in any web browser, or:
2. Serve via simple static server:
```powershell
npx.cmd serve krishimitara-website
```

---

## 4. Running Tests & Quality Checks
```powershell
# Backend Tests
cd backend
npm.cmd test
npm.cmd run lint

# Frontend Build Validation
cd ../frontend
npm.cmd run build
```
