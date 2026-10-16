import React from 'react';
import { Sun, CloudRain, AlertTriangle, TrendingUp, BookOpen, Bug, FlaskConical, Truck, IndianRupee, ArrowUpRight } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      {/* Top Welcome & Alert Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-agri-900 via-agri-800 to-agri-950 text-white p-6 md:p-8 shadow-xl border border-agri-700">
        <div className="absolute top-0 right-0 w-96 h-96 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-agri-800/80 border border-agri-600 text-harvest-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>🌾 {lang === 'hi' ? 'सीहोर, मध्य प्रदेश' : 'Sehore, Madhya Pradesh'}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
              {t.dashboard.greeting}
            </h1>
            <p className="mt-1 text-sm text-agri-200 max-w-xl">
              {t.dashboard.subtitle}
            </p>
          </div>

          {/* Weather Widget */}
          <div className="glass-dark p-4 rounded-2xl flex items-center space-x-4 border border-agri-600/50 shadow-inner">
            <div className="p-3 rounded-xl bg-harvest-400/20 text-harvest-300">
              <Sun className="w-8 h-8 animate-spin-slow" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-agri-300 tracking-wider">
                {t.dashboard.weather}
              </div>
              <div className="text-xl font-display font-bold text-white">
                31°C · Sunny (साफ धूप)
              </div>
              <div className="text-xs text-agri-200 mt-0.5 line-clamp-1 max-w-xs">
                {t.dashboard.weatherAlert}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Farm Net Savings / Ledger */}
        <div
          onClick={() => onNavigate('khata')}
          className="cursor-pointer glass-panel p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200 hover:border-agri-500 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {t.dashboard.netBalance}
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-extrabold text-stone-900">
            ₹{summary.netBalance.toLocaleString('en-IN')}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-700 space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>₹{summary.totalIncome.toLocaleString('en-IN')} earned / ₹{summary.totalExpense.toLocaleString('en-IN')} input cost</span>
          </div>
        </div>

        {/* Mandi Price Watch */}
        <div
          onClick={() => onNavigate('market')}
          className="cursor-pointer glass-panel p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200 hover:border-harvest-500 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'hi' ? 'आज का गेहूं भाव' : 'Today Wheat APMC Rate'}
            </span>
            <div className="p-2 rounded-xl bg-harvest-50 text-harvest-700 group-hover:bg-harvest-500 group-hover:text-white transition">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-extrabold text-stone-900">
            ₹2,820 <span className="text-sm font-normal text-stone-500">/ Quintal</span>
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-700 space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+₹40 up from yesterday at Sehore Mandi</span>
          </div>
        </div>

        {/* Soil Health Status */}
        <div
          onClick={() => onNavigate('soil')}
          className="cursor-pointer glass-panel p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200 hover:border-soil-500 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {t.dashboard.pendingSoilTests}
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <FlaskConical className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-display font-extrabold text-stone-900">
            1 Ready · 1 In-Lab
          </div>
          <div className="mt-1 text-xs text-stone-500">
            Digital Soil Health Card generated (KVK Lab)
          </div>
        </div>
      </div>

      {/* Advisory Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold">
            {lang === 'hi' ? 'कृषि विभाग चेतावनी (Zaid 2026): ' : 'Agriculture Dept Warning: '}
          </span>
          {lang === 'hi'
            ? 'मूंग की फसल में पीला मोजेक वायरस (YMV) से बचाव हेतु सफेद मक्खी का नियंत्रण आवश्यक है। थायमेथोक्सम 25% WG का छिड़काव करें।'
            : 'Precaution against Yellow Mosaic Virus in Summer Moong: Control whitefly vectors using recommended Thiamethoxam 25% WG.'}
        </div>
      </div>

      {/* Quick Access Utility Grid */}
      <div>
        <h2 className="text-base font-display font-bold text-stone-800 mb-3">
          {t.dashboard.quickActions}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('khata')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 hover:border-agri-500 hover:shadow-md transition text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-800">{t.dashboard.addIncomeExpense}</span>
            <span className="text-[10px] text-stone-500 mt-0.5">{lang === 'hi' ? 'ऑफलाइन खाता बही' : 'Offline Ledger'}</span>
          </button>

          <button
            onClick={() => onNavigate('doctor')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 hover:border-agri-500 hover:shadow-md transition text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Bug className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-800">{t.dashboard.scanCrop}</span>
            <span className="text-[10px] text-stone-500 mt-0.5">{lang === 'hi' ? 'एआई फसल डॉक्टर' : 'Instant AI Scan'}</span>
          </button>

          <button
            onClick={() => onNavigate('soil')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 hover:border-agri-500 hover:shadow-md transition text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <FlaskConical className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-800">{t.dashboard.orderSoilTest}</span>
            <span className="text-[10px] text-stone-500 mt-0.5">{lang === 'hi' ? 'डिजिटल सॉइल कार्ड' : 'NPK & pH Analysis'}</span>
          </button>

          <button
            onClick={() => onNavigate('transport')}
            className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-stone-200 hover:border-agri-500 hover:shadow-md transition text-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-2 group-hover:scale-105 transition">
              <Truck className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-stone-800">{t.dashboard.bookTractor}</span>
            <span className="text-[10px] text-stone-500 mt-0.5">{lang === 'hi' ? 'खेत से मंडी लॉजिस्टिक्स' : 'Farm-to-Mandi'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
