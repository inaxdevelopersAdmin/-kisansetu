import React, { useState, useEffect } from 'react';
import { FlaskConical, Plus, CheckCircle, Clock, FileText, ChevronRight, Award } from 'lucide-react';
import { Language, translations } from '../i18n';
import { SoilTestRecord } from '../types';
import { api } from '../services/api';

interface SoilViewProps {
  lang: Language;
}

export const SoilView: React.FC<SoilViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [tests, setTests] = useState<SoilTestRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sampleDetails, setSampleDetails] = useState('');
  const [labName, setLabName] = useState('Krishi Vigyan Kendra Soil Testing Lab');
  const [submitting, setSubmitting] = useState(false);

  const labs = [
    'Krishi Vigyan Kendra Soil Testing Lab, Sehore',
    'State Department of Agriculture Testing Center, Bhopal',
    'ICAR-Indian Institute of Soil Science, Nabibagh',
    'AgroTech Certified Mobile Soil Clinic',
  ];

  useEffect(() => {
    api.getSoilTests().then(setTests);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleDetails) return;
    setSubmitting(true);
    const newTest = await api.bookSoilTest(sampleDetails, labName);
    setTests([newTest, ...tests]);
    setSubmitting(false);
    setIsModalOpen(false);
    setSampleDetails('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {t.soil.title}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.soil.subtitle}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white flex items-center space-x-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>{t.soil.bookTest}</span>
        </button>
      </div>

      {/* Soil Health Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 hover:border-agri-400 transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 line-clamp-1">
                    {test.sampleDetails}
                  </h3>
                  <p className="text-[10px] text-stone-500">{test.labName}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  test.status === 'COMPLETED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {test.status === 'COMPLETED'
                  ? (lang === 'hi' ? 'रिपोर्ट तैयार' : 'Completed')
                  : (lang === 'hi' ? 'जांच जारी' : 'In Progress')}
              </span>
            </div>

            {/* Nutrients Gauges (if completed) */}
            {test.status === 'COMPLETED' ? (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">N (नाइट्रोजन)</span>
                    <span className="text-sm font-black text-amber-700">{test.nitrogen || 245}</span>
                    <span className="text-[9px] text-amber-600 block font-medium">Low</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">P (फास्फोरस)</span>
                    <span className="text-sm font-black text-emerald-700">{test.phosphorus || 18.2}</span>
                    <span className="text-[9px] text-emerald-600 block font-medium">Medium</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">K (पोटाश)</span>
                    <span className="text-sm font-black text-emerald-700">{test.potassium || 310}</span>
                    <span className="text-[9px] text-emerald-600 block font-medium">High</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">pH मान</span>
                    <span className="text-sm font-black text-blue-700">{test.ph || 7.2}</span>
                    <span className="text-[9px] text-blue-600 block font-medium">Normal</span>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-1">
                    {t.soil.recommendation}:
                  </span>
                  <p className="text-emerald-950 font-medium leading-relaxed">
                    {test.recommendation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center space-x-1.5 text-amber-800 font-bold">
                  <Clock className="w-4 h-4 animate-spin text-amber-600" />
                  <span>{lang === 'hi' ? 'नमूना लैब पहुंच चुका है' : 'Sample in Laboratory Queue'}</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {test.recommendation || 'Spectrometry in progress. Digital report will update here automatically.'}
                </p>
              </div>
            )}

            <div className="text-[10px] text-stone-400 pt-1 flex justify-between items-center">
              <span>{lang === 'hi' ? 'नमूना तारीख' : 'Sample Date'}: {test.date}</span>
              <span className="font-mono text-stone-400">ID: {test.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Book Test Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
            <h3 className="text-lg font-display font-extrabold text-stone-900 mb-4">
              {t.soil.bookTest}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.soil.labName}
                </label>
                <select
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:ring-2 focus:ring-agri-500"
                >
                  {labs.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.soil.sampleDetails}
                </label>
                <textarea
                  required
                  rows={3}
                  value={sampleDetails}
                  onChange={(e) => setSampleDetails(e.target.value)}
                  placeholder={t.soil.samplePlaceholder}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
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
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
                >
                  {t.soil.submitOrder}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
