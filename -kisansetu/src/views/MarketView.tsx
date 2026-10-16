import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Store, ArrowUpRight, ArrowDownRight, MapPin, Phone, UserCheck, Calendar } from 'lucide-react';
import { Language, translations } from '../i18n';
import { MarketRate, MarketItem } from '../types';
import { api } from '../services/api';

interface MarketViewProps {
  lang: Language;
}

export const MarketView: React.FC<MarketViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [rates, setRates] = useState<MarketRate[]>([]);
  const [items, setItems] = useState<MarketItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [cropName, setCropName] = useState('Sharbati Wheat (गेहूं)');
  const [variety, setVariety] = useState('Grade A Golden');
  const [quantityQtl, setQuantityQtl] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [mandiLocation, setMandiLocation] = useState('Sehore Mandi Hub');

  useEffect(() => {
    api.getMandiRates().then(setRates);
    api.getMarketItems().then(setItems);
  }, []);

  const handlePostItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quantityQtl || !expectedRate) return;

    const newItem: MarketItem = {
      id: `mkt-${Date.now()}`,
      cropName,
      variety,
      quantityQtl: Number(quantityQtl),
      expectedRate: Number(expectedRate),
      mandiLocation,
      sellerName: 'Ramesh Patel (Farmer)',
      sellerPhone: '+91 98765 43210',
      postedDate: new Date().toISOString().split('T')[0],
    };

    setItems([newItem, ...items]);
    setIsModalOpen(false);
    setQuantityQtl('');
    setExpectedRate('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {t.market.title}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.market.subtitle}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white flex items-center space-x-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.market.postListing}</span>
        </button>
      </div>

      {/* Live Mandi Rates Table / Cards */}
      <div className="glass-panel p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              {lang === 'hi' ? 'आज के मंडी भाव (APMC Wholesale Daily Board)' : 'Today APMC Wholesale Daily Board'}
            </h3>
          </div>
          <span className="text-[10px] text-stone-400">
            {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 text-[11px] font-semibold">
                <th className="pb-3">{t.market.commodity}</th>
                <th className="pb-3">{t.market.variety}</th>
                <th className="pb-3">{t.market.mandi}</th>
                <th className="pb-3 text-right">{t.market.priceRange}</th>
                <th className="pb-3 text-right">{t.market.modalPrice}</th>
                <th className="pb-3 text-right">{t.market.trend}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rates.map((r, i) => {
                const isPositive = r.trend.startsWith('+');
                return (
                  <tr key={i} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 font-bold text-stone-900">{r.commodity}</td>
                    <td className="py-3 text-stone-600">{r.variety}</td>
                    <td className="py-3 text-stone-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{r.mandi}</span>
                    </td>
                    <td className="py-3 text-right text-stone-500 font-mono">
                      ₹{r.minPrice} - ₹{r.maxPrice}
                    </td>
                    <td className="py-3 text-right font-display font-extrabold text-agri-800 text-sm">
                      ₹{r.modalPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPositive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span>{r.trend}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Farmer-to-Buyer Marketplace Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-display font-bold text-stone-900">
            {t.market.directMarket}
          </h2>
          <span className="text-xs text-stone-500">
            {lang === 'hi' ? 'सीधे किसानों से खरीद' : 'Zero middleman commission'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-5 rounded-3xl border border-stone-200 hover:border-agri-400 transition shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-display font-bold text-stone-900">
                    {item.cropName}
                  </h3>
                  <p className="text-xs text-stone-500">{item.variety}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-harvest-100 text-harvest-800">
                  {item.quantityQtl} Quintals Available
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between">
                <span className="text-xs text-stone-500">Asking Price:</span>
                <span className="text-base font-display font-extrabold text-agri-800">
                  ₹{item.expectedRate.toLocaleString('en-IN')}{' '}
                  <span className="text-[10px] font-normal text-stone-500">/ Qtl</span>
                </span>
              </div>

              <div className="text-xs text-stone-600 space-y-1">
                <div className="flex items-center space-x-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.sellerName}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.mandiLocation}</span>
                </div>
              </div>

              <a
                href={`tel:${item.sellerPhone}`}
                className="w-full py-2 rounded-xl text-xs font-bold bg-agri-50 hover:bg-agri-100 text-agri-800 border border-agri-200 transition flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-agri-600" />
                <span>{lang === 'hi' ? 'किसान से संपर्क करें' : 'Contact Producer'}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Post Listing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-display font-extrabold text-stone-900 mb-4">
              {t.market.postListing}
            </h3>

            <form onSubmit={handlePostItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Crop & Produce
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Variety / Grade
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Quantity (Quintals)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 50"
                    value={quantityQtl}
                    onChange={(e) => setQuantityQtl(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Price (₹ / Qtl)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 2900"
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mandi Location / Area
                </label>
                <input
                  type="text"
                  value={mandiLocation}
                  onChange={(e) => setMandiLocation(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

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
                  className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
                >
                  {lang === 'hi' ? 'दर्ज करें' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
