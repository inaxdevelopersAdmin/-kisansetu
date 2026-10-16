import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Bug,
  FlaskConical,
  Truck,
  TrendingUp,
  Landmark,
  Mic,
  Droplets,
  Sprout,
  Sparkles,
} from 'lucide-react';
import { Header } from './components/Header';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { DashboardView } from './views/DashboardView';
import { KhataView } from './views/KhataView';
import { DiagnosisView } from './views/DiagnosisView';
import { SoilView } from './views/SoilView';
import { TransportView } from './views/TransportView';
import { MarketView } from './views/MarketView';
import { SchemesView } from './views/SchemesView';
import { LandingView } from './views/LandingView';
import { WaterAndKhaterView } from './views/WaterAndKhaterView';
import { Language, translations } from './i18n';
import { Role, KhataEntry } from './types';
import { api, getOfflineQueue } from './services/api';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('pitch');
  const [lang, setLang] = useState<Language>('gu');
  const [role, setRole] = useState<Role>('FARMER');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const [roleToast, setRoleToast] = useState<string | null>(null);

  // Khata Global State
  const [khataEntries, setKhataEntries] = useState<KhataEntry[]>([]);
  const [khataSummary, setKhataSummary] = useState({
    totalIncome: 50000,
    totalExpense: 9550,
    netBalance: 40450,
  });
  const [pendingQueueCount, setPendingQueueCount] = useState(0);

  const t = translations[lang];

  // Refresh Khata entries and summary
  const refreshKhata = async () => {
    try {
      const data = await api.getKhata();
      setKhataEntries(data.transactions);
      if (data.summary) {
        setKhataSummary(data.summary);
      }
      setPendingQueueCount(getOfflineQueue().length);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshKhata();

    const handleOnline = () => {
      setIsOnline(true);
      handleSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setCurrentTab('dashboard');
    const roleLabels: Record<Role, { en: string; hi: string; gu: string }> = {
      FARMER: { en: 'Farmer Portal', hi: 'किसान पोर्टल (Farmer)', gu: 'ખેડૂત પોર્ટલ (Farmer)' },
      KHATER_PRODUCER: { en: 'Khater Producer Portal', hi: 'खाद उत्पादक पोर्टल (Khater)', gu: 'ખાતર ઉત્પાદક પોર્ટલ (Khater)' },
      AGRI_LAB: { en: 'Agri Lab Portal', hi: 'मृदा प्रयोगशाला पोर्टल (Lab)', gu: 'જમીન પ્રયોગશાળા પોર્ટલ (Lab)' },
      TRANSPORTER: { en: 'Transporter Portal', hi: 'ट्रांसपोर्टर पोर्टल (Logistics)', gu: 'ટ્રાન્સપોર્ટર પોર્ટલ (Logistics)' },
      GOVERNMENT: { en: 'Govt Officer Portal', hi: 'सरकारी कृषि अधिकारी पोर्टल', gu: 'સરકારી કૃષિ અધિકારી પોર્ટલ' },
      AGRO_COMPANY: { en: 'Agro Procurement Portal', hi: 'कृषि कंपनी पोर्टल (Agro)', gu: 'એગ્રો કંપની ખરીદી પોર્ટલ' },
      SPONSOR_NGO: { en: 'Foundation / NGO Portal', hi: 'सहयोगी संस्था पोर्टल (NGO)', gu: 'સેવા સંસ્થા / ફાઉન્ડેશન પોર્ટલ' },
    };
    setRoleToast(roleLabels[newRole][lang]);
    setTimeout(() => setRoleToast(null), 3000);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await api.syncOfflineQueue();
      await refreshKhata();
    } catch (err) {
      console.warn('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddKhata = async (entry: Omit<KhataEntry, 'id' | 'syncStatus'>) => {
    await api.addKhataEntry(entry);
    await refreshKhata();
  };

  interface NavItem {
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }

  // Role-customized navigation items in English, Hindi, and Gujarati
  const getNavItemsForRole = (): NavItem[] => {
    const common: NavItem[] = [
      { id: 'pitch', label: lang === 'gu' ? 'મુખ્ય પિચ / વિઝન' : lang === 'hi' ? 'पिच प्रेजेंटेशन' : 'Pitch Presentation', icon: Sparkles },
      { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    ];

    switch (role) {
      case 'KHATER_PRODUCER':
        return [
          ...common,
          { id: 'water_khater', label: lang === 'gu' ? 'ખાતર સ્ટોક અને ઓર્ડર' : lang === 'hi' ? 'खाद स्टॉक व ऑर्डर्स' : 'Khater Stock & Orders', icon: Sprout },
          { id: 'schemes', label: lang === 'gu' ? 'ઓર્ગેનિક ખાતર સબસિડી' : lang === 'hi' ? 'जैविक खाद सब्सिडी' : 'Organic Subsidies', icon: Landmark },
          { id: 'khata', label: lang === 'gu' ? 'વેચાણ ખાતાવહી' : lang === 'hi' ? 'बिक्री खाता बही' : 'Sales Khata', icon: BookOpen },
        ];
      case 'AGRI_LAB':
        return [
          ...common,
          { id: 'soil', label: lang === 'gu' ? 'લેબ સેમ્પલ અને ટેસ્ટિંગ' : lang === 'hi' ? 'लैब परीक्षण व नमूने' : 'Lab Soil Testing', icon: FlaskConical },
          { id: 'doctor', label: lang === 'gu' ? 'પાક રોગ માર્ગદર્શન' : lang === 'hi' ? 'फसल रोग परामर्श' : 'Crop Disease Guide', icon: Bug },
          { id: 'schemes', label: lang === 'gu' ? 'લેબ સબસિડી યોજનાઓ' : lang === 'hi' ? 'लैब सब्सिडी योजनाएं' : 'Lab Grants & Schemes', icon: Landmark },
          { id: 'market', label: t.nav.market, icon: TrendingUp },
        ];
      case 'TRANSPORTER':
        return [
          ...common,
          { id: 'transport', label: lang === 'gu' ? 'વાહન ફ્લીટ અને બુકિંગ' : lang === 'hi' ? 'फ्लीट व बुकिंग' : 'Fleet & Dispatch Bookings', icon: Truck },
          { id: 'market', label: lang === 'gu' ? 'માર્કેટ યાર્ડ આવક' : lang === 'hi' ? 'मंडी आवक भाव' : 'Mandi Inflow Rates', icon: TrendingUp },
          { id: 'khata', label: lang === 'gu' ? 'ડીઝલ અને ટ્રીપ ખાતાવહી' : lang === 'hi' ? 'डीजल व ट्रिप खाता' : 'Transit Khata', icon: BookOpen },
        ];
      case 'GOVERNMENT':
        return [
          ...common,
          { id: 'schemes', label: lang === 'gu' ? 'સરકારી યોજનાઓ અને સબસિડી' : lang === 'hi' ? 'सरकारी योजनाएं व सब्सिडी' : 'Schemes & Verification', icon: Landmark },
          { id: 'doctor', label: lang === 'gu' ? 'જિલ્લા રોગ નિયંત્રણ' : lang === 'hi' ? 'जिला कीट प्रकोप मॉनिटरिंग' : 'Pest Outbreak Alert', icon: Bug },
          { id: 'market', label: lang === 'gu' ? 'ટેકાના ભાવ અને બજાર ભાવ' : lang === 'hi' ? 'एमएसपी व थोक भाव' : 'MSP & Price Surveillance', icon: TrendingUp },
          { id: 'soil', label: lang === 'gu' ? 'જિલ્લા જમીન ફળદ્રુપતા' : lang === 'hi' ? 'जिला मृदा स्वास्थ्य' : 'District Soil Health', icon: FlaskConical },
        ];
      case 'AGRO_COMPANY':
        return [
          ...common,
          { id: 'market', label: lang === 'gu' ? 'જથ્થાબંધ પાક ખરીદ' : lang === 'hi' ? 'थोक फसल खरीद व लॉट' : 'Direct Mandi Procurement', icon: TrendingUp },
          { id: 'transport', label: lang === 'gu' ? 'જથ્થાબંધ માલ પરિવહન' : lang === 'hi' ? 'थोक माल परिवहन' : 'Freight Logistics', icon: Truck },
          { id: 'doctor', label: lang === 'gu' ? 'બિયારણ અને ખાતર કેટલોગ' : lang === 'hi' ? 'प्रमाणित बीज व इनपुट' : 'Seed & Input Catalog', icon: Bug },
          { id: 'soil', label: lang === 'gu' ? 'જમીન ઓર્ગેનિક તપાસ' : lang === 'hi' ? 'मृदा प्रमाणन जांच' : 'Soil Quality Verification', icon: FlaskConical },
        ];
      case 'SPONSOR_NGO':
        return [
          ...common,
          { id: 'water_khater', label: lang === 'gu' ? 'CSR ફંડિંગ અને દાન લેજર' : lang === 'hi' ? 'सीएसआर फंडिंग लेजर' : 'CSR Funding Ledger', icon: Droplets },
          { id: 'schemes', label: lang === 'gu' ? 'CSR ગ્રાન્ટ અને સબસિડી' : lang === 'hi' ? 'सीएसआर अनुदान व सहायता' : 'CSR Grants & Subsidies', icon: Landmark },
          { id: 'soil', label: lang === 'gu' ? 'મફત જમીન ટેસ્ટ પ્રોજેક્ટ' : lang === 'hi' ? 'मुफ्त मिट्टी जांच प्रोजेक्ट' : 'Sponsored Soil Testing', icon: FlaskConical },
          { id: 'khata', label: lang === 'gu' ? 'ખેડૂત બચત વિશ્લેષણ' : lang === 'hi' ? 'किसान बचत आंकड़े' : 'Farmer Income Impact', icon: BookOpen },
        ];
      case 'FARMER':
      default:
        return [
          ...common,
          { id: 'water_khater', label: lang === 'gu' ? 'પાણી અને સસ્તું ખાતર' : lang === 'hi' ? 'जल व सस्ता खाद' : 'Water & Khater Hub', icon: Droplets },
          { id: 'khata', label: t.nav.khata, icon: BookOpen, badge: pendingQueueCount > 0 ? pendingQueueCount : undefined },
          { id: 'doctor', label: t.nav.doctor, icon: Bug },
          { id: 'soil', label: t.nav.soil, icon: FlaskConical },
          { id: 'transport', label: t.nav.transport, icon: Truck },
          { id: 'market', label: t.nav.market, icon: TrendingUp },
          { id: 'schemes', label: t.nav.schemes, icon: Landmark },
        ];
    }
  };

  const navItems = getNavItemsForRole();

  return (
    <div className="min-h-screen bg-emerald-50/30 flex flex-col font-sans pb-20 md:pb-6">
      {/* Universal Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isOnline={isOnline}
        pendingSyncCount={pendingQueueCount}
        onSync={handleSync}
        isSyncing={isSyncing}
        onOpenVoice={() => setIsVoiceOpen(true)}
        role={role}
        setRole={handleRoleChange}
      />

      {/* Role Switch Feedback Toast - Light Green Alert */}
      {roleToast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce bg-white text-emerald-950 px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-300 flex items-center space-x-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-semibold text-stone-600">
            {lang === 'gu' ? 'રોલ બદલાયો:' : lang === 'hi' ? 'सक्रिय भूमिका बदली गई:' : 'Active Role Switched to:'}
          </span>
          <strong className="text-emerald-700 font-extrabold">{roleToast}</strong>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop Navigation Sidebar - Crisp Light Card */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 bg-white p-3 rounded-3xl border border-emerald-100 shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'gu' ? 'મેનૂ' : lang === 'hi' ? 'नेविगेशन' : 'Navigation'}</span>
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  {role}
                </span>
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                      active
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-stone-700 hover:bg-emerald-50 hover:text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-emerald-600'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-900">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 mt-3 border-t border-stone-100">
                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 text-white flex items-center space-x-2 text-xs font-bold shadow-md shadow-emerald-600/20 hover:from-emerald-500 hover:to-green-500 transition"
                >
                  <Mic className="w-4 h-4 text-emerald-100 animate-pulse" />
                  <span className="truncate">{t.voiceAssistant}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Active View Content Area */}
          <main className="col-span-1 md:col-span-9 lg:col-span-9">
            {currentTab === 'pitch' && (
              <LandingView
                lang={lang}
                onLaunchApp={() => setCurrentTab('dashboard')}
              />
            )}
            {currentTab === 'dashboard' && (
              <DashboardView
                lang={lang}
                onNavigate={setCurrentTab}
                summary={khataSummary}
                role={role}
                setRole={handleRoleChange}
              />
            )}
            {currentTab === 'khata' && (
              <KhataView
                lang={lang}
                entries={khataEntries}
                summary={khataSummary}
                onAddEntry={handleAddKhata}
                onSync={handleSync}
                pendingCount={pendingQueueCount}
                isSyncing={isSyncing}
                isOnline={isOnline}
              />
            )}
            {currentTab === 'doctor' && <DiagnosisView lang={lang} />}
            {currentTab === 'soil' && <SoilView lang={lang} />}
            {currentTab === 'transport' && <TransportView lang={lang} />}
            {currentTab === 'market' && <MarketView lang={lang} />}
            {currentTab === 'schemes' && <SchemesView lang={lang} />}
            {currentTab === 'water_khater' && <WaterAndKhaterView lang={lang} />}
          </main>
        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg px-2 py-1">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition relative ${
                  active ? 'text-emerald-700 font-extrabold' : 'text-stone-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-emerald-600' : 'text-stone-400'}`} />
                <span className="text-[10px] mt-0.5 truncate max-w-[56px]">{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-amber-400 text-stone-900 text-[9px] font-extrabold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          {/* Quick Voice button on mobile */}
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-emerald-800"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-4 h-4 text-emerald-100" />
            </div>
            <span className="text-[10px] mt-0.5 font-bold">વૉઇસ</span>
          </button>
        </div>
      </nav>

      {/* Vernacular Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        lang={lang}
      />
    </div>
  );
};
