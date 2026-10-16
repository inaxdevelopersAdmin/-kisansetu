export type Role =
  | 'FARMER'
  | 'AGRI_LAB'
  | 'TRANSPORTER'
  | 'GOVERNMENT'
  | 'AGRO_COMPANY'
  | 'SPONSOR_NGO'
  | 'KHATER_PRODUCER';

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
  ec?: number;
  organicCarbon?: number;
  zinc?: number;
  boron?: number;
  recommendation?: string;
  reportType?: 'SOIL_HEALTH' | 'WATER_SALINITY' | 'FERTILIZER_PURITY';
  waterTds?: number;
  waterSar?: number;
  fertilizerPurity?: number;
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
  petrolPumpCredit?: boolean;
  monthlyFuelBill?: number;
  contractPumpName?: string;
}

export interface FuelContractBilling {
  id: string;
  pumpName: string;
  pumpLocation: string;
  transporterName: string;
  vehicleNumber: string;
  billingCycle: 'MONTHLY' | 'YEARLY';
  totalLiters: number;
  totalBilledAmount: number;
  discountPerLiter: number;
  status: 'CURRENT_CYCLE' | 'BILLED' | 'SETTLED';
  dueDate: string;
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

export interface CorporateRequirement {
  id: string;
  companyName: string;
  cropName: string;
  variety: string;
  requiredQuantityQtl: number;
  offeredRatePerQtl: number;
  deliveryMandi: string;
  qualitySpecs: string;
  qualityGuaranteeByKisanSetu: boolean;
  escrowProtected: boolean;
  postedDate: string;
  status: 'OPEN' | 'IN_PROCUREMENT' | 'FULFILLED';
}

export interface WaterShareRecord {
  id: string;
  providerFarmer: string;
  location: string;
  waterSource: 'BOREWELL_TUBEWELL' | 'SOLAR_LIFT' | 'CANAL_SIPHON' | 'SUBSIDIZED_TANKER';
  hourlyRate: number;
  availableHoursDaily: number;
  contactPhone: string;
  distanceKm: number;
  status: 'AVAILABLE' | 'IN_USE';
}

export interface KhaterListing {
  id: string;
  producerFarmer: string;
  location: string;
  khaterType: 'VERMICOMPOST' | 'DESI_GOHARI' | 'JEEVAMRUT' | 'NEEM_BIO_MANURE';
  pricePerBag: number;
  marketStorePrice: number;
  availableBags: number;
  organicCertificateNo?: string;
  contactPhone: string;
  rating: number;
}

export interface FoundationFundingRecord {
  id: string;
  foundationName: string;
  donorCategory: 'CORPORATE_CSR' | 'PHILANTHROPIC_FOUNDATION' | 'GOVT_DIRECT_GRANT';
  grantAmount: number;
  allocatedProgram: 'FREE_SOIL_CARDS' | 'SOLAR_WATER_PUMPS' | 'DRIP_IRRIGATION_SUBSIDY' | 'ORGANIC_TRAINING';
  targetBeneficiaries: number;
  villageCoverage: string;
  allocationDate: string;
  auditVerified: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  nameHindi: string;
  nameGujarati?: string;
  ministry: string;
  benefit: string;
  benefitHindi: string;
  benefitGujarati?: string;
  eligibility: string;
  portalUrl: string;
  category: string;
  featured: boolean;
  targetAcreCategory?: 'ALL' | 'MARGINAL_LESS_2_ACRES' | 'SMALL_2_TO_5_ACRES' | 'LARGE_ABOVE_5_ACRES';
  districtFocus?: string;
  requiredDocuments?: string[];
}
