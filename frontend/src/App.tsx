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

    // Initial check
    api.checkHealth().then((healthy) => {
      if (!healthy && isOnline) {
        console.warn('Backend server is not running or unreachable on port 4000');
      }
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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

  const navItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'khata', label: t.nav.khata, icon: BookOpen, badge: pendingQueueCount > 0 ? pendingQueueCount : undefined },
    { id: 'doctor', label: t.nav.doctor, icon: Bug },
    { id: 'soil', label: t.nav.soil, icon: FlaskConical },
    { id: 'transport', label: t.nav.transport, icon: Truck },
    { id: 'market', label: t.nav.market, icon: TrendingUp },
    { id: 'schemes', label: t.nav.schemes, icon: Landmark },
  ];

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
        setRole={setRole}
      />

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop Navigation Sidebar */}
          <aside className="hidden md:block md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 glass-panel p-3 rounded-3xl border border-stone-200/80 shadow-sm space-y-1">
              <div className="px-3 py-2 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                {lang === 'hi' ? 'मुख्य मेनू' : 'Main Menu'}
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
                      <span>{item.label}</span>
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
