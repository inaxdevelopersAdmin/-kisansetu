import React, { useState, useEffect } from 'react';
import { TrendingUp, Plus, Store, ArrowUpRight, ArrowDownRight, MapPin, Phone, UserCheck, Calendar, Building2, ShieldCheck, CheckCircle2, FileText, BadgePercent } from 'lucide-react';
import { Language, translations } from '../i18n';
import { MarketRate, MarketItem, CorporateRequirement } from '../types';
import { api } from '../services/api';

interface MarketViewProps {
  lang: Language;
}

export const MarketView: React.FC<MarketViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [rates, setRates] = useState<MarketRate[]>([]);
  const [items, setItems] = useState<MarketItem[]>([]);
  const [activeMarketTab, setActiveMarketTab] = useState<'mandi' | 'farmer_direct' | 'corporate_procure'>('mandi');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorpModalOpen, setIsCorpModalOpen] = useState(false);
  const [applySuccessId, setApplySuccessId] = useState<string | null>(null);

  // Corporate Requirements Data
  const [corpReqs, setCorpReqs] = useState<CorporateRequirement[]>([
    {
      id: 'CORP-REQ-2026-01',
      companyName: 'અદાણી વિલ્મર લિ. (Adani Wilmar Edible Oils)',
      cropName: 'ગુજરાત તેલીબિયાં મગફળી (Groundnut G-20)',
      variety: 'બોલ્ડ હાઇ-ઓઇલ (Bold High Oil > 49%)',
      requiredQuantityQtl: 1200,
      offeredRatePerQtl: 7350,
      deliveryMandi: 'ગોંડલ એપીએમસી યાર્ડ / રાજકોટ વેરહાઉસ',
      qualitySpecs: 'ભેજ ૭% થી ઓછો, દાણાનું કદ બોલ્ડ, એફ્લાટોક્સિન મુક્ત લેબ પ્રમાણપત્ર',
      qualityGuaranteeByKisanSetu: true,
      escrowProtected: true,
      postedDate: '15 Oct 2026',
      status: 'OPEN'
    },
    {
      id: 'CORP-REQ-2026-02',
      companyName: 'બાલાજી વેફર્સ પ્રાઇવેટ લિ. (Balaji Wafers)',
      cropName: 'ચિપ્સોના બટાટા (Processing Grade Potato)',
      variety: 'Kufri Chipsona-1 / LR Grade',
      requiredQuantityQtl: 2500,
      offeredRatePerQtl: 1950,
      deliveryMandi: 'ડીસા અને હિંમતનગર કોલ્ડ સ્ટોરેજ હબ',
      qualitySpecs: 'શુગર કન્ટેન્ટ શૂન્ય, કદ ૪૫-૬૫ મીમી, ડાઘા વગરના સફેદ બટાકા',
      qualityGuaranteeByKisanSetu: true,
      escrowProtected: true,
      postedDate: '12 Oct 2026',
      status: 'IN_PROCUREMENT'
    },
    {
      id: 'CORP-REQ-2026-03',
      companyName: 'આઇટીસી એગ્રી-બિઝનેસ (ITC Spices Division)',
      cropName: 'સૌરાષ્ટ્ર દેશી જીરું (Premium Cumin Seeds)',
      variety: 'GC-4 મશીન ક્લીન સોર્ટિંગ (Machine Clean)',
      requiredQuantityQtl: 450,
      offeredRatePerQtl: 27800,
      deliveryMandi: 'ઊંઝા એપીએમસી સ્પાઈસ ટર્મિનલ',
      qualitySpecs: 'શુદ્ધતા ૯૯.૫%, લેબ રિપોર્ટમાં પેસ્ટીસાઇડ રેસિડ્યુ ઝીરો, યુરોપ નિકાસ ક્વોલિટી',
      qualityGuaranteeByKisanSetu: true,
      escrowProtected: true,
      postedDate: '14 Oct 2026',
      status: 'OPEN'
    }
  ]);

  // Corporate Form State
  const [corpCompanyName, setCorpCompanyName] = useState('');
  const [corpCropName, setCorpCropName] = useState('');
  const [corpVariety, setCorpVariety] = useState('');
  const [corpQuantity, setCorpQuantity] = useState('');
  const [corpOfferedRate, setCorpOfferedRate] = useState('');
  const [corpDeliveryMandi, setCorpDeliveryMandi] = useState('Gondal Mandi Yard');
  const [corpQualitySpecs, setCorpQualitySpecs] = useState('');

  // Form State
  const [cropName, setCropName] = useState('Sharbati Wheat (ગેહું / ઘઉં)');
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

  const handlePostCorpRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpCompanyName || !corpCropName || !corpQuantity || !corpOfferedRate) return;

    const newReq: CorporateRequirement = {
      id: `CORP-REQ-${Date.now().toString().slice(-4)}`,
      companyName: corpCompanyName,
      cropName: corpCropName,
      variety: corpVariety || 'Standard Super Grade',
      requiredQuantityQtl: Number(corpQuantity),
      offeredRatePerQtl: Number(corpOfferedRate),
      deliveryMandi: corpDeliveryMandi,
      qualitySpecs: corpQualitySpecs || 'Standard Agmark / FSSAI quality parameters',
      qualityGuaranteeByKisanSetu: true,
      escrowProtected: true,
      postedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'OPEN'
    };

    setCorpReqs([newReq, ...corpReqs]);
    setIsCorpModalOpen(false);
    setCorpCompanyName('');
    setCorpCropName('');
    setCorpVariety('');
    setCorpQuantity('');
    setCorpOfferedRate('');
    setCorpQualitySpecs('');
  };

  const handleApplySupply = (reqId: string) => {
    setApplySuccessId(reqId);
    setTimeout(() => {
      setApplySuccessId(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {lang === 'gu' ? 'મંડી ભાવ, ડાયરેક્ટ બજાર અને કોર્પોરેટ ખરીદી' : t.market.title}
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            {lang === 'gu'
              ? 'રોજેરોજ એપીએમસી ભાવ, ખેડૂત સીધું વેચાણ, અને મોટી કંપનીઓની ડાયરેક્ટ ખરીદી (કિસાનસેતુ ક્વોલિટી ગેરંટી સાથે)'
              : t.market.subtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeMarketTab === 'corporate_procure' ? (
            <button
              onClick={() => setIsCorpModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white flex items-center space-x-1.5 shadow-sm transition"
            >
              <Building2 className="w-4 h-4" />
              <span>{lang === 'gu' ? '+ કંપની ખરીદ ઓર્ડર પોસ્ટ કરો' : '+ Post Corporate Tender'}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white flex items-center space-x-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>{t.market.postListing}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-Way Sub-Tabs */}
      <div className="flex p-1 bg-stone-100 rounded-2xl border border-stone-200 overflow-x-auto">
        <button
          onClick={() => setActiveMarketTab('mandi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
            activeMarketTab === 'mandi'
              ? 'bg-white text-agri-800 shadow-sm border border-agri-200'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-agri-600" />
          <span>{lang === 'gu' ? 'લાઈવ APMC મંડી બોર્ડ' : 'APMC Live Rates'}</span>
        </button>
        <button
          onClick={() => setActiveMarketTab('corporate_procure')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
            activeMarketTab === 'corporate_procure'
              ? 'bg-white text-agri-800 shadow-sm border border-agri-200'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-600" />
          <span>{lang === 'gu' ? 'કંપની ખરીદી રિક્વાયરમેન્ટ (ગેરંટીડ)' : 'Corporate Procurement (Guaranteed)'}</span>
        </button>
        <button
          onClick={() => setActiveMarketTab('farmer_direct')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
            activeMarketTab === 'farmer_direct'
              ? 'bg-white text-agri-800 shadow-sm border border-agri-200'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Store className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'gu' ? 'ખેડૂત સીધું વેચાણ' : 'Direct Farmer Market'}</span>
        </button>
      </div>

      {/* CONDITIONAL CONTENT BASED ON ACTIVE SUB-TAB */}
      {activeMarketTab === 'corporate_procure' && (
        <div className="space-y-6">
          {/* Institutional Quality Guarantee Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-agri-50 to-emerald-50 border border-amber-200/90 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'gu' ? 'કિસાનસેતુ સંપૂર્ણ ગુણવત્તા અને રિસ્ક ગેરંટી' : 'KisanSetu Full Quality & Risk Guarantee'}</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                100% Escrow Protected Settlement
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-display font-extrabold text-stone-900">
                {lang === 'gu'
                  ? 'મોટી કંપનીઓની ડાયરેક્ટ ખરીદી — ગુણવત્તા તપાસ અને જોખમની સંપૂર્ણ જવાબદારી કિસાનસેતુની!'
                  : 'Corporate Bulk Buying with KisanSetu Quality Assurance & Zero Risk to Farmer'}
              </h2>
              <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                {lang === 'gu'
                  ? 'કોર્પોરેટ કંપનીઓ (અદાણી, આઇટીસી, બાલાજી) તેમની માલ જરૂરિયાત સીધી અહીં મૂકે છે. કિસાનસેતુની લેબ ટીમ ખેડૂતના માલનું ગ્રેડિંગ કરશે અને કંપની તરફથી પેમેન્ટ એસ્ક્રો ખાતામાં જમા રહેશે — ખેડૂતને ભાવ કાપ કે રિજેક્શનનો કોઈ ડર નહીં રહે.'
                  : 'FMCG and agribusinesses post procurement tenders here. KisanSetu certifies quality grading at farm-gate, holds payment in escrow, and absorbs trade dispute risk.'}
              </p>
            </div>
          </div>

          {/* Corporate Buy Requirements Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>{lang === 'gu' ? 'સક્રિય કંપની ખરીદ ઓર્ડર અને ટેન્ડર્સ' : 'Active Corporate Purchase Orders'}</span>
              </h3>
              <span className="text-xs text-stone-500">
                {corpReqs.length} {lang === 'gu' ? 'ઓર્ડર્સ ઉપલબ્ધ' : 'tenders active'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {corpReqs.map((req) => (
                <div
                  key={req.id}
                  className="bg-white p-5 rounded-3xl border border-stone-200 hover:border-amber-400 transition shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-stone-400 block font-mono">{req.id}</span>
                        <h4 className="text-xs font-bold text-stone-900 leading-snug">{req.companyName}</h4>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.status === 'OPEN'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {req.status === 'OPEN' ? (lang === 'gu' ? 'ખુલ્લો ઓર્ડર' : 'Open') : (lang === 'gu' ? 'ચાલુ ખરીદી' : 'In Procurement')}
                      </span>
                    </div>

                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-stone-900">{req.cropName}</span>
                      </div>
                      <p className="text-[11px] text-stone-500">{req.variety}</p>
                      <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
                        <span className="text-stone-500 font-medium">{lang === 'gu' ? 'જરૂરી જથ્થો:' : 'Target Quantity:'}</span>
                        <span className="font-bold text-stone-800">{req.requiredQuantityQtl.toLocaleString('en-IN')} Quintals</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-stone-500 font-medium">{lang === 'gu' ? 'ઓફર ભાવ:' : 'Offered Rate:'}</span>
                        <span className="text-sm font-display font-black text-emerald-700">
                          ₹{req.offeredRatePerQtl.toLocaleString('en-IN')} <span className="text-[10px] text-stone-400 font-normal">/ Qtl</span>
                        </span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1.5">
                      <div className="flex items-start space-x-1.5 text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{req.deliveryMandi}</span>
                      </div>
                      <div className="flex items-start space-x-1.5 text-stone-600 bg-amber-50/60 p-2 rounded-xl border border-amber-200/50">
                        <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[10px] leading-relaxed">
                          <strong>ક્વોલિટી શરત:</strong> {req.qualitySpecs}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-[10px] text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>કિસાનસેતુ એસ્ક્રો સેફ્ટી અને ગેરંટી પ્રમાણિત</span>
                    </div>
                  </div>

                  {applySuccessId === req.id ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold text-center flex items-center justify-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>અરજી સફળ! ફિલ્ડ ઓફિસર સંપર્ક કરશે.</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApplySupply(req.id)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white transition flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{lang === 'gu' ? 'આ ઓર્ડરમાં સપ્લાય કરો' : 'Supply to this Order'}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeMarketTab === 'mandi' && (
        /* Live Mandi Rates Table / Cards */
        <div className="glass-panel p-5 rounded-3xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                {lang === 'gu' ? 'આજના મંડી ભાવ (APMC Wholesale Daily Board)' : lang === 'hi' ? 'आज के मंडी भाव' : 'Today APMC Wholesale Daily Board'}
              </h3>
            </div>
            <span className="text-[10px] text-stone-400">
              {new Date().toLocaleDateString(lang === 'gu' ? 'gu-IN' : 'en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
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
      )}

      {activeMarketTab === 'farmer_direct' && (
        /* Direct Farmer-to-Buyer Marketplace Section */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-display font-bold text-stone-900">
              {t.market.directMarket}
            </h2>
            <span className="text-xs text-stone-500">
              {lang === 'gu' ? 'સીધા ખેડૂતો પાસેથી ખરીદી (શૂન્ય દલાલી)' : 'Zero middleman commission'}
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
                  <span>{lang === 'gu' ? 'ખેડૂત સાથે વાત કરો' : lang === 'hi' ? 'किसान से संपर्क करें' : 'Contact Producer'}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* Corporate Requirement Post Modal */}
      {isCorpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-display font-extrabold text-stone-900 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span>{lang === 'gu' ? 'કંપની ખરીદ ઓર્ડર (Tender) પોસ્ટ કરો' : 'Post Corporate Procurement Tender'}</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                KisanSetu Escrow
              </span>
            </div>

            <form onSubmit={handlePostCorpRequirement} className="space-y-4 pt-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  કંપની / સંસ્થાનું નામ (Company / Corporate Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. પતંજલિ ફૂડ્સ લિ. / આઇટીસી એગ્રી"
                  value={corpCompanyName}
                  onChange={(e) => setCorpCompanyName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    પાક / અનાજ (Crop Name)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="દા.ત. કપાસ / જીરું / મગફળી"
                    value={corpCropName}
                    onChange={(e) => setCorpCropName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    વેરાયટી / ગ્રેડ (Grade / Variety)
                  </label>
                  <input
                    type="text"
                    placeholder="દા.ત. Shankar-6 Export Grade"
                    value={corpVariety}
                    onChange={(e) => setCorpVariety(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    જરૂરી જથ્થો (Quintals)
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    placeholder="દા.ત. 500 ક્વિન્ટલ"
                    value={corpQuantity}
                    onChange={(e) => setCorpQuantity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    ઓફર ભાવ (₹ પ્રતિ ક્વિન્ટલ)
                  </label>
                  <input
                    type="number"
                    required
                    min="100"
                    placeholder="દા.ત. 6800"
                    value={corpOfferedRate}
                    onChange={(e) => setCorpOfferedRate(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-bold text-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ડિલિવરી લોકેશન / મંડી યાર્ડ (Delivery Mandi / Hub)
                </label>
                <input
                  type="text"
                  value={corpDeliveryMandi}
                  onChange={(e) => setCorpDeliveryMandi(e.target.value)}
                  placeholder="રાજકોટ, ગોંડલ અથવા ખેડૂત ફાર્મ-ગેટ પીકઅપ"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ગુણવત્તા અને લેબ માપદંડ (Quality & Lab Specifications)
                </label>
                <textarea
                  rows={2}
                  value={corpQualitySpecs}
                  onChange={(e) => setCorpQualitySpecs(e.target.value)}
                  placeholder="દા.ત. ભેજ ૮% થી ઓછો, તેલ ૪૮%+, ડસ્ટ રહિત માલ"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold">✓ કિસાનસેતુ સંપૂર્ણ જવાબદારી ગેરંટી:</p>
                <p>કિસાનસેતુ ફિલ્ડ ટીમો ખેડૂત સુધી પહોંચીને લેબ ટેસ્ટિંગ કરશે અને કંપની માટે ગુણવત્તા પાસ કરશે. ખેડૂતને ૨૪ કલાકમાં એસ્ક્રો પેમેન્ટ મળશે.</p>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCorpModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  રદ કરો
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-sm transition"
                >
                  ઓર્ડર પબ્લિશ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
