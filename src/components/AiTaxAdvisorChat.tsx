import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types';
import { MessageSquare, Send, Sparkles, User, Bot, RefreshCw, Lightbulb, Scale, ShieldCheck } from 'lucide-react';

interface AiTaxAdvisorChatProps {
  lang: Language;
}

export const AiTaxAdvisorChat: React.FC<AiTaxAdvisorChatProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: isUrdu
        ? "خوش آمدید! میں ایف بی آر اے آئی ٹیکس ایڈوائزر ہوں (Tax Year 2025-2026)۔ آپ پاکستان کے انکم ٹیکس، تنخواہ سلیبز، ود ہولڈنگ ٹیکس، آئی ٹی ایکسپورٹ ٹیکس یا ایکٹو فائلر بننے کے طریقہ کار کے بارے میں سوال پوچھ سکتے ہیں۔"
        : "Welcome! I am the FBR AI Tax Advisor (Tax Year 2025-2026). Ask me any question regarding Pakistan income tax slabs, IT freelancer export regimes, withholding tax rules, IRIS filing, or AI tax reforms.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const presetQuestions = [
    {
      labelEn: "IT Freelancer Tax Rate & PSEB Registration",
      labelUr: "آئی ٹی فری لانسنگ پر 0.25 فیصد ٹیکس کا طریقہ",
      query: "I am an IT freelancer earning $2,000/month. What is my exact tax liability under Section 154A in Tax Year 2026 and how to register with PSEB for 0.25% rate?"
    },
    {
      labelEn: "Salaried Slabs 2025-2026 Calculation",
      labelUr: "ماہانہ 350,000 آمدنی پر تنخواہ ٹیکس حساب",
      query: "Calculate tax for a salaried employee earning PKR 350,000 monthly in Pakistan for Tax Year 2025-2026. What deductions can reduce my tax?"
    },
    {
      labelEn: "Property Purchase WHT Rate (Sec 236K)",
      labelUr: "جائیداد کی خرید پر ATL بمقابلہ نان فائلر ٹیکس",
      query: "What is the advance withholding tax rate on buying a residential plot worth 2 Crore PKR in Islamabad for Active Taxpayer vs Non-Filer?"
    },
    {
      labelEn: "Structural Problems & AI Solutions in FBR",
      labelUr: "پاکستان کے ٹیکس نظام کے مسائل اور اے آئی کا کردار",
      query: "Explain the main structural problems of Pakistan's tax system (narrow tax base, indirect tax burden) and how AI automated audits solve retail evasion."
    }
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/tax-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini AI Tax Advisor.');
      }

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.answer || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: isUrdu
          ? "معذرت، اے آئی سے رابطہ میں عارضی مسئلہ پیدا ہوا۔ برائے مہربانی دوبارہ کوشش کریں۔"
          : "Apologies, an error occurred while generating AI tax guidance. Please verify API key or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-700 p-3 rounded-xl text-white shadow-lg">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full mb-1">
                <Sparkles className="h-3 w-3" />
                <span>Gemini 3.6 Flash Intelligence</span>
              </div>
              <h2 className="text-xl font-bold text-white">
                {isUrdu ? 'پاکستان اے آئی ٹیکس مشیر چاٹ' : 'Pakistan AI Tax Advisor & Policy Assistant'}
              </h2>
              <p className="text-xs text-slate-400">
                {isUrdu
                  ? 'انکم ٹیکس قوانین، ایف بی آر نوٹسز اور مالیاتی سوالات کے فوری تسلی بخش جوابات حاصل کریں۔'
                  : 'Ask any questions about Income Tax Ordinance 2001, FBR IRIS filing, WHT slabs, or AI Tax Governance.'}
              </p>
            </div>
          </div>
        </div>

        {/* Preset Prompt Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {presetQuestions.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(preset.query)}
              className="text-left bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 p-3 rounded-xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                <Lightbulb className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{isUrdu ? preset.labelUr : preset.labelEn}</span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-mono">
                "{preset.query}"
              </p>
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[520px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`p-2 rounded-xl text-white shrink-0 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600'
                      : msg.isError
                      ? 'bg-rose-600'
                      : 'bg-slate-700'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600/90 text-white rounded-tr-none'
                      : msg.isError
                      ? 'bg-rose-950/80 border border-rose-800 text-rose-200 rounded-tl-none'
                      : 'bg-slate-900 border border-slate-700 text-slate-200 rounded-tl-none font-sans'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                  <div className="text-[10px] text-slate-400/80 mt-2 text-right font-mono">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-700 text-white">
                  <Bot className="h-4 w-4 animate-bounce" />
                </div>
                <div className="bg-slate-900 border border-slate-700 p-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                  <span>{isUrdu ? 'ایف بی آر اے آئی قوانین اور سلیبز سے جواب تیار کر رہا ہے...' : 'Consulting Pakistan Income Tax Laws & Gemini 3.6 Engine...'}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-slate-900 border-t border-slate-700/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  isUrdu
                    ? 'پاکستان ٹیکس کے بارے میں سوال ٹائپ کریں...'
                    : 'Type your tax query (e.g. salary tax, IT exporter rate, ATL status)...'
                }
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold p-3 rounded-xl transition-all shadow-md shadow-emerald-900/40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
