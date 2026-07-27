import React from 'react';
import { Language } from '../types';
import { ShieldAlert, Cpu, Calculator, CheckCircle2, MessageSquare, Globe, Scale } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, lang, setLang }) => {
  const isUrdu = lang === 'ur';

  const navItems = [
    {
      id: 'calculator',
      labelEn: 'Tax Calculator 2026',
      labelUr: 'ٹیکس کیلکولیٹر 2026',
      icon: Calculator
    },
    {
      id: 'problems-solutions',
      labelEn: 'Problems & AI Solutions',
      labelUr: 'مسائل اور اے آئی حل',
      icon: ShieldAlert
    },
    {
      id: 'audit-profiler',
      labelEn: 'AI Audit Profiler',
      labelUr: 'اے آئی آڈٹ انالائزر',
      icon: Cpu
    },
    {
      id: 'atl-checker',
      labelEn: 'ATL Status & WHT',
      labelUr: 'ایکٹو ٹیکس دہندہ اور ود ہولڈنگ',
      icon: CheckCircle2
    },
    {
      id: 'ai-advisor',
      labelEn: 'AI Tax Advisor (Gemini)',
      labelUr: 'اے آئی ٹیکس مشیر (جیٹسن)',
      icon: MessageSquare
    }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 backdrop-blur-md bg-opacity-95 shadow-md">
      {/* Top Banner / Ticker */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-300 text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 font-semibold uppercase tracking-wider">{isUrdu ? 'لائیو ایف بی آر پورٹل:' : 'LIVE FBR 2026:'}</span>
            <span className="truncate text-slate-300">
              {isUrdu ? 'انکم ٹیکس آرڈیننس 2001 (ٹیکس سال 2025-2026) تمام ٹیکس سلیبز اور اے آئی گورننس' : 'Tax Year 2025-2026 Slabs • Income Tax Ordinance 2001 • Gemini AI Reform Engine'}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-400 shrink-0">
            <span>Target: <strong className="text-emerald-400">12.97T PKR</strong></span>
            <span>•</span>
            <span>Active Filers: <strong className="text-emerald-400">5.3M</strong></span>
            <span>•</span>
            <span className="text-slate-500">Finance Act '26</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('calculator')}>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-900/30 ring-1 ring-emerald-400/30">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-100 font-sans">
                  {isUrdu ? 'پاکستان اے آئی ٹیکس نظام 2026' : 'Pakistan AI Taxation System 2026'}
                </h1>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  FBR 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isUrdu ? 'مسائل کا تجزیہ، پورٹل کیلکولیٹر اور مصنوعی ذہانت سے حل' : 'Structural Problems, Slabs Calculator & AI Reform Engine'}
              </p>
            </div>
          </div>

          {/* Mobile Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-emerald-400" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 ring-1 ring-emerald-400/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{isUrdu ? item.labelUr : item.labelEn}</span>
              </button>
            );
          })}

          {/* Desktop Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
            className="hidden md:flex items-center gap-1.5 ml-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all hover:border-slate-600 shadow-sm"
            title="Toggle Language"
          >
            <Globe className="h-4 w-4 text-emerald-400" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
