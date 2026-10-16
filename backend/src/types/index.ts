export type UserRole =
  | 'FARMER'
  | 'AGRI_LAB'
  | 'TRANSPORTER'
  | 'GOVERNMENT'
  | 'AGRO_COMPANY'
  | 'SPONSOR_NGO'
  | 'ADMIN';

export interface User {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  state?: string;
  district?: string;
  language: string;
}

export interface KhataTransaction {
  id: string;
  userId: string;
  clientSyncId?: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  description?: string;
  syncStatus: 'SYNCED' | 'PENDING' | 'FAILED';
}

export interface DiseaseDiagnosis {
  id: string;
  cropName: string;
  diseaseName: string;
  diseaseNameHindi: string;
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  treatment: string;
  treatmentHindi: string;
  preventiveCare: string;
  symptoms: string;
}

export interface SoilTest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  labId?: string;
  labName?: string;
  sampleDetails: string;
  status: 'SUBMITTED' | 'IN_PROGRESS' | 'COMPLETED';
  date: string;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
  ph?: number;
  recommendation?: string;
}

export interface TransportListing {
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

export interface GovScheme {
  id: string;
  name: string;
  nameHindi: string;
  ministry: string;
  benefit: string;
  benefitHindi: string;
  eligibility: string;
  portalUrl: string;
  category: 'SUBSIDY' | 'LOAN' | 'INSURANCE' | 'IRRIGATION' | 'SOLAR';
  featured: boolean;
}
