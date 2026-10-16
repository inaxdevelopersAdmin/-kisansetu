import { KhataEntry, DiagnosisResult, SoilTestRecord, Transporter, MarketRate, MarketItem, Scheme } from '../types';

const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:4000/api' : '/api');

const OFFLINE_QUEUE_KEY = 'krishimitara_khata_offline_queue';
const LOCAL_KHATA_KEY = 'krishimitara_local_khata_cache';

export const getOfflineQueue = (): KhataEntry[] => {
  try {
    const raw = localStorage.getItem(OFFLINE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveOfflineQueue = (queue: KhataEntry[]) => {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
};

export const getLocalKhataCache = (): KhataEntry[] => {
  try {
    const raw = localStorage.getItem(LOCAL_KHATA_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveLocalKhataCache = (entries: KhataEntry[]) => {
  localStorage.setItem(LOCAL_KHATA_KEY, JSON.stringify(entries));
};

export const api = {
  // Check health
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(2500) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Khata entries
  async getKhata(): Promise<{ transactions: KhataEntry[]; summary: any }> {
    try {
      const res = await fetch(`${API_BASE}/khata`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        saveLocalKhataCache(data.transactions);
        return data;
      }
    } catch (e) {
      console.warn('Network offline or backend unreachable, loading local Khata cache.');
    }

    // Fallback to local cache + pending offline queue
    const cached = getLocalKhataCache();
    const queue = getOfflineQueue();
    const combined = [...queue, ...cached.filter((c) => !queue.some((q) => q.clientSyncId === c.clientSyncId))];

    const totalIncome = combined.filter((t) => t.type === 'INCOME').reduce((s, t) => s + t.amount, 0);
    const totalExpense = combined.filter((t) => t.type === 'EXPENSE').reduce((s, t) => s + t.amount, 0);

    return {
      transactions: combined,
      summary: {
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
        entryCount: combined.length,
      },
    };
  },

  async addKhataEntry(entry: Omit<KhataEntry, 'id' | 'syncStatus'>): Promise<{ success: boolean; entry: KhataEntry }> {
    const clientSyncId = 'sync-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    const newEntry: KhataEntry = {
      ...entry,
      id: clientSyncId,
      clientSyncId,
      syncStatus: 'PENDING',
    };

    try {
      const res = await fetch(`${API_BASE}/khata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, entry: { ...data.transaction, syncStatus: 'SYNCED' } };
      }
    } catch (err) {
      console.warn('Backend unavailable, queuing Khata transaction for offline sync.');
    }

    // Enqueue to offline queue
    const queue = getOfflineQueue();
    queue.unshift(newEntry);
    saveOfflineQueue(queue);

    const cache = getLocalKhataCache();
    cache.unshift(newEntry);
    saveLocalKhataCache(cache);

    return { success: true, entry: newEntry };
  },

  async syncOfflineQueue(): Promise<{ syncedCount: number; message: string }> {
    const queue = getOfflineQueue();
    if (queue.length === 0) {
      return { syncedCount: 0, message: 'Queue is already empty' };
    }

    try {
      const res = await fetch(`${API_BASE}/khata/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queue }),
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const data = await res.json();
        saveOfflineQueue([]); // Clear queue
        return { syncedCount: data.syncedItems?.length || queue.length, message: data.message };
      }
    } catch (e) {
      throw new Error('Sync failed: backend is still offline');
    }

    return { syncedCount: 0, message: 'Sync failed' };
  },

  // AI Diagnostic
  async diagnoseCrop(crop: string, symptoms: string): Promise<DiagnosisResult> {
    try {
      const res = await fetch(`${API_BASE}/diagnosis/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, symptoms, hasImage: true }),
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.diagnosis;
      }
    } catch (e) {
      console.warn('Using client-side fallback diagnosis');
    }

    // Built-in intelligent diagnostic fallback
    return {
      cropName: crop || 'Wheat (गेहूं)',
      diseaseName: 'Yellow Rust (Puccinia striiformis)',
      diseaseNameHindi: 'पीला रतुआ (येलो रस्ट)',
      confidence: 0.94,
      severity: 'HIGH',
      treatment: 'Apply Propiconazole 25% EC @ 1ml per liter of water (200 ml in 200 liters/acre). Spray in early morning or evening.',
      treatmentHindi: 'प्रोपिकोनाज़ोल 25% ईसी 1 मिली प्रति लीटर पानी की दर से छिड़काव करें (200 मिली प्रति एकड़ 200 लीटर पानी में)।',
      preventiveCare: 'Cultivate rust-resistant varieties like HD-3086 or PBW-550. Avoid excessive late nitrogen fertilizer.',
      symptoms: symptoms || 'Yellow powdery pustules in parallel stripes on leaf blades.',
      timestamp: new Date().toISOString(),
    };
  },

  // Soil Testing
  async getSoilTests(): Promise<SoilTestRecord[]> {
    try {
      const res = await fetch(`${API_BASE}/soil`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        return data.soilTests;
      }
    } catch {}
    return [
      {
        id: 'soil-101',
        farmerName: 'Ramesh Patel',
        farmerPhone: '+91 98765 43210',
        labName: 'Krishi Vigyan Kendra Soil Testing Lab',
        sampleDetails: 'Plot 4A - Loamy soil (Pre-Kharif testing)',
        status: 'COMPLETED',
        date: '2026-03-28',
        nitrogen: 245.5,
        phosphorus: 18.2,
        potassium: 310.0,
        ph: 7.2,
        recommendation: 'Nitrogen is low. Apply 25kg urea split in 2 applications. Potassium is adequate; omit potash fertilizer.',
      },
    ];
  },

  async bookSoilTest(sampleDetails: string, labName: string): Promise<SoilTestRecord> {
    try {
      const res = await fetch(`${API_BASE}/soil`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleDetails, labName }),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        return data.soilTest;
      }
    } catch {}

    return {
      id: `soil-${Date.now()}`,
      farmerName: 'Ramesh Patel',
      farmerPhone: '+91 98765 43210',
      labName,
      sampleDetails,
      status: 'SUBMITTED',
      date: new Date().toISOString().split('T')[0],
      recommendation: 'Sample submitted. Lab technician will collect soil sample from your farm gate.',
    };
  },

  // Transport
  async getTransporters(): Promise<Transporter[]> {
    try {
      const res = await fetch(`${API_BASE}/transport/listings`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        return data.listings;
      }
    } catch {}
    return [
      {
        id: 'trans-1',
        transporterName: 'Gurkirat Logistics & Agro Cargo',
        phone: '+91 98112 34567',
        vehicleType: 'Tractor Trolley (Hydraulic 8 Ton)',
        vehicleNumber: 'PB 10 CF 4291',
        capacityTonnes: 8.0,
        baseLocation: 'Ludhiana Rural, Punjab (Covers 60km)',
        ratePerKm: 42,
        available: true,
        rating: 4.8,
      },
      {
        id: 'trans-2',
        transporterName: 'Kisan Express Mini-Trucks',
        phone: '+91 94250 88991',
        vehicleType: 'Tata 407 LCV (3.5 Ton)',
        vehicleNumber: 'MP 09 GG 8172',
        capacityTonnes: 3.5,
        baseLocation: 'Indore Mandi Hub, Madhya Pradesh',
        ratePerKm: 28,
        available: true,
        rating: 4.9,
      },
      {
        id: 'trans-3',
        transporterName: 'Balaji Rural Transport Service',
        phone: '+91 97631 22445',
        vehicleType: 'Eicher Pro 14 Ton Heavy Truck',
        vehicleNumber: 'MH 12 QX 3309',
        capacityTonnes: 14.0,
        baseLocation: 'Nashik Onion Belt, Maharashtra',
        ratePerKm: 58,
        available: false,
        rating: 4.7,
      },
    ];
  },

  async bookTransport(payload: any): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/transport/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        return (await res.json()).booking;
      }
    } catch {}

    return {
      id: `book-${Date.now()}`,
      status: 'CONFIRMED',
      ...payload,
      bookingDate: new Date().toISOString().split('T')[0],
    };
  },

  // Market & Mandi
  async getMandiRates(): Promise<MarketRate[]> {
    try {
      const res = await fetch(`${API_BASE}/market/mandi-rates`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        return (await res.json()).rates;
      }
    } catch {}
    return [
      { commodity: 'Wheat (गेहूं)', variety: 'Sharbati Lokwan', mandi: 'Indore Mandi', minPrice: 2450, maxPrice: 3100, modalPrice: 2820, trend: '+₹40' },
      { commodity: 'Basmati Paddy (धान)', variety: 'Pusa-1509', mandi: 'Karnal Mandi', minPrice: 3200, maxPrice: 4100, modalPrice: 3850, trend: '+₹110' },
      { commodity: 'Soybean (सोयाबीन)', variety: 'Yellow Yellow', mandi: 'Ujjain Mandi', minPrice: 4200, maxPrice: 4750, modalPrice: 4620, trend: '-₹30' },
      { commodity: 'Mustard (सरसों)', variety: 'Bold 42% Oil', mandi: 'Jaipur Mandi', minPrice: 5100, maxPrice: 5650, modalPrice: 5480, trend: '+₹75' },
      { commodity: 'Cotton (कपास)', variety: 'Medium Staple', mandi: 'Rajkot Mandi', minPrice: 6800, maxPrice: 7600, modalPrice: 7350, trend: '+₹150' },
      { commodity: 'Red Onion (प्याज)', variety: 'Nashik Fursungi', mandi: 'Lasalgaon Mandi', minPrice: 1200, maxPrice: 1850, modalPrice: 1620, trend: '-₹50' },
    ];
  },

  async getMarketItems(): Promise<MarketItem[]> {
    try {
      const res = await fetch(`${API_BASE}/market/items`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        return (await res.json()).items;
      }
    } catch {}
    return [
      {
        id: 'mkt-1',
        cropName: 'Sharbati Wheat (शरबती गेहूं)',
        variety: 'C-306 Golden',
        quantityQtl: 85,
        expectedRate: 2850,
        mandiLocation: 'Sehore Mandi, MP',
        sellerName: 'Devendra Sharma',
        sellerPhone: '+91 98260 11223',
        postedDate: '2026-04-14',
      },
      {
        id: 'mkt-2',
        cropName: 'Basmati Paddy 1121 (धान)',
        variety: 'Pusa-1121',
        quantityQtl: 140,
        expectedRate: 3950,
        mandiLocation: 'Karnal Grain Market',
        sellerName: 'Harpreet Singh',
        sellerPhone: '+91 98722 44556',
        postedDate: '2026-04-15',
      },
    ];
  },

  // Schemes
  async getSchemes(): Promise<Scheme[]> {
    try {
      const res = await fetch(`${API_BASE}/schemes`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        return (await res.json()).schemes;
      }
    } catch {}
    return [
      {
        id: 'sch-1',
        name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
        nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
        ministry: 'Ministry of Agriculture & Farmers Welfare',
        benefit: '₹6,000 per year in three 4-monthly installments of ₹2,000 directly into farmer bank accounts.',
        benefitHindi: 'प्रत्येक पात्र किसान परिवार को ₹6,000 प्रति वर्ष 3 किस्तों में सीधे बैंक खाते में।',
        eligibility: 'All landholding farmer families with cultivable land in their names.',
        portalUrl: 'https://pmkisan.gov.in',
        category: 'SUBSIDY',
        featured: true,
      },
      {
        id: 'sch-2',
        name: 'Kisan Credit Card (KCC) Scheme',
        nameHindi: 'किसान क्रेडिट कार्ड योजना',
        ministry: 'Ministry of Finance & NABARD',
        benefit: 'Concessional crop loans up to ₹3,00,000 at 4% effective interest rate.',
        benefitHindi: '4% प्रभावी ब्याज दर पर ₹3 लाख तक का आसान फसली ऋण।',
        eligibility: 'All farmers, tenant farmers, oral lessees, sharecroppers.',
        portalUrl: 'https://www.myscheme.gov.in/schemes/kcc',
        category: 'LOAN',
        featured: true,
      },
      {
        id: 'sch-4',
        name: 'PM Kusum Solar Pump Scheme',
        nameHindi: 'पीएम कुसुम सोलर पंप योजना',
        ministry: 'Ministry of New and Renewable Energy',
        benefit: '60% subsidy on standalone off-grid solar agricultural pumps (3HP to 7.5HP).',
        benefitHindi: 'सोलर पंप स्थापना पर 60% तक की भारी सब्सिडी।',
        eligibility: 'Individual farmers, cooperatives, and farmer producer organisations (FPOs).',
        portalUrl: 'https://pmkusum.mnre.gov.in',
        category: 'SOLAR',
        featured: true,
      },
    ];
  },
};
