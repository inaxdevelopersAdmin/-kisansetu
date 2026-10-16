import React, { useState, useEffect } from 'react';
import { Landmark, ExternalLink, ShieldCheck, CheckCircle, Search, Filter } from 'lucide-react';
import { Language, translations } from '../i18n';
import { Scheme } from '../types';
import { api } from '../services/api';

interface SchemesViewProps {
  lang: Language;
}

export const SchemesView: React.FC<SchemesViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getSchemes().then(setSchemes);
  }, []);

  const filtered = schemes.filter((s) => {
    const matchCategory = categoryFilter === 'ALL' || s.category === categoryFilter;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-display font-extrabold text-stone-900">
          {t.schemes.title}
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          {t.schemes.subtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'योजना खोजें (जैसे- सोलर, केसीसी, सम्मान निधि)...' : 'Search schemes...'}
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: t.schemes.allCategories },
            { id: 'SUBSIDY', label: t.schemes.subsidy },
            { id: 'LOAN', label: t.schemes.loan },
            { id: 'SOLAR', label: t.schemes.solar },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                categoryFilter === cat.id
                  ? 'bg-agri-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((scheme) => (
          <div
            key={scheme.id}
            className="glass-panel p-6 rounded-3xl border border-stone-200 hover:border-agri-400 transition shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                    {scheme.category}
                  </span>
                  <h3 className="text-base font-display font-extrabold text-stone-900 mt-2">
                    {lang === 'hi' ? scheme.nameHindi : scheme.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{scheme.ministry}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-agri-50 text-agri-800">
                  <Landmark className="w-5 h-5" />
                </div>
              </div>

              {/* Benefits Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1">
                  {lang === 'hi' ? 'लाभ व अनुदान:' : 'Financial Benefits & Subsidy:'}
                </span>
                <p className="leading-relaxed">
                  {lang === 'hi' ? scheme.benefitHindi : scheme.benefit}
                </p>
              </div>

              {/* Eligibility */}
              <div className="mt-3 text-xs text-stone-600">
                <span className="font-bold text-stone-700 block mb-0.5">
                  {t.schemes.eligibility}:
                </span>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  {scheme.eligibility}
                </p>
              </div>
            </div>

            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold bg-agri-700 hover:bg-agri-600 text-white transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>{t.schemes.applyNow}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
