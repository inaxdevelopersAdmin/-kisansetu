export type Role =
  | 'FARMER'
  | 'AGRI_LAB'
  | 'TRANSPORTER'
  | 'GOVERNMENT'
  | 'AGRO_COMPANY'
  | 'SPONSOR_NGO';

export interface KhataEntry {
  id: string;
  clientSyncId?: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  description?: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'FAILED';
}

export interface DiagnosisResult {
  cropName: string;
  diseaseName: string;
  diseaseNameHindi: string;
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  treatment: string;
  treatmentHindi: string;
  preventiveCare: string;
  symptoms: string;
  timestamp?: string;
}

export interface SoilTestRecord {
  id: string;
  farmerName: string;
  farmerPhone: string;
  labName: string;
  sampleDetails: string;
  status: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED';
  date: string;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
  recommendation?: string;
}

export interface Transporter {
  id: string;
  transporterName: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  capacityTonnes: number;
  baseLocation: string;
  ratePerKm: number;
  available: boolean;
  rating: number;
}

export interface MarketRate {
  commodity: string;
  variety: string;
  mandi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: string;
}

export interface MarketItem {
  id: string;
  cropName: string;
  variety: string;
  quantityQtl: number;
  expectedRate: number;
  mandiLocation: string;
  sellerName: string;
  sellerPhone: string;
  postedDate: string;
}

export interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  ministry: string;
  benefit: string;
  benefitHindi: string;
  eligibility: string;
  portalUrl: string;
  category: string;
  featured: boolean;
}
