import React, { useState } from 'react';
import { PAKISTAN_TAX_PROBLEMS, PAKISTAN_AI_SOLUTIONS } from '../data/pakistanTaxData';
import { Language, TaxProblem, AiSolution } from '../types';
import { ShieldAlert, Cpu, CheckCircle2, ArrowRight, Zap, Sparkles, AlertTriangle, Layers, BarChart3, Clock, ChevronRight } from 'lucide-react';

interface ProblemsAndSolutionsProps {
  lang: Language;
}

export const ProblemsAndSolutions: React.FC<ProblemsAndSolutionsProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  // Active Selected Problem ID
  const [selectedProblemId, setSelectedProblemId] = useState<string>('P1');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const selectedProblem: TaxProblem =
    PAKISTAN_TAX_PROBLEMS.find((p) => p.id === selectedProblemId) || PAKISTAN_TAX_PROBLEMS[0];

  const matchedSolution: AiSolution | undefined = PAKISTAN_AI_SOLUTIONS.find(
    (s) => s.problemId === selectedProblem.id
  );

  const filteredProblems = PAKISTAN_TAX_PROBLEMS.filter((p) => {
    if (categoryFilter === 'ALL') return true;
    return p.category === categoryFilter;
  });

  return (
    <div className="bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{isUrdu ? 'پاکستان کے مالیاتی و ٹیکس مسائل کا گہرا تجزیہ' : 'Pakistan Tax System Structural Diagnostic'}</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isUrdu ? 'پاکستان کے ٹیکس نظام کے 6 بنیادی مسائل اور اے آئی اصلاحاتی حل' : 'Pakistan Tax Problems & AI Solutions Matrix (2026)'}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {isUrdu
                  ? 'غیر منصفانہ ٹیکسوں، محدود بیس اور غیر فائلر کلچر کا تکنیکی اور مصنوعی ذہانت سے ممکنہ حل۔'
                  : 'In-depth analysis of structural bottlenecks in FBR taxation and actionable AI-driven technology solutions.'}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {['ALL', 'Structural', 'Policy', 'Administrative', 'Economic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    categoryFilter === cat
                      ? 'bg-emerald-600 text-white shadow-sm border border-emerald-400/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: List of Problems */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
              <span>{isUrdu ? 'شناخت شدہ بنیادی مسائل (Issues)' : 'Identified Structural Bottlenecks'}</span>
              <span>{filteredProblems.length} Items</span>
            </div>

            <div className="space-y-3">
              {filteredProblems.map((problem) => {
                const isSelected = problem.id === selectedProblemId;
                return (
                  <div
                    key={problem.id}
                    onClick={() => setSelectedProblemId(problem.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-slate-800/50 border-slate-700/70 hover:border-slate-600 hover:bg-slate-800/80'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {problem.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          problem.severity === 'Critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {problem.severity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">
                      {isUrdu ? problem.titleUr : problem.titleEn}
                    </h3>

                    <div className="text-xs text-rose-400 font-mono font-semibold mb-2">
                      {problem.metric}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {isUrdu ? problem.descriptionUr : problem.descriptionEn}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{isUrdu ? 'اے آئی کا تجویز کردہ حل دیکھیں' : 'View AI Solution Blueprint'}</span>
                      </span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${isSelected ? 'translate-x-1 text-emerald-400' : 'text-slate-500'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Problem Deep Dive + Solution Blueprint */}
          <div className="lg:col-span-7 space-y-6">
            {/* Selected Problem Overview Card */}
            <div className="bg-slate-800/90 border border-rose-500/30 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span>{isUrdu ? 'مسئلے کا تفصیلی جائزہ' : 'Problem Diagnostic Analysis'}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                {isUrdu ? selectedProblem.titleUr : selectedProblem.titleEn}
              </h3>

              <div className="bg-rose-950/40 border border-rose-900/50 rounded-xl p-3 mb-4 text-rose-200 text-xs font-mono font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{selectedProblem.metric}</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed mb-4">
                <p className="text-slate-200 text-sm">
                  {isUrdu ? selectedProblem.descriptionUr : selectedProblem.descriptionEn}
                </p>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/80">
                  <span className="font-bold text-slate-200 block mb-1">
                    {isUrdu ? 'معیشت اور عام عوام پر اثرات:' : 'Macro Economic & Social Impact:'}
                  </span>
                  <p className="text-slate-400">
                    {isUrdu ? selectedProblem.impactUr : selectedProblem.impactEn}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-700/60">
                <span className="text-[11px] text-slate-400">{isUrdu ? 'متاثرہ شعبے:' : 'Affected Sectors:'}</span>
                {selectedProblem.affectedSectors.map((sec, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-slate-900 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full"
                  >
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            {/* Matched AI Solution Blueprint Card */}
            {matchedSolution && (
              <div className="bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 border border-emerald-500/50 rounded-2xl p-6 shadow-xl relative overflow-hidden ring-1 ring-emerald-500/20">
                <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Cpu className="h-4 w-4" />
                    <span>{isUrdu ? 'اے آئی اصلاحاتی تجویز 2026' : 'AI AI-Powered Reform Blueprint'}</span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {matchedSolution.readinessYear}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {isUrdu ? matchedSolution.titleUr : matchedSolution.titleEn}
                </h3>

                <div className="bg-slate-900/90 border border-slate-700 p-3 rounded-xl mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    {isUrdu ? 'ٹیکنالوجی آرکیٹیکچر:' : 'Technology Stack & Machine Learning Architecture:'}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {isUrdu ? matchedSolution.techUr : matchedSolution.techEn}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {isUrdu ? matchedSolution.descriptionUr : matchedSolution.descriptionEn}
                </p>

                {/* Expected Outcome Highlight */}
                <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-xl p-3.5 mb-4 text-emerald-200 text-xs flex items-start gap-2.5">
                  <Zap className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">
                      {isUrdu ? 'متوقع معاشی نتیجہ:' : 'Expected Economic Outcome:'}
                    </span>
                    <p className="text-emerald-300">
                      {isUrdu ? matchedSolution.expectedOutcomeUr : matchedSolution.expectedOutcomeEn}
                    </p>
                  </div>
                </div>

                {/* Key Features List */}
                <div>
                  <span className="text-xs font-bold text-slate-200 block mb-2">
                    {isUrdu ? 'نظام کی اہم خصوصیات:' : 'Key Operational Capabilities:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchedSolution.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="bg-slate-900/70 border border-slate-700/80 p-2.5 rounded-lg text-xs text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
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
