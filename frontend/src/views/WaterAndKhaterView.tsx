import React, { useState } from 'react';
import {
  Droplets,
  Sprout,
  HeartHandshake,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Users,
  Award,
  Filter,
  DollarSign,
} from 'lucide-react';
import { Language } from '../i18n';
import { WaterShareRecord, KhaterListing, FoundationFundingRecord } from '../types';

interface WaterAndKhaterViewProps {
  lang: Language;
}

export const WaterAndKhaterView: React.FC<WaterAndKhaterViewProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'WATER' | 'KHATER' | 'FOUNDATION'>('WATER');
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showKhaterModal, setShowKhaterModal] = useState(false);
  const [waterSuccess, setWaterSuccess] = useState(false);
  const [khaterSuccess, setKhaterSuccess] = useState(false);

  // Water Sharing Mock Data
  const [waterListings, setWaterListings] = useState<WaterShareRecord[]>([
    {
      id: 'wat-1',
      providerFarmer: 'કાળુભાઈ ભરવાડ (બોરવેલ માલિક)',
      location: 'ગામ: વડનગર ક્લસ્ટર (પ્લોટ #૪)',
      waterSource: 'BOREWELL_TUBEWELL',
      hourlyRate: 140,
      availableHoursDaily: 6,
      contactPhone: '+91 98251 77120',
      distanceKm: 1.2,
      status: 'AVAILABLE',
    },
    {
      id: 'wat-2',
      providerFarmer: 'પીતાંબર પટેલ (સોલાર લિફ્ટ ઇરિગેશન)',
      location: 'ગામ: દેવગઢ સિંચાઈ મંડળી',
      waterSource: 'SOLAR_LIFT',
      hourlyRate: 110,
      availableHoursDaily: 8,
      contactPhone: '+91 97240 88319',
      distanceKm: 2.5,
      status: 'AVAILABLE',
    },
    {
      id: 'wat-3',
      providerFarmer: 'કિસાનસેતુ સબસિડી ટેન્કર સર્વિસ',
      location: 'તાલુકા મથક (ઇમરજન્સી પાણી સપ્લાય)',
      waterSource: 'SUBSIDIZED_TANKER',
      hourlyRate: 350,
      availableHoursDaily: 12,
      contactPhone: '+91 94280 55412',
      distanceKm: 4.8,
      status: 'AVAILABLE',
    },
  ]);

  // Khater (Organic Fertilizer) Mock Data
  const [khaterListings, setKhaterListings] = useState<KhaterListing[]>([
    {
      id: 'kht-1',
      producerFarmer: 'હરગોવિંદભાઈ (પ્રગતિશીલ વર્મીકમ્પોસ્ટ યુનિટ)',
      location: 'ગામ: સાંપા, જિ. ગાંધીનગર',
      khaterType: 'VERMICOMPOST',
      pricePerBag: 260,
      marketStorePrice: 580,
      availableBags: 180,
      organicCertificateNo: 'ORG-GUJ-2026-881',
      contactPhone: '+91 98980 12345',
      rating: 4.9,
    },
    {
      id: 'kht-2',
      producerFarmer: 'મહેશભાઈ ગોપાલક (દેશી ગૌશાળા છાણીયું ખાતર)',
      location: 'ગામ: માણસા, પાંજરાપોળ પાસે',
      khaterType: 'DESI_GOHARI',
      pricePerBag: 190,
      marketStorePrice: 450,
      availableBags: 320,
      organicCertificateNo: 'GAU-DESI-992',
      contactPhone: '+91 99044 56789',
      rating: 4.8,
    },
    {
      id: 'kht-3',
      producerFarmer: 'શ્રી લક્ષ્મી જૈવિક કૃષિ ફાર્મ',
      location: 'ગામ: કલોલ રૂરલ બેલ્ટ',
      khaterType: 'JEEVAMRUT',
      pricePerBag: 220,
      marketStorePrice: 500,
      availableBags: 95,
      organicCertificateNo: 'BIO-AGRI-104',
      contactPhone: '+91 94260 77889',
      rating: 5.0,
    },
  ]);

  // Foundation & Donor Transparency Records
  const foundationRecords: FoundationFundingRecord[] = [
    {
      id: 'fnd-1',
      foundationName: 'Tata Community & Rural Trusts (ટાટા ટ્રસ્ટ્સ)',
      donorCategory: 'CORPORATE_CSR',
      grantAmount: 2500000,
      allocatedProgram: 'SOLAR_WATER_PUMPS',
      targetBeneficiaries: 85,
      villageCoverage: 'બનાસકાંઠા અને સાબરકાંઠાના ૧૪ ગામો',
      allocationDate: '12 ઑક્ટોબર 2026',
      auditVerified: true,
    },
    {
      id: 'fnd-2',
      foundationName: 'Reliance Foundation Bharat India Jodo (રિલાયન્સ ફાઉન્ડેશન)',
      donorCategory: 'PHILANTHROPIC_FOUNDATION',
      grantAmount: 3800000,
      allocatedProgram: 'FREE_SOIL_CARDS',
      targetBeneficiaries: 1250,
      villageCoverage: 'સૌરાષ્ટ્ર ક્લસ્ટર (અમરેલી, રાજકોટ)',
      allocationDate: '04 ઑક્ટોબર 2026',
      auditVerified: true,
    },
    {
      id: 'fnd-3',
      foundationName: 'NABARD Rural Infrastructure Development Fund (નાબાર્ડ ગ્રાન્ટ)',
      donorCategory: 'GOVT_DIRECT_GRANT',
      grantAmount: 5000000,
      allocatedProgram: 'DRIP_IRRIGATION_SUBSIDY',
      targetBeneficiaries: 340,
      villageCoverage: 'મધ્ય ગુજરાત કપાસ અને તમાકુ પટ્ટો',
      allocationDate: '28 સપ્ટેમ્બર 2026',
      auditVerified: true,
    },
  ];

  // Forms
  const [waterReqHours, setWaterReqHours] = useState('4');
  const [waterLocation, setWaterLocation] = useState('ખેતર પ્લોટ #૨ (ઉત્તર સીમ)');
  const [khaterProducerName, setKhaterProducerName] = useState('');
  const [khaterTypeInput, setKhaterTypeInput] = useState<'VERMICOMPOST' | 'DESI_GOHARI' | 'JEEVAMRUT'>('VERMICOMPOST');
  const [khaterBags, setKhaterBags] = useState('');
  const [khaterPrice, setKhaterPrice] = useState('250');

  const handleWaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWaterSuccess(true);
    setTimeout(() => {
      setWaterSuccess(false);
      setShowWaterModal(false);
    }, 1800);
  };

  const handleKhaterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!khaterProducerName || !khaterBags) return;
    const newListing: KhaterListing = {
      id: `kht-${Date.now()}`,
      producerFarmer: khaterProducerName,
      location: 'સ્થાનિક ક્લસ્ટર',
      khaterType: khaterTypeInput,
      pricePerBag: Number(khaterPrice),
      marketStorePrice: Number(khaterPrice) * 2,
      availableBags: Number(khaterBags),
      contactPhone: '+91 98980 99000',
      rating: 5.0,
    };
    setKhaterListings([newListing, ...khaterListings]);
    setKhaterSuccess(true);
    setTimeout(() => {
      setKhaterSuccess(false);
      setShowKhaterModal(false);
      setKhaterProducerName('');
      setKhaterBags('');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {lang === 'gu'
              ? 'પાણી સહાય, સસ્તું ખાતર અને ફાઉન્ડેશન ફંડિંગ'
              : lang === 'hi'
              ? 'जल साझेदारी, सस्ता खाद व फाउंडेशन फंड'
              : 'Water Sharing, Affordable Khater & Foundation Funds'}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'gu'
              ? 'ઓછા ખર્ચે પાણી મેળવો, સ્થાનિક ઉત્પાદક પાસેથી ૫૦% સસ્તું ખાતર ખરીદો અને CSR ફંડ ટ્રેકિંગ.'
              : 'Affordable peer water sharing, grassroots organic khater marketplace, and transparent donor telemetry.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveTab('WATER')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'WATER'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? '૧. પાણી સહાય' : '1. Water Sharing'}</span>
          </button>
          <button
            onClick={() => setActiveTab('KHATER')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'KHATER'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? '૨. સસ્તું ખાતર' : '2. Khater Market'}</span>
          </button>
          <button
            onClick={() => setActiveTab('FOUNDATION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'FOUNDATION'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{lang === 'gu' ? '૩. CSR ફાઉન્ડેશન' : '3. Donors / CSR'}</span>
          </button>
        </div>
      </div>

      {/* TAB 1: WATER SHARING */}
      {activeTab === 'WATER' && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/20 border border-white/30 tracking-wider">
                Affordable Irrigation Guarantee
              </span>
              <h2 className="text-lg font-display font-extrabold">
                {lang === 'gu'
                  ? 'બોરવેલ વગરના ખેડૂતો માટે કલાકદીઠ પાણી સુવિધા'
                  : 'Hourly Water-Sharing for Water-Deficit Farms'}
              </h2>
              <p className="text-xs text-sky-100 max-w-xl">
                {lang === 'gu'
                  ? 'મોંઘા બોરવેલ કે ટેન્કરનો ખર્ચ પરવડે તેમ ન હોય તો નજીકના ખેડૂતો પાસેથી કલાકદીઠ ₹૧૧૦-₹૧૪૦ ના વાજબી દરે સિંચાઈ મેળવો.'
                  : 'Connect with nearby farmers possessing surplus tubewell/solar lift capacity at regulated low hourly rates.'}
              </p>
            </div>
            <button
              onClick={() => setShowWaterModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-white text-sky-800 font-extrabold text-xs hover:bg-sky-50 shadow-sm transition whitespace-nowrap"
            >
              + {lang === 'gu' ? 'પાણીની જરૂરિયાત નોંધાવો' : 'Request Water Supply'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {waterListings.map((wat) => (
              <div
                key={wat.id}
                className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm hover:border-sky-300 transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      {wat.waterSource === 'SOLAR_LIFT' ? 'સૌર સિંચાઈ પંપ' : wat.waterSource === 'SUBSIDIZED_TANKER' ? 'સરકારી ટેન્કર' : 'ટ્યુબવેલ શેરિંગ'}
                    </span>
                    <span className="text-sm font-extrabold text-sky-700">
                      ₹{wat.hourlyRate} / કલાક
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 mt-2">
                    {wat.providerFarmer}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{wat.location}</span>
                  </div>
                  <div className="mt-3 p-3 bg-sky-50/50 rounded-2xl border border-sky-100/60 text-xs text-stone-700 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-500">ઉપલબ્ધ સમય:</span>
                      <strong className="text-stone-800">રોજના {wat.availableHoursDaily} કલાક</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ખેતરથી અંતર:</span>
                      <strong className="text-sky-700">{wat.distanceKm} કિમી</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-600 font-medium">{wat.contactPhone}</span>
                  <button
                    onClick={() => alert(`પાણી સપ્લાય કન્ફર્મ કરાયું! સંપર્ક: ${wat.contactPhone}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition"
                  >
                    બુક કરો 💧
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AFFORDABLE KHATER & PRODUCER ROLE */}
      {activeTab === 'KHATER' && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/20 border border-white/30 tracking-wider">
                Direct Grassroots Fertilizer Network
              </span>
              <h2 className="text-lg font-display font-extrabold">
                {lang === 'gu'
                  ? 'રાસાયણિક ખાતરના ઊંચા ભાવથી મુક્તિ · દેશી-ઓર્ગેનિક ખાતર'
                  : 'Grassroots Organic Khater & Producer Exchange'}
              </h2>
              <p className="text-xs text-emerald-100 max-w-xl">
                {lang === 'gu'
                  ? 'બજારમાં DAP અને યુરિયાના ઊંચા ભાવ કે અછત સમયે ગામડાના પ્રગતિશીલ વર્મીકમ્પોસ્ટ અને છાણીયું ખાતર ઉત્પાદકો પાસેથી ૫૦% સસ્તા ભાવે ગુણવત્તાયુક્ત ખાતર મેળવો.'
                  : 'Bypass market markups. Buy direct vermicompost and bio-manure from verified farmer producers.'}
              </p>
            </div>
            <button
              onClick={() => setShowKhaterModal(true)}
              className="px-5 py-2.5 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs hover:bg-emerald-50 shadow-sm transition whitespace-nowrap"
            >
              + {lang === 'gu' ? 'ખાતર ઉત્પાદક તરીકે સ્ટોક મૂકો' : 'Register as Khater Producer'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {khaterListings.map((kht) => (
              <div
                key={kht.id}
                className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm hover:border-emerald-300 transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {kht.khaterType === 'VERMICOMPOST' ? 'અળસિયાનું ખાતર' : kht.khaterType === 'JEEVAMRUT' ? 'જીવામૃત લિક્વિડ' : 'દેશી ગૌમૂત્ર-છાણીયું'}
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      ₹{kht.pricePerBag} / થેલી (50kg)
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 mt-2">
                    {kht.producerFarmer}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{kht.location}</span>
                  </div>

                  <div className="mt-3 p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/60 text-xs text-stone-700 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">બજાર કિંમત (દુકાન):</span>
                      <span className="line-through text-stone-400 font-semibold">₹{kht.marketStorePrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-800">
                      <span>તમારી ચોખ્ખી બચત:</span>
                      <strong className="font-extrabold">₹{kht.marketStorePrice - kht.pricePerBag} / થેલી</strong>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-emerald-200/50">
                      <span className="text-stone-500">ઉપલબ્ધ જથ્થો:</span>
                      <strong className="text-stone-900">{kht.availableBags} થેલી તૈયાર</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800">પ્રમાણિત ગુણવત્તા ✓</span>
                  <button
                    onClick={() => alert(`ખાતર ઓર્ડર નોંધાયો! સંપર્ક: ${kht.contactPhone}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                  >
                    ઓર્ડર કરો 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FOUNDATION & DONOR TELEMETRY */}
      {activeTab === 'FOUNDATION' && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-600 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/20 border border-white/30 tracking-wider">
                100% Transparent Donor & CSR Ledger
              </span>
              <h2 className="text-lg font-display font-extrabold">
                {lang === 'gu'
                  ? 'ફાઉન્ડેશન, CSR અને સરકારી ગ્રાન્ટ પારદર્શિતા'
                  : 'Institutional Funding & Beneficiary Ledger'}
              </h2>
              <p className="text-xs text-indigo-100 max-w-xl">
                {lang === 'gu'
                  ? 'કોણે કેટલું દાન કે CSR ફંડ આપ્યું અને કયા ગામના કયા ખેડૂતને મફત સોઇલ કાર્ડ કે સોલાર સબસિડી મળી તેનું સંપૂર્ણ ઓડિટેબલ લાઇવ લેજર.'
                  : 'Complete traceability showing exact funding sources, deployed programs, and verified farmer beneficiaries.'}
              </p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center">
              <span className="text-xs text-indigo-200 block">કુલ જમા થયેલ ફંડ</span>
              <span className="text-xl font-display font-black text-white">₹1.13 Crore</span>
            </div>
          </div>

          <div className="space-y-3">
            {foundationRecords.map((fnd) => (
              <div
                key={fnd.id}
                className="bg-white p-5 rounded-3xl border border-indigo-100 shadow-sm hover:border-indigo-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {fnd.donorCategory}
                    </span>
                    <span className="text-xs text-stone-400">તારીખ: {fnd.allocationDate}</span>
                  </div>
                  <h3 className="text-base font-extrabold text-stone-900">
                    {fnd.foundationName}
                  </h3>
                  <p className="text-xs text-stone-600">
                    લાભાર્થી ગામો: <strong>{fnd.villageCoverage}</strong>
                  </p>
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-[11px] text-stone-500 block">લાભાર્થી ખેડૂતો:</span>
                    <span className="text-base font-extrabold text-indigo-800">
                      {fnd.targetBeneficiaries.toLocaleString('en-IN')} ખેડૂત પરિવાર
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-500 block">ફાળવેલ રકમ:</span>
                    <span className="text-lg font-display font-black text-emerald-700">
                      ₹{fnd.grantAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1 text-[11px] font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>ઓડિટ વેરિફાઇડ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Water Request Modal */}
      {showWaterModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <h3 className="text-base font-display font-extrabold text-stone-900">
              {lang === 'gu' ? 'પાણી સિંચાઈ જરૂરિયાત નોંધાવો' : 'Request Hourly Irrigation Water'}
            </h3>
            {waterSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center font-bold text-xs">
                ✓ તમારી પાણીની જરૂરિયાત નોંધાઈ ગઈ છે! નજીકના બોરવેલ માલિક તરફથી કૉલ આવશે.
              </div>
            ) : (
              <form onSubmit={handleWaterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">કેટલા કલાક પાણીની જરૂર છે?</label>
                  <input
                    type="number"
                    value={waterReqHours}
                    onChange={(e) => setWaterReqHours(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold"
                    placeholder="દા.ત. 4 કલાક"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ખેતરનું સ્થાન / સરનામું</label>
                  <input
                    type="text"
                    value={waterLocation}
                    onChange={(e) => setWaterLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">સિંચાઈનો પ્રકાર</label>
                  <select className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50">
                    <option>બોરવેલ/ટ્યુબવેલ શેરિંગ (₹110 - ₹140/કલાક)</option>
                    <option>સૌર સિંચાઈ પંપ લિફ્ટ (₹110/કલાક)</option>
                    <option>ઇમરજન્સી સબસિડી ટેન્કર સપ્લાય</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold"
                  >
                    જરૂરિયાત સબમિટ કરો
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowWaterModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold"
                  >
                    રદ કરો
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Khater Listing Modal */}
      {showKhaterModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <h3 className="text-base font-display font-extrabold text-stone-900">
              {lang === 'gu' ? 'ખાતર ઉત્પાદક તરીકે નવો સ્ટોક લિસ્ટ કરો' : 'List Organic Fertilizer Stock'}
            </h3>
            {khaterSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center font-bold text-xs">
                ✓ તમારો ખાતર સ્ટોક સફળતાપૂર્વક લિસ્ટ થઈ ગયો છે! અન્ય ખેડૂતો સીધો ઓર્ડર કરી શકશે.
              </div>
            ) : (
              <form onSubmit={handleKhaterSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ઉત્પાદક ખેડૂતનું નામ</label>
                  <input
                    type="text"
                    required
                    value={khaterProducerName}
                    onChange={(e) => setKhaterProducerName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold"
                    placeholder="દા.ત. કાંતિભાઈ પટેલ (વર્મીકમ્પોસ્ટ)"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">ખાતરનો પ્રકાર</label>
                  <select
                    value={khaterTypeInput}
                    onChange={(e) => setKhaterTypeInput(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                  >
                    <option value="VERMICOMPOST">અળસિયાનું ખાતર (Vermicompost)</option>
                    <option value="DESI_GOHARI">દેશી ગાયનું છાણીયું ખાતર</option>
                    <option value="JEEVAMRUT">પ્રવાહી જીવામૃત (Jeevamrut)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">થેલીઓની સંખ્યા</label>
                    <input
                      type="number"
                      required
                      value={khaterBags}
                      onChange={(e) => setKhaterBags(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                      placeholder="દા.ત. 150"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">ભાવ પ્રતિ થેલી (₹)</label>
                    <input
                      type="number"
                      required
                      value={khaterPrice}
                      onChange={(e) => setKhaterPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50 font-bold text-emerald-800"
                      placeholder="250"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    સ્ટોક પ્રકાશિત કરો
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowKhaterModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold"
                  >
                    રદ કરો
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
