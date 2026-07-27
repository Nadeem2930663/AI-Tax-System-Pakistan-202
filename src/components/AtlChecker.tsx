import React, { useState } from 'react';
import { WHT_RATES_2026 } from '../data/pakistanTaxData';
import { Language } from '../types';
import { CheckCircle2, XCircle, Search, ShieldCheck, Building2, Car, Landmark, ArrowRight, Sparkles } from 'lucide-react';

interface AtlCheckerProps {
  lang: Language;
}

export const AtlChecker: React.FC<AtlCheckerProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // State
  const [cnicInput, setCnicInput] = useState<string>('35202-8472910-3');
  const [searched, setSearched] = useState<boolean>(true);
  const [status, setStatus] = useState<'Active' | 'Late Filer' | 'Non-Active'>('Active');

  // WHT Quick Property Transaction Calculator State
  const [propertyVal, setPropertyVal] = useState<number>(20000000); // 2 Crore PKR
  const [vehicleCc, setVehicleCc] = useState<number>(1800); // 1800cc

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    // Alternate simulated status based on CNIC last digit
    const lastChar = cnicInput.slice(-1);
    if (lastChar === '1' || lastChar === '3' || lastChar === '5' || lastChar === '7' || lastChar === '9') {
      setStatus('Active');
    } else if (lastChar === '2' || lastChar === '4') {
      setStatus('Late Filer');
    } else {
      setStatus('Non-Active');
    }
  };

  // Property tax comparison calculation
  const propertyWhtAtl = propertyVal * 0.03; // 3%
  const propertyWhtNonAtl = propertyVal * 0.12; // 12%
  const propertySavings = propertyWhtNonAtl - propertyWhtAtl;

  return (
    <div className="bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'ایف بی آر پورٹل لائو اے ٹی ایل چیکر' : 'Active Taxpayer List (ATL) & WHT Calculator 2026'}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isUrdu ? 'ایکٹو ٹیکس دہندہ اسٹیٹس اور ود ہولڈنگ ٹیکس کا فرق' : 'Active Taxpayer Status & WHT Penalty Rates'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isUrdu
                  ? 'سی این آئی سی یا این ٹی این کے ذریعے ایکٹو فائلر اسٹیٹس چیک کریں اور غیر فائلر ہونے سے ہونے والے مالیاتی نقصان کا اندازہ لگائیں۔'
                  : 'Verify Active Taxpayer status and compare non-filer penalty rates vs active filer tax exemptions.'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CNIC Lookup Simulator Column */}
          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-700 pb-3">
              {isUrdu ? 'شناختی کارڈ / این ٹی این سے تلاش کریں' : 'ATL Status Lookup (CNIC / NTN)'}
            </h3>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {isUrdu ? 'شناختی کارڈ (CNIC) یا این ٹی این نمبر' : 'Enter 13-Digit CNIC or NTN'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cnicInput}
                    onChange={(e) => setCnicInput(e.target.value)}
                    placeholder="e.g. 35202-1234567-1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-10 py-3 font-mono text-sm text-white focus:ring-2 focus:ring-emerald-500"
                  />
                  <Search className="absolute right-3 top-3.5 h-4 w-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40 transition-all"
              >
                {isUrdu ? 'اسٹیٹس چیک کریں (Check ATL Status)' : 'Check Active Status in FBR Portal'}
              </button>
            </form>

            {/* Results Display Box */}
            {searched && (
              <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-5 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs text-slate-400">{isUrdu ? 'نمبر:' : 'Identifier:'}</span>
                  <span className="text-sm font-mono font-bold text-white">{cnicInput}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{isUrdu ? 'ایف بی آر ایکٹو اسٹیٹس:' : 'FBR ATL Status:'}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      status === 'Active'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : status === 'Late Filer'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    }`}
                  >
                    {status === 'Active' ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>ACTIVE (Fa'al)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        <span>NON-ACTIVE (Na-Fa'al)</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-lg text-xs text-slate-300">
                  {status === 'Active' ? (
                    <p className="text-emerald-300">
                      {isUrdu
                        ? 'مبارک ہو! آپ کا نام ایف بی آر کی ایکٹو ٹیکس دہندگان کی فہرست میں شامل ہے۔ آپ تمام رعایتی ود ہولڈنگ ٹیکس کی شرحوں کے اہل ہیں۔'
                        : 'Verified Active Taxpayer. You qualify for reduced 3% WHT on real estate and zero banking withdrawal penalty.'}
                    </p>
                  ) : (
                    <p className="text-rose-300">
                      {isUrdu
                        ? 'انتباہ! آپ غیر فعال (Non-ATL) ہیں۔ گاڑیوں کے اندراج اور جائیداد کی خریدو فروخت پر 4 گنا زیادہ ٹیکس وصول کیا جائے گا۔'
                        : 'Warning: Non-Active Status detected. Subject to 4x punitive withholding taxes on real estate and vehicles.'}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Real Estate & Vehicle Savings Calculator Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  <span>{isUrdu ? 'جائیداد پر ایکٹو فائلر کی بچت کا حاسبہ' : 'Real Estate Property Purchase WHT Calculator'}</span>
                </h3>
                <span className="text-xs text-emerald-400 font-mono font-bold">Sec 236K</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">{isUrdu ? 'جائیداد کی سرکاری ایف بی آر کی تصدیق شدہ مالیت (PKR)' : 'FBR Verified Property Valuation'}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    PKR {(propertyVal / 10000000).toFixed(2)} Crore
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={100000000}
                  step={2500000}
                  value={propertyVal}
                  onChange={(e) => setPropertyVal(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Comparison Output Cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-3.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isUrdu ? 'ایکٹو فائلر ٹیکس (3%)' : 'Active Filer (3%)'}</span>
                  <span className="text-base font-bold text-emerald-400 font-mono mt-1 block">
                    PKR {(propertyWhtAtl / 100000).toFixed(1)} Lakh
                  </span>
                </div>

                <div className="bg-rose-950/40 border border-rose-800/60 p-3.5 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">{isUrdu ? 'غیر فائلر ٹیکس (12%)' : 'Non-Filer (12%)'}</span>
                  <span className="text-base font-bold text-rose-400 font-mono mt-1 block">
                    PKR {(propertyWhtNonAtl / 100000).toFixed(1)} Lakh
                  </span>
                </div>

                <div className="bg-slate-900 border border-emerald-500/40 p-3.5 rounded-xl text-center">
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">{isUrdu ? 'فائلر بننے کی بچت' : 'Direct Tax Savings'}</span>
                  <span className="text-base font-extrabold text-white font-mono mt-1 block">
                    PKR {(propertySavings / 100000).toFixed(1)} Lakh
                  </span>
                </div>
              </div>
            </div>

            {/* WHT Rates Comparison Table */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                <Landmark className="h-4 w-4 text-emerald-400" />
                <span>{isUrdu ? 'ود ہولڈنگ ٹیکس کی شرحوں کا تقابلی چارٹ 2026' : 'Withholding Tax Rates Comparison Matrix (2026)'}</span>
              </h4>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left text-slate-300 font-mono">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th className="py-2.5 px-3">{isUrdu ? 'لین دین کی قسم' : 'Transaction Type'}</th>
                      <th className="py-2.5 px-3">{isUrdu ? 'ایکٹو (ATL)' : 'ATL Filer'}</th>
                      <th className="py-2.5 px-3 text-rose-400">{isUrdu ? 'غیر فائلر (Non-ATL)' : 'Non-ATL Penalty'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-[11px]">
                    {WHT_RATES_2026.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50">
                        <td className="py-2.5 px-3 font-semibold text-white">
                          {item.transactionType}
                          <span className="block text-[10px] text-slate-500">{item.section}</span>
                        </td>
                        <td className="py-2.5 px-3 text-emerald-400 font-bold">
                          {item.atlRate}
                        </td>
                        <td className="py-2.5 px-3 text-rose-400 font-bold">
                          {item.nonAtlRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
