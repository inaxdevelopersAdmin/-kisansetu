import React from 'react';
import { Sprout, Wifi, WifiOff, RefreshCw, Mic, Globe2, UserCheck } from 'lucide-react';
import { Language, translations } from '../i18n';
import { Role } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isOnline: boolean;
  pendingSyncCount: number;
  onSync: () => void;
  isSyncing: boolean;
  onOpenVoice: () => void;
  role: Role;
  setRole: (role: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  isOnline,
  pendingSyncCount,
  onSync,
  isSyncing,
  onOpenVoice,
  role,
  setRole,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 bg-agri-900/95 text-white backdrop-blur-md border-b border-agri-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-agri-600 border border-agri-400 flex items-center justify-center shadow-inner">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  krishi<span className="text-harvest-400">mitara</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-agri-800 border border-agri-600 text-agri-200 uppercase tracking-wider">
                  KisanSetu
                </span>
              </div>
              <p className="text-xs text-agri-300 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center/Right Status & Action controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Online / Offline Sync Indicator */}
            <div className="flex items-center">
              {isOnline ? (
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-600/60">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">{t.online}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-950/80 text-amber-300 border border-amber-600/60">
                  <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="hidden md:inline">{t.offline}</span>
                </div>
              )}
            </div>

            {/* Offline Sync Button */}
            {pendingSyncCount > 0 && (
              <button
                onClick={onSync}
                disabled={isSyncing}
                title="Sync offline records to server"
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-harvest-500 hover:bg-harvest-400 text-agri-950 shadow-sm transition-all animate-bounce"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{pendingSyncCount} {t.pendingSync}</span>
              </button>
            )}

            {/* Voice Assistant Button */}
            <button
              onClick={onOpenVoice}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-agri-600 to-agri-500 hover:from-agri-500 hover:to-agri-400 text-white shadow-sm border border-agri-400/50 transition-all transform active:scale-95"
            >
              <Mic className="w-4 h-4 text-harvest-300 animate-pulse" />
              <span className="hidden sm:inline">{t.voiceAssistant}</span>
            </button>

            {/* Role Switcher */}
            <div className="relative inline-block text-left">
              <div className="flex items-center space-x-1 bg-agri-950/90 border border-harvest-500/80 rounded-xl px-2 py-1 shadow-sm">
                <span className="text-[10px] text-harvest-400 font-bold uppercase hidden lg:inline">Role:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  aria-label="Switch Role"
                  className="bg-transparent text-xs font-bold text-harvest-300 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="FARMER" className="bg-agri-950 text-white">👨‍🌾 {lang === 'hi' ? 'किसान (Farmer)' : 'Farmer'}</option>
                  <option value="AGRI_LAB" className="bg-agri-950 text-white">🔬 {lang === 'hi' ? 'प्रयोगशाला (Agri Lab)' : 'Agri Lab'}</option>
                  <option value="TRANSPORTER" className="bg-agri-950 text-white">🚚 {lang === 'hi' ? 'ट्रांसपोर्टर (Logistics)' : 'Transporter'}</option>
                  <option value="GOVERNMENT" className="bg-agri-950 text-white">🏛️ {lang === 'hi' ? 'सरकारी अधिकारी (Govt)' : 'Govt Officer'}</option>
                  <option value="AGRO_COMPANY" className="bg-agri-950 text-white">🏢 {lang === 'hi' ? 'कृषि कंपनी (Agro Co)' : 'Agro Company'}</option>
                  <option value="SPONSOR_NGO" className="bg-agri-950 text-white">🤝 {lang === 'hi' ? 'सहयोगी संस्था (NGO)' : 'Sponsor/NGO'}</option>
                </select>
              </div>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-agri-800 hover:bg-agri-700 text-harvest-300 border border-agri-600 transition"
              title="Change Language"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
