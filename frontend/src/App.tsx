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
  Building2,
  Users,
  ShieldAlert,
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
import { Language, translations } from './i18n';
import { Role, KhataEntry } from './types';
import { api, getOfflineQueue } from './services/api';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [lang, setLang] = useState<Language>('hi');
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
    const roleLabels: Record<Role, string> = {
      FARMER: lang === 'hi' ? 'किसान (Farmer)' : 'Farmer',
      AGRI_LAB: lang === 'hi' ? 'मृदा प्रयोगशाला (Agri Lab)' : 'Agri Lab Specialist',
      TRANSPORTER: lang === 'hi' ? 'ट्रांसपोर्टर (Logistics)' : 'Transporter Hub',
      GOVERNMENT: lang === 'hi' ? 'सरकारी कृषि अधिकारी (Govt)' : 'Govt Extension Officer',
      AGRO_COMPANY: lang === 'hi' ? 'कृषि कंपनी (Agro Co)' : 'Agro Procurement Buyer',
      SPONSOR_NGO: lang === 'hi' ? 'सहयोगी संस्था (NGO)' : 'Sponsor / NGO Director',
    };
    setRoleToast(roleLabels[newRole]);
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

  // Role-customized navigation items
  const getNavItemsForRole = (): NavItem[] => {
    const common: NavItem[] = [
      { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    ];

    switch (role) {
      case 'AGRI_LAB':
        return [
          ...common,
          { id: 'soil', label: lang === 'hi' ? 'लैब परीक्षण व नमूने' : 'Lab Soil Testing', icon: FlaskConical },
          { id: 'doctor', label: lang === 'hi' ? 'फसल रोग परामर्श' : 'Crop Disease Guide', icon: Bug },
          { id: 'schemes', label: lang === 'hi' ? 'लैब सब्सिडी योजनाएं' : 'Lab Grants & Schemes', icon: Landmark },
          { id: 'market', label: t.nav.market, icon: TrendingUp },
        ];
      case 'TRANSPORTER':
        return [
          ...common,
          { id: 'transport', label: lang === 'hi' ? 'फ्लीट व बुकिंग' : 'Fleet & Dispatch Bookings', icon: Truck },
          { id: 'market', label: lang === 'hi' ? 'मंडी आवक भाव' : 'Mandi Inflow Rates', icon: TrendingUp },
          { id: 'khata', label: lang === 'hi' ? 'डीजल व ट्रिप खाता' : 'Transit Khata', icon: BookOpen },
        ];
      case 'GOVERNMENT':
        return [
          ...common,
          { id: 'schemes', label: lang === 'hi' ? 'सरकारी योजनाएं व सब्सिडी' : 'Schemes & Verification', icon: Landmark },
          { id: 'doctor', label: lang === 'hi' ? 'जिला कीट प्रकोप मॉनिटरिंग' : 'Pest Outbreak Alert', icon: Bug },
          { id: 'market', label: lang === 'hi' ? 'एमएसपी व थोक भाव' : 'MSP & Price Surveillance', icon: TrendingUp },
          { id: 'soil', label: lang === 'hi' ? 'जिला मृदा स्वास्थ्य' : 'District Soil Health', icon: FlaskConical },
        ];
      case 'AGRO_COMPANY':
        return [
          ...common,
          { id: 'market', label: lang === 'hi' ? 'थोक फसल खरीद व लॉट' : 'Direct Mandi Procurement', icon: TrendingUp },
          { id: 'transport', label: lang === 'hi' ? 'थोक माल परिवहन' : 'Freight Logistics', icon: Truck },
          { id: 'doctor', label: lang === 'hi' ? 'प्रमाणित बीज व इनपुट' : 'Seed & Input Catalog', icon: Bug },
          { id: 'soil', label: lang === 'hi' ? 'मृदा प्रमाणन जांच' : 'Soil Quality Verification', icon: FlaskConical },
        ];
      case 'SPONSOR_NGO':
        return [
          ...common,
          { id: 'schemes', label: lang === 'hi' ? 'सीएसआर अनुदान व सहायता' : 'CSR Grants & Subsidies', icon: Landmark },
          { id: 'soil', label: lang === 'hi' ? 'मुफ्त मिट्टी जांच प्रोजेक्ट' : 'Sponsored Soil Testing', icon: FlaskConical },
          { id: 'khata', label: lang === 'hi' ? 'किसान बचत आंकड़े' : 'Farmer Income Impact', icon: BookOpen },
          { id: 'doctor', label: lang === 'hi' ? 'जैविक खेती कार्यशालाएं' : 'Organic Training', icon: Bug },
        ];
      case 'FARMER':
      default:
        return [
          ...common,
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
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans pb-20 md:pb-6">
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

      {/* Role Switch Feedback Toast */}
      {roleToast && (
        <div className="fixed top-20 right-4 z-50 animate-bounce bg-agri-950 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-harvest-400/60 flex items-center space-x-2 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-harvest-400 animate-ping" />
          <span className="font-semibold text-agri-200">
            {lang === 'hi' ? 'सक्रिय भूमिका बदली गई:' : 'Active Role Switched to:'}
          </span>
          <strong className="text-harvest-300 font-extrabold">{roleToast}</strong>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop Navigation Sidebar */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 glass-panel p-3 rounded-3xl border border-stone-200/80 shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
                <span>{lang === 'hi' ? 'नेविगेशन' : 'Workspace Navigation'}</span>
                <span className="text-[10px] text-agri-700 font-extrabold uppercase bg-agri-100 px-1.5 py-0.5 rounded">
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
                        ? 'bg-agri-800 text-white shadow-sm'
                        : 'text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-harvest-400' : 'text-stone-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-agri-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-stone-200">
                <button
                  onClick={() => setIsVoiceOpen(true)}
                  className="w-full p-3 rounded-2xl bg-gradient-to-r from-agri-800 to-agri-900 text-white flex items-center space-x-2 text-xs font-bold shadow-md hover:from-agri-700 hover:to-agri-800 transition"
                >
                  <Mic className="w-4 h-4 text-harvest-300 animate-pulse" />
                  <span className="truncate">{t.voiceAssistant}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Active View Content Area */}
          <main className="col-span-1 md:col-span-9 lg:col-span-9">
            {currentTab === 'dashboard' && (
              <DashboardView
                lang={lang}
                onNavigate={setCurrentTab}
                summary={khataSummary}
                role={role}
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
          </main>
        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition relative ${
                  active ? 'text-agri-800 font-bold' : 'text-stone-500'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-agri-700' : 'text-stone-400'}`} />
                <span className="text-[10px] mt-0.5 truncate max-w-[56px]">{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-amber-500 text-agri-950 text-[9px] font-extrabold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          {/* Quick Voice button on mobile */}
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 rounded-xl text-agri-800"
          >
            <div className="w-7 h-7 rounded-full bg-agri-700 text-white flex items-center justify-center shadow-sm">
              <Mic className="w-4 h-4 text-harvest-300" />
            </div>
            <span className="text-[10px] mt-0.5 font-bold">Voice</span>
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
