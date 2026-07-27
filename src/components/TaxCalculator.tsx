import React, { useState, useMemo } from 'react';
import { SALARIED_TAX_SLABS_2026, BUSINESS_TAX_SLABS_2026 } from '../data/pakistanTaxData';
import { Language, TaxCategory, TaxCalculationResult } from '../types';
import { Calculator, AlertCircle, ArrowRight, Lightbulb, Sparkles, DollarSign, Percent, ShieldCheck } from 'lucide-react';

interface TaxCalculatorProps {
  lang: Language;
}

export const TaxCalculator: React.FC<TaxCalculatorProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // State
  const [category, setCategory] = useState<TaxCategory>('salaried');
  const [incomeType, setIncomeType] = useState<'monthly' | 'annual'>('monthly');
  const [incomeValue, setIncomeValue] = useState<number>(250000); // Default 250k PKR/month
  const [medicalAllowance, setMedicalAllowance] = useState<number>(0);
  const [zakatPaid, setZakatPaid] = useState<number>(0);
  const [providentFund, setProvidentFund] = useState<number>(0);
  const [isPsebRegistered, setIsPsebRegistered] = useState<boolean>(true);
  const [isAtl, setIsAtl] = useState<boolean>(true);

  // Calculate annual gross
  const annualGross = useMemo(() => {
    return incomeType === 'monthly' ? incomeValue * 12 : incomeValue;
  }, [incomeType, incomeValue]);

  // Perform Tax Calculation
  const calculation: TaxCalculationResult = useMemo(() => {
    let taxableIncome = annualGross;
    let totalDeductions = 0;

    // Deductions for Salaried
    if (category === 'salaried') {
      // Medical allowance exemption up to 10% of basic salary
      const medicalExemption = Math.min(medicalAllowance, annualGross * 0.1);
      totalDeductions += medicalExemption + zakatPaid + providentFund;
      taxableIncome = Math.max(0, annualGross - totalDeductions);
    } else if (category === 'non-salaried' || category === 'company') {
      totalDeductions += zakatPaid;
      taxableIncome = Math.max(0, annualGross - totalDeductions);
    }

    let annualTax = 0;
    let slabDesc = "";
    let surcharge = 0;
    const recommendations: string[] = [];

    if (category === 'salaried') {
      const slabs = SALARIED_TAX_SLABS_2026;
      for (const slab of slabs) {
        if (taxableIncome > slab.min) {
          if (slab.max === null || taxableIncome <= slab.max) {
            const taxableInExcess = taxableIncome - slab.min;
            annualTax = slab.baseTax + (taxableInExcess * slab.rate) / 100;
            slabDesc = isUrdu ? slab.descriptionUr : slab.descriptionEn;
            break;
          }
        }
      }

      // Surcharge for ultra-high income > 10 Million PKR (10% surcharge on tax liability)
      if (taxableIncome > 10000000) {
        surcharge = annualTax * 0.10;
        annualTax += surcharge;
      }

      // Recommendations
      if (taxableIncome > 600000) {
        recommendations.push(
          isUrdu
            ? "سرکاری طور پر کاٹی گئی زکوۃ پر انکم ٹیکس آرڈیننس کے سیکشن 60 کے تحت 100 فیصد ٹیکس میں منہائی کی جا سکتی ہے۔"
            : "Zakat paid under Zakat & Ushr Ordinance is 100% deductible directly from gross taxable income (Sec 60)."
        );
      }
      if (taxableIncome > 1200000) {
        recommendations.push(
          isUrdu
            ? "رضاکارانہ پینشن فنڈ (VPS) میں سرمایہ کاری پر ٹیکس سے مزید رعایت حاصل کی جا سکتی ہے۔"
            : "Investments in Voluntary Pension Schemes (VPS) qualify for tax credits under Section 63 up to 20% of taxable income."
        );
      }
      if (!isAtl) {
        recommendations.push(
          isUrdu
            ? "انتباہ: غیر فائلر ہونے پر بینک سے نقد رقم نکالنے اور گاڑی خریدنے پر 3 گنا زیادہ ٹیکس لگے گا۔ فوری ایکٹو ٹیکس دہندہ بنیں۔"
            : "Warning: Non-ATL status triggers punitive withholding tax on banking, property, and vehicles. File return to enter Active Taxpayer List."
        );
      }
    } else if (category === 'non-salaried') {
      const slabs = BUSINESS_TAX_SLABS_2026;
      for (const slab of slabs) {
        if (taxableIncome > slab.min) {
          if (slab.max === null || taxableIncome <= slab.max) {
            const taxableInExcess = taxableIncome - slab.min;
            annualTax = slab.baseTax + (taxableInExcess * slab.rate) / 100;
            slabDesc = isUrdu ? slab.descriptionUr : slab.descriptionEn;
            break;
          }
        }
      }
      recommendations.push(
        isUrdu
          ? "بزنس انکم میں جائز کاروباری اخراجات (یوٹیلیٹیز، کرایہ، ملازمین کی تنخواہیں) منہا کر کے قابل ٹیکس آمدنی کم کی جا سکتی ہے۔"
          : "Business expenses (utilities, office rent, staff salaries, depreciation) are deductible under Section 20."
      );
    } else if (category === 'it_export') {
      // IT & Software Exports Final Tax Regime (Sec 154A)
      const taxRate = isPsebRegistered ? 0.25 : 1.0; // 0.25% if PSEB registered, 1% if normal IT exporter
      annualTax = (taxableIncome * taxRate) / 100;
      slabDesc = isPsebRegistered
        ? (isUrdu ? "پی ایس ای بی رجسٹرڈ آئی ٹی برآمدات: 0.25 فیصد فائنل ٹیکس حکومت پاکستان 2026" : "PSEB Registered Digital Services Export: Reduced 0.25% Final Tax Rate (Sec 154A).")
        : (isUrdu ? "عام آئی ٹی فری لانسنگ برآمدات: 1 فیصد فائنل ٹیکس" : "Unregistered IT Freelancer Export proceeds: 1% Final Tax Regime.");

      if (!isPsebRegistered) {
        recommendations.push(
          isUrdu
            ? "پاکستان سافٹ ویئر ایکسپورٹ بورڈ (PSEB) میں اندراج کروا کر اپنا ٹیکس 1 فیصد سے گھٹا کر صرف 0.25 فیصد کریں۔"
            : "Register with Pakistan Software Export Board (PSEB) to reduce your tax rate from 1.0% to 0.25% on export remittances!"
        );
      } else {
        recommendations.push(
          isUrdu
            ? "آئی ٹی ایکسپورٹرز پر کاٹا گیا 0.25 فیصد ٹیکس حتمی ٹیکس (Final Tax Regime) شمار ہوتا ہے اور آڈٹ سے محفوظ ہے۔"
            : "0.25% tax deducted at source by your bank on foreign remittance constitutes Final Discharge of Tax liability."
        );
      }
    } else if (category === 'company') {
      // Corporate Tax Rate 29%
      annualTax = taxableIncome * 0.29;
      slabDesc = isUrdu ? "کمپنی ٹیکس کی شرح: 29 فیصد فلیٹ انکم ٹیکس" : "Corporate Income Tax: Flat 29% + applicable Super Tax under Sec 4C.";
      recommendations.push(
        isUrdu
          ? "کمپنی کے لیے پیشگی ٹیکس (Quarterly Advance Tax) کی باقاعدہ ادائیگی سیکشن 147 کے تحت ضروری ہے۔"
          : "Quarterly Advance Tax under Section 147 must be calculated and paid to avoid default surcharge."
      );
    }

    const monthlyTax = annualTax / 12;
    const effectiveTaxRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;
    const netMonthlyIncome = (annualGross - annualTax) / 12;

    return {
      annualIncome: annualGross,
      taxableIncome,
      deductions: totalDeductions,
      annualTax,
      monthlyTax,
      effectiveTaxRate,
      netMonthlyIncome,
      slabDescription: slabDesc,
      surcharge,
      taxCategory: category,
      aiRecommendations: recommendations
    };
  }, [annualGross, category, medicalAllowance, zakatPaid, providentFund, isPsebRegistered, isAtl, isUrdu]);

  return (
    <div className="bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <Calculator className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'ایف بی آر انکم ٹیکس سال 2025-2026' : 'FBR Income Tax Engine (Tax Year 2025-2026)'}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isUrdu ? 'پاکستان انکم ٹیکس اور کٹوتیاں کیلکولیٹر 2026' : 'Pakistan Income Tax & Deduction Calculator 2026'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isUrdu
                  ? 'مالیاتی بجٹ 2025-26 کی منظور شدہ سلیبز کے مطابق اپنی تنخواہ، کاروباری آمدنی یا آئی ٹی برآمدات کے ٹیکس کا درست تخمینہ لگائیں۔'
                  : 'Calculate your exact income tax liability based on Finance Act 2025/2026 slabs, deductions, and withholding provisions.'}
              </p>
            </div>

            {/* Category Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'salaried', labelEn: 'Salaried Person', labelUr: 'تنخواہ دار فرد' },
                { id: 'non-salaried', labelEn: 'Business / AOP', labelUr: 'کاروباری / بزنس' },
                { id: 'it_export', labelEn: 'IT & Freelancer', labelUr: 'آئی ٹی و فری لانسنگ' },
                { id: 'company', labelEn: 'Corporate 29%', labelUr: 'کارپوریٹ ادارہ' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as TaxCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    category === cat.id
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/40 font-bold scale-105'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isUrdu ? cat.labelUr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-6 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-3">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <span>{isUrdu ? 'آمدنی اور کٹوتیوں کی تفصیل درج کریں' : 'Enter Income & Deduction Details'}</span>
            </h3>

            {/* Income Type Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                {isUrdu ? 'آمدنی کا دورانیہ' : 'Income Frequency'}
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setIncomeType('monthly')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    incomeType === 'monthly' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isUrdu ? 'ماہانہ (Monthly)' : 'Monthly Income'}
                </button>
                <button
                  type="button"
                  onClick={() => setIncomeType('annual')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    incomeType === 'annual' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isUrdu ? 'سالانہ (Annual)' : 'Annual Income'}
                </button>
              </div>
            </div>

            {/* Gross Income Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-300">
                  {incomeType === 'monthly'
                    ? (isUrdu ? 'ماہانہ کل آمدنی / تنخواہ (روپے)' : 'Gross Monthly Salary / Income (PKR)')
                    : (isUrdu ? 'سالانہ کل آمدنی (روپے)' : 'Gross Annual Income (PKR)')}
                </label>
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  PKR {incomeValue.toLocaleString()}
                </span>
              </div>
              <input
                type="number"
                step="5000"
                value={incomeValue}
                onChange={(e) => setIncomeValue(Math.max(0, Number(e.target.value)))}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              {/* Preset quick buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[100000, 200000, 350000, 500000, 1000000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setIncomeType('monthly');
                      setIncomeValue(preset);
                    }}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 font-mono transition-colors"
                  >
                    {preset / 1000}k/mo
                  </button>
                ))}
              </div>
            </div>

            {/* Salaried Specific Deductions */}
            {category === 'salaried' && (
              <div className="space-y-4 pt-2 border-t border-slate-700/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {isUrdu ? 'قانوناً جائز کٹوتیاں (Deductions)' : 'Legal Tax Deductions & Exemptions'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {isUrdu ? 'میڈیکل الائونس (سالانہ)' : 'Annual Medical Allowance'}
                    </label>
                    <input
                      type="number"
                      value={medicalAllowance}
                      onChange={(e) => setMedicalAllowance(Number(e.target.value))}
                      placeholder="e.g. 100000"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {isUrdu ? '10 فیصد بنیادی تنخواہ تک مستثنیٰ' : 'Exempt up to 10% of basic salary'}
                    </span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">
                      {isUrdu ? 'سرکاری زکوۃ کٹوتی (سالانہ)' : 'Annual Zakat Deduction (Sec 60)'}
                    </label>
                    <input
                      type="number"
                      value={zakatPaid}
                      onChange={(e) => setZakatPaid(Number(e.target.value))}
                      placeholder="e.g. 50000"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {isUrdu ? '100 فیصد ٹیکس سے ڈائریکٹ منفی' : '100% direct deductible from income'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* IT / Freelancers Specific Switch */}
            {category === 'it_export' && (
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {isUrdu ? 'پاکستان سافٹ ویئر ایکسپورٹ بورڈ (PSEB) اندارج' : 'PSEB Registration Status'}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {isUrdu ? 'پی ایس ای بی رجسٹرڈ ہونے پر ٹیکس صرف 0.25 فیصد ہے' : 'Registered IT exporters enjoy 0.25% tax vs 1.0%'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPsebRegistered(!isPsebRegistered)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPsebRegistered ? 'bg-emerald-600' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPsebRegistered ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* ATL Status Selection */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">
                  {isUrdu ? 'ایکٹو ٹیکس دہندہ (ATL Active Filer)' : 'Active Taxpayer List (ATL) Filer'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {isUrdu ? 'غیر فائلر ہونے پر تمام بینکنگ اور گاڑیوں پر اضافی ود ہولڈنگ ڈیوٹی' : 'Non-ATL filers face higher advance WHT rates'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAtl(!isAtl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isAtl ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {isAtl ? (isUrdu ? 'ایکٹو (ATL)' : 'ACTIVE') : (isUrdu ? 'غیر فائلر' : 'NON-ATL')}
              </button>
            </div>
          </div>

          {/* Right Column: Calculation Results Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Calculated Summary Box */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-6">
                <div>
                  <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">
                    {isUrdu ? 'ایف بی آر ٹیکس کٹوتی کا تخمینہ' : 'FBR Tax Liability Breakdown'}
                  </span>
                  <h3 className="text-xl font-bold text-white font-mono mt-0.5">
                    Tax Year 2025-2026
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">{isUrdu ? 'مؤثر ٹیکس شرح' : 'Effective Tax Rate'}</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {calculation.effectiveTaxRate.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Grid of Key Outputs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Monthly Tax */}
                <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isUrdu ? 'ماہانہ ٹیکس کٹوتی (Monthly Tax)' : 'Monthly Tax Deduction'}
                  </span>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    PKR {Math.round(calculation.monthlyTax).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {isUrdu ? 'تنخواہ سے ماہانہ وضع کی جانے والی رقم' : 'Deducted monthly at source by employer'}
                  </span>
                </div>

                {/* Net Monthly Take Home */}
                <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-xl">
                  <span className="text-xs text-slate-400 block mb-1">
                    {isUrdu ? 'صافی ماہانہ تنخواہ (Net Take-Home)' : 'Net Monthly Take-Home'}
                  </span>
                  <div className="text-2xl font-bold text-white font-mono">
                    PKR {Math.round(calculation.netMonthlyIncome).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {isUrdu ? 'ٹیکس منہا کرنے کے بعد ہاتھ میں آنے والی رقم' : 'Income after tax deduction'}
                  </span>
                </div>

                {/* Annual Tax */}
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block">
                    {isUrdu ? 'سالانہ کل ٹیکس (Annual Tax)' : 'Total Annual Tax Liability'}
                  </span>
                  <div className="text-lg font-bold text-slate-200 font-mono mt-0.5">
                    PKR {Math.round(calculation.annualTax).toLocaleString()}
                  </div>
                </div>

                {/* Gross Annual Taxable */}
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-400 block">
                    {isUrdu ? 'قابل ٹیکس سالانہ آمدنی' : 'Taxable Annual Income'}
                  </span>
                  <div className="text-lg font-bold text-slate-200 font-mono mt-0.5">
                    PKR {Math.round(calculation.taxableIncome).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Applicable Slab Rule Explanation */}
              <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3.5 mb-6 text-xs text-emerald-200 flex items-start gap-3">
                <Percent className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300 block mb-0.5">
                    {isUrdu ? 'لاگو شدہ ٹیکس سلیب کی قانون شق:' : 'Applicable Slab Rule:'}
                  </span>
                  <p className="leading-relaxed font-mono text-[11px]">{calculation.slabDescription}</p>
                </div>
              </div>

              {/* AI Tax Saving & Legal Advice */}
              {calculation.aiRecommendations.length > 0 && (
                <div className="bg-slate-900/90 border border-slate-700 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <Sparkles className="h-4 w-4" />
                    <span>{isUrdu ? 'اے آئی کی قانونی ٹیکس بچت تجاویز' : 'AI Tax Optimization & Compliance Insights'}</span>
                  </div>
                  <ul className="space-y-1.5 pl-1">
                    {calculation.aiRecommendations.map((rec, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span className="leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Slabs Reference Table Component */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>
                  {category === 'salaried'
                    ? (isUrdu ? 'ایف بی آر تنخواہ دار طبقے کی ٹیکس سلیبز 2025-2026' : 'FBR Salaried Slabs Reference (2025-2026)')
                    : (isUrdu ? 'ایف بی آر کاروباری سلیبز 2025-2026' : 'FBR Non-Salaried & Business Slabs (2025-2026)')}
                </span>
              </h4>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left text-slate-300 font-mono">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-400 uppercase text-[10px]">
                      <th className="py-2 px-2">{isUrdu ? 'سالانہ سلیب حد' : 'Income Slab Range'}</th>
                      <th className="py-2 px-2 text-right">{isUrdu ? 'فکسڈ ٹیکس' : 'Fixed Tax'}</th>
                      <th className="py-2 px-2 text-right">{isUrdu ? 'اضافی شرح' : 'Rate on Excess'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-[11px]">
                    {(category === 'salaried' ? SALARIED_TAX_SLABS_2026 : BUSINESS_TAX_SLABS_2026).map((slab, index) => {
                      const isCurrentSlab =
                        calculation.taxableIncome > slab.min &&
                        (slab.max === null || calculation.taxableIncome <= slab.max);

                      return (
                        <tr
                          key={index}
                          className={isCurrentSlab ? 'bg-emerald-950/60 font-semibold text-emerald-200' : 'hover:bg-slate-800/40'}
                        >
                          <td className="py-2 px-2">
                            PKR {slab.min / 1000}k {slab.max ? `- ${slab.max / 1000}k` : '+'}
                          </td>
                          <td className="py-2 px-2 text-right">
                            PKR {slab.baseTax.toLocaleString()}
                          </td>
                          <td className="py-2 px-2 text-right font-bold text-emerald-400">
                            {slab.rate}%
                          </td>
                        </tr>
                      );
                    })}
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
