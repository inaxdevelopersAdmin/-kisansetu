import React, { useState } from 'react';
import { IndianRupee, Plus, ArrowUpRight, ArrowDownLeft, Calendar, Tag, Check, RefreshCw, AlertCircle, Trash2 } from 'lucide-react';
import { Language, translations } from '../i18n';
import { KhataEntry } from '../types';

interface KhataViewProps {
  lang: Language;
  entries: KhataEntry[];
  summary: { totalIncome: number; totalExpense: number; netBalance: number };
  onAddEntry: (entry: Omit<KhataEntry, 'id' | 'syncStatus'>) => Promise<void>;
  onSync: () => void;
  pendingCount: number;
  isSyncing: boolean;
  isOnline: boolean;
}

export const KhataView: React.FC<KhataViewProps> = ({
  lang,
  entries,
  summary,
  onAddEntry,
  onSync,
  pendingCount,
  isSyncing,
  isOnline,
}) => {
  const t = translations[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  // Form State
  const [formType, setFormType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [category, setCategory] = useState('SEEDS');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = formType === 'EXPENSE' ? [
    { id: 'SEEDS', label: lang === 'hi' ? 'बीज (Seeds)' : 'Seeds' },
    { id: 'FERTILIZER', label: lang === 'hi' ? 'खाद व उर्वरक (Fertilizer)' : 'Fertilizer & DAP' },
    { id: 'LABOR', label: lang === 'hi' ? 'मजदूरी (Labor)' : 'Farm Labor' },
    { id: 'PESTICIDES', label: lang === 'hi' ? 'कीटनाशक व स्प्रे' : 'Pesticides & Spray' },
    { id: 'DIESEL', label: lang === 'hi' ? 'डीजल व सिंचाई' : 'Diesel & Irrigation' },
    { id: 'EQUIPMENT', label: lang === 'hi' ? 'ट्रैक्टर / उपकरण किराया' : 'Machinery Rental' },
  ] : [
    { id: 'HARVEST_SALE', label: lang === 'hi' ? 'फसल बिक्री (Mandi Sale)' : 'Harvest Mandi Sale' },
    { id: 'SUBSIDY', label: lang === 'hi' ? 'सरकारी अनुदान (PM-KISAN)' : 'Government Direct Subsidy' },
    { id: 'DAIRY', label: lang === 'hi' ? 'दूध व पशुपालन आय' : 'Dairy & Livestock' },
    { id: 'OTHER', label: lang === 'hi' ? 'अन्य आमदनी' : 'Other Income' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    setIsSubmitting(true);
    await onAddEntry({
      type: formType,
      category,
      amount: Number(amount),
      description,
      date: new Date().toISOString(),
    });
    setIsSubmitting(false);
    setIsModalOpen(false);
    setAmount('');
    setDescription('');
  };

  const filtered = entries.filter((e) => {
    if (filterType === 'ALL') return true;
    return e.type === filterType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {t.khata.title}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.khata.subtitle}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {pendingCount > 0 && (
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-agri-950 flex items-center space-x-1.5 shadow-sm transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{pendingCount} {t.pendingSync}</span>
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white flex items-center space-x-1.5 shadow-sm transition transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t.khata.addEntry}</span>
          </button>
        </div>
      </div>

      {/* Offline Status Alert if offline */}
      {!isOnline && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{t.khata.offlineAlert}</span>
        </div>
      )}

      {/* Financial Health Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase">
            <span>{t.khata.totalIncome}</span>
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-display font-black text-emerald-700 mt-2">
            +₹{summary.totalIncome.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-600/80 mt-1">
            {lang === 'hi' ? 'फसल बिक्री व डीबीटी' : 'Harvest sales & subsidies'}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-rose-200 bg-gradient-to-br from-rose-50/50 to-white">
          <div className="flex items-center justify-between text-xs font-bold text-rose-800 uppercase">
            <span>{t.khata.totalExpense}</span>
            <ArrowUpRight className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-display font-black text-rose-700 mt-2">
            -₹{summary.totalExpense.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-rose-600/80 mt-1">
            {lang === 'hi' ? 'बीज, खाद, डीजल व मजदूरी' : 'Seeds, fertilizers, labor'}
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border-agri-300 bg-gradient-to-br from-agri-50/50 to-white">
          <div className="flex items-center justify-between text-xs font-bold text-agri-900 uppercase">
            <span>{t.khata.netProfit}</span>
            <IndianRupee className="w-4 h-4 text-agri-700" />
          </div>
          <div className={`text-2xl font-display font-black mt-2 ${summary.netBalance >= 0 ? 'text-agri-800' : 'text-rose-600'}`}>
            ₹{summary.netBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-agri-700/80 mt-1">
            {lang === 'hi' ? 'कुल संचित लाभ' : 'Cumulative farm margin'}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filterType === 'ALL'
              ? 'bg-agri-800 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {lang === 'hi' ? 'सभी लेन-देन' : 'All Transactions'} ({entries.length})
        </button>
        <button
          onClick={() => setFilterType('INCOME')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filterType === 'INCOME'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {t.khata.income}
        </button>
        <button
          onClick={() => setFilterType('EXPENSE')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            filterType === 'EXPENSE'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          {t.khata.expense}
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="p-8 text-center glass-panel rounded-2xl text-stone-500 text-xs">
            {t.khata.noEntries}
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-4 rounded-2xl flex items-center justify-between hover:border-agri-400 transition"
            >
              <div className="flex items-center space-x-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'INCOME'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {item.type === 'INCOME' ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-stone-900">
                      {item.category}
                    </span>
                    {item.syncStatus === 'PENDING' && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                        {lang === 'hi' ? 'लोकल (ऑफलाइन)' : 'Offline Local'}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                    {item.description || (item.type === 'INCOME' ? 'General farm receipt' : 'General input cost')}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {new Date(item.date).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-display font-extrabold text-base ${
                    item.type === 'INCOME' ? 'text-emerald-700' : 'text-rose-700'
                  }`}
                >
                  {item.type === 'INCOME' ? '+' : '-'}₹{item.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-display font-extrabold text-stone-900 mb-4">
              {t.khata.addEntry}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFormType('EXPENSE')}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    formType === 'EXPENSE'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.khata.expense}
                </button>
                <button
                  type="button"
                  onClick={() => setFormType('INCOME')}
                  className={`py-2 text-xs font-bold rounded-lg transition ${
                    formType === 'INCOME'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.khata.income}
                </button>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.khata.category}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-agri-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.khata.amount}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 2500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-sm font-semibold pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.khata.notes}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'hi' ? 'जैसे- 4 बोरी गेहूं बीज या डीएपी' : 'e.g., 4 bags certified wheat seed'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  {t.khata.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
                >
                  {t.khata.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
