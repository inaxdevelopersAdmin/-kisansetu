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
  ArrowUpRight,
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

  // Role Profile Metas
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
      badge: lang === 'hi' ? '👨‍🌾 पंजीकृत किसान प्रोफाइल' : '👨‍🌾 Verified Farmer Profile',
      name: lang === 'hi' ? 'रमेश पटेल (किसान)' : 'Ramesh Patel (Farmer)',
      title: lang === 'hi' ? '8.5 एकड़ रकबा · गेहूं व सोयाबीन' : '8.5 Acres Land · Wheat & Soybean',
      location: lang === 'hi' ? 'सीहोर, मध्य प्रदेश' : 'Sehore, Madhya Pradesh',
      stats: [
        {
          title: t.dashboard.netBalance,
          value: `₹${summary.netBalance.toLocaleString('en-IN')}`,
          subtext: `₹${summary.totalIncome.toLocaleString('en-IN')} earned / ₹${summary.totalExpense.toLocaleString('en-IN')} input cost`,
          icon: IndianRupee,
          color: 'emerald',
          targetTab: 'khata',
        },
        {
          title: lang === 'hi' ? 'आज का गेहूं मंडी भाव' : 'Today Wheat Mandi Rate',
          value: '₹2,820 / Qtl',
          subtext: '+₹40 up from yesterday (Sehore Mandi)',
          icon: TrendingUp,
          color: 'harvest',
          targetTab: 'market',
        },
        {
          title: t.dashboard.pendingSoilTests,
          value: '1 Ready · 1 In-Lab',
          subtext: 'Soil Health Card ready (KVK Lab)',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
      ],
      actions: [
        { title: t.dashboard.addIncomeExpense, subtitle: lang === 'hi' ? 'ऑफलाइन खाता बही' : 'Offline Farm Ledger', icon: BookOpen, color: 'emerald', tab: 'khata' },
        { title: t.dashboard.scanCrop, subtitle: lang === 'hi' ? 'एआई फसल डॉक्टर' : 'AI Disease Scan', icon: Bug, color: 'red', tab: 'doctor' },
        { title: t.dashboard.orderSoilTest, subtitle: lang === 'hi' ? 'डिजिटल सॉइल कार्ड' : 'Soil Nutrient Test', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: t.dashboard.bookTractor, subtitle: lang === 'hi' ? 'खेत से मंडी वाहन' : 'Farm-to-Mandi Dispatch', icon: Truck, color: 'amber', tab: 'transport' },
      ],
      alert: {
        type: 'warning',
        title: lang === 'hi' ? 'कृषि विभाग कीट चेतावनी (Zaid 2026): ' : 'Agriculture Warning: ',
        text: lang === 'hi'
          ? 'मूंग की फसल में पीला मोजेक वायरस (YMV) से बचाव हेतु सफेद मक्खी का नियंत्रण करें। थायमेथोक्सम 25% WG का छिड़काव करें।'
          : 'Control whiteflies in summer moong to stop Yellow Mosaic Virus using Thiamethoxam 25% WG.',
      },
    },

    AGRI_LAB: {
      badge: lang === 'hi' ? '🔬 प्रमाणित मृदा व जल प्रयोगशाला' : '🔬 Certified Agri Testing Lab',
      name: lang === 'hi' ? 'कृषि विज्ञान केंद्र मृदा प्रयोगशाला' : 'KVK Soil & Water Testing Center',
      title: lang === 'hi' ? 'लाइसेंस: MP-AGRI-LAB-2024 · ISO 17025' : 'License: MP-AGRI-LAB-2024 · ISO 17025',
      location: lang === 'hi' ? 'भोपाल व सीहोर संभाग' : 'Bhopal & Sehore Division',
      stats: [
        {
          title: lang === 'hi' ? 'जांच हेतु लंबित नमूने' : 'Pending Sample Queue',
          value: '18 Samples',
          subtext: '7 urgent (Pre-Sowing Cotton)',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
        {
          title: lang === 'hi' ? 'जारी किए गए सॉइल कार्ड' : 'Issued Health Cards',
          value: '428 Cards',
          subtext: 'Delivered digitally to farmers',
          icon: Award,
          color: 'emerald',
          targetTab: 'soil',
        },
        {
          title: lang === 'hi' ? 'औसत रिपोर्ट समय' : 'Avg Turnaround Time',
          value: '2.4 Days',
          subtext: 'Target SLA: < 3.0 Days',
          icon: Clock,
          color: 'amber',
          targetTab: 'soil',
        },
      ],
      actions: [
        { title: lang === 'hi' ? 'नमूना जांच रिकॉर्ड करें' : 'Record Test Results', subtitle: lang === 'hi' ? 'NPK व pH मान दर्ज करें' : 'Enter NPK & pH values', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: lang === 'hi' ? 'सॉइल हेल्थ कार्ड जारी करें' : 'Issue Soil Cards', subtitle: lang === 'hi' ? 'किसान को डिजिटल कार्ड भेजें' : 'Send digital card to farmer', icon: Award, color: 'emerald', tab: 'soil' },
        { title: lang === 'hi' ? 'खाद सिफारिश तैयार करें' : 'Prescribe Dosage', subtitle: lang === 'hi' ? 'वैज्ञानिक उर्वरक सलाह' : 'Agronomist advisory', icon: FileCheck, color: 'harvest', tab: 'soil' },
        { title: lang === 'hi' ? 'सरकारी लैब सब्सिडी' : 'Lab Grants & Subsidies', subtitle: lang === 'hi' ? 'परीक्षण अनुदान स्थिति' : 'Soil Mission funding', icon: IndianRupee, color: 'purple', tab: 'schemes' },
      ],
      alert: {
        type: 'info',
        title: lang === 'hi' ? 'राष्ट्रीय मृदा स्वास्थ्य मिशन अपडेट: ' : 'Soil Mission SLA: ',
        text: lang === 'hi'
          ? 'खरीफ बुवाई पूर्व सभी मिट्टी नमूनों की डिजिटल रिपोर्ट 72 घंटे के भीतर किसान सेतु पोर्टल पर अपलोड करना अनिवार्य है।'
          : 'All pre-Kharif soil health samples must be processed and uploaded to Krishimitara portal within 72 hours.',
      },
    },

    TRANSPORTER: {
      badge: lang === 'hi' ? '🚚 पंजीकृत कृषि परिवहन फ्लीट' : '🚚 Registered Agro Transport Fleet',
      name: lang === 'hi' ? 'गुरकीरत लॉजिस्टिक्स व रूरल कार्गो' : 'Gurkirat Logistics & Rural Cargo',
      title: lang === 'hi' ? '6 वाहन सक्रिय · 8-14 टन ट्रैक्टर व ट्रक' : '6 Active Vehicles · 8-14T Fleet',
      location: lang === 'hi' ? 'लुधियाना व मध्य प्रदेश कॉरिडोर' : 'Punjab & Central MP Mandi Hub',
      stats: [
        {
          title: lang === 'hi' ? 'आज की मंडी बुकिंग' : "Today's Mandi Bookings",
          value: '4 Trips',
          subtext: '28.5 Tonnes wheat scheduled',
          icon: Truck,
          color: 'amber',
          targetTab: 'transport',
        },
        {
          title: lang === 'hi' ? 'साप्ताहिक परिवहन आय' : 'Weekly Transit Revenue',
          value: '₹34,800',
          subtext: 'Average ₹42/km across 6 vehicles',
          icon: IndianRupee,
          color: 'emerald',
          targetTab: 'transport',
        },
        {
          title: lang === 'hi' ? 'ड्राइवर रेटिंग' : 'Transporter Rating',
          value: '4.8 ★',
          subtext: 'Based on 94 farmer trips',
          icon: ShieldCheck,
          color: 'harvest',
          targetTab: 'transport',
        },
      ],
      actions: [
        { title: lang === 'hi' ? 'नया वाहन फ्लीट में जोड़ें' : 'Add Vehicle to Fleet', subtitle: lang === 'hi' ? 'ट्रैक्टर-ट्रॉली या पिकअप' : 'List truck or trolley', icon: Truck, color: 'amber', tab: 'transport' },
        { title: lang === 'hi' ? 'मंडी बुकिंग स्वीकारें' : 'View Dispatch Requests', subtitle: lang === 'hi' ? 'किसानों के सीधे अनुरोध' : 'Direct farmer pickup orders', icon: CheckCircle2, color: 'emerald', tab: 'transport' },
        { title: lang === 'hi' ? 'रूट व किराया तय करें' : 'Update Per-Km Rates', subtitle: lang === 'hi' ? 'पारदर्शी दूरी कैलकुलेटर' : 'Transparent route calculator', icon: TrendingUp, color: 'blue', tab: 'transport' },
        { title: lang === 'hi' ? 'मंडी आवक भाव देखें' : 'Check APMC Arrivals', subtitle: lang === 'hi' ? 'भीड़ व लोडिंग समय' : 'Mandi congestion index', icon: BarChart3, color: 'harvest', tab: 'market' },
      ],
      alert: {
        type: 'info',
        title: lang === 'hi' ? 'सीहोर मंडी रूट सूचना: ' : 'Mandi Route Traffic Notice: ',
        text: lang === 'hi'
          ? 'सीहोर कृषि उपज मंडी में गेहूं की बंपर आवक जारी है। गेट नंबर 2 से भारी ट्रैक्टर-ट्रॉलियों का प्रवेश खुला है।'
          : 'High grain inflow reported at Sehore APMC Mandi. Gate #2 designated for heavy tractor-trolley unloading.',
      },
    },

    GOVERNMENT: {
      badge: lang === 'hi' ? '🏛️ कृषि कल्याण व किसान विकास विभाग' : '🏛️ Department of Agriculture & Farmers Welfare',
      name: lang === 'hi' ? 'डॉ. एस. के. वर्मा (जिला कृषि अधिकारी)' : 'Dr. S. K. Verma (District Agri Officer)',
      title: lang === 'hi' ? 'जिला कृषि नोडल अधिकारी · मध्य प्रदेश' : 'District Nodal Officer · Madhya Pradesh',
      location: lang === 'hi' ? 'कलेक्ट्रेट परिसर, भोपाल / सीहोर' : 'District Collectorate, Bhopal / Sehore',
      stats: [
        {
          title: lang === 'hi' ? 'पीएम-किसान ई-केवाईसी सत्यापन' : 'PM-KISAN eKYC Verification',
          value: '94.2%',
          subtext: '12,410 farmers verified in district',
          icon: Users,
          color: 'emerald',
          targetTab: 'schemes',
        },
        {
          title: lang === 'hi' ? 'क्षेत्रीय फसल रोग अलर्ट' : 'District Pest Alerts',
          value: '2 Active',
          subtext: 'Yellow Rust advisory broadcasted',
          icon: Bug,
          color: 'red',
          targetTab: 'doctor',
        },
        {
          title: lang === 'hi' ? 'मंडी मूल्य निगरानी' : 'Mandi MSP Surveillance',
          value: '₹2,820 (Wheat)',
          subtext: 'Above MSP (₹2,275/Qtl)',
          icon: BarChart3,
          color: 'blue',
          targetTab: 'market',
        },
      ],
      actions: [
        { title: lang === 'hi' ? 'कृषि सलाह प्रसारित करें' : 'Broadcast Agri Advisory', subtitle: lang === 'hi' ? 'मौसम व कीट सुरक्षा चेतावनी' : 'Weather & pest outbreak alerts', icon: Send, color: 'blue', tab: 'doctor' },
        { title: lang === 'hi' ? 'सरकारी योजनाएं प्रबंधित करें' : 'Manage Gov Schemes', subtitle: lang === 'hi' ? 'सब्सिडी व केसीसी आवेदन' : 'Approve KCC & Kusum grants', icon: Building2, color: 'purple', tab: 'schemes' },
        { title: lang === 'hi' ? 'मंडी थोक भाव निगरानी' : 'Monitor Mandi Prices', subtitle: lang === 'hi' ? 'एमएसपी व बाजार भाव जांच' : 'Wholesale trade compliance', icon: TrendingUp, color: 'harvest', tab: 'market' },
        { title: lang === 'hi' ? 'मृदा स्वास्थ्य सूचकांक' : 'Soil Health Index', subtitle: lang === 'hi' ? 'जिले की उर्वरता रिपोर्ट' : 'District nutrient mapping', icon: FlaskConical, color: 'emerald', tab: 'soil' },
      ],
      alert: {
        type: 'critical',
        title: lang === 'hi' ? 'अधिकारिक निर्देश (Advisory Notice): ' : 'Official Notice: ',
        text: lang === 'hi'
          ? 'प्रधानमंत्री फसल बीमा योजना (PMFBY) क्लेम सत्यापन हेतु ब्लॉक स्तर पर शिविर 20 अप्रैल से आयोजित किए जाएंगे।'
          : 'Block-level verification camps for PMFBY crop insurance claims will commence from April 20.',
      },
    },

    AGRO_COMPANY: {
      badge: lang === 'hi' ? '🏢 कृषि इनपुट व थोक खरीददार' : '🏢 Agro Inputs & Direct Procurement Partner',
      name: lang === 'hi' ? 'किसान एग्रो सीड्स एंड प्रोक्योरमेंट' : 'Kisan Agro Seeds & Procurement Corp',
      title: lang === 'hi' ? 'प्रमाणित बीज विक्रेता व एफपीओ क्रेता' : 'Certified Seed Partner & FPO Buyer',
      location: lang === 'hi' ? 'पुणे व इंदौर कॉर्पोरेट ऑफिस' : 'Pune & Indore Hub',
      stats: [
        {
          title: lang === 'hi' ? 'सक्रिय फसल खरीद लॉट' : 'Active Farmer Crop Lots',
          value: '385 Qtl',
          subtext: 'Sharbati Wheat & Organic Soybean',
          icon: Building2,
          color: 'harvest',
          targetTab: 'market',
        },
        {
          title: lang === 'hi' ? 'सीधे किसान अनुबंध' : 'Contract Farmers',
          value: '64 Farmers',
          subtext: 'Zero broker commission contract',
          icon: Users,
          color: 'emerald',
          targetTab: 'market',
        },
        {
          title: lang === 'hi' ? 'ट्रांसपोर्ट लॉजिस्टिक्स' : 'Dispatch Bookings',
          value: '8 Trucks Out',
          subtext: 'Central warehouse transit',
          icon: Truck,
          color: 'blue',
          targetTab: 'transport',
        },
      ],
      actions: [
        { title: lang === 'hi' ? 'किसानों से सीधी खरीद' : 'Browse Farmer Lots', subtitle: lang === 'hi' ? 'मंडी से बेहतर भाव पर सौदा' : 'Direct procurement bids', icon: TrendingUp, color: 'emerald', tab: 'market' },
        { title: lang === 'hi' ? 'थोक परिवहन बुक करें' : 'Book Bulk Transport', subtitle: lang === 'hi' ? 'गोदाम तक माल परिवहन' : 'Warehouse freight dispatch', icon: Truck, color: 'amber', tab: 'transport' },
        { title: lang === 'hi' ? 'प्रमाणित बीज व खाद कैटलॉग' : 'Input Products Catalog', subtitle: lang === 'hi' ? 'उच्च गुणवत्ता वाले बीज' : 'Certified inputs supply', icon: Award, color: 'purple', tab: 'doctor' },
        { title: lang === 'hi' ? 'सॉइल टेस्ट ग्रेडिंग देखें' : 'Inspect Soil Quality', subtitle: lang === 'hi' ? 'ऑर्गेनिक प्रमाणन जांच' : 'Organic certification index', icon: FlaskConical, color: 'blue', tab: 'soil' },
      ],
      alert: {
        type: 'info',
        title: lang === 'hi' ? 'थोक खरीद आवश्यकता: ' : 'Procurement Requirement: ',
        text: lang === 'hi'
          ? 'सीहोर व देवास क्षेत्र से 200 क्विंटल शरबती गेहूं (C-306 किस्म) की तत्काल खरीद हेतु आवेदन आमंत्रित हैं।'
          : 'Seeking immediate direct procurement of 200 quintals Sharbati Wheat (C-306) from Sehore/Dewas farmers.',
      },
    },

    SPONSOR_NGO: {
      badge: lang === 'hi' ? '🤝 ग्रामीण विकास ट्रस्ट व एनजीओ' : '🤝 Rural Upliftment Trust & NGO Partner',
      name: lang === 'hi' ? 'ग्रामीण किसान विकास फाउंडेशन' : 'Gramin Kisan Development Foundation',
      title: lang === 'hi' ? 'सीएसआर एग्रीकल्चर एंपावरमेंट प्रोजेक्ट' : 'CSR Agri Empowerment Project',
      location: lang === 'hi' ? 'मध्य प्रदेश व राजस्थान क्लस्टर' : 'MP & Rajasthan Rural Cluster',
      stats: [
        {
          title: lang === 'hi' ? 'प्रायोजित मृदा परीक्षण' : 'Subsidized Soil Tests',
          value: '150 Tests',
          subtext: '100% grant funded for marginal farmers',
          icon: FlaskConical,
          color: 'blue',
          targetTab: 'soil',
        },
        {
          title: lang === 'hi' ? 'प्रशिक्षित महिला किसान' : 'Trained Women Farmers',
          value: '320 Trained',
          subtext: 'Organic pest management workshop',
          icon: Users,
          color: 'emerald',
          targetTab: 'schemes',
        },
        {
          title: lang === 'hi' ? 'कुल सीएसआर अनुदान' : 'CSR Grant Deployed',
          value: '₹8,50,000',
          subtext: 'Solar pumps & drip subsidies',
          icon: IndianRupee,
          color: 'purple',
          targetTab: 'schemes',
        },
      ],
      actions: [
        { title: lang === 'hi' ? 'मुफ्त मिट्टी जांच स्पॉन्सर करें' : 'Sponsor Free Soil Tests', subtitle: lang === 'hi' ? 'सीमांत किसानों हेतु सहायता' : 'Grants for small farmers', icon: FlaskConical, color: 'blue', tab: 'soil' },
        { title: lang === 'hi' ? 'सोलर पंप सहायता योजना' : 'Solar Pump Assistance', subtitle: lang === 'hi' ? 'कुसुम योजना टॉप-अप अनुदान' : 'PM-Kusum top-up subsidy', icon: Sun, color: 'harvest', tab: 'schemes' },
        { title: lang === 'hi' ? 'कृषि कार्यशालाएं देखें' : 'View Training Workshops', subtitle: lang === 'hi' ? 'प्राकृतिक खेती प्रशिक्षण' : 'Natural farming camps', icon: Calendar, color: 'emerald', tab: 'doctor' },
        { title: lang === 'hi' ? 'पारदर्शी किसान डायरी' : 'Community Impact Khata', subtitle: lang === 'hi' ? 'बचत व आय वृद्धि आंकड़े' : 'Track farmer income growth', icon: BookOpen, color: 'amber', tab: 'khata' },
      ],
      alert: {
        type: 'info',
        title: lang === 'hi' ? 'सीएसआर अनुदान घोषणा: ' : 'CSR Impact Announcement: ',
        text: lang === 'hi'
          ? 'छोटे व सीमांत किसानों हेतु 200 नए सोलर पंपों पर 20% अतिरिक्त एनजीओ सब्सिडी को स्वीकृति प्रदान कर दी गई है।'
          : 'Approved additional 20% CSR grant on 200 solar irrigation pumps for marginal farmers.',
      },
    },
  };

  const currentProfile = roleProfiles[role] || roleProfiles.FARMER;

  return (
    <div className="space-y-6">
      {/* Top Welcome & Role Identity Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-900 via-agri-800 to-agri-950 text-white p-6 md:p-8 shadow-xl border border-agri-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-agri-800/90 border border-agri-600 text-harvest-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>{currentProfile.badge}</span>
              <span>•</span>
              <span>{currentProfile.location}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
              {currentProfile.name}
            </h1>
            <p className="mt-1 text-sm text-agri-200 max-w-xl font-medium">
              {currentProfile.title}
            </p>
          </div>

          {/* Weather & Date Card */}
          <div className="glass-dark p-4 rounded-2xl flex items-center space-x-4 border border-agri-600/50 shadow-inner shrink-0">
            <div className="p-3 rounded-xl bg-harvest-400/20 text-harvest-300">
              <Sun className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-agri-300 tracking-wider">
                {t.dashboard.weather}
              </div>
              <div className="text-lg font-display font-bold text-white">
                31°C · Sunny (साफ मौसम)
              </div>
              <div className="text-[11px] text-agri-200 mt-0.5 max-w-[200px] truncate">
                {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
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
              className="cursor-pointer glass-panel p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200 hover:border-agri-500 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div
                  className={`p-2 rounded-xl transition ${
                    stat.color === 'emerald'
                      ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                      : stat.color === 'blue'
                      ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                      : stat.color === 'red'
                      ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'
                      : stat.color === 'amber'
                      ? 'bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white'
                      : 'bg-harvest-50 text-harvest-700 group-hover:bg-harvest-500 group-hover:text-white'
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
            : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}
      >
        <AlertTriangle
          className={`w-5 h-5 shrink-0 mt-0.5 ${
            currentProfile.alert.type === 'warning'
              ? 'text-amber-600'
              : currentProfile.alert.type === 'critical'
              ? 'text-rose-600'
              : 'text-blue-600'
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
            {lang === 'hi'
              ? `${currentProfile.name.split(' ')[0]} कार्यक्षेत्र व टूल्स`
              : `${role.replace('_', ' ')} Operations & Quick Utilities`}
          </h2>
          <span className="text-xs text-stone-500">
            {lang === 'hi' ? 'भूमिका के अनुसार अनुकूलित' : 'Tailored for active role'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {currentProfile.actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(act.tab)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 hover:border-agri-500 hover:shadow-md transition text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-105 transition ${
                    act.color === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : act.color === 'blue'
                      ? 'bg-blue-100 text-blue-800'
                      : act.color === 'red'
                      ? 'bg-red-100 text-red-800'
                      : act.color === 'amber'
                      ? 'bg-amber-100 text-amber-800'
                      : act.color === 'purple'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-harvest-100 text-harvest-800'
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
