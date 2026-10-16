import React, { useState } from 'react';
import { Bug, Camera, Upload, CheckCircle2, AlertOctagon, Sparkles, Volume2, ShieldCheck, RefreshCw } from 'lucide-react';
import { Language, translations } from '../i18n';
import { DiagnosisResult } from '../types';
import { api } from '../services/api';

interface DiagnosisViewProps {
  lang: Language;
}

export const DiagnosisView: React.FC<DiagnosisViewProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedCrop, setSelectedCrop] = useState('Wheat (गेहूं)');
  const [symptoms, setSymptoms] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const crops = [
    'Wheat (गेहूं)',
    'Rice / Paddy (धान)',
    'Cotton (कपास)',
    'Tomato (टमाटर)',
    'Soybean (सोयाबीन)',
    'Mustard (सरसों)',
  ];

  const quickSymptoms = lang === 'hi' ? [
    'पत्तियों पर पीली धारियां',
    'पत्ती का झुलसना व सूखना',
    'काले व भूरे गोल धब्बे',
    'फूलों में सुंडी का प्रकोप',
  ] : [
    'Yellow parallel stripes on leaves',
    'Spindle-shaped brown leaf spots',
    'Flower rosetting & boll boreholes',
    'Concentric ring target spots',
  ];

  const handleDiagnose = async () => {
    setLoading(true);
    try {
      const res = await api.diagnoseCrop(selectedCrop, symptoms);
      setDiagnosis(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakTreatment = () => {
    if (!diagnosis) return;
    const textToSpeak = lang === 'hi' ? diagnosis.treatmentHindi : diagnosis.treatment;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(textToSpeak);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-extrabold text-stone-900">
          {t.doctor.title}
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          {t.doctor.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Input Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-5 rounded-3xl space-y-4 border border-stone-200">
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t.doctor.selectCrop}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
              >
                {crops.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Photo Upload Simulation */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t.doctor.uploadPhoto}
              </label>
              <div
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`cursor-pointer border-2 border-dashed rounded-2xl p-6 text-center transition flex flex-col items-center justify-center ${
                  hasPhoto
                    ? 'border-emerald-500 bg-emerald-50/60'
                    : 'border-stone-300 hover:border-agri-500 bg-stone-50'
                }`}
              >
                {hasPhoto ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-2" />
                    <span className="text-xs font-bold text-emerald-800">
                      {lang === 'hi' ? 'फसल की पत्ती संलग्न है (Leaf Photo Attached)' : 'Leaf Photo Attached'}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">
                      {lang === 'hi' ? 'बदलने के लिए पुनः टैप करें' : 'Tap to replace photo'}
                    </span>
                  </>
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-stone-400 mb-2" />
                    <span className="text-xs font-semibold text-stone-700">
                      {t.doctor.clickToUpload}
                    </span>
                    <span className="text-[10px] text-stone-400 mt-1">
                      Supports JPG, PNG up to 10MB
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Symptoms Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                {t.doctor.symptoms}
              </label>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={t.doctor.symptomsPlaceholder}
                className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-agri-500"
              />

              {/* Quick Suggestion Chips */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {quickSymptoms.map((qs, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSymptoms(qs)}
                    className="text-[10px] font-medium px-2 py-1 rounded-lg bg-stone-100 hover:bg-agri-100 text-stone-700 hover:text-agri-800 transition"
                  >
                    + {qs}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleDiagnose}
              disabled={loading}
              className="w-full py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-agri-700 to-agri-600 hover:from-agri-600 hover:to-agri-500 text-white shadow-md flex items-center justify-center space-x-2 transition transform active:scale-98"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-harvest-300" />
                  <span>{t.doctor.analyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-harvest-300" />
                  <span>{t.doctor.analyzeBtn}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Diagnostic Result Section */}
        <div className="lg:col-span-7">
          {diagnosis ? (
            <div className="glass-panel p-6 rounded-3xl border border-stone-200 space-y-5 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-agri-100 text-agri-800">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-extrabold text-stone-900">
                      {t.doctor.resultTitle}
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      AI Model: KisanSetu Vision v2 · {selectedCrop}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSpeakTreatment}
                  title="Listen to recommendation"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-agri-50 hover:bg-agri-100 text-agri-800 transition"
                >
                  <Volume2 className="w-4 h-4 text-agri-600" />
                  <span>{lang === 'hi' ? 'बोलकर सुनें' : 'Listen'}</span>
                </button>
              </div>

              {/* Identified Disease */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    {lang === 'hi' ? 'पहचाना गया रोग' : 'Detected Disease'}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    {t.doctor.severity}: {diagnosis.severity}
                  </span>
                </div>
                <div className="text-lg font-display font-black text-stone-900">
                  {lang === 'hi' ? diagnosis.diseaseNameHindi : diagnosis.diseaseName}
                </div>
                <div className="text-xs text-stone-600 font-medium italic mt-0.5">
                  Scientific Name: {diagnosis.diseaseName}
                </div>

                {/* Confidence Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 mb-1">
                    <span>{t.doctor.confidence}</span>
                    <span className="text-emerald-700 font-bold">{Math.round(diagnosis.confidence * 100)}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${diagnosis.confidence * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Treatment & Chemical Spray */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>{t.doctor.treatment}</span>
                </div>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {lang === 'hi' ? diagnosis.treatmentHindi : diagnosis.treatment}
                </p>
              </div>

              {/* Preventive Practices */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
                  <span className="w-2 h-2 rounded-full bg-agri-600" />
                  <span>{t.doctor.preventive}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {diagnosis.preventiveCare}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[300px] glass-panel p-8 rounded-3xl border border-stone-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-agri-100 text-agri-700 flex items-center justify-center mb-4">
                <Bug className="w-8 h-8" />
              </div>
              <h3 className="text-base font-display font-bold text-stone-800">
                {lang === 'hi' ? 'रोग का विवरण दर्ज करें' : 'Submit Symptoms or Photo'}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1">
                {lang === 'hi'
                  ? 'अपनी फसल का नाम और लक्षण चुनें, किसानसेतु एआई तुरंत प्रमाणित दवा का नाम व छिड़काव मात्रा बताएगा।'
                  : 'Select your crop and symptoms on the left to receive instant diagnostic guidance and chemical dosage.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
