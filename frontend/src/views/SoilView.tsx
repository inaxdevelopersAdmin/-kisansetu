import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Plus,
  CheckCircle,
  Clock,
  FileText,
  ChevronRight,
  Award,
  Droplets,
  Sprout,
  ShieldCheck,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Language, translations } from '../i18n';
import { SoilTestRecord } from '../types';
import { api } from '../services/api';

interface SoilViewProps {
  lang: Language;
}

export const SoilView: React.FC<SoilViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [reportFilter, setReportFilter] = useState<'ALL' | 'SOIL_HEALTH' | 'WATER_SALINITY' | 'FERTILIZER_PURITY'>('ALL');
  const [tests, setTests] = useState<SoilTestRecord[]>([
    {
      id: 'st-1',
      farmerName: 'રમેશભાઈ પટેલ',
      farmerPhone: '+91 98765 43210',
      labName: 'KVK સોઇલ અને એગ્રીટેક લેબ, સીહોર / ગુજરાત',
      sampleDetails: 'પ્લોટ #૩ - ઉત્તર ભાગ (ઘઉં અને સોયાબીન પ્લોટ)',
      status: 'COMPLETED',
      date: '14 ઑક્ટોબર 2026',
      nitrogen: 280,
      phosphorus: 24,
      potassium: 310,
      ph: 7.2,
      organicCarbon: 0.58,
      zinc: 0.85,
      boron: 0.45,
      recommendation: 'નાઇટ્રોજન મધ્યમ છે, ફોસ્ફરસ પર્યાપ્ત છે. યુરિયાની માત્રા ૧૮% ઘટાડો અને ૧૫ કિગ્રા ઝિંક સલ્ફેટ વાપરવાની ભલામણ છે.',
      reportType: 'SOIL_HEALTH',
    },
    {
      id: 'st-2',
      farmerName: 'રમેશભાઈ પટેલ',
      farmerPhone: '+91 98765 43210',
      labName: 'રાજ્ય ભૂગર્ભ જળ ચકાસણી પ્રયોગશાળા',
      sampleDetails: 'ટ્યુબવેલ બોર નં. ૨ (ઊંડાઈ: ૪૨૦ ફૂટ)',
      status: 'COMPLETED',
      date: '08 ઑક્ટોબર 2026',
      waterTds: 420,
      waterSar: 2.4,
      ph: 7.4,
      recommendation: 'TDS ૪૨૦ ppm સુરક્ષિત શ્રેણીમાં છે. SAR ૨.૪ ઘઉં, કપાસ અને શાકભાજી માટે ઉત્તમ. કોઈ ક્ષારતા ખતરો નથી.',
      reportType: 'WATER_SALINITY',
    },
    {
      id: 'st-3',
      farmerName: 'રમેશભાઈ પટેલ',
      farmerPhone: '+91 98765 43210',
      labName: 'સેન્ટ્રલ ફર્ટિલાઇઝર ક્વોલિટી કંટ્રોલ ઇન્સ્ટિટ્યૂટ',
      sampleDetails: 'ડીએપી (DAP 18:46) - બેચ ક્રમાંક: IFFCO-9921',
      status: 'COMPLETED',
      date: '28 સપ્ટેમ્બર 2026',
      fertilizerPurity: 99.4,
      ph: 7.0,
      recommendation: 'નમૂનો ૧૦૦% અસલી પ્રમાણિત. નાઇટ્રોજન ૧૭.૯% અને ફોસ્ફરસ ૪૫.૮% હાજર. કોઈ મિલાવટ નથી.',
      reportType: 'FERTILIZER_PURITY',
    },
    {
      id: 'st-4',
      farmerName: 'રમેશભાઈ પટેલ',
      farmerPhone: '+91 98765 43210',
      labName: 'ICAR જમીન સંશોધન સંસ્થાન',
      sampleDetails: 'પ્લોટ #૫ - દક્ષિણ કપાસ વાવેતર વિસ્તાર',
      status: 'IN_PROGRESS',
      date: '15 ઑક્ટોબર 2026',
      reportType: 'SOIL_HEALTH',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sampleDetails, setSampleDetails] = useState('');
  const [testTypeSelect, setTestTypeSelect] = useState<'SOIL_HEALTH' | 'WATER_SALINITY' | 'FERTILIZER_PURITY'>('SOIL_HEALTH');
  const [labName, setLabName] = useState('Krishi Vigyan Kendra Soil Testing Lab');
  const [submitting, setSubmitting] = useState(false);

  const filteredTests = tests.filter((t) => {
    if (reportFilter === 'ALL') return true;
    return t.reportType === reportFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleDetails) return;
    setSubmitting(true);
    const newTest: SoilTestRecord = {
      id: `st-${Date.now()}`,
      farmerName: 'રમેશભાઈ પટેલ',
      farmerPhone: '+91 98765 43210',
      labName,
      sampleDetails,
      status: 'IN_PROGRESS',
      date: 'આજે',
      reportType: testTypeSelect,
    };
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
            {lang === 'gu'
              ? 'કૃષિ લેબોરેટરી અને તમામ રિપોર્ટ્સ (Soil, Water & Fertilizer)'
              : 'Agri Testing Labs · Comprehensive Analytical Reports'}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'gu'
              ? 'જમીન પોષણ કાર્ડ, બોરવેલ સિંચાઈ પાણીની ક્ષારતા (TDS) અને ખાતર શુદ્ધતા ચકાસણી.'
              : 'Soil Health Cards, irrigation water salinity (TDS/SAR), and fertilizer purity certifications.'}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>+ {lang === 'gu' ? 'નવો લેબ ટેસ્ટ બુક કરો' : 'Book Lab Sample'}</span>
        </button>
      </div>

      {/* Report Category Switcher */}
      <div className="glass-panel p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 border border-emerald-100">
        <div className="flex items-center space-x-1.5">
          <span className="text-xs font-bold text-stone-700 px-2">રિપોર્ટ પ્રકાર:</span>
          {[
            { id: 'ALL', label: 'બધા લેબ રિપોર્ટ્સ (All)' },
            { id: 'SOIL_HEALTH', label: '🌱 જમીન સોઇલ હેલ્થ કાર્ડ' },
            { id: 'WATER_SALINITY', label: '💧 સિંચાઈ પાણી (TDS/SAR)' },
            { id: 'FERTILIZER_PURITY', label: '🧪 ખાતર શુદ્ધતા ચકાસણી' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setReportFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                reportFilter === cat.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => window.print()}
          className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center space-x-1.5 transition"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>પ્રિન્ટ / PDF ડાઉનલોડ</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="glass-panel p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4 hover:border-emerald-400 transition"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2.5">
                <div
                  className={`p-2 rounded-xl ${
                    test.reportType === 'WATER_SALINITY'
                      ? 'bg-sky-100 text-sky-700'
                      : test.reportType === 'FERTILIZER_PURITY'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {test.reportType === 'WATER_SALINITY' ? (
                    <Droplets className="w-5 h-5" />
                  ) : test.reportType === 'FERTILIZER_PURITY' ? (
                    <FlaskConical className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                      {test.reportType === 'WATER_SALINITY'
                        ? 'સિંચાઈ પાણી ચકાસણી'
                        : test.reportType === 'FERTILIZER_PURITY'
                        ? 'ખાતર ગુણવત્તા ટેસ્ટ'
                        : 'સોઇલ હેલ્થ કાર્ડ'}
                    </span>
                    <span className="text-[10px] text-stone-400">{test.date}</span>
                  </div>
                  <h3 className="text-sm font-extrabold text-stone-900 mt-1 line-clamp-1">
                    {test.sampleDetails}
                  </h3>
                  <p className="text-[11px] text-stone-500">{test.labName}</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  test.status === 'COMPLETED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {test.status === 'COMPLETED' ? 'પ્રમાણિત રિપોર્ટ તૈયાર ✓' : 'તપાસ ચાલુ છે...'}
              </span>
            </div>

            {/* Nutrients Gauges (if completed) */}
            {test.status === 'COMPLETED' && test.reportType === 'SOIL_HEALTH' && (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">N (નાઇટ્રોજન)</span>
                    <span className="text-xs font-black text-emerald-700">{test.nitrogen} kg/ha</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">P (ફોસ્ફરસ)</span>
                    <span className="text-xs font-black text-emerald-700">{test.phosphorus} kg/ha</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">K (પોટાશ)</span>
                    <span className="text-xs font-black text-emerald-700">{test.potassium} kg/ha</span>
                  </div>
                  <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">pH ક્ષારતા</span>
                    <span className="text-xs font-black text-emerald-700">{test.ph}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">ઓર્ગેનિક કાર્બન:</span>
                    <strong className="text-emerald-800">{test.organicCarbon}%</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">ઝિંક (Zn):</span>
                    <strong className="text-emerald-800">{test.zinc} ppm</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-[10px] text-stone-500 block">બોરોન (B):</span>
                    <strong className="text-emerald-800">{test.boron} ppm</strong>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-stone-700">
                  <strong className="text-emerald-900 block font-bold mb-0.5">વૈજ્ઞાનિક ખાતર ભલામણ:</strong>
                  {test.recommendation}
                </div>
              </div>
            )}

            {/* Water Salinity Gauges */}
            {test.status === 'COMPLETED' && test.reportType === 'WATER_SALINITY' && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">TDS (કુલ ક્ષાર)</span>
                    <span className="text-sm font-black text-sky-800">{test.waterTds} ppm</span>
                    <span className="text-[9px] text-emerald-700 font-bold block">સુરક્ષિત ગ્રેડ-A</span>
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">SAR (સોડિયમ દર)</span>
                    <span className="text-sm font-black text-sky-800">{test.waterSar}</span>
                    <span className="text-[9px] text-emerald-700 font-bold block">સામાન્ય</span>
                  </div>
                  <div className="p-2 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">પાણી pH</span>
                    <span className="text-sm font-black text-sky-800">{test.ph}</span>
                    <span className="text-[9px] text-emerald-700 font-bold block">તટસ્થ</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-stone-700">
                  <strong className="text-sky-900 block font-bold mb-0.5">સિંચાઈ યોગ્યતા રિપોર્ટ:</strong>
                  {test.recommendation}
                </div>
              </div>
            )}

            {/* Fertilizer Purity Gauges */}
            {test.status === 'COMPLETED' && test.reportType === 'FERTILIZER_PURITY' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">ખાતર શુદ્ધતા ટકાવારી</span>
                    <span className="text-base font-black text-purple-900">{test.fertilizerPurity}% પ્યોરિટી</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] text-stone-500 block font-semibold">મિલાવટ ચકાસણી</span>
                    <span className="text-base font-black text-emerald-800">૦% શૂન્ય મિલાવટ</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-stone-700">
                  <strong className="text-purple-900 block font-bold mb-0.5">ક્વોલિટી કંટ્રોલ પ્રમાણપત્ર:</strong>
                  {test.recommendation}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
              <span className="text-[11px] font-medium">સંપૂર્ણ લેબ ડિજિટલ સહી સર્ટિફાઇડ ✓</span>
              <button
                onClick={() => window.print()}
                className="px-3 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold transition flex items-center space-x-1"
              >
                <span>પ્રમાણપત્ર જુઓ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <h3 className="text-base font-display font-extrabold text-stone-900">
              નવો કૃષિ લેબ ટેસ્ટ ઓર્ડર કરો
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">કયો ટેસ્ટ કરાવવો છે?</label>
                <select
                  value={testTypeSelect}
                  onChange={(e) => setTestTypeSelect(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option value="SOIL_HEALTH">🌱 જમીન સોઇલ હેલ્થ કાર્ડ (NPK, pH & Micronutrients)</option>
                  <option value="WATER_SALINITY">💧 સિંચાઈ બોરવેલ પાણી ટેસ્ટ (TDS, SAR, Salinity)</option>
                  <option value="FERTILIZER_PURITY">🧪 ખાતર શુદ્ધતા ચકાસણી (DAP/Urea Purity Test)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">સેમ્પલની વિગતો / પ્લોટ નં.</label>
                <input
                  type="text"
                  required
                  value={sampleDetails}
                  onChange={(e) => setSampleDetails(e.target.value)}
                  placeholder="દા.ત. પ્લોટ #૨ - કપાસ વાવણી ખેતર અથવા બોરવેલ #૧"
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">પ્રયોગશાળા પસંદ કરો</label>
                <select
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-200 bg-stone-50"
                >
                  <option>કૃષિ વિજ્ઞાન કેન્દ્ર સોઇલ ટેસ્ટિંગ લેબ (KVK)</option>
                  <option>રાજ્ય કૃષિ નિયામક કચેરી લેબોરેટરી</option>
                  <option>ICAR સેન્ટ્રલ સોઇલ એન્ડ વોટર ટેસ્ટિંગ સેન્ટર</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  સેમ્પલ જમા કરો
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold"
                >
                  રદ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
