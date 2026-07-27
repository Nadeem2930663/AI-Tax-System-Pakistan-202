import React, { useState } from 'react';
import { Header } from './components/Header';
import { OverviewStats } from './components/OverviewStats';
import { TaxCalculator } from './components/TaxCalculator';
import { ProblemsAndSolutions } from './components/ProblemsAndSolutions';
import { AiRiskSimulator } from './components/AiRiskSimulator';
import { AtlChecker } from './components/AtlChecker';
import { AiTaxAdvisorChat } from './components/AiTaxAdvisorChat';
import { Footer } from './components/Footer';
import { Language } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Navbar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
      />

      {/* Top Macro Stats Banner */}
      <OverviewStats lang={lang} />

      {/* Main View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TaxCalculator lang={lang} />
            </motion.div>
          )}

          {activeTab === 'problems-solutions' && (
            <motion.div
              key="problems-solutions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProblemsAndSolutions lang={lang} />
            </motion.div>
          )}

          {activeTab === 'audit-profiler' && (
            <motion.div
              key="audit-profiler"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AiRiskSimulator lang={lang} />
            </motion.div>
          )}

          {activeTab === 'atl-checker' && (
            <motion.div
              key="atl-checker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AtlChecker lang={lang} />
            </motion.div>
          )}

          {activeTab === 'ai-advisor' && (
            <motion.div
              key="ai-advisor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AiTaxAdvisorChat lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
