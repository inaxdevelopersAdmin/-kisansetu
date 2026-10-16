import React from 'react';
import { Sprout, Wifi, WifiOff, RefreshCw, Mic, Globe2 } from 'lucide-react';
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

  const roleLabels: Record<Role, { en: string; hi: string; gu: string }> = {
    FARMER: { en: '👨‍🌾 Farmer', hi: '👨‍🌾 किसान', gu: '👨‍🌾 ખેડૂત' },
    KHATER_PRODUCER: { en: '🌱 Khater Producer', hi: '🌱 खाद उत्पादक', gu: '🌱 ખાતર ઉત્પાદક' },
    AGRI_LAB: { en: '🔬 Agri Lab', hi: '🔬 प्रयोगशाला', gu: '🔬 જમીન લેબ' },
    TRANSPORTER: { en: '🚚 Transporter', hi: '🚚 ट्रांसपोर्टर', gu: '🚚 પરિવહન' },
    GOVERNMENT: { en: '🏛️ Govt Officer', hi: '🏛️ सरकारी अधिकारी', gu: '🏛️ સરકારી અધિકારી' },
    AGRO_COMPANY: { en: '🏢 Agro Company', hi: '🏢 कृषि कंपनी', gu: '🏢 એગ્રો કંપની' },
    SPONSOR_NGO: { en: '🤝 Sponsor / NGO', hi: '🤝 सहयोगी संस्था', gu: '🤝 સેવા સંસ્થા' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white">
              <Sprout className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-xl tracking-tight text-emerald-950">
                  krishi<span className="text-emerald-600">mitara</span>
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                  KisanSetu
                </span>
              </div>
              <p className="text-xs text-emerald-800/80 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Center/Right Status & Action controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Online / Offline Sync Indicator */}
            <div className="flex items-center">
              {isOnline ? (
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm">
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden md:inline">{t.online}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 shadow-sm">
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
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
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-900 shadow-sm transition-all animate-bounce"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{pendingSyncCount} {t.pendingSync}</span>
              </button>
            )}

            {/* Voice Assistant Button */}
            <button
              onClick={onOpenVoice}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white shadow-sm shadow-emerald-600/20 border border-emerald-400/40 transition-all transform active:scale-95"
            >
              <Mic className="w-4 h-4 text-emerald-100 animate-pulse" />
              <span className="hidden sm:inline">{t.voiceAssistant}</span>
            </button>

            {/* Role Switcher */}
            <div className="relative inline-block text-left">
              <div className="flex items-center space-x-1.5 bg-emerald-50 border border-emerald-300 rounded-xl px-2.5 py-1.5 shadow-sm">
                <span className="text-[10px] text-emerald-800 font-extrabold uppercase hidden lg:inline">Role:</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  aria-label="Switch Role"
                  className="bg-transparent text-xs font-bold text-emerald-900 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="FARMER">{roleLabels.FARMER[lang]}</option>
                  <option value="AGRI_LAB">{roleLabels.AGRI_LAB[lang]}</option>
                  <option value="TRANSPORTER">{roleLabels.TRANSPORTER[lang]}</option>
                  <option value="GOVERNMENT">{roleLabels.GOVERNMENT[lang]}</option>
                  <option value="AGRO_COMPANY">{roleLabels.AGRO_COMPANY[lang]}</option>
                  <option value="SPONSOR_NGO">{roleLabels.SPONSOR_NGO[lang]}</option>
                </select>
              </div>
            </div>

            {/* 3-Way Language Toggle (English / हिन्दी / ગુજરાતી) */}
            <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  lang === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  lang === 'hi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="हिन्दी"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang('gu')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  lang === 'gu'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="ગુજરાતી"
              >
                ગુજરાતી
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
