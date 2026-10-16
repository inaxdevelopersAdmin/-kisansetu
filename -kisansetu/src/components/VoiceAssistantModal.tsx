import React, { useState } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../i18n';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  if (!isOpen) return null;

  const sampleQueries = lang === 'hi' ? [
    'गेहूं में पीला रतुआ लग गया है, कौन सा स्प्रे करें?',
    'आज इंदौर मंडी में शरबती गेहूं का क्या भाव है?',
    'पीएम किसान योजना की 18वीं किस्त कब आएगी?',
    'खेत में 5 टन सोयाबीन मंडी भेजने हेतु ट्रैक्टर चाहिए।',
  ] : [
    'Yellow rust spots on wheat leaves, what is the recommended spray dosage?',
    'What is the today modal price of Basmati rice in Karnal Mandi?',
    'How do I apply for 60% subsidy on Solar Kusum agricultural pump?',
    'Book an 8-ton tractor trolley for grain transit.',
  ];

  const handleSimulateVoice = (query: string) => {
    setIsListening(true);
    setTranscript(query);
    setResponse('');

    setTimeout(() => {
      setIsListening(false);
      if (query.includes('गेहूं') || query.includes('wheat') || query.includes('रतुआ')) {
        setResponse(lang === 'hi'
          ? 'कृषि वैज्ञानिकों की सिफारिश: प्रोपिकोनाज़ोल 25% EC (टिल्ट) का 1 मिली प्रति लीटर पानी की दर से (200 मिली प्रति एकड़) सुबह के समय छिड़काव करें।'
          : 'Agricultural Scientist Advice: Spray Propiconazole 25% EC (Tilt) @ 1ml/L of water (200ml in 200L/acre) in calm morning hours.');
      } else if (query.includes('मंडी') || query.includes('Mandi') || query.includes('भाव')) {
        setResponse(lang === 'hi'
          ? 'आज सीहोर और इंदौर मंडी में शरबती गेहूं का मॉडल भाव ₹2,820 प्रति क्विंटल दर्ज किया गया है (कल से ₹40 की वृद्धि)।'
          : 'Today modal price for Sharbati Wheat at Indore APMC Mandi is ₹2,820/Quintal (+₹40 gain).');
      } else if (query.includes('सोलर') || query.includes('Kusum') || query.includes('सब्सिडी')) {
        setResponse(lang === 'hi'
          ? 'पीएम कुसुम योजना के तहत 3HP से 7.5HP सोलर सिंचाई पंप पर केंद्र और राज्य सरकार मिलकर 60% का अनुदान देती हैं।'
          : 'Under PM-KUSUM Scheme, 60% subsidy is sanctioned for standalone solar irrigation pumps (3HP to 7.5HP).');
      } else {
        setResponse(lang === 'hi'
          ? 'आपका अनुरोध दर्ज कर लिया गया है। नजदीकी गुरकीरत लॉजिस्टिक्स (PB 10 CF 4291) को सूचना भेज दी गई है।'
          : 'Your transport dispatch request has been relayed to Gurkirat Logistics fleet (PB 10 CF 4291).');
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-agri-950 border border-agri-600 rounded-3xl shadow-2xl p-6 text-white overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-harvest-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-agri-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-agri-800 text-harvest-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {lang === 'hi' ? 'किसान सेतु वॉयस असिस्टेंट' : 'KisanSetu Voice AI'}
              </h3>
              <p className="text-xs text-agri-300">
                {lang === 'hi' ? 'हिंदी व क्षेत्रीय भाषाओं में बोलकर पूछें' : 'Voice-first rural agri assistance'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close voice assistant"
            className="p-1.5 rounded-full hover:bg-agri-800 text-stone-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Mic Pulse Area */}
        <div className="flex flex-col items-center justify-center py-8">
          <div
            onClick={() => handleSimulateVoice(sampleQueries[0])}
            className={`cursor-pointer relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.7)] scale-110'
                : 'bg-agri-600 hover:bg-agri-500 shadow-[0_0_30px_rgba(52,114,66,0.5)]'
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 text-white animate-pulse" />
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
            {isListening && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
            )}
          </div>
          <p className="mt-4 text-xs font-semibold tracking-wide text-agri-200 uppercase">
            {isListening
              ? (lang === 'hi' ? 'सुन रहा हूँ... बोलिए' : 'Listening... Speak now')
              : (lang === 'hi' ? 'बोलने के लिए माइक पर टैप करें' : 'Tap microphone to speak')}
          </p>
        </div>

        {/* Live Query & Response */}
        {transcript && (
          <div className="mb-4 p-3 bg-agri-900/80 border border-agri-700/80 rounded-xl">
            <p className="text-xs text-harvest-300 font-semibold mb-1">
              {lang === 'hi' ? 'आपने पूछा:' : 'You said:'}
            </p>
            <p className="text-sm text-stone-100 font-medium italic">"{transcript}"</p>
          </div>
        )}

        {response && (
          <div className="mb-4 p-4 bg-emerald-950/90 border border-emerald-600/70 rounded-2xl shadow-inner">
            <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold mb-1.5">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'hi' ? 'किसान मित्र एआई का उत्तर:' : 'KisanSetu Voice Response:'}</span>
            </div>
            <p className="text-sm text-emerald-50 leading-relaxed">{response}</p>
          </div>
        )}

        {/* Quick Sample Questions */}
        <div className="mt-2">
          <p className="text-xs font-medium text-stone-400 mb-2">
            {lang === 'hi' ? 'या इन सामान्य प्रश्नों पर टैप करें:' : 'Or tap a frequently asked query:'}
          </p>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoice(q)}
                className="w-full text-left p-2 rounded-xl text-xs bg-agri-900/60 hover:bg-agri-800 border border-agri-800 hover:border-agri-600 text-stone-200 transition flex items-center justify-between"
              >
                <span className="truncate pr-2">🗣️ {q}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
