import React from 'react';
import { Language } from '../types';
import { Scale, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600/20 text-emerald-400 p-2 rounded-lg border border-emerald-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-200 block">
                {isUrdu ? 'پاکستان اے آئی ٹیکس سسٹم پورٹل 2026' : 'Pakistan AI Taxation System 2026'}
              </span>
              <span className="text-[11px] text-slate-500">
                {isUrdu ? 'مالیاتی پالیسی، تکنیکی مسائل اور مصنوعی ذہانت سے اصلاحات کا ماڈل' : 'Fiscal Policy Diagnostics, Slabs Engine & AI Governance Framework'}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="https://iris.fbr.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>{isUrdu ? 'سرکاری ایف بی آر آئرس پورٹل' : 'Official FBR IRIS Portal'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">
              {isUrdu ? 'ٹیکس سال 2025-2026 مالیاتی قانون' : 'Tax Year 2025-2026 Finance Act'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-slate-500 leading-relaxed">
          <div>
            <span className="font-bold text-slate-300 block mb-1">
              {isUrdu ? 'قانون پس منظر اور ڈسکلیمر:' : 'Legal Disclaimer & Scope:'}
            </span>
            <p>
              {isUrdu
                ? 'یہ پورٹل تعلیمی اور معلوماتی مقاصد کے لیے بنایا گیا ہے۔ تمام ٹیکس حسابات انکم ٹیکس آرڈیننس 2001 کے مطابق ہیں۔ باقاعدہ قانونی جمع آوری کے لیے ایف بی آر پورٹل استعمال کریں۔'
                : 'This platform is built for analytical, diagnostic, and educational purposes. Calculations reflect official Tax Year 2025-2026 slabs under the Income Tax Ordinance 2001.'}
            </p>
          </div>

          <div>
            <span className="font-bold text-slate-300 block mb-1">
              {isUrdu ? 'مصنوعی ذہانت سے اصلاحات کا وژن:' : 'AI Reform Vision:'}
            </span>
            <p>
              {isUrdu
                ? 'نادرا، اسٹیٹ بینک اور ریٹیل کیو آر بلاک چین کے ذریعے پاکستان کے ٹیکس نیٹ کو 5.3 ملین سے بڑھا کر 10 ملین سے زائد کرنا۔'
                : 'Pioneering AI-driven automated cross-verification (NADRA + Banks + POS) to double Pakistan\'s tax base and eliminate punitive non-filer distortions.'}
            </p>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isUrdu ? 'ایف بی آر اے آئی کور 2026' : 'FBR AI Core Intelligence'}</span>
            </span>
            <p className="text-slate-400">
              {isUrdu
                ? 'جیٹسن مصنوعی ذہانت ماڈل کے ذریعے پاکستان کے ٹیکس دہندگان کی سہولت اور شفافیت۔'
                : 'Powered by Gemini 3.6 Flash Engine for real-time Pakistan tax advisory and automated risk simulation.'}
            </p>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-600 pt-2 border-t border-slate-900">
          © 2026 AI Taxation System of Pakistan. Designed for Fiscal Equity, Transparency & Automation.
        </div>
      </div>
    </footer>
  );
};
