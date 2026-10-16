import React from 'react';
import {
  Sun,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Bug,
  FlaskConical,
  Truck,
  IndianRupee,
  ShieldCheck,
  FileCheck,
  Building2,
  Users,
  Award,
  Clock,
  CheckCircle2,
  Send,
  BarChart3,
  Calendar,
  Droplets,
  Sprout,
  Landmark,
  Fuel,
  Receipt,
  FileText,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Language, translations } from '../i18n';
import { Role } from '../types';

interface DashboardViewProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  summary: { totalIncome: number; totalExpense: number; netBalance: number };
  role: Role;
  setRole?: (role: Role) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  onNavigate,
  summary,
  role,
  setRole,
}) => {
  const t = translations[lang];

  // Role Profile Metas with English, Hindi, and Gujarati
  const roleProfiles: Record<
    Role,
    {
      badge: string;
      name: string;
      title: string;
      location: string;
      stats: { title: string; value: string; subtext: string; icon: any; color: string; targetTab: string }[];
      actions: { title: string; subtitle: string; icon: any; color: string; tab: string }[];
      alert: { type: string; title: string; text: string };
    }
  > = {
    FARMER: {
      badge: lang === 'gu' ? '👨‍🌾 પ્રમાણિત ખેડૂત પ્રોફાઇલ' : lang === 'hi' ? '👨‍🌾 पंजीकृत किसान प्रोफाइल' : '👨‍🌾 Verified Farmer Profile',
      name: lang === 'gu' ? 'રમેશભાઈ પટેલ (ખેડૂત)' : lang === 'hi' ? 'रमेश पटेल (किसान)' : 'Ramesh Patel (Farmer)',
      title: lang === 'gu' ? '૮.૫ એકર જમીન · ઘઉં અને સોયાબીન' : lang === 'hi' ? '8.5 एकड़ रकबा · गेहूं व सोयाबीन' : '8.5 Acres Land · Wheat & Soybean',
      location: lang === 'gu' ? 'સીહોર, મધ્ય પ્રદેશ / ગુજરાત ક્લસ્ટર' : lang === 'hi' ? 'सीहोर, मध्य प्रदेश' : 'Sehore, MP / Gujarat Cluster',
      stats: [
        {
          title: t.dashboard.netBalance,
          value: `₹${summary.netBalance.toLocaleString('en-IN')}`,
          subtext: lang === 'gu' ? `₹${summary.totalIncome.toLocaleString('en-IN')} આવક / ₹${summary.totalExpense.toLocaleString('en-IN')} ખર્ચ` : `₹${summary.totalIncome.toLocaleString('en-IN')} earned / ₹${summary.totalExpense.toLocaleString('en-IN')} cost`,
          icon: IndianRupee,
          color: 'emerald',
          targetTab: 'khata',
        },
        {
          title: lang === 'gu' ? 'આજનો ઘઉં બજાર ભાવ' : lang === 'hi' ? 'आज का गेहूं मंडी भाव' : 'Today Wheat Mandi Rate',
          value: '₹2,820 / Qtl',
          subtext: lang === 'gu' ? '+₹૪૦ વધારો (સીહોર માર્કેટ યાર્ડ)' : '+₹40 up from yesterday (Mandi)',
          icon: TrendingUp,
          color: 'harvest',
          targetTab: 'market',
        },
        {
          title: t.dashboard.pendingSoilTests,
          value: lang === 'gu' ? '૧ તૈયાર · ૧ લેબમાં' : '1 Ready · 1 In-Lab',
          subtext: lang === 'gu' ? 'સોઇલ હેલ્થ કાર્ડ તૈયાર છે (KVK લેબ)' : 'Soil Health Card ready (KVK Lab)',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
      ],
      actions: [
        { title: t.dashboard.addIncomeExpense, subtitle: lang === 'gu' ? 'ઓફલાઇન ખાતાવહી' : lang === 'hi' ? 'ऑफलाइन खाता बही' : 'Offline Farm Ledger', icon: BookOpen, color: 'emerald', tab: 'khata' },
        { title: lang === 'gu' ? 'પાણી અને સસ્તું ખાતર' : lang === 'hi' ? 'जल व सस्ता खाद' : 'Water & Khater Hub', subtitle: lang === 'gu' ? 'સિંચાઈ અને ઓર્ગેનિક ખાતર' : 'Affordable Water & Khater', icon: Droplets, color: 'blue', tab: 'water_khater' },
        { title: t.dashboard.scanCrop, subtitle: lang === 'gu' ? 'AI પાક રોગ તપાસ' : lang === 'hi' ? 'एआई फसल डॉक्टर' : 'AI Disease Scan', icon: Bug, color: 'red', tab: 'doctor' },
        { title: t.dashboard.orderSoilTest, subtitle: lang === 'gu' ? 'ડિજિટલ સોઇલ કાર્ડ' : lang === 'hi' ? 'डिजिटल सॉइल कार्ड' : 'Soil Nutrient Test', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: t.dashboard.bookTractor, subtitle: lang === 'gu' ? 'ખેતરથી યાર્ડ વાહન' : lang === 'hi' ? 'खेत से मंडी वाहन' : 'Farm-to-Mandi Dispatch', icon: Truck, color: 'amber', tab: 'transport' },
      ],
      alert: {
        type: 'warning',
        title: lang === 'gu' ? 'કૃષિ વિભાગ જીવાત ચેતવણી: ' : lang === 'hi' ? 'कृषि विभाग कीट चेतावनी (Zaid 2026): ' : 'Agriculture Warning: ',
        text: lang === 'gu'
          ? 'મગના પાકમાં પીળી છાંટ વાયરસથી બચવા સફેદ માખીનું નિયંત્રણ કરો. થાયામેથોક્સામ 25% WG નો છંટકાવ કરો.'
          : lang === 'hi'
          ? 'मूंग की फसल में पीला मोजेक वायरस (YMV) से बचाव हेतु सफेद मक्खी का नियंत्रण करें। थायमेथोक्सम 25% WG का छिड़काव करें।'
          : 'Control whiteflies in summer moong to stop Yellow Mosaic Virus using Thiamethoxam 25% WG.',
      },
    },

    KHATER_PRODUCER: {
      badge: lang === 'gu' ? '🌱 પ્રમાણિત ઓર્ગેનિક ખાતર ઉત્પાદક' : lang === 'hi' ? '🌱 प्रमाणित जैविक खाद उत्पादक' : '🌱 Certified Organic Khater Producer',
      name: lang === 'gu' ? 'કાંતિભાઈ પટેલ (અળસિયા ખાતર ઉત્પાદક)' : lang === 'hi' ? 'कांतिभाई पटेल (वर्मीकम्पोस्ट यूनिट)' : 'Kantibhai Patel (Vermicompost Unit)',
      title: lang === 'gu' ? 'વાર્ષિક ૪૫ ટન વર્મીકમ્પોસ્ટ અને જીવામૃત ઉત્પાદન' : lang === 'hi' ? 'वार्षिक 45 टन वर्मीकम्पोस्ट उत्पादन' : '45 Tonnes/Year Bio-Fertilizer Unit',
      location: lang === 'gu' ? 'સાંપા ક્લસ્ટર, ગાંધીનગર' : 'Gandhinagar Agro Cluster',
      stats: [
        {
          title: lang === 'gu' ? 'બુક થયેલ ઓર્ડર્સ' : 'Booked Orders',
          value: '142 થેલી',
          subtext: lang === 'gu' ? 'ચાલુ સપ્તાહે ₹૩૫,૫૦૦ નું વેચાણ' : '₹35,500 sales this week',
          icon: Sprout,
          color: 'emerald',
          targetTab: 'water_khater',
        },
        {
          title: lang === 'gu' ? 'તૈયાર ખાતર સ્ટોક' : 'Ready Stock',
          value: '280 થેલી',
          subtext: lang === 'gu' ? '૫૦ કિગ્રા ગ્રેડ-A વર્મીકમ્પોસ્ટ' : '50kg Grade-A Vermicompost',
          icon: Award,
          color: 'blue',
          targetTab: 'water_khater',
        },
        {
          title: lang === 'gu' ? 'સરકારી ઓર્ગેનિક સબસિડી' : 'Organic Subsidy',
          value: '₹40,000 મંજૂર',
          subtext: lang === 'gu' ? 'PKVY યોજના હેઠળ પ્રોત્સાહન' : 'Approved under PKVY',
          icon: Landmark,
          color: 'amber',
          targetTab: 'schemes',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'ખાતર સ્ટોક લિસ્ટિંગ' : 'Manage Khater Stock', subtitle: lang === 'gu' ? 'ઓર્ડર્સ અને સ્ટોક' : 'Stock & Orders', icon: Sprout, color: 'emerald', tab: 'water_khater' },
        { title: lang === 'gu' ? 'વેચાણ ખાતાવહી' : 'Sales Khata', subtitle: lang === 'gu' ? 'આવક-ખર્ચ હિસાબ' : 'Sales Ledger', icon: BookOpen, color: 'blue', tab: 'khata' },
        { title: lang === 'gu' ? 'ઓર્ગેનિક સબસિડી' : 'Organic Subsidies', subtitle: lang === 'gu' ? 'PKVY યોજના સહાય' : 'PKVY Assistance', icon: Landmark, color: 'amber', tab: 'schemes' },
      ],
      alert: {
        type: 'success',
        title: lang === 'gu' ? 'ખેડૂત માંગણી એલર્ટ: ' : 'High Demand Alert: ',
        text: lang === 'gu'
          ? 'રાસાયણિક ખાતરોના ઊંચા ભાવને કારણે આ અઠવાડિયે અળસિયા ખાતર અને જીવામૃતની માંગમાં ૬૦% નો વધારો થયો છે.'
          : 'High demand surge for Vermicompost and Jeevamrut from 18 nearby villages due to chemical fertilizer price spikes.',
      },
    },

    AGRI_LAB: {
      badge: lang === 'gu' ? '🔬 પ્રમાણિત જમીન અને પાણી લેબોરેટરી' : lang === 'hi' ? '🔬 प्रमाणित मृदा व जल प्रयोगशाला' : '🔬 Certified Agri Testing Lab',
      name: lang === 'gu' ? 'કૃષિ વિજ્ઞાન કેન્દ્ર સોઇલ ટેસ્ટિંગ લેબ' : lang === 'hi' ? 'कृषि विज्ञान केंद्र मृदा प्रयोगशाला' : 'KVK Soil & Water Testing Center',
      title: lang === 'gu' ? 'માન્યતા નં: AGRI-LAB-2024 · ISO 17025' : lang === 'hi' ? 'लाइसेंस: MP-AGRI-LAB-2024 · ISO 17025' : 'License: AGRI-LAB-2024 · ISO 17025',
      location: lang === 'gu' ? 'વિભાગીય મુખ્ય પ્રયોગશાળા' : lang === 'hi' ? 'भोपाल व सीहोर संभाग' : 'Central Agro Division',
      stats: [
        {
          title: lang === 'gu' ? 'તપાસ માટે બાકી સેમ્પલ' : lang === 'hi' ? 'जांच हेतु लंबित नमूने' : 'Pending Sample Queue',
          value: '18 Samples',
          subtext: lang === 'gu' ? '૭ તાત્કાલિક (વાવણી પૂર્વે કપાસ)' : '7 urgent (Pre-Sowing Cotton)',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
        {
          title: lang === 'gu' ? 'ઇશ્યૂ કરેલા સોઇલ કાર્ડ' : lang === 'hi' ? 'जारी किए गए सॉइल कार्ड' : 'Issued Health Cards',
          value: '428 Cards',
          subtext: lang === 'gu' ? 'ખેડૂતોને સીધા મોકલાયા' : 'Delivered digitally to farmers',
          icon: Award,
          color: 'emerald',
          targetTab: 'soil',
        },
        {
          title: lang === 'gu' ? 'સરેરાશ રિપોર્ટ સમય' : lang === 'hi' ? 'औसत रिपोर्ट समय' : 'Avg Turnaround Time',
          value: '2.4 Days',
          subtext: 'Target SLA: < 3.0 Days',
          icon: Clock,
          color: 'amber',
          targetTab: 'soil',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'ટેસ્ટ પરિણામ નોંધો' : 'Record Test Results', subtitle: lang === 'gu' ? 'NPK અને pH દાખલ કરો' : 'Enter NPK & pH values', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: lang === 'gu' ? 'સોઇલ કાર્ડ ઇશ્યૂ કરો' : 'Issue Soil Cards', subtitle: lang === 'gu' ? 'ખેડૂતને ડિજિટલ કાર્ડ મોકલો' : 'Send digital card to farmer', icon: Award, color: 'emerald', tab: 'soil' },
        { title: lang === 'gu' ? 'ખાતર માત્રા નક્કી કરો' : 'Prescribe Dosage', subtitle: lang === 'gu' ? 'વૈજ્ઞાનિક ખાતર ભલામણ' : 'Agronomist advisory', icon: FileCheck, color: 'harvest', tab: 'soil' },
        { title: lang === 'gu' ? 'સરકારી લેબ ગ્રાન્ટ' : 'Lab Grants & Subsidies', subtitle: lang === 'gu' ? 'સોઇલ મિશન સહાય સ્થિતિ' : 'Soil Mission funding', icon: IndianRupee, color: 'purple', tab: 'schemes' },
      ],
      alert: {
        type: 'info',
        title: lang === 'gu' ? 'રાષ્ટ્રીય જમીન આરોગ્ય મિશન નોટિસ: ' : 'Soil Mission SLA: ',
        text: lang === 'gu'
          ? 'ખરીફ વાવણી પહેલાંના તમામ સેમ્પલ ૭૨ કલાકમાં તપાસીને પોર્ટલ પર અપલોડ કરવાના રહેશે.'
          : 'All pre-Kharif soil health samples must be processed and uploaded to Krishimitara portal within 72 hours.',
      },
    },

    TRANSPORTER: {
      badge: lang === 'gu' ? '🚚 રજિસ્ટર્ડ કૃષિ ટ્રાન્સપોર્ટ ફ્લીટ' : lang === 'hi' ? '🚚 पंजीकृत कृषि परिवहन फ्लीट' : '🚚 Registered Agro Transport Fleet',
      name: lang === 'gu' ? 'ગુરકીરત લોજિસ્ટિક્સ અને ગ્રામીણ કાર્ગો' : lang === 'hi' ? 'गुरकीरत लॉजिस्टिक्स व रूरल कार्गो' : 'Gurkirat Logistics & Rural Cargo',
      title: lang === 'gu' ? '૬ વાહનો ઉપલબ્ધ · ૮-૧૪ ટન ટ્રેક્ટર અને ટ્રક' : lang === 'hi' ? '6 वाहन सक्रिय · 8-14 टन ट्रैक्टर व ट्रक' : '6 Active Vehicles · 8-14T Fleet',
      location: lang === 'gu' ? 'માર્કેટ યાર્ડ અને ગ્રામીણ વિસ્તાર' : lang === 'hi' ? 'लुधियाना व मध्य प्रदेश कॉरिडोर' : 'Regional Mandi Hub',
      stats: [
        {
          title: lang === 'gu' ? 'આજની માર્કેટ બુકિંગ' : "Today's Mandi Bookings",
          value: '4 Trips',
          subtext: lang === 'gu' ? '૨૮.૫ ટન ઘઉં ટ્રાન્સપોર્ટ શિડ્યુલ' : '28.5 Tonnes wheat scheduled',
          icon: Truck,
          color: 'amber',
          targetTab: 'transport',
        },
        {
          title: lang === 'gu' ? 'સાપ્તાહિક ભાડા આવક' : 'Weekly Transit Revenue',
          value: '₹34,800',
          subtext: lang === 'gu' ? 'સરેરાશ ₹૪૨/કિ.મી. દર' : 'Average ₹42/km across 6 vehicles',
          icon: IndianRupee,
          color: 'emerald',
          targetTab: 'transport',
        },
        {
          title: lang === 'gu' ? 'ડ્રાઇવર રેટિંગ' : 'Transporter Rating',
          value: '4.8 ★',
          subtext: lang === 'gu' ? '૯૪ સફળ ટ્રિપ્સના આધારે' : 'Based on 94 farmer trips',
          icon: ShieldCheck,
          color: 'harvest',
          targetTab: 'transport',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'નવું વાહન ઉમેરો' : 'Add Vehicle to Fleet', subtitle: lang === 'gu' ? 'ટ્રેક્ટર-ટ્રોલી કે પિકઅપ' : 'List truck or trolley', icon: Truck, color: 'amber', tab: 'transport' },
        { title: lang === 'gu' ? 'ખેડૂત બુકિંગ સ્વીકારો' : 'View Dispatch Requests', subtitle: lang === 'gu' ? 'સીધા પિકઅપ ઓર્ડર' : 'Direct farmer pickup orders', icon: CheckCircle2, color: 'emerald', tab: 'transport' },
        { title: lang === 'gu' ? 'પ્રતિ કિ.મી. દર અપડેટ કરો' : 'Update Per-Km Rates', subtitle: lang === 'gu' ? 'પારદર્શક ભાડું ગણતરી' : 'Transparent route calculator', icon: TrendingUp, color: 'blue', tab: 'transport' },
        { title: lang === 'gu' ? 'માર્કેટ યાર્ડ આવક જુઓ' : 'Check APMC Arrivals', subtitle: lang === 'gu' ? 'ટ્રાફિક અને અનલોડિંગ સમય' : 'Mandi congestion index', icon: BarChart3, color: 'harvest', tab: 'market' },
      ],
      alert: {
        type: 'info',
        title: lang === 'gu' ? 'યાર્ડ ટ્રાફિક નોટિસ: ' : 'Mandi Route Notice: ',
        text: lang === 'gu'
          ? 'માર્કેટ યાર્ડમાં માલની પુષ્કળ આવક હોવાથી ગેટ નં. ૨ પરથી ભારે ટ્રેક્ટર-ટ્રોલીનો પ્રવેશ રહેશે.'
          : 'High grain inflow reported at APMC Mandi. Gate #2 designated for heavy tractor-trolley unloading.',
      },
    },

    GOVERNMENT: {
      badge: lang === 'gu' ? '🏛️ કૃષિ કલ્યાણ અને ખેડૂત વિકાસ વિભાગ' : '🏛️ Department of Agriculture & Farmers Welfare',
      name: lang === 'gu' ? 'ડૉ. એસ. કે. વર્મા (જિલ્લા ખેતીવાડી અધિકારી)' : 'Dr. S. K. Verma (District Agri Officer)',
      title: lang === 'gu' ? 'જિલ્લા નોડલ અધિકારી · કૃષિ નિયામક કચેરી' : 'District Nodal Officer · Directorate of Agri',
      location: lang === 'gu' ? 'જિલ્લા કલેક્ટર કચેરી કેમ્પસ' : 'District Collectorate Complex',
      stats: [
        {
          title: lang === 'gu' ? 'PM-કિસાન eKYC વેરિફિકેશન' : 'PM-KISAN eKYC Verification',
          value: '94.2%',
          subtext: lang === 'gu' ? '૧૨,૪૧૦ ખેડૂતો પ્રમાણિત' : '12,410 farmers verified in district',
          icon: Users,
          color: 'emerald',
          targetTab: 'schemes',
        },
        {
          title: lang === 'gu' ? 'જિલ્લા પાક રોગ એલર્ટ' : 'District Pest Alerts',
          value: '2 Active',
          subtext: lang === 'gu' ? 'યલો રસ્ટ એડવાઈઝરી જારી' : 'Yellow Rust advisory broadcasted',
          icon: Bug,
          color: 'red',
          targetTab: 'doctor',
        },
        {
          title: lang === 'gu' ? 'ટેકાના ભાવ અને બજાર ભાવ' : 'MSP Surveillance',
          value: '₹2,820 (Wheat)',
          subtext: lang === 'gu' ? 'ટેકાના ભાવ (MSP) થી ઊંચો' : 'Above MSP (₹2,275/Qtl)',
          icon: BarChart3,
          color: 'blue',
          targetTab: 'market',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'કૃષિ સલાહ પ્રસારિત કરો' : 'Broadcast Agri Advisory', subtitle: lang === 'gu' ? 'હવામાન અને રોગ એલર્ટ' : 'Weather & pest outbreak alerts', icon: Send, color: 'blue', tab: 'doctor' },
        { title: lang === 'gu' ? 'સરકારી યોજનાઓ મંજૂર કરો' : 'Manage Gov Schemes', subtitle: lang === 'gu' ? 'સબસિડી અને KCC અરજીઓ' : 'Approve KCC & Kusum grants', icon: Building2, color: 'purple', tab: 'schemes' },
        { title: lang === 'gu' ? 'બજાર ભાવ તપાસો' : 'Monitor Mandi Prices', subtitle: lang === 'gu' ? 'વેપારી નિયમોનું પાલન' : 'Wholesale trade compliance', icon: TrendingUp, color: 'harvest', tab: 'market' },
        { title: lang === 'gu' ? 'જમીન ફળદ્રુપતા સૂચકાંક' : 'Soil Health Index', subtitle: lang === 'gu' ? 'જિલ્લા પોષકતત્વો મેપિંગ' : 'District nutrient mapping', icon: FlaskConical, color: 'emerald', tab: 'soil' },
      ],
      alert: {
        type: 'critical',
        title: lang === 'gu' ? 'સત્તાવાર સૂચના (PMFBY Notice): ' : 'Official Notice: ',
        text: lang === 'gu'
          ? 'પ્રધાનમંત્રી ફસલ બીમા યોજના (PMFBY) ક્લેમ ચકાસણી માટે તાલુકા સ્તરે કેમ્પ ૨૦ એપ્રિલથી યોજાશે.'
          : 'Block-level verification camps for PMFBY crop insurance claims will commence from April 20.',
      },
    },

    AGRO_COMPANY: {
      badge: lang === 'gu' ? '🏢 કૃષિ ઇનપુટ અને જથ્થાબંધ ખરીદદાર' : '🏢 Agro Inputs & Direct Procurement Partner',
      name: lang === 'gu' ? 'કિસાન એગ્રો સીડ્સ અને પ્રોક્યોરમેન્ટ' : 'Kisan Agro Seeds & Procurement Corp',
      title: lang === 'gu' ? 'પ્રમાણિત બિયારણ પાર્ટનર અને FPO બાયર' : 'Certified Seed Partner & FPO Buyer',
      location: lang === 'gu' ? 'સેન્ટ્રલ વેપાર હબ' : 'Corporate Agri Trade Hub',
      stats: [
        {
          title: lang === 'gu' ? 'ખરીદ માટે તૈયાર પાક લોટ' : 'Active Farmer Crop Lots',
          value: '385 Qtl',
          subtext: lang === 'gu' ? 'શરબતી ઘઉં અને ઓર્ગેનિક સોયાબીન' : 'Sharbati Wheat & Organic Soybean',
          icon: Building2,
          color: 'harvest',
          targetTab: 'market',
        },
        {
          title: lang === 'gu' ? 'સીધા કોન્ટ્રેક્ટ ખેડૂતો' : 'Contract Farmers',
          value: '64 Farmers',
          subtext: lang === 'gu' ? 'દલાલી વગર સીધા કરાર' : 'Zero broker commission contract',
          icon: Users,
          color: 'emerald',
          targetTab: 'market',
        },
        {
          title: lang === 'gu' ? 'ટ્રાન્સપોર્ટ ડિસ્પેચ' : 'Dispatch Bookings',
          value: '8 Trucks Out',
          subtext: lang === 'gu' ? 'ગોડાઉન તરફ રવાના' : 'Central warehouse transit',
          icon: Truck,
          color: 'blue',
          targetTab: 'transport',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'ખેડૂતો પાસેથી સીધી ખરીદી' : 'Browse Farmer Lots', subtitle: lang === 'gu' ? 'યાર્ડ કરતાં સારા ભાવે સોદો' : 'Direct procurement bids', icon: TrendingUp, color: 'emerald', tab: 'market' },
        { title: lang === 'gu' ? 'બલ્ક ટ્રાન્સપોર્ટ બુક કરો' : 'Book Bulk Transport', subtitle: lang === 'gu' ? 'ગોડાઉન સુધી માલ પરિવહન' : 'Warehouse freight dispatch', icon: Truck, color: 'amber', tab: 'transport' },
        { title: lang === 'gu' ? 'સુધારેલા બિયારણ કેટલોગ' : 'Input Products Catalog', subtitle: lang === 'gu' ? 'પ્રમાણિત ગુણવત્તાવાળા બિયારણ' : 'Certified inputs supply', icon: Award, color: 'purple', tab: 'doctor' },
        { title: lang === 'gu' ? 'જમીન ગુણવત્તા તપાસો' : 'Inspect Soil Quality', subtitle: lang === 'gu' ? 'ઓર્ગેનિક સર્ટિફિકેશન' : 'Organic certification index', icon: FlaskConical, color: 'blue', tab: 'soil' },
      ],
      alert: {
        type: 'info',
        title: lang === 'gu' ? 'જથ્થાબંધ ખરીદી જરૂરિયાત: ' : 'Procurement Requirement: ',
        text: lang === 'gu'
          ? '૨૦૦ ક્વિન્ટલ શરબતી ઘઉંની તાત્કાલિક ખરીદી માટે સીધા ખેડૂતો પાસેથી ટેન્ડર મંગાવવામાં આવે છે.'
          : 'Seeking immediate direct procurement of 200 quintals Sharbati Wheat from regional farmers.',
      },
    },

    SPONSOR_NGO: {
      badge: lang === 'gu' ? '🤝 ગ્રામીણ વિકાસ ટ્રસ્ટ અને NGO' : '🤝 Rural Upliftment Trust & NGO Partner',
      name: lang === 'gu' ? 'ગ્રામીણ કિસાન વિકાસ ફાઉન્ડેશન' : 'Gramin Kisan Development Foundation',
      title: lang === 'gu' ? 'CSR એગ્રીકલ્ચર સશક્તિકરણ પ્રોજેક્ટ' : 'CSR Agri Empowerment Project',
      location: lang === 'gu' ? 'ગ્રામીણ ખેડૂત ક્લસ્ટર' : 'Rural Cluster',
      stats: [
        {
          title: lang === 'gu' ? 'મફત જમીન ચકાસણી સહાય' : 'Subsidized Soil Tests',
          value: '150 Tests',
          subtext: lang === 'gu' ? 'નાના ખેડૂતો માટે ૧૦૦% ગ્રાન્ટ' : '100% grant funded for marginal farmers',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
        {
          title: lang === 'gu' ? 'તાલીમ મેળવેલ મહિલા ખેડૂતો' : 'Trained Women Farmers',
          value: '320 Trained',
          subtext: lang === 'gu' ? 'કુદરતી ખેતી તાલીમ શિબિર' : 'Organic pest management workshop',
          icon: Users,
          color: 'emerald',
          targetTab: 'schemes',
        },
        {
          title: lang === 'gu' ? 'કુલ ફાળવેલ CSR ગ્રાન્ટ' : 'CSR Grant Deployed',
          value: '₹8,50,000',
          subtext: lang === 'gu' ? 'સોલાર પંપ અને ડ્રિપ સબસિડી' : 'Solar pumps & drip subsidies',
          icon: IndianRupee,
          color: 'purple',
          targetTab: 'schemes',
        },
      ],
      actions: [
        { title: lang === 'gu' ? 'મફત જમીન ટેસ્ટ સ્પોન્સર કરો' : 'Sponsor Free Soil Tests', subtitle: lang === 'gu' ? 'નાના ખેડૂતોને સીધી સહાય' : 'Grants for small farmers', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: lang === 'gu' ? 'સોલાર પંપ ટોપ-અપ ગ્રાન્ટ' : 'Solar Pump Assistance', subtitle: lang === 'gu' ? 'કુસુમ યોજના વધારાની સબસિડી' : 'PM-Kusum top-up subsidy', icon: Sun, color: 'harvest', tab: 'schemes' },
        { title: lang === 'gu' ? 'ખેડૂત તાલીમ શિબિરો' : 'View Training Workshops', subtitle: lang === 'gu' ? 'ઓર્ગેનિક ફાર્મિંગ કેમ્પ' : 'Natural farming camps', icon: Calendar, color: 'emerald', tab: 'doctor' },
        { title: lang === 'gu' ? 'ખેડૂત આવક વૃદ્ધિ આંકડા' : 'Community Impact Khata', subtitle: lang === 'gu' ? 'બચત અને નફાકારકતા ટ્રેકિંગ' : 'Track farmer income growth', icon: BookOpen, color: 'amber', tab: 'khata' },
      ],
      alert: {
        type: 'info',
        title: lang === 'gu' ? 'CSR સહાય જાહેરાત: ' : 'CSR Impact Announcement: ',
        text: lang === 'gu'
          ? 'નાના અને સીમાંત ખેડૂતો માટે ૨૦૦ નવા સોલાર પંપ પર ૨૦% વધારાની NGO સબસિડી મંજૂર કરવામાં આવી છે.'
          : 'Approved additional 20% CSR grant on 200 solar irrigation pumps for marginal farmers.',
      },
    },
  };

  const currentProfile = roleProfiles[role] || roleProfiles.FARMER;

  const bannerGradientClass =
    role === 'KHATER_PRODUCER'
      ? 'from-emerald-700 via-lime-700 to-amber-700 border-lime-400/40 shadow-lime-900/10'
      : role === 'AGRI_LAB'
      ? 'from-teal-700 via-cyan-700 to-blue-700 border-cyan-400/40 shadow-cyan-900/10'
      : role === 'TRANSPORTER'
      ? 'from-amber-700 via-orange-600 to-amber-600 border-amber-400/40 shadow-amber-900/10'
      : role === 'GOVERNMENT'
      ? 'from-emerald-800 via-teal-800 to-green-700 border-emerald-400/40 shadow-emerald-900/10'
      : role === 'AGRO_COMPANY'
      ? 'from-indigo-800 via-blue-800 to-emerald-700 border-indigo-400/40 shadow-indigo-900/10'
      : role === 'SPONSOR_NGO'
      ? 'from-rose-700 via-emerald-700 to-teal-700 border-rose-400/40 shadow-rose-900/10'
      : 'from-emerald-600 via-green-600 to-emerald-500 border-emerald-400/30 shadow-emerald-700/10';

  return (
    <div className="space-y-6">
      {/* 7-PORTAL DIRECT SWITCHER BAR */}
      <div className="bg-white p-3 rounded-3xl border border-emerald-200 shadow-sm space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              {lang === 'gu' ? '૭ સ્વતંત્ર રોલ પોર્ટલ ડેસ્ક (પોર્ટલ બદલો):' : '7 Dedicated Stakeholder Portals (Switch Active Desk):'}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {lang === 'gu' ? 'ક્લિક કરીને કોઈપણ પોર્ટલનો લાઈવ અનુભવ કરો' : 'Click to instantly view each role dashboard'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {[
            { id: 'FARMER', label: lang === 'gu' ? '👨‍🌾 ખેડૂત પોર્ટલ' : '👨‍🌾 Farmer' },
            { id: 'KHATER_PRODUCER', label: lang === 'gu' ? '🌱 ખાતર ઉત્પાદક' : '🌱 Khater Producer' },
            { id: 'AGRI_LAB', label: lang === 'gu' ? '🔬 એગ્રી લેબ' : '🔬 Agri Lab' },
            { id: 'TRANSPORTER', label: lang === 'gu' ? '🚚 ટ્રાન્સપોર્ટર' : '🚚 Transporter' },
            { id: 'GOVERNMENT', label: lang === 'gu' ? '🏛️ સરકારી અધિકારી' : '🏛️ Govt Officer' },
            { id: 'AGRO_COMPANY', label: lang === 'gu' ? '🏢 એગ્રો કંપની' : '🏢 Agro Company' },
            { id: 'SPONSOR_NGO', label: lang === 'gu' ? '🤝 ફાઉન્ડેશન / NGO' : '🤝 Foundation' },
          ].map((item) => {
            const isCurrent = role === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRole && setRole(item.id as Role)}
                className={`py-2 px-2 rounded-2xl text-[11px] font-bold transition text-center flex items-center justify-center space-x-1 border ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-emerald-300'
                }`}
              >
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Welcome & Role Identity Banner with Distinct Gradient */}
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${bannerGradientClass} text-white p-6 md:p-8 shadow-lg border`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <span>{currentProfile.badge}</span>
              <span>•</span>
              <span>{currentProfile.location}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
              {currentProfile.name}
            </h1>
            <p className="mt-1 text-sm text-emerald-50 max-w-xl font-medium">
              {currentProfile.title}
            </p>
          </div>

          {/* Weather & Date Card - Light Glass Pill */}
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center space-x-4 border border-white/30 shadow-inner shrink-0">
            <div className="p-3 rounded-xl bg-white/25 text-white">
              <Sun className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold text-emerald-100 tracking-wider">
                {t.dashboard.weather}
              </div>
              <div className="text-lg font-display font-bold text-white">
                31°C · {lang === 'gu' ? 'ચોખ્ખું હવામાન' : lang === 'hi' ? 'साफ मौसम' : 'Sunny'}
              </div>
              <div className="text-[11px] text-emerald-100 mt-0.5 max-w-[200px] truncate">
                {new Date().toLocaleDateString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Specific Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {currentProfile.stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(stat.targetTab)}
              className="cursor-pointer bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-all border border-emerald-100 hover:border-emerald-400 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div
                  className={`p-2.5 rounded-2xl transition ${
                    stat.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                      : stat.color === 'blue'
                      ? 'bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white'
                      : stat.color === 'red'
                      ? 'bg-rose-50 text-rose-700 group-hover:bg-rose-600 group-hover:text-white'
                      : stat.color === 'amber'
                      ? 'bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
                      : 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 text-2xl font-display font-extrabold text-stone-900">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-stone-500 font-medium">
                {stat.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Notice & Alert Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-start space-x-3 text-xs ${
          currentProfile.alert.type === 'warning'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : currentProfile.alert.type === 'critical'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}
      >
        <AlertTriangle
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            currentProfile.alert.type === 'warning'
              ? 'text-amber-600'
              : currentProfile.alert.type === 'critical'
              ? 'text-rose-600'
              : 'text-emerald-700'
          }`}
        />
        <div>
          <span className="font-bold">{currentProfile.alert.title}</span>
          <span>{currentProfile.alert.text}</span>
        </div>
      </div>

      {/* Role-Specific Actions & Workflow Tools */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-display font-bold text-stone-900">
            {lang === 'gu'
              ? `${currentProfile.name.split(' ')[0]} કાર્યક્ષેત્ર અને સાધનો`
              : lang === 'hi'
              ? `${currentProfile.name.split(' ')[0]} कार्यक्षेत्र व टूल्स`
              : `${role.replace('_', ' ')} Operations & Utilities`}
          </h2>
          <span className="text-xs text-stone-500">
            {lang === 'gu' ? 'પસંદ કરેલ રોલ મુજબ અનુકૂળ' : lang === 'hi' ? 'भूमिका के अनुसार अनुकूलित' : 'Tailored for active role'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentProfile.actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(act.tab)}
                className="flex flex-col items-center justify-center p-4 rounded-3xl bg-white border border-emerald-100 hover:border-emerald-500 hover:shadow-md transition text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-105 transition ${
                    act.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-700'
                      : act.color === 'blue'
                      ? 'bg-sky-50 text-sky-700'
                      : act.color === 'red'
                      ? 'bg-rose-50 text-rose-700'
                      : act.color === 'amber'
                      ? 'bg-amber-50 text-amber-700'
                      : act.color === 'purple'
                      ? 'bg-purple-50 text-purple-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-stone-800 line-clamp-1">{act.title}</span>
                <span className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">{act.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DEDICATED LIVE WORKSPACES & CONSOLES PER ROLE */}
      <div className="pt-2">
        {/* 1. FARMER PORTAL CONSOLE */}
        {role === 'FARMER' && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Sprout className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">ખેડૂત લાઈવ ફાર્મ બોર્ડ (Farmer Live Command)</h3>
                  <p className="text-[11px] text-stone-500">સીહોર/ગુજરાત ક્લસ્ટર · ૮.૫ એકર વાવેતર ઘઉં અને સોયાબીન</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                સિઝન: ઝૈદ ૨૦૨૬ સક્રિય
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-900">સિંચાઈ પાણી સુવિધા</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-md font-bold">ઉપલબ્ધ</span>
                </div>
                <p className="text-[11px] text-stone-600">નજીકના બોરવેલમાંથી ₹૭૫/કલાકના દરે પાણી શેરિંગ ઉપલબ્ધ છે.</p>
                <button
                  onClick={() => onNavigate('water_khater')}
                  className="w-full py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition"
                >
                  પાણી શેરિંગ નેટવર્ક જુઓ →
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-900">સસ્તું દેશી ખાતર</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md font-bold">૫૦% બચત</span>
                </div>
                <p className="text-[11px] text-stone-600">સ્થાનિક અળસિયા ખાતર ₹૨૨૦/થેલી (બજાર ભાવ ₹૪૫૦ કરતાં અડધો ભાવ).</p>
                <button
                  onClick={() => onNavigate('water_khater')}
                  className="w-full py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[11px] hover:bg-amber-500 transition"
                >
                  ખાતર ઓર્ડર કરો →
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sky-900">જમીન સોઇલ હેલ્થ કાર્ડ</span>
                  <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-md font-bold">લેબ પ્રમાણિત</span>
                </div>
                <p className="text-[11px] text-stone-600">NPK સંતુલિત, કાર્બન ૦.૬૨% (મધ્યમ). ડાઉનલોડ કરવા માટે તૈયાર.</p>
                <button
                  onClick={() => onNavigate('soil')}
                  className="w-full py-1.5 rounded-xl bg-sky-600 text-white font-bold text-[11px] hover:bg-sky-500 transition"
                >
                  સોઇલ કાર્ડ ડાઉનલોડ કરો →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. KHATER PRODUCER CONSOLE */}
        {role === 'KHATER_PRODUCER' && (
          <div className="bg-white p-6 rounded-3xl border border-lime-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-lime-100 text-lime-800">
                  <Sprout className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">ખાતર ઉત્પાદક સ્ટોક અને ખેડૂત ઓર્ડર ડેસ્ક (Khater Producer Desk)</h3>
                  <p className="text-[11px] text-stone-500">કાંતિભાઈ પટેલ · સાંપા ક્લસ્ટર, ગાંધીનગર · PKVY ઓર્ગેનિક પ્રમાણિત</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('water_khater')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
              >
                + નવો ખાતર લોટ લિસ્ટ કરો
              </button>
            </div>

            {/* Live Inventory */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">વર્મીકમ્પોસ્ટ (અળસિયાં ખાતર):</span>
                <span className="text-lg font-bold text-emerald-800">280 થેલી તૈયાર</span>
                <span className="text-[10px] text-stone-500 block">૫૦ કિગ્રા બેગ · ભાવ ₹૨૨૦ (બજાર ₹૪૫૦)</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">દેશી ગાય ગોહરી ખાતર:</span>
                <span className="text-lg font-bold text-amber-800">450 થેલી તૈયાર</span>
                <span className="text-[10px] text-stone-500 block">૫૦ કિગ્રા બેગ · ભાવ ₹૧૬૦</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">દેશી જીવામૃત લિક્વિડ:</span>
                <span className="text-lg font-bold text-blue-800">600 લિટર તૈયાર</span>
                <span className="text-[10px] text-stone-500 block">૨૦ લિટર કેન · ભાવ ₹૧૮૦</span>
              </div>
            </div>

            {/* Pending Farmer Orders */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-stone-800">ખેડૂતો તરફથી આવેલા તાજા ઓર્ડર્સ (Live Farmer Orders):</h4>
              <div className="space-y-2">
                {[
                  { farmer: 'હરીશભાઈ પટેલ (વિજાપુર)', item: '૨૫ થેલી વર્મીકમ્પોસ્ટ', amount: '₹૫,૫૦૦', status: 'ઓર્ડર સ્વીકારેલ', phone: '+91 98251 44102' },
                  { farmer: 'પોપટભાઈ રબારી (માણસા)', item: '૪૦ થેલી ગોહરી ખાતર', amount: '₹૬,૪૦૦', status: 'પેકિંગ ચાલુ', phone: '+91 94280 11982' },
                ].map((ord, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs gap-2">
                    <div>
                      <span className="font-bold text-stone-900">{ord.farmer}</span>
                      <span className="text-stone-500 ml-2">({ord.item})</span>
                      <span className="block text-[11px] text-emerald-700 font-bold">{ord.amount} · {ord.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a href={`tel:${ord.phone}`} className="px-3 py-1 bg-white border border-stone-300 rounded-xl font-semibold text-stone-700 hover:bg-stone-100">
                        સંપર્ક કરો
                      </a>
                      <button
                        onClick={() => alert(`${ord.farmer} નો ઓર્ડર ડિસ્પેચ માટે માર્ક થઈ ગયો છે. ટ્રાન્સપોર્ટરને સૂચના મોકલાઈ છે.`)}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500"
                      >
                        ડિસ્પેચ કરો
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. AGRI LAB CONSOLE */}
        {role === 'AGRI_LAB' && (
          <div className="bg-white p-6 rounded-3xl border border-cyan-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
                  <FlaskConical className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">એગ્રી લેબોરેટરી ટેસ્ટિંગ વર્કસ્ટેશન (Agri Testing Queue)</h3>
                  <p className="text-[11px] text-stone-500">કેવીકે પ્રયોગશાળા · ISO 17025 માન્યતા પ્રાપ્ત · સોઇલ, પાણી અને ખાતર તપાસ</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('soil')}
                className="px-3 py-1.5 rounded-xl bg-cyan-700 text-white text-xs font-bold hover:bg-cyan-600 transition"
              >
                તમામ લેબ રિપોર્ટ્સ જુઓ →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">જમીન સેમ્પલ (Soil NPK):</span>
                <span className="text-lg font-bold text-emerald-800">12 પેન્ડિંગ</span>
                <span className="text-[10px] text-stone-500 block">NPK, pH, ઓર્ગેનિક કાર્બન</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">સિંચાઈ પાણી સેમ્પલ (TDS/SAR):</span>
                <span className="text-lg font-bold text-sky-800">4 સેમ્પલ</span>
                <span className="text-[10px] text-stone-500 block">ક્ષારતા અને પીવાલાયક ટેસ્ટ</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">ખાતર શુદ્ધતા % તપાસ:</span>
                <span className="text-lg font-bold text-amber-800">2 સેમ્પલ</span>
                <span className="text-[10px] text-stone-500 block">ભેળસેળ અને ગુણવત્તા ટેસ્ટ</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">૧-ક્લિક ડિજિટલ સર્ટિફિકેટ ઇશ્યૂ:</span>
                <span className="text-[11px] text-cyan-800">ટેસ્ટ પૂર્ણ થતાં ખેડૂતના મોબાઇલમાં ગુજરાતીમાં સોઇલ હેલ્થ કાર્ડ આપોઆપ મોકલાઈ જાય છે.</span>
              </div>
              <button
                onClick={() => onNavigate('soil')}
                className="px-3 py-1.5 rounded-xl bg-cyan-700 text-white font-bold text-xs shrink-0"
              >
                સર્ટિફિકેટ જનરેટ કરો
              </button>
            </div>
          </div>
        )}

        {/* 4. TRANSPORTER CONSOLE */}
        {role === 'TRANSPORTER' && (
          <div className="bg-white p-6 rounded-3xl border border-amber-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Truck className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">ટ્રાન્સપોર્ટર ફ્લીટ & પેટ્રોલ પંપ ક્રેડિટ ડેસ્ક (Fleet & Fuel Desk)</h3>
                  <p className="text-[11px] text-stone-500">બાબુભાઈ રબારી લોજિસ્ટિક્સ · ૪ વાહનો સક્રિય · Nayara / HPCL ક્રેડિટ કરાર</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('transport')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-500 transition"
              >
                પેટ્રોલ પંપ બિલ જુઓ →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">પેટ્રોલ પંપ ક્રેડિટ લિમિટ:</span>
                <span className="text-lg font-bold text-stone-900">₹1,20,000</span>
                <span className="text-[10px] text-emerald-700 font-bold block">રોકડ વગર ડીઝલ સુવિધા સક્રિય</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">ચાલુ માસિક ડીઝલ બિલ:</span>
                <span className="text-lg font-bold text-amber-800">₹75,600</span>
                <span className="text-[10px] text-stone-500 block">840 લિટર · ચુકવણી ૩૦ ઑક્ટોબર</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">ફ્લીટ ડિસ્કાઉન્ટ બચત:</span>
                <span className="text-lg font-bold text-emerald-700">₹2,100 બચત</span>
                <span className="text-[10px] text-stone-500 block">₹૨.૫૦ / લિટર ડિસ્કાઉન્ટ મળેલ</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">ખેત-થી-મંડી ૩ નવા પીકઅપ ઉપલબ્ધ:</span>
                <span className="text-[11px] text-amber-800">આષ્ટા ગામથી ગોંડલ મંડી ૫ ટન ઘઉં પીકઅપ પેન્ડિંગ.</span>
              </div>
              <button
                onClick={() => onNavigate('transport')}
                className="px-3 py-1.5 rounded-xl bg-amber-700 text-white font-bold text-xs shrink-0"
              >
                ટ્રીપ સ્વીકારો (₹35/km)
              </button>
            </div>
          </div>
        )}

        {/* 5. GOVERNMENT CONSOLE */}
        {role === 'GOVERNMENT' && (
          <div className="bg-white p-6 rounded-3xl border border-emerald-300 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                  <Landmark className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">જિલ્લા કૃષિ અધિકારી કમાન્ડ સેન્ટર (District Govt Command)</h3>
                  <p className="text-[11px] text-stone-500">કૃષિ નિયામક કચેરી · i-Khedut પોર્ટલ & પીએમ-કિસાન DBT વેરિફિકેશન</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('schemes')}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-600 transition"
              >
                જમીન મુજબ યોજનાઓ જુઓ →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">સીમાંત ખેડૂતો (&lt; ૨ એકર):</span>
                <span className="text-lg font-bold text-emerald-800">8,420 ખેડૂત</span>
                <span className="text-[10px] text-stone-500 block">૭૦% ટપક સિંચાઈ સબસિડી લક્ષ્યાંક</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">નાના ખેડૂતો (૨ થી ૫ એકર):</span>
                <span className="text-lg font-bold text-blue-800">4,150 ખેડૂત</span>
                <span className="text-[10px] text-stone-500 block">સોલાર પંપ અને KCC ધિરાણ</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">મોટા ખેડૂતો (&gt; ૫ એકર):</span>
                <span className="text-lg font-bold text-stone-800">1,210 ખેડૂત</span>
                <span className="text-[10px] text-stone-500 block">ટ્રેક્ટર અને ફાર્મ મિકેનાઇઝેશન</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">જિલ્લા જીવાત અલર્ટ બ્રોડકાસ્ટ:</span>
                <span className="text-[11px] text-emerald-800">સૌરાષ્ટ્ર ક્લસ્ટરના ૨૪,૦૦૦ ખેડૂતોને કપાસમાં ગુલાબી ઈયળ સાવચેતી એસએમએસ મોકલો.</span>
              </div>
              <button
                onClick={() => alert('કૃષિ વિભાગ દ્વારા ૨૪,૦૦૦ ખેડૂતોને ગુજરાતીમાં ઈયળ સાવચેતી મેસેજ સફળતાપૂર્વક બ્રોડકાસ્ટ કરવામાં આવ્યો છે.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shrink-0"
              >
                બ્રોડકાસ્ટ કરો
              </button>
            </div>
          </div>
        )}

        {/* 6. AGRO COMPANY CONSOLE */}
        {role === 'AGRO_COMPANY' && (
          <div className="bg-white p-6 rounded-3xl border border-indigo-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                  <Building2 className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">કોર્પોરેટ બલ્ક ખરીદી & ક્વોલિટી એસ્ક્રો ડેસ્ક (Corporate Sourcing Desk)</h3>
                  <p className="text-[11px] text-stone-500">અદાણી વિલ્મર, આઈટીસી, બાલાજી પ્રોક્યોરમેન્ટ · કિસાનસેતુ સંપૂર્ણ રિસ્ક ગેરંટી</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('market')}
                className="px-3 py-1.5 rounded-xl bg-indigo-700 text-white text-xs font-bold hover:bg-indigo-600 transition"
              >
                નવો ખરીદ ટેન્ડર મૂકો →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">સક્રિય ખરીદ ટેન્ડર્સ:</span>
                <span className="text-lg font-bold text-indigo-800">3 મોટા ઓર્ડર્સ</span>
                <span className="text-[10px] text-stone-500 block">મગફળી, બટાટા અને જીરું</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">કિસાનસેતુ ક્વોલિટી પાસ લોટ:</span>
                <span className="text-lg font-bold text-emerald-800">4,150 ક્વિન્ટલ</span>
                <span className="text-[10px] text-stone-500 block">૧૦૦% લેબ સર્ટિફાઇડ લોટ</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">એસ્ક્રો પેમેન્ટ સુરક્ષા:</span>
                <span className="text-lg font-bold text-stone-900">₹45,00,000</span>
                <span className="text-[10px] text-emerald-700 font-bold block">ખેડૂત પેમેન્ટ ૧૦૦% સુરક્ષિત</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">કિસાનસેતુ ગુણવત્તા ગેરંટી:</span>
                <span className="text-[11px] text-indigo-800">ખેડૂતના માલની ચકાસણી અને ડિલિવરી જોખમ કિસાનસેતુ લે છે — કંપની અને ખેડૂત બંને સંપૂર્ણ સુરક્ષિત.</span>
              </div>
              <button
                onClick={() => onNavigate('market')}
                className="px-3 py-1.5 rounded-xl bg-indigo-700 text-white font-bold text-xs shrink-0"
              >
                ઓર્ડર્સ મેનેજ કરો
              </button>
            </div>
          </div>
        )}

        {/* 7. SPONSOR NGO CONSOLE */}
        {role === 'SPONSOR_NGO' && (
          <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <span className="p-2 rounded-xl bg-rose-100 text-rose-800">
                  <Users className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">ફાઉન્ડેશન CSR પારદર્શક લેજર (Foundation Impact Ledger)</h3>
                  <p className="text-[11px] text-stone-500">ટાટા ટ્રસ્ટ, રિલાયન્સ, નાબાર્ડ અનુદાન · ૧૦૦% જાહેર ઓડિટેડ ટ્રેકિંગ</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('water_khater')}
                className="px-3 py-1.5 rounded-xl bg-rose-700 text-white text-xs font-bold hover:bg-rose-600 transition"
              >
                ફંડિંગ લેજર જુઓ →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">કુલ જમા થયેલ CSR ગ્રાન્ટ:</span>
                <span className="text-lg font-bold text-rose-800">₹1,55,00,000</span>
                <span className="text-[10px] text-stone-500 block">૩ સંસ્થાઓ તરફથી અનુદાન</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">લાભાન્વિત ખેડૂતો:</span>
                <span className="text-lg font-bold text-emerald-800">12,450 ખેડૂતો</span>
                <span className="text-[10px] text-stone-500 block">૪૨ ગામડાંઓમાં સીધો લાભ</span>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="text-stone-500 block">મફત સોઇલ કાર્ડ & સોલાર પંપ:</span>
                <span className="text-lg font-bold text-blue-800">1,200 કાર્ડ્સ / 48 પંપ</span>
                <span className="text-[10px] text-stone-500 block">૧૦૦% ચકાસાયેલ ગ્રાઉન્ડ ઈમ્પેક્ટ</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-center justify-between">
              <div>
                <span className="font-bold block">જાહેર ઓડિટેડ ઈમ્પેક્ટ રિપોર્ટ:</span>
                <span className="text-[11px] text-rose-800">કિસાનસેતુ બ્લોકચેન/ડિજિટલ લેજર પર ૧૦૦% પારદર્શક હિસાબ સરકાર અને જનતા માટે ઉપલબ્ધ.</span>
              </div>
              <button
                onClick={() => alert('CSR વાર્ષિક ઓડિટેડ રિપોર્ટ PDF ડાઉનલોડ થઈ ગયો છે.')}
                className="px-3 py-1.5 rounded-xl bg-rose-700 text-white font-bold text-xs shrink-0"
              >
                ઓડિટ રિપોર્ટ ડાઉનલોડ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
