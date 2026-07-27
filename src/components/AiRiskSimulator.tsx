import React, { useState } from 'react';
import { Language, AuditRiskResult } from '../types';
import { Cpu, ShieldAlert, Sparkles, AlertCircle, CheckCircle2, ArrowRight, Activity, DollarSign, Building } from 'lucide-react';

interface AiRiskSimulatorProps {
  lang: Language;
}

export const AiRiskSimulator: React.FC<AiRiskSimulatorProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // Form State
  const [profileType, setProfileType] = useState<'Salaried' | 'Business' | 'AOP' | 'Freelancer' | 'Real Estate'>('Salaried');
  const [declaredIncome, setDeclaredIncome] = useState<number>(3000000); // 3M PKR
  const [bankTransactions, setBankTransactions] = useState<number>(8000000); // 8M PKR
  const [assetsAcquired, setAssetsAcquired] = useState<number>(5000000); // 5M PKR
  const [utilityBills, setUtilityBills] = useState<number>(400000); // 400k PKR
  const [taxPaid, setTaxPaid] = useState<number>(300000); // 300k PKR

  // API Call State
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AuditRiskResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSimulateAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/audit-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          declaredIncome,
          bankTransactions,
          assetsAcquired,
          utilityBills,
          taxPaid,
          profileType
        })
      });

      if (!response.ok) {
        throw new Error('Failed to run audit risk simulation.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during risk profiling.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <Cpu className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'ایف بی آر اے آئی آڈٹ سیمولیٹر 2026' : 'FBR AI Audit Risk Simulator (PRAL / NADRA Hybrid 2026)'}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isUrdu ? 'ایف بی آر آڈٹ رسک سیمولیٹر اور اینوملی اسکینر' : 'AI Tax Audit Risk Scanner & Anomaly Detector'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isUrdu
                  ? 'اپنے معاشی اعدادوشمار درج کر کے جانچیں کہ کیا ایف بی آر کا اے آئی الگورتھم آپ کو آڈٹ نوٹس دے سکتا ہے یا نہیں۔'
                  : 'Test your financial spending indicators against FBR automated cross-data algorithms (NADRA, Banks, Property Registrations).'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['Salaried', 'Business', 'Freelancer', 'Real Estate'].map((p) => (
                <button
                  key={p}
                  onClick={() => setProfileType(p as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    profileType === p
                      ? 'bg-purple-600 text-white shadow-sm border border-purple-400/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Controls Column */}
          <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-700 pb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-400" />
              <span>{isUrdu ? 'مالیاتی کریڈٹ و خراجات کی تفصیلات' : 'Input Financial Indicators (Tax Year 2026)'}</span>
            </h3>

            <form onSubmit={handleSimulateAudit} className="space-y-4">
              {/* Annual Declared Income */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {isUrdu ? 'گوشوارے میں ظاہر کردہ سالانہ آمدنی (PKR)' : 'Annual Declared Income (IRIS Return)'}
                </label>
                <input
                  type="number"
                  step="100000"
                  value={declaredIncome}
                  onChange={(e) => setDeclaredIncome(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 font-mono text-sm text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Total Annual Bank Credits */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {isUrdu ? 'بینک اکاؤنٹس میں سالانہ کریڈٹ / ڈیپازٹس (PKR)' : 'Total Annual Bank Account Credits/Deposits'}
                </label>
                <input
                  type="number"
                  step="100000"
                  value={bankTransactions}
                  onChange={(e) => setBankTransactions(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 font-mono text-sm text-white focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {isUrdu ? 'نادرا/اسٹیٹ بینک پورٹل پر ظاہر ہونے والی رقم' : 'Automated bank reporting under Sec 165A'}
                </span>
              </div>

              {/* Value of Assets Acquired */}
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {isUrdu ? 'اس سال خریدی گئی جائیداد / گاڑیوں کی مالیت (PKR)' : 'Assets Acquired This Year (Real Estate / Vehicles)'}
                </label>
                <input
                  type="number"
                  step="100000"
                  value={assetsAcquired}
                  onChange={(e) => setAssetsAcquired(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 font-mono text-sm text-white focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Utility Bills & Tax Paid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    {isUrdu ? 'سالانہ بجلی و یوٹیلیٹی بلز' : 'Annual Utility Bills'}
                  </label>
                  <input
                    type="number"
                    value={utilityBills}
                    onChange={(e) => setUtilityBills(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs text-white focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    {isUrdu ? 'ادا شدہ/کٹوتھی شدہ ٹیکس' : 'Tax Paid / Withheld'}
                  </label>
                  <input
                    type="number"
                    value={taxPaid}
                    onChange={(e) => setTaxPaid(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs text-white focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{isUrdu ? 'ایف بی آر اے آئی الگورتھم چانچ رہا ہے...' : 'AI Algorithm Scanning Financial Vectors...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>{isUrdu ? 'ایف بی آر آڈٹ اسکور کا حساب لگائیں' : 'Run FBR AI Audit Risk Profiling'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {!result && !loading && (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-3">
                <Cpu className="h-12 w-12 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">
                  {isUrdu ? 'مالیاتی اعدادوشمار درج کر کے اسکین شروع کریں' : 'Run Risk Simulation to View FBR Anomaly Score'}
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {isUrdu
                    ? 'ایف بی آر کا اے آئی نظام نادرا اور سٹیٹ بینک کی مدد سے بلا اجازت اور نام ظاہر کیے بغیر آمدنی اور اثاثوں کا تقابل کرتا ہے۔'
                    : 'FBR AI algorithms automatically compare declared wealth statements with external financial activity indicators to select cases for Section 214C audit.'}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-rose-950/50 border border-rose-800 text-rose-200 p-4 rounded-xl text-xs flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6 animate-fadeIn">
                {/* Score Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-700 p-5 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">
                      {isUrdu ? 'ایف بی آر آڈٹ سلیکشن کا خطرہ اسکور' : 'FBR Audit Risk Score (Section 214C)'}
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-4xl font-extrabold font-mono text-white">
                        {result.riskScore}
                        <span className="text-lg text-slate-500">/100</span>
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          result.riskCategory === 'Low'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : result.riskCategory === 'Medium'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                        }`}
                      >
                        {result.riskCategory} Risk
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">{isUrdu ? 'تخمینہ شدہ ٹیکس ڈیمانڈ' : 'Estimated Tax Exposure'}</span>
                    <span className="text-xl font-bold font-mono text-rose-400">
                      PKR {result.estimatedTaxExposure.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Discrepancies List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>{isUrdu ? 'شناخت شدہ فرق و اینوملیز (Flagged Discrepancies):' : 'Flagged Financial Discrepancies:'}</span>
                  </h4>
                  <div className="space-y-2">
                    {result.discrepancies.map((disc, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl text-xs text-amber-200 flex items-start gap-2.5"
                      >
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{disc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Compliance Recommendations */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>{isUrdu ? 'آڈٹ سے بچاؤ کے لیے اے آئی کی تجاویز:' : 'AI Compliance Recommendations:'}</span>
                  </h4>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900 border border-slate-700/80 p-3 rounded-xl text-xs text-slate-300 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
