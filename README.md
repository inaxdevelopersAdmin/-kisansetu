# Krishimitara / KisanSetu Platform

**Krishimitara (KisanSetu)** is an India‑wide digital agriculture ecosystem designed from the ground up to solve rural accessibility, offline connectivity, and market fragmentation for farmers.

The repository contains the end-to-end implementation including the public marketing website, authenticated Progressive Web App (PWA), backend REST API with Prisma ORM, offline-first sync engine, CI/CD pipeline, and architecture documentation.

---

## 🌟 Core Modules & Pillars

1. **Offline-First Khata Book (किसान खाता बही)**
   - Zero-latency local bookkeeping for seeds, fertilizers, farm labor, and harvest income.
   - Built with an IndexedDB / local storage sync queue with automatic conflict-free batch sync (`POST /api/khata/sync`) when connectivity resumes.
2. **AI Crop Doctor (फसल रक्षक)**
   - Instant visual and symptomatic crop disease diagnosis (Wheat Rust, Rice Blast, Cotton Bollworm, Tomato Blight).
   - Generates precise chemical spray dosage (e.g. Propiconazole 25% EC @ 1ml/L) and organic preventive measures in both English and Hindi with text-to-speech support.
3. **Soil & Water Testing Labs (मृदा परीक्षण)**
   - Digital sample booking with certified laboratories.
   - Generates Digital Soil Health Cards with N, P, K, and pH meters alongside agronomist fertilizer recommendations.
4. **Rural Logistics & Transport Fleet (परिवहन सेवा)**
   - Connects farmers directly with tractor-trolley and mini-truck transporters.
   - Live per-km fare calculator and instant trip dispatch to prevent empty return runs.
5. **Live APMC Mandi Rates & Direct Marketplace (मंडी भाव)**
   - Daily wholesale APMC market price quotes and daily price trends (+/-) across Wheat, Basmati, Soybean, Mustard, Cotton, Onion, and Potato.
   - Direct farm-to-buyer crop listing board eliminating middleman cuts.
6. **Government Schemes Navigator (सरकारी योजनाएं)**
   - Catalogue of central and state programs (PM-KISAN, Kisan Credit Card, PM-KUSUM Solar Pumps, Micro-irrigation) with eligibility rules and direct portal links.
7. **Vernacular Voice Assistant (किसानसेतु वॉयस)**
   - Hands-free voice queries in Hindi and regional languages for in-field use.

---

## 🏗️ Repository Layout

```
/kisansetu
├─ backend/                   # Express API (TypeScript, Prisma ORM, Jest tests)
│  ├─ src/
│  │  ├─ routes/              # Auth, Khata, Diagnosis, Soil, Transport, Market, Schemes
│  │  ├─ middleware/          # Auth & Role verification
│  │  ├─ data/                # Mock & fallback seed data
│  │  ├─ app.ts               # Express configuration & health check
│  │  └─ server.ts            # Entrypoint (Port 4000)
│  ├─ prisma/schema.prisma    # PostgreSQL / Supabase schema
│  └─ tests/                  # Jest test suite
│
├─ frontend/                  # React 18 + TypeScript + Vite + Tailwind CSS (PWA)
│  ├─ src/
│  │  ├─ views/               # Dashboard, Khata, Doctor, Soil, Transport, Market, Schemes
│  │  ├─ components/          # Header, VoiceAssistantModal
│  │  ├─ services/api.ts      # Offline-first API client with sync queue
│  │  └─ i18n.ts              # English and हिन्दी (Hindi) translations
│  └─ index.html
│
├─ krishimitara-website/      # Static public marketing site (HTML5, CSS3, JS)
├─ docs/                      # Technical Documentation
│  ├─ SETUP.md                # Detailed step-by-step setup guide
│  ├─ ARCHITECTURE.md         # System design & offline sync flow
│  ├─ ROLE_MATRIX.md          # 6-role stakeholder permission matrix
│  └─ API_SPEC.md             # REST endpoints documentation
├─ .github/workflows/ci.yml   # GitHub Actions CI for backend & frontend
└─ KisanSetu Pitch Deck.pptx  # Seed Stage Pitch Presentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Backend Service
```powershell
cd backend
npm.cmd install          # or npm install / pnpm install
npm.cmd run dev          # Starts Express API at http://localhost:4000
npm.cmd test             # Runs Jest tests
npm.cmd run build        # TypeScript compiler verification
```

### 2. Frontend Application
```powershell
cd ..\frontend
npm.cmd install          # or npm install / pnpm install
npm.cmd run dev          # Starts Vite dev server at http://localhost:5173
npm.cmd run build        # Production bundle build
```

### 3. Static Marketing Site
Open `krishimitara-website/index.html` in your web browser or serve with:
```powershell
npx.cmd serve krishimitara-website
```

---

## 📖 Documentation
- [Executive Project Proposal & Business Dossier](docs/EXECUTIVE_PROJECT_PROPOSAL.md)
- [Setup & Deployment Guide](docs/SETUP.md)
- [System Architecture & Offline Sync](docs/ARCHITECTURE.md)
- [Stakeholder Role Matrix](docs/ROLE_MATRIX.md)
- [API Specification](docs/API_SPEC.md)
