# Krishimitara API Specification

Base URL: `http://localhost:4000/api`

---

## 1. System Health
### `GET /health`
Returns system status, service name, and server timestamp.

---

## 2. Authentication & Roles
### `POST /auth/login`
**Payload:**
```json
{
  "phone": "+919876543210",
  "otp": "123456",
  "role": "FARMER"
}
```
**Response:**
```json
{
  "message": "Authentication successful",
  "token": "eyJhbGciOi...",
  "user": {
    "id": "demo-farmer-1",
    "name": "Ramesh Patel",
    "role": "FARMER"
  }
}
```

### `GET /auth/me`
Returns current authenticated profile. Header: `Authorization: Bearer <token>`.

### `GET /auth/roles`
Returns all 6 supported platform stakeholder roles.

---

## 3. Khata (Farm Ledger & Offline Sync)
### `GET /khata`
Returns transactions list with aggregate total income, total expense, and net balance.

### `POST /khata`
Creates an individual income or expense record.
```json
{
  "type": "EXPENSE",
  "category": "FERTILIZER",
  "amount": 1850,
  "description": "DAP & Urea purchase",
  "clientSyncId": "uuid-v4-client-generated"
}
```

### `POST /khata/sync`
Batch synchronization endpoint for offline IndexedDB queues.
```json
{
  "queue": [
    {
      "clientSyncId": "e1a9-...",
      "type": "EXPENSE",
      "category": "SEEDS",
      "amount": 2400,
      "date": "2026-04-16T08:00:00.000Z",
      "description": "Hybrid Maize seeds"
    }
  ]
}
```

---

## 4. Agri-Intelligence & Crop Diagnosis
### `POST /diagnosis/analyze`
Submits crop symptoms and image analysis request.
```json
{
  "crop": "Wheat",
  "symptoms": "Yellow powder stripes along leaf veins",
  "hasImage": true
}
```
**Response:**
```json
{
  "success": true,
  "diagnosis": {
    "cropName": "Wheat (गेहूं)",
    "diseaseName": "Yellow Rust (Puccinia striiformis)",
    "diseaseNameHindi": "पीला रतुआ",
    "confidence": 0.94,
    "severity": "HIGH",
    "treatment": "Spray Propiconazole 25% EC @ 1ml/L...",
    "treatmentHindi": "प्रोपिकोनाज़ोल का छिड़काव करें...",
    "preventiveCare": "Opt for resistant cultivars..."
  }
}
```

---

## 5. Soil Testing Lab
### `GET /soil`
Returns soil test requests and issued Soil Health Cards.

### `POST /soil`
Submits a plot sample for laboratory analysis.

### `PUT /soil/:id/status`
Lab records chemical analysis values (`nitrogen`, `phosphorus`, `potassium`, `ph`, `recommendation`).

---

## 6. Rural Transport & Dispatch
### `GET /transport/listings`
Returns available tractors, pickup trucks, and heavy haulers.

### `POST /transport/book`
Books a transporter for harvest transport from farm gate to mandi.

---

## 7. Mandi Rates & Direct Marketplace
### `GET /market/mandi-rates`
Real-time APMC wholesale price quotes and day-over-day price trends.

### `GET /market/items`
Active buy/sell crop lots posted by verified local farmers.

---

## 8. Government Schemes & Advisories
### `GET /schemes`
Searchable catalogue of central & state agriculture support programs.

### `GET /advisories`
Critical weather warnings, pest outbreak alerts, and seasonal agronomical advisories.
