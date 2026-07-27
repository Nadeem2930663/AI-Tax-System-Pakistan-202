import React, { useState } from 'react';
import { PAKISTAN_TAX_STATS_2026 } from '../data/pakistanTaxData';
import { Language } from '../types';
import { TrendingUp, Users, PieChart, ShieldCheck, AlertCircle, Building2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface OverviewStatsProps {
  lang: Language;
}

export const OverviewStats: React.FC<OverviewStatsProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [expanded, setExpanded] = useState(false);

  const statsList = [
    {
      titleEn: "FBR Target",
      titleUr: "ایف بی آر ہدف",
      value: PAKISTAN_TAX_STATS_2026.totalCollectionTarget,
      subEn: "12.97T PKR",
      icon: TrendingUp,
      badge: "Finance Act '26",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    },
    {
      titleEn: "Tax-to-GDP Ratio",
      titleUr: "جی ڈی پی ٹیکس",
      value: PAKISTAN_TAX_STATS_2026.taxToGdpRatio,
      subEn: "Goal: 13%",
      icon: PieChart,
      badge: "Target 13%",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30"
    },
    {
      titleEn: "Active Filers (ATL)",
      titleUr: "ایکٹو فائلرز",
      value: PAKISTAN_TAX_STATS_2026.activeFilers,
      subEn: "of ~240M",
      icon: Users,
      badge: "~5.3M",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30"
    },
    {
      titleEn: "Indirect Tax Burden",
      titleUr: "بالواسطہ ٹیکس",
      value: PAKISTAN_TAX_STATS_2026.indirectTaxPercentage,
      subEn: "Sales Tax / FED",
      icon: AlertCircle,
      badge: "High Burden",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30"
    },
    {
      titleEn: "Salaried Tax Paid",
      titleUr: "تنخواہ دار ٹیکس",
      value: PAKISTAN_TAX_STATS_2026.salariedClassContribution,
      subEn: "> Retail Sector",
      icon: Building2,
      badge: "360B+ PKR",
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
    },
    {
      titleEn: "AI Audit Accuracy",
      titleUr: "اے آئی آڈٹ درستگی",
      value: PAKISTAN_TAX_STATS_2026.aiAuditAccuracyRate,
      subEn: "NADRA Hybrid",
      icon: ShieldCheck,
      badge: "Gemini 3.6",
      badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/30"
    }
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 text-slate-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {/* Single Line Hero Bar */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-1">
          {/* Hero Tagline */}
          <div className="flex items-center gap-2 shrink-0 border-r border-slate-800 pr-4">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-xs font-bold tracking-tight text-white whitespace-nowrap">
              <span>{isUrdu ? 'پاکستان مالیاتی اشاریے 2026' : 'FBR Macro Indicators 2026'}</span>
            </div>
          </div>

          {/* Single Line Scrollable Stats Items */}
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5 text-xs">
            {statsList.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <Icon className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-slate-400 text-[11px] font-medium whitespace-nowrap">
                    {isUrdu ? st.titleUr : st.titleEn}:
                  </span>
                  <span className="font-mono font-bold text-emerald-400 whitespace-nowrap">
                    {st.value}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${st.badgeColor} whitespace-nowrap hidden sm:inline-block`}>
                    {st.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Expand Details Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors ml-auto"
            title="Toggle Detailed Macro Cards"
          >
            <span>{expanded ? (isUrdu ? 'بند کریں' : 'Hide') : (isUrdu ? 'تفصیلات' : 'Details')}</span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Collapsible Expanded Cards */}
        {expanded && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 pb-2 border-t border-slate-800/80 mt-2 animate-fadeIn">
            {statsList.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-800/70 border border-slate-700/80 hover:border-emerald-500/40 rounded-xl p-3 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-slate-400 text-[10px] font-medium truncate">
                      {isUrdu ? card.titleUr : card.titleEn}
                    </span>
                    <Icon className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white tracking-tight font-mono">
                      {card.value}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {card.subEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

