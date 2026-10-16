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
} from 'lucide-react';
import { Language, translations } from '../i18n';
import { Role } from '../types';

interface DashboardViewProps {
  lang: Language;
  onNavigate: (tab: string) => void;
  summary: { totalIncome: number; totalExpense: number; netBalance: number };
  role: Role;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  onNavigate,
  summary,
  role,
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

  return (
    <div className="space-y-6">
      {/* Top Welcome & Role Identity Banner - Fresh Light Green Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white p-6 md:p-8 shadow-lg shadow-emerald-700/10 border border-emerald-400/30">
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
    </div>
  );
};
