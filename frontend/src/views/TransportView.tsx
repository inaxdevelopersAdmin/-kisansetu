import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Phone, Star, Calculator, Check, ArrowRight, Shield } from 'lucide-react';
import { Language, translations } from '../i18n';
import { Transporter, FuelContractBilling } from '../types';
import { api } from '../services/api';
import { Fuel, Receipt, Calendar, CreditCard, Building2, CheckCircle2 } from 'lucide-react';

interface TransportViewProps {
  lang: Language;
}

export const TransportView: React.FC<TransportViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'transporters' | 'fuel_contracts'>('transporters');
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [distanceKm, setDistanceKm] = useState(25);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [cropType, setCropType] = useState('Wheat / Grains');
  const [tonnage, setTonnage] = useState('4.5');
  const [pickup, setPickup] = useState('Village Ashta, Farm Gate');
  const [drop, setDrop] = useState('Sehore Krishi Upaj Mandi');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fuel Contracts Mock Data
  const [fuelBills, setFuelBills] = useState<FuelContractBilling[]>([
    {
      id: 'FC-GJ-2026-001',
      pumpName: 'Nayara Energy Highway Kisan Hub',
      pumpLocation: 'Rajkot - Gondal Highway NH-27, Mile 14',
      transporterName: 'બાબુભાઈ રબારી (Rabari Logistics)',
      vehicleNumber: 'GJ-03-BW-7890 (Eicher 14ft)',
      billingCycle: 'MONTHLY',
      totalLiters: 840,
      totalBilledAmount: 75600,
      discountPerLiter: 2.50,
      status: 'CURRENT_CYCLE',
      dueDate: '30 Oct 2026'
    },
    {
      id: 'FC-GJ-2026-002',
      pumpName: 'HPCL Kisan Seva Kendra Petrol Pump',
      pumpLocation: 'Mehsana Bypass Road, Visnagar Chowkdi',
      transporterName: 'જય અંબે રોડવેઝ (Jignesh Patel)',
      vehicleNumber: 'GJ-02-ZZ-3412 (Tata 407)',
      billingCycle: 'MONTHLY',
      totalLiters: 620,
      totalBilledAmount: 55800,
      discountPerLiter: 2.20,
      status: 'BILLED',
      dueDate: '25 Oct 2026'
    },
    {
      id: 'FC-GJ-2026-003',
      pumpName: 'IndianOil Swaraj Fuel Station',
      pumpLocation: 'Amreli - Dhari State Highway',
      transporterName: 'કૃષ્ણ એગ્રી કાર્ગો (Kishor Makwana)',
      vehicleNumber: 'GJ-14-AA-9901 (Mahindra Bolero Maxi)',
      billingCycle: 'YEARLY',
      totalLiters: 7450,
      totalBilledAmount: 663050,
      discountPerLiter: 3.00,
      status: 'SETTLED',
      dueDate: '15 Sep 2026'
    }
  ]);

  const [fuelFormOpen, setFuelFormOpen] = useState(false);
  const [selectedPump, setSelectedPump] = useState('Nayara Energy Highway Kisan Hub');
  const [cycleType, setCycleType] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporterInputName, setTransporterInputName] = useState('');
  const [contractCreatedMsg, setContractCreatedMsg] = useState(false);

  useEffect(() => {
    api.getTransporters().then(setTransporters);
  }, []);

  const handleCreateFuelContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleNo || !transporterInputName) return;

    const newBill: FuelContractBilling = {
      id: `FC-GJ-${Date.now().toString().slice(-4)}`,
      pumpName: selectedPump,
      pumpLocation: 'Gujarat Agro Highway Corridor',
      transporterName: transporterInputName,
      vehicleNumber: vehicleNo.toUpperCase(),
      billingCycle: cycleType,
      totalLiters: 150,
      totalBilledAmount: 13500,
      discountPerLiter: cycleType === 'YEARLY' ? 3.00 : 2.50,
      status: 'CURRENT_CYCLE',
      dueDate: cycleType === 'YEARLY' ? '31 Dec 2026' : '30 Nov 2026'
    };

    setFuelBills([newBill, ...fuelBills]);
    setContractCreatedMsg(true);
    setTimeout(() => {
      setFuelFormOpen(false);
      setContractCreatedMsg(false);
      setVehicleNo('');
      setTransporterInputName('');
    }, 1800);
  };

  const handleOpenBooking = (tr: Transporter) => {
    setSelectedTransporter(tr);
    setIsBookModalOpen(true);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTransporter) return;

    await api.bookTransport({
      transporterName: selectedTransporter.transporterName,
      cropType,
      tonnage,
      pickup,
      drop,
      distanceKm,
      ratePerKm: selectedTransporter.ratePerKm,
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookModalOpen(false);
      setBookingSuccess(false);
    }, 2000);
  };

  const estimatedFare = selectedTransporter
    ? distanceKm * selectedTransporter.ratePerKm
    : distanceKm * 35;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-stone-900">
            {lang === 'gu' ? 'પરિવહન અને પેટ્રોલ પંપ ફ્લીટ વ્યવસ્થાપન' : t.transport.title}
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            {lang === 'gu'
              ? 'ખેત-થી-મંડી પરિવહન બુકિંગ અને પેટ્રોલ પંપ માલિકો સાથે માસિક/વાર્ષિક ક્રેડિટ કરાર બિલિંગ'
              : 'Direct farm-to-mandi transport booking & monthly/yearly fuel contracts with petrol pump stations'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveTab('transporters')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'transporters'
                ? 'bg-white text-agri-800 shadow-sm border border-agri-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Truck className="w-4 h-4 text-agri-600" />
            <span>{lang === 'gu' ? 'વાહનો બુક કરો' : 'Vehicles & Drivers'}</span>
          </button>
          <button
            onClick={() => setActiveTab('fuel_contracts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
              activeTab === 'fuel_contracts'
                ? 'bg-white text-agri-800 shadow-sm border border-agri-200'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Fuel className="w-4 h-4 text-amber-600" />
            <span>{lang === 'gu' ? 'પેટ્રોલ પંપ કરાર અને બિલિંગ' : 'Petrol Pump Fleet Billing'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'fuel_contracts' ? (
        /* PETROL PUMP FLEET CONTRACTS SECTION */
        <div className="space-y-6">
          {/* Highlight banner explaining the contract model */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 via-agri-50 to-emerald-50 border border-amber-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                <Fuel className="w-3.5 h-3.5" />
                <span>{lang === 'gu' ? 'કિસાનસેતુ ફ્લીટ ક્રેડિટ કરાર' : 'KisanSetu Fleet Credit Tie-up'}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {lang === 'gu'
                  ? 'ટ્રાન્સપોર્ટર ભાઈઓ માટે પેટ્રોલ પંપ પરથી રોકડ વગર ડીઝલ, માસિક/વાર્ષિક બિલિંગ'
                  : 'Cashless Diesel at Partner Petrol Pumps with Consolidated Monthly/Yearly Billing'}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                {lang === 'gu'
                  ? 'કિસાનસેતુ નેટવર્ક હેઠળ HPCL, Nayara, IndianOil સાથે કરાર: વાહનચાલક રોકડ વિના ઇ-સ્લિપથી ડીઝલ ભરાવી શકે છે અને મહિને કે વર્ષે ડિસ્કાઉન્ટ (₹2.50 - ₹3.00/લિટર બચત) સાથે હિસાબ ચૂકતે કરે છે.'
                  : 'Zero cash needed on road trips. Verified drivers draw fuel using digital KisanSetu Fleet Token; pump owners get secured payment guarantee and offer fleet discounts.'}
              </p>
            </div>
            <button
              onClick={() => setFuelFormOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-agri-600 hover:bg-agri-500 text-white font-bold text-xs shadow-sm flex items-center justify-center space-x-2 shrink-0"
            >
              <CreditCard className="w-4 h-4" />
              <span>{lang === 'gu' ? '+ નવો પંપ કરાર જોડો' : '+ Link New Pump Contract'}</span>
            </button>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                {lang === 'gu' ? 'કુલ કરારબદ્ધ પંપ' : 'Partner Fuel Stations'}
              </span>
              <p className="text-xl font-display font-black text-stone-900 mt-1">142 પંપ</p>
              <span className="text-[10px] text-emerald-600 font-semibold">HPCL, Nayara, IOCL, BPCL</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                {lang === 'gu' ? 'ફ્લીટ ડિસ્કાઉન્ટ બચત' : 'Fleet Savings Rate'}
              </span>
              <p className="text-xl font-display font-black text-emerald-700 mt-1">₹2.50 - ₹3.00</p>
              <span className="text-[10px] text-stone-500">પ્રતિ લિટર રોકડ વગર ક્રેડિટ</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                {lang === 'gu' ? 'બિલિંગ સાયકલ' : 'Billing Modes'}
              </span>
              <p className="text-xl font-display font-black text-amber-600 mt-1">Monthly & Yearly</p>
              <span className="text-[10px] text-stone-500">30 દિવસ ક્રેડિટ પિરિયડ</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                {lang === 'gu' ? 'સક્રિય વાહનો' : 'Active Enrolled Trucks'}
              </span>
              <p className="text-xl font-display font-black text-agri-700 mt-1">890+ વાહનો</p>
              <span className="text-[10px] text-emerald-600">ગુજરાત - સૌરાષ્ટ્ર કોરિડોર</span>
            </div>
          </div>

          {/* Active Fuel Contracts Table / Cards */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center space-x-2">
              <Receipt className="w-4 h-4 text-agri-700" />
              <span>{lang === 'gu' ? 'ચાલુ માસિક અને વાર્ષિક પેટ્રોલ પંપ બિલ વિગતો' : 'Active Fuel Fleet Statements & Contracts'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {fuelBills.map((b) => (
                <div
                  key={b.id}
                  className="bg-white p-5 rounded-3xl border border-stone-200 hover:border-agri-400 transition shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                          <Fuel className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-stone-400 block">{b.id}</span>
                          <span className="text-xs font-bold text-stone-900">{b.pumpName}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          b.status === 'CURRENT_CYCLE'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'BILLED'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {b.billingCycle === 'MONTHLY' ? 'માસિક સાયકલ' : 'વાર્ષિક કરાર'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="line-clamp-1">{b.pumpLocation}</span>
                    </p>

                    <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-stone-500">ટ્રાન્સપોર્ટર:</span>
                        <span className="font-bold text-stone-800">{b.transporterName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">વાહન નંબર:</span>
                        <span className="font-mono font-bold text-agri-700">{b.vehicleNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">કુલ ડીઝલ:</span>
                        <span className="font-bold text-stone-800">{b.totalLiters.toLocaleString('en-IN')} Ltr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">ડિસ્કાઉન્ટ:</span>
                        <span className="font-bold text-emerald-600">-₹{b.discountPerLiter.toFixed(2)} / લિટર</span>
                      </div>
                      <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                        <span className="font-bold text-stone-700">કુલ બિલ રકમ:</span>
                        <span className="text-sm font-display font-black text-stone-900">
                          ₹{b.totalBilledAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>ચુકવણી તારીખ: <strong>{b.dueDate}</strong></span>
                    </span>
                    <button
                      onClick={() => alert(`બિલ સ્ટેટમેન્ટ #${b.id} ડાઉનલોડ થઈ ગયું છે. કિસાનસેતુ ડિજિટલ રસીદ ઈ-મેલ/એસએમએસ પર મોકલેલ છે.`)}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition flex items-center space-x-1"
                    >
                      <Receipt className="w-3 h-3" />
                      <span>બિલ જુઓ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal to link new pump contract */}
          {fuelFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
                {contractCreatedMsg ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-display font-bold text-stone-900">
                      પેટ્રોલ પંપ કરાર સફળતાપૂર્વક જોડાયો!
                    </h3>
                    <p className="text-xs text-stone-500">
                      વાહન {vehicleNo.toUpperCase()} માટે ડિજિટલ ફ્લીટ ક્રેડિટ કાર્ડ જનરેટ થઈ ગયું છે.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateFuelContract} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <h3 className="text-sm font-display font-bold text-stone-900 flex items-center space-x-2">
                        <Fuel className="w-4 h-4 text-amber-600" />
                        <span>પેટ્રોલ પંપ સાથે માસિક/વાર્ષિક કરાર</span>
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ₹2.50+ બચત
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        પાર્ટનર પેટ્રોલ પંપ પસંદ કરો
                      </label>
                      <select
                        value={selectedPump}
                        onChange={(e) => setSelectedPump(e.target.value)}
                        className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      >
                        <option value="Nayara Energy Highway Kisan Hub">Nayara Energy Highway Kisan Hub (Rajkot Highway)</option>
                        <option value="HPCL Kisan Seva Kendra Petrol Pump">HPCL Kisan Seva Kendra (Mehsana Bypass)</option>
                        <option value="IndianOil Swaraj Fuel Station">IndianOil Swaraj Fuel Station (Amreli Highway)</option>
                        <option value="BPCL Agro Fleet Pump">BPCL Agro Fleet Fuel Point (Baroda Ring Road)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        બિલિંગ સાયકલ
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCycleType('MONTHLY')}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center ${
                            cycleType === 'MONTHLY'
                              ? 'border-agri-600 bg-agri-50 text-agri-800'
                              : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          માસિક બિલિંગ (Monthly)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCycleType('YEARLY')}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center ${
                            cycleType === 'YEARLY'
                              ? 'border-agri-600 bg-agri-50 text-agri-800'
                              : 'border-stone-200 text-stone-600'
                          }`}
                        >
                          વાર્ષિક બિલિંગ (Yearly)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        ટ્રાન્સપોર્ટર / પેઢીનું નામ
                      </label>
                      <input
                        type="text"
                        required
                        value={transporterInputName}
                        onChange={(e) => setTransporterInputName(e.target.value)}
                        placeholder="દા.ત. રમેશભાઈ ગોહેલ રોડવેઝ"
                        className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        વાહન રજીસ્ટ્રેશન નંબર
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                        placeholder="દા.ત. GJ-05-BX-1234"
                        className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl font-mono uppercase"
                      />
                    </div>

                    <div className="p-3 bg-amber-50 rounded-2xl text-[11px] text-amber-800 space-y-1 border border-amber-200">
                      <p className="font-bold">✓ કિસાનસેતુ પેમેન્ટ એસ્ક્રો ગેરંટી:</p>
                      <p>પેટ્રોલ પંપ માલિકને સમયસર પેમેન્ટની 100% ખાતરી, અને વાહનચાલકને રોકડ વગર નિર્વિઘ્ન ડીઝલ સુવિધા મળશે.</p>
                    </div>

                    <div className="flex items-center justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setFuelFormOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                      >
                        રદ કરો
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
                      >
                        કરાર કન્ફર્મ કરો
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ORIGINAL TRANSPORTERS TRIP CALCULATOR & LIST */
        <>
          {/* Interactive Trip Estimator Card */}
          <div className="glass-panel p-5 rounded-3xl border border-agri-300 bg-gradient-to-r from-agri-50/50 via-white to-harvest-50/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-agri-700 text-white shadow-sm">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {t.transport.fareCalculator}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'hi' ? 'खेत से मंडी दूरी के अनुसार पारदर्शी किराया' : 'Transparent per-km route cost'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">
                    {t.transport.distance}: <strong className="text-agri-800">{distanceKm} km</strong>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="120"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="w-40 sm:w-56 accent-agri-600"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">
                    {t.transport.estimatedFare}
                  </span>
                  <span className="text-xl font-display font-black text-agri-800">
                    ₹{estimatedFare.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transporter List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {transporters.map((tr) => (
              <div
                key={tr.id}
                className="glass-panel p-5 rounded-3xl border border-stone-200 hover:border-agri-500 transition shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {tr.transporterName}
                      </h3>
                      <div className="flex items-center space-x-1 text-amber-500 text-xs mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-stone-700">{tr.rating}</span>
                        <span className="text-stone-400 text-[10px]">(Verified Driver)</span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tr.available
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {tr.available
                        ? (lang === 'hi' ? 'उपलब्ध' : 'Available')
                        : (lang === 'hi' ? 'यात्रा पर' : 'On Trip')}
                    </span>
                  </div>

                  {/* Vehicle Specs */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-500 font-medium">{t.transport.vehicle}:</span>
                      <span className="font-bold text-stone-800">{tr.vehicleType}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-500 font-medium">{t.transport.capacity}:</span>
                      <span className="font-bold text-stone-800">{tr.capacityTonnes} Tonnes</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50 border border-stone-100">
                      <span className="text-stone-500 font-medium">{t.transport.rate}:</span>
                      <span className="font-bold text-emerald-700">₹{tr.ratePerKm}/km</span>
                    </div>
                    {tr.petrolPumpCredit && (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200/50">
                        <span className="text-amber-800 font-semibold flex items-center space-x-1">
                          <Fuel className="w-3 h-3 text-amber-600" />
                          <span>પંપ ક્રેડિટ કરાર:</span>
                        </span>
                        <span className="font-bold text-emerald-700">એનરોલ થયેલ</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center text-xs text-stone-500 space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="line-clamp-1">{tr.baseLocation}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking(tr)}
                  disabled={!tr.available}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-sm ${
                    tr.available
                      ? 'bg-agri-700 hover:bg-agri-600 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>{t.transport.bookNow}</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Booking Modal */}
      {isBookModalOpen && selectedTransporter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-200">
            {bookingSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-base font-display font-bold text-stone-900">
                  {lang === 'hi' ? 'परिवहन बुकिंग सफल!' : 'Transport Dispatched!'}
                </h3>
                <p className="text-xs text-stone-500">
                  {selectedTransporter.transporterName} ({selectedTransporter.vehicleNumber}) has accepted your pickup.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h3 className="text-sm font-display font-bold text-stone-900">
                    {t.transport.confirmBooking}
                  </h3>
                  <span className="text-xs font-bold text-agri-700">
                    ₹{selectedTransporter.ratePerKm}/km
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Crop & Load Weight
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      placeholder="e.g. Wheat"
                      className="text-xs p-2 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={tonnage}
                      onChange={(e) => setTonnage(e.target.value)}
                      placeholder="e.g. 5 Tonnes"
                      className="text-xs p-2 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Pickup Location (Farm Gate)
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Destination Mandi
                  </label>
                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between text-xs font-bold">
                  <span>Estimated Total Fare ({distanceKm} km):</span>
                  <span className="text-agri-800 text-sm">
                    ₹{(distanceKm * selectedTransporter.ratePerKm).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    {t.khata.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold bg-agri-600 hover:bg-agri-500 text-white rounded-xl shadow-sm transition"
                  >
                    {t.transport.confirmBooking}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
