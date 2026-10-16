import React, { useState, useEffect } from 'react';
import { Landmark, ExternalLink, ShieldCheck, CheckCircle2, Search, Filter, FileText, CheckSquare, Sparkles, MapPin } from 'lucide-react';
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
  const [acreFilter, setAcreFilter] = useState<'ALL' | 'MARGINAL_LESS_2_ACRES' | 'SMALL_2_TO_5_ACRES' | 'LARGE_ABOVE_5_ACRES'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeDocs, setSelectedSchemeDocs] = useState<Scheme | null>(null);

  useEffect(() => {
    api.getSchemes().then((data) => {
      // Enrich with acre-wise and document metadata
      const enriched: Scheme[] = [
        {
          id: 'sch-1',
          name: 'PM-KISAN Samman Nidhi (સન્માન નિધિ)',
          nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
          nameGujarati: 'પ્રધાનમંત્રી કિસાન સન્માન નિધિ યોજના',
          ministry: 'કૃષિ અને ખેડૂત કલ્યાણ મંત્રાલય, ભારત સરકાર',
          benefit: '₹6,000 per year in 3 installments of ₹2,000 directly via DBT into bank accounts.',
          benefitHindi: 'प्रत्येक पात्र किसान परिवार को ₹6,000 प्रति वर्ष सीधे बैंक खाते में।',
          benefitGujarati: 'વાર્ષિક ₹૬,૦૦૦ ની સીધી સહાય (દર ૪ મહિને ₹૨,૦૦૦ ખેડૂતના ખાતામાં જમા).',
          eligibility: 'ખેતીલાયક જમીન ધરાવતા તમામ ખેડૂત કુટુંબો (આધાર e-KYC લિંક હોવું જરૂરી).',
          portalUrl: 'https://pmkisan.gov.in',
          category: 'SUBSIDY',
          featured: true,
          targetAcreCategory: 'ALL',
          districtFocus: 'સમગ્ર ગુજરાત અને ભારતભર',
          requiredDocuments: ['જમીનનો ૭/૧૨ અને ૮-અ ઉતારો', 'આધાર કાર્ડ (મોબાઈલ લિંક્ડ)', 'બેંક પાસબુક પ્રથમ પાનું', 'સક્રિય DBT રજીસ્ટ્રેશન']
        },
        {
          id: 'sch-ks-2',
          name: 'i-Khedut Gujarat Micro-Irrigation Drip Subsidy',
          nameHindi: 'आई-खेडूत ड्रिप एवं फव्वारा सिंचाई सब्सिडी',
          nameGujarati: 'આઈ-ખેડૂત સૂક્ષ્મ ટપક / ફુવારા સિંચાઈ સબસિડી (GGRC)',
          ministry: 'ગુજરાત ગ્રીન રિવોલ્યુશન કંપની (GGRC) અને કૃષિ વિભાગ',
          benefit: 'Up to 70% subsidy for marginal/small farmers and 50% for large farmers for Drip & Sprinkler sets.',
          benefitHindi: 'ड्रिप व स्प्रिंकलर सूक्ष्म सिंचाई उपकरणों पर 70% तक का भारी अनुदान।',
          benefitGujarati: 'નાના અને સીમાંત ખેડૂતોને ૭૦% સુધી સબસિડી તથા મોટા ખેડૂતોને ૫૦% સબસિડી.',
          eligibility: 'જમીન અને સિંચાઈનો સ્રોત (બોરવેલ, કૂવો કે કેનાલ) ધરાવતા ગુજરાતના ખેડૂતો.',
          portalUrl: 'https://ikhedut.gujarat.gov.in',
          category: 'IRRIGATION',
          featured: true,
          targetAcreCategory: 'MARGINAL_LESS_2_ACRES',
          districtFocus: 'સૌરાષ્ટ્ર અને ઉત્તર ગુજરાત અછતગ્રસ્ત વિસ્તારો',
          requiredDocuments: ['૭/૧૨, ૮-અ ની અદ્યતન નકલ', 'સિંચાઈ સ્રોત (બોરવેલ/વીજ જોડાણ બિલ)', 'રદ કરેલ ચેક (Cancelled Cheque)', 'જાતિ પ્રમાણપત્ર (SC/ST માટે અતિરિક્ત લાભ)']
        },
        {
          id: 'sch-ks-3',
          name: 'PM-KUSUM Solar Agricultural Pump Subsidy',
          nameHindi: 'पीएम कुसुम सौर कृषि पंप योजना',
          nameGujarati: 'પીએમ-કુસુમ સોલાર એગ્રીકલ્ચર પંપ યોજના (ઘરેલુ/ખેતી)',
          ministry: 'નવીન અને નવીનીકરણીય ઊર્જા મંત્રાલય (MNRE)',
          benefit: '60% capital grant subsidy on 3HP to 7.5HP Solar Water Pumps.',
          benefitHindi: '3HP से 7.5HP सोलर पंप स्थापना पर 60% सरकारी सब्सिडी।',
          benefitGujarati: '૩ થી ૭.૫ એચપી સોલાર પંપ માટે ૬૦% સુધીની સરકારી સબસિડી, દિવસ દરમિયાન મફત વીજળી.',
          eligibility: 'વીજ કનેક્શન વગરના અથવા ડીઝલ પંપ વાપરતા ખેડૂતો કે જેમની પાસે ૨ થી ૫ એકર જમીન છે.',
          portalUrl: 'https://pmkusum.mnre.gov.in',
          category: 'SOLAR',
          featured: true,
          targetAcreCategory: 'SMALL_2_TO_5_ACRES',
          districtFocus: 'રાજકોટ, અમરેલી, જૂનાગઢ, બનાસકાંઠા',
          requiredDocuments: ['૭/૧૨ અને ૮-અ જમીન દસ્તાવેજ', 'પાણીનો સ્ત્રોત પંચનામુ/દાખલો', 'આધાર કાર્ડ અને પાસપોર્ટ સાઇઝ ફોટો', 'બેંક ખાતા વિગત']
        },
        {
          id: 'sch-ks-4',
          name: 'Kisan Credit Card (KCC) Low Interest Crop Loan',
          nameHindi: 'किसान क्रेडिट कार्ड आसान फसली ऋण',
          nameGujarati: 'કિસાન ક્રેડિટ કાર્ડ (KCC) રાહતદરે ૪% પાક ધિરાણ',
          ministry: 'નાબાર્ડ (NABARD) અને સહકારી બેંકો',
          benefit: 'Up to ₹3,00,000 collateral-free crop loan at only 4% interest rate on prompt repayment.',
          benefitHindi: 'समय पर भुगतान पर मात्र 4% ब्याज दर पर ₹3 लाख तक का आसान ऋण।',
          benefitGujarati: 'માત્ર ૪% ના રાહત વ્યાજદરે ₹૩ લાખ સુધીનું પાક ધિરાણ (ખાતર, બિયારણ અને ડીઝલ ખર્ચ માટે).',
          eligibility: 'તમામ જમીનધારક ખેડૂતો, ભાગીદારો અને પશુપાલકો.',
          portalUrl: 'https://www.myscheme.gov.in/schemes/kcc',
          category: 'LOAN',
          featured: true,
          targetAcreCategory: 'ALL',
          districtFocus: 'સમગ્ર ગુજરાત',
          requiredDocuments: ['જમીનની વી-૭/૧૨ નકલ', 'ચાલુ વર્ષનો વાવેતર દાખલો (તલાટી સહી)', 'આધાર કાર્ડ અને પાન કાર્ડ', 'સહકારી મંડળી નો-ડ્યુ પ્રમાણપત્ર']
        },
        {
          id: 'sch-ks-5',
          name: 'Custom Hiring Center & Farm Mechanization (ટ્રેક્ટર-સાધન સબસિડી)',
          nameHindi: 'कृषि यंत्रीकरण एवं ट्रैक्टर अनुदान योजना',
          nameGujarati: 'ટ્રેક્ટર, રોટાવેટર અને આધુનિક સાધન સહાય યોજના',
          ministry: 'ગુજરાત કૃષિ યાંત્રિકીકરણ બોર્ડ',
          benefit: 'Direct subsidy of ₹45,000 to ₹1,00,000 on purchase of new tractors and implements.',
          benefitHindi: 'नए ट्रैक्टर और रोटावेटर की खरीद पर ₹1 लाख तक की सीधी सब्सिडी।',
          benefitGujarati: 'મોટા ખેડૂતો અને FPO ને ટ્રેક્ટર, રોટાવેટર, થ્રેશર પર ₹૪૫,૦૦૦ થી ₹૧,૦૦,૦૦૦ ની સહાય.',
          eligibility: '૫ એકરથી વધુ જમીન ધરાવતા ખેડૂતો અથવા માન્ય ગ્રામ્ય કસ્ટમ હાયરિંગ સેન્ટર્સ.',
          portalUrl: 'https://ikhedut.gujarat.gov.in',
          category: 'EQUIPMENT',
          featured: false,
          targetAcreCategory: 'LARGE_ABOVE_5_ACRES',
          districtFocus: 'મધ્ય અને દક્ષિણ ગુજરાત, સૌરાષ્ટ્ર',
          requiredDocuments: ['જમીનનો ૭/૧૨ અને ૮-અ ઉતારો (૫+ એકર)', 'ઓથોરાઇઝ્ડ ડીલરનું કવોટેશન (GST બિલ)', 'ડ્રાઇવિંગ લાયસન્સ', 'બેંક પાસબુક']
        }
      ];
      setSchemes(enriched);
    });
  }, []);

  const filtered = schemes.filter((s) => {
    const matchCategory = categoryFilter === 'ALL' || s.category === categoryFilter;
    const matchAcre = acreFilter === 'ALL' || s.targetAcreCategory === 'ALL' || s.targetAcreCategory === acreFilter;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nameGujarati && s.nameGujarati.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.districtFocus && s.districtFocus.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchAcre && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl font-display font-extrabold text-stone-900">
          {lang === 'gu' ? 'સરકારી કૃષિ યોજનાઓ અને જમીન-વિસ્તાર મુજબ સહાય' : t.schemes.title}
        </h1>
        <p className="text-xs text-stone-600 mt-0.5">
          {lang === 'gu'
            ? 'તમારી જમીન (એકર) અને જિલ્લા અનુસાર ઉપલબ્ધ સરકારી યોજનાઓ, ડોક્યુમેન્ટ યાદી અને ઓનલાઇન અરજી'
            : t.schemes.subtitle}
        </p>
      </div>

      {/* Acre-Wise Landholding Matcher Filter */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-agri-50/70 via-emerald-50/50 to-harvest-50/40 border border-agri-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-agri-700" />
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wide">
              {lang === 'gu' ? 'જમીન ક્ષેત્રફળ (એકર મુજબ) ફિલ્ટર કરો:' : 'Filter by Land Acreage:'}
            </h3>
          </div>
          <span className="text-[11px] text-stone-500">
            {lang === 'gu' ? 'સીમાંત, નાના અને મોટા ખેડૂત માટે અલગ-અલગ સબસિડી' : 'Targeted subsidies per land category'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'ALL', labelGu: 'બધા ક્ષેત્રફળ (All)', labelEn: 'All Land Sizes' },
            { id: 'MARGINAL_LESS_2_ACRES', labelGu: 'સીમાંત (< ૨ એકર)', labelEn: 'Marginal (< 2 Acres)' },
            { id: 'SMALL_2_TO_5_ACRES', labelGu: 'નાના ખેડૂત (૨ થી ૫ એકર)', labelEn: 'Small (2 to 5 Acres)' },
            { id: 'LARGE_ABOVE_5_ACRES', labelGu: 'મોટા ખેડૂત (> ૫ એકર)', labelEn: 'Large (> 5 Acres)' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAcreFilter(item.id as any)}
              className={`py-2 px-3 rounded-2xl text-xs font-bold transition text-center border ${
                acreFilter === item.id
                  ? 'bg-agri-600 text-white border-agri-600 shadow-sm'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-agri-300'
              }`}
            >
              {lang === 'gu' ? item.labelGu : item.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'gu' ? 'યોજના શોધો (દા.ત. ટપક સિંચાઈ, કિસાન ક્રેડિટ, સોલાર પંપ)...' : 'Search schemes...'}
            className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'ALL', label: t.schemes.allCategories },
            { id: 'SUBSIDY', label: t.schemes.subsidy },
            { id: 'IRRIGATION', label: lang === 'gu' ? 'સિંચાઈ (GGRC)' : 'Irrigation' },
            { id: 'SOLAR', label: t.schemes.solar },
            { id: 'LOAN', label: t.schemes.loan },
            { id: 'EQUIPMENT', label: lang === 'gu' ? 'યાંત્રિકીકરણ' : 'Equipment' },
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
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      {scheme.category}
                    </span>
                    {scheme.targetAcreCategory && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {scheme.targetAcreCategory === 'ALL'
                          ? 'બધા ખેડૂતો'
                          : scheme.targetAcreCategory === 'MARGINAL_LESS_2_ACRES'
                          ? '< ૨ એકર સીમાંત'
                          : scheme.targetAcreCategory === 'SMALL_2_TO_5_ACRES'
                          ? '૨-૫ એકર નાના'
                          : '> ૫ એકર મોટા'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-display font-extrabold text-stone-900 mt-2">
                    {lang === 'gu' && scheme.nameGujarati ? scheme.nameGujarati : lang === 'hi' ? scheme.nameHindi : scheme.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">{scheme.ministry}</p>
                </div>
                <div className="p-2.5 rounded-2xl bg-agri-50 text-agri-800 shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
              </div>

              {/* District & Region Activity focus */}
              {scheme.districtFocus && (
                <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>વિસ્તાર પ્રાથમિકતા: <strong>{scheme.districtFocus}</strong></span>
                </div>
              )}

              {/* Benefits Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold block mb-1">
                  {lang === 'gu' ? 'મળવાપાત્ર લાભ અને સબસિડી:' : lang === 'hi' ? 'लाभ व अनुदान:' : 'Financial Benefits & Subsidy:'}
                </span>
                <p className="leading-relaxed">
                  {lang === 'gu' && scheme.benefitGujarati ? scheme.benefitGujarati : lang === 'hi' ? scheme.benefitHindi : scheme.benefit}
                </p>
              </div>

              {/* Eligibility */}
              <div className="text-xs text-stone-600">
                <span className="font-bold text-stone-700 block mb-0.5">
                  {t.schemes.eligibility}:
                </span>
                <p className="text-[11px] leading-relaxed text-stone-500">
                  {scheme.eligibility}
                </p>
              </div>

              {/* Required Documents Tag count button */}
              {scheme.requiredDocuments && scheme.requiredDocuments.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedSchemeDocs(scheme)}
                  className="w-full text-left p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-center justify-between hover:bg-amber-100/70 transition"
                >
                  <span className="flex items-center space-x-1.5 font-bold">
                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                    <span>જરૂરી દસ્તાવેજ ચેકલિસ્ટ ({scheme.requiredDocuments.length} ડોક્યુમેન્ટ)</span>
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 underline">યાદી જુઓ →</span>
                </button>
              )}
            </div>

            <a
              href={scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white transition flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <span>{t.schemes.applyNow}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Document Checklist Modal */}
      {selectedSchemeDocs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400">અરજી દસ્તાવેજ ચેકલિસ્ટ</span>
                <h3 className="text-sm font-display font-extrabold text-stone-900 mt-0.5">
                  {selectedSchemeDocs.nameGujarati || selectedSchemeDocs.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchemeDocs(null)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-stone-600 font-medium">
                ગ્રામ પંચાયત અથવા VCE પાસે જતાં પહેલાં નીચેના અસલ તથા ઝેરોક્ષ દસ્તાવેજ તૈયાર રાખો:
              </p>
              <div className="space-y-2 pt-1">
                {selectedSchemeDocs.requiredDocuments?.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs text-stone-800">
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <p className="font-bold">✓ કિસાનસેતુ ડિજિટલ સેવા:</p>
              <p>તમારા ગામના કિસાનસેતુ મિત્ર અથવા VCE ઓનલાઇન i-Khedut પોર્ટલ પર વિનામૂલ્યે ફોર્મ ભરવામાં મદદ કરશે.</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSchemeDocs(null)}
                className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
              >
                સમજાઈ ગયું (બંધ કરો)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
