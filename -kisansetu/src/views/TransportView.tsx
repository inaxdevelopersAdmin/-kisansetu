import React, { useState, useEffect } from 'react';
import { Truck, MapPin, Phone, Star, Calculator, Check, ArrowRight, Shield } from 'lucide-react';
import { Language, translations } from '../i18n';
import { Transporter } from '../types';
import { api } from '../services/api';

interface TransportViewProps {
  lang: Language;
}

export const TransportView: React.FC<TransportViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [selectedTransporter, setSelectedTransporter] = useState<Transporter | null>(null);
  const [distanceKm, setDistanceKm] = useState(25);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [cropType, setCropType] = useState('Wheat / Grains');
  const [tonnage, setTonnage] = useState('4.5');
  const [pickup, setPickup] = useState('Village Ashta, Farm Gate');
  const [drop, setDrop] = useState('Sehore Krishi Upaj Mandi');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    api.getTransporters().then(setTransporters);
  }, []);

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
      <div>
        <h1 className="text-2xl font-display font-extrabold text-stone-900">
          {t.transport.title}
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          {t.transport.subtitle}
        </p>
      </div>

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
