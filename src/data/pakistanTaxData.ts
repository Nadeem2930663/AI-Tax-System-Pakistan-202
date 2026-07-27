import { TaxSlab, TaxProblem, AiSolution, WhtComparisonItem } from '../types';

// Pakistan Salaried Individuals Tax Slabs Tax Year 2025-2026 (Finance Act 2024/2025)
export const SALARIED_TAX_SLABS_2026: TaxSlab[] = [
  {
    min: 0,
    max: 600000,
    baseTax: 0,
    rate: 0,
    descriptionEn: "Income up to PKR 600,000 is EXEMPT (0% Tax).",
    descriptionUr: "600,000 روپے تک سالانہ آمدنی پر کوئی ٹیکس نہیں۔"
  },
  {
    min: 600000,
    max: 1200000,
    baseTax: 0,
    rate: 5,
    descriptionEn: "5% of the amount exceeding PKR 600,000.",
    descriptionUr: "600,000 سے 12 لاکھ روپے کے درمیان زائد رقم پر 5 فیصد ٹیکس۔"
  },
  {
    min: 1200000,
    max: 2200000,
    baseTax: 30000,
    rate: 15,
    descriptionEn: "PKR 30,000 + 15% of the amount exceeding PKR 1,200,000.",
    descriptionUr: "30,000 روپے + 12 لاکھ سے زائد رقم پر 15 فیصد ٹیکس۔"
  },
  {
    min: 2200000,
    max: 3200000,
    baseTax: 180000,
    rate: 25,
    descriptionEn: "PKR 180,000 + 25% of the amount exceeding PKR 2,200,000.",
    descriptionUr: "180,000 روپے + 22 لاکھ سے زائد رقم پر 25 فیصد ٹیکس۔"
  },
  {
    min: 3200000,
    max: 4100000,
    baseTax: 430000,
    rate: 30,
    descriptionEn: "PKR 430,000 + 30% of the amount exceeding PKR 3,200,000.",
    descriptionUr: "430,000 روپے + 32 لاکھ سے زائد رقم پر 30 فیصد ٹیکس۔"
  },
  {
    min: 4100000,
    max: null,
    baseTax: 700000,
    rate: 35,
    descriptionEn: "PKR 700,000 + 35% of the amount exceeding PKR 4,100,000.",
    descriptionUr: "700,000 روپے + 41 لاکھ سے زائد رقم پر 35 فیصد ٹیکس۔"
  }
];

// Non-Salaried & Business Individuals Tax Slabs Tax Year 2025-2026
export const BUSINESS_TAX_SLABS_2026: TaxSlab[] = [
  {
    min: 0,
    max: 600000,
    baseTax: 0,
    rate: 0,
    descriptionEn: "Up to PKR 600,000 is EXEMPT.",
    descriptionUr: "6 لاکھ روپے تک سالانہ آمدنی ٹیکس سے مستثنیٰ ہے۔"
  },
  {
    min: 600000,
    max: 1200000,
    baseTax: 0,
    rate: 15,
    descriptionEn: "15% of the amount exceeding PKR 600,000.",
    descriptionUr: "6 لاکھ سے زائد رقم پر 15 فیصد ٹیکس۔"
  },
  {
    min: 1200000,
    max: 1600000,
    baseTax: 90000,
    rate: 20,
    descriptionEn: "PKR 90,000 + 20% of amount exceeding PKR 1,200,000.",
    descriptionUr: "90,000 روپے + 12 لاکھ سے زائد رقم پر 20 فیصد ٹیکس۔"
  },
  {
    min: 1600000,
    max: 3200000,
    baseTax: 170000,
    rate: 30,
    descriptionEn: "PKR 170,000 + 30% of amount exceeding PKR 1,600,000.",
    descriptionUr: "170,000 روپے + 16 لاکھ سے زائد رقم پر 30 فیصد ٹیکس۔"
  },
  {
    min: 3200000,
    max: 5600000,
    baseTax: 650000,
    rate: 40,
    descriptionEn: "PKR 650,000 + 40% of amount exceeding PKR 3,200,000.",
    descriptionUr: "650,000 روپے + 32 لاکھ سے زائد رقم پر 40 فیصد ٹیکس۔"
  },
  {
    min: 5600000,
    max: null,
    baseTax: 1610000,
    rate: 45,
    descriptionEn: "PKR 1,610,000 + 45% of amount exceeding PKR 5,600,000.",
    descriptionUr: "16,10,000 روپے + 56 لاکھ سے زائد رقم پر 45 فیصد ٹیکس۔"
  }
];

// WHT Comparison Rates (ATL vs Non-ATL in Pakistan 2026)
export const WHT_RATES_2026: WhtComparisonItem[] = [
  {
    transactionType: "Purchase of Immovable Property (Real Estate)",
    section: "Sec 236K",
    atlRate: "3%",
    nonAtlRate: "12% to 15%",
    impactNote: "Non-filers face a punitive 4x advance withholding tax rate on buying real estate."
  },
  {
    transactionType: "Sale / Transfer of Immovable Property",
    section: "Sec 236C",
    atlRate: "3%",
    nonAtlRate: "10% to 12%",
    impactNote: "High transaction friction discouraging formal documentation."
  },
  {
    transactionType: "Cash Withdrawal from Bank (Exceeding 50k/day)",
    section: "Sec 231AB",
    atlRate: "0% (Exempt)",
    nonAtlRate: "0.6%",
    impactNote: "Drives non-filers away from formal banking into cash economy."
  },
  {
    transactionType: "Motor Vehicle Registration / Purchase",
    section: "Sec 231B",
    atlRate: "Standard Slabs (PKR 10k - 500k)",
    nonAtlRate: "300% Penalty (3x Rate)",
    impactNote: "Substantial advance tax on new cars for non-ATL buyers."
  },
  {
    transactionType: "Dividend Income from Listed Companies",
    section: "Sec 150",
    atlRate: "15%",
    nonAtlRate: "30%",
    impactNote: "Doubled withholding tax on investment dividends."
  },
  {
    transactionType: "IT & Software Export Proceeds (PSEB Registered)",
    section: "Sec 154A",
    atlRate: "0.25% to 1% (Final Tax)",
    nonAtlRate: "Not Eligible for Reduced Rate",
    impactNote: "Encourages IT freelancers to register and join Active Taxpayer List."
  }
];

// Pakistan Taxation System Structural Problems (2026 Analysis)
export const PAKISTAN_TAX_PROBLEMS: TaxProblem[] = [
  {
    id: "P1",
    titleEn: "Narrow Tax Base & Low Tax-to-GDP Ratio",
    titleUr: "محدود ٹیکس بیس اور جی ڈی پی کا کم تناسب",
    category: "Structural",
    severity: "Critical",
    metric: "~10.2% Tax-to-GDP Ratio",
    descriptionEn: "Out of a nation of 240+ million people, only ~5.3 million file income tax returns, and less than 3 million actively pay non-zero income tax. Large swathes of retail, agriculture, and informal service sectors remain completely un-taxed.",
    descriptionUr: "24 کروڑ سے زائد کی آبادی میں سے صرف 53 لاکھ افراد انکم ٹیکس گوشوارے جمع کرواتے ہیں، اور 30 لاکھ سے کم باقاعدہ ٹیکس ادا کرتے ہیں۔ زراعت اور خوردہ فروش مکمل طور پر ٹیکس نیٹ سے باہر ہیں۔",
    impactEn: "Forces the government to borrow heavily (sovereign debt) and over-tax captive formal sectors.",
    impactUr: "حکومت کو مجبوراً غیر ملکی قرضے لینے پڑتے ہیں اور موجودہ ٹیکس دہندگان پر زیادہ بوجھ ڈالنا پڑتا ہے۔",
    affectedSectors: ["Formal Business", "Salaried Class", "National Fiscal Balance"]
  },
  {
    id: "P2",
    titleEn: "Excessive Tax Burden on Salaried Class & Brain Drain",
    titleUr: "تنخواہ دار طبقے پر بے جا ٹیکس بوجھ اور برین ڈرین",
    category: "Policy",
    severity: "Critical",
    metric: "Up to 35% Income Tax + Surcharge",
    descriptionEn: "Salaried employees contribute more tax revenue than the entire wholesale and retail trade combined in Pakistan. With inflation and bracket creep, tech workers, doctors, and engineers face severe tax squeezes leading to skilled brain drain.",
    descriptionUr: "تنخواہ دار طبقہ پاکستان کے ہول سیل اور ریٹیل سیکٹر سے زیادہ ٹیکس ادا کرتا ہے۔ مہنگائی اور 35 فیصد تک ٹیکس کی وجہ سے ہنر مند افراد اور آئی ٹی کے پیشہ ور ملک چھوڑ کر جا رہے ہیں۔",
    impactEn: "Accelerated brain drain of IT talent, healthcare professionals, and corporate executives to GCC, UK, and North America.",
    impactUr: "آئی ٹی کے ماہرین، باصلاحیت ڈاکٹرز اور کارپوریٹ ایگزیکٹوز کی ملک سے بڑے پیمانے پر منتقلی۔",
    affectedSectors: ["IT & Software Export", "Healthcare", "Corporate Industry"]
  },
  {
    id: "P3",
    titleEn: "Over-reliance on Indirect & Regressive Taxes",
    titleUr: "بالواسطہ (ان ڈائریکٹ) اور غیر منصفانہ ٹیکسوں پر منحصر معیشت",
    category: "Structural",
    severity: "High",
    metric: "~65% Indirect Tax Share",
    descriptionEn: "Nearly two-thirds of FBR revenue comes from indirect taxes (Sales Tax, FED, Custom duties). A daily wage worker pays the exact same 18% Sales Tax on food/petrol as a multi-millionaire.",
    descriptionUr: "ایف بی آر کی 65 فیصد سے زائد آمدنی بالواسطہ ٹیکسوں (سیلز ٹیکس، کسٹم ڈیوٹی) سے حاصل ہوتی ہے۔ ایک دہاڑی دار مزدور بھی پیٹرول پر وہی 18 فیصد سیلز ٹیکس دیتا ہے جو امیر ترین شخص دیتا ہے۔",
    impactEn: "Severe inequality, rising poverty line, and high cost of living for middle-class families.",
    impactUr: "سخت معاشی ناہمواری، غربت میں اضافہ اور درمیانے طبقے کی قوت خرید پر شدید منفی اثر۔",
    affectedSectors: ["Low-Income Households", "Retail Consumers", "Small Business"]
  },
  {
    id: "P4",
    titleEn: "Distorted 'Non-Filer' & 'Late-Filer' Penalty Culture",
    titleUr: "غیر فائلرز کی سزا کا نظام جس سے نقد معیشت کو فروغ ملا",
    category: "Policy",
    severity: "High",
    metric: "3x to 4x Penalty Rates",
    descriptionEn: "Instead of enforcing universal tax registration, Pakistan created a parallel legal category called 'Non-Filer' and 'Late-Filer' with higher withholding rates. Non-filers simply pay higher cash WHT and avoid formal IRIS registration entirely.",
    descriptionUr: "'نیکسٹ فائلر' پر محض اضافی ود ہولڈنگ ٹیکس لگا کر چھوڑ دیا جاتا ہے جس سے وہ قانونی طور پر رجسٹرڈ ہونے کے بجائے نقد رقم کے ذریعے لین دین کو ترجیح دیتے ہیں۔",
    impactEn: "Institutionalization of the informal cash economy (~PKR 9 Trillion in cash circulation outside banks).",
    impactUr: "انفارمل کیش اکانومی کی حوصلہ افزائی اور بینکنگ سسٹم سے پیسے کا نکلنا۔",
    affectedSectors: ["Banking Sector", "Real Estate", "Automotive Market"]
  },
  {
    id: "P5",
    titleEn: "Complex IRIS Portal, Bureaucratic Friction & Delayed Refunds",
    titleUr: "ایف بی آر کے پیچیدہ آئرس پورٹل، نوکر شاہی کی رکاوٹیں اور ریفنڈ کی تاخیر",
    category: "Administrative",
    severity: "Medium",
    metric: "180+ Days Average Refund Delay",
    descriptionEn: "FBR's IRIS filing system suffers frequent downtime during tax deadlines, complex forms require expensive tax attorneys, and exporters face billions of rupees tied up in delayed Sales Tax refunds (FASTER system backlogs).",
    descriptionUr: "آئرس پورٹل میں تکنیکی خرابی، پیچیدہ فارمز، اور برآمد کنندگان (ایکسپورٹرز) کی اربوں روپے کے ریفنڈز میں مہینوں تاخیر سے کام متاثر ہوتا ہے۔",
    impactEn: "Working capital blockage for exporters, widespread mistrust of FBR auditors, and high tax compliance cost.",
    impactUr: "برآمد کنندگان کا سرمایہ بلاک ہونا اور ایف بی آر پر عوامی اعتماد کی کمی۔",
    affectedSectors: ["Textile Exporters", "SMEs", "Taxpayer User Experience"]
  },
  {
    id: "P6",
    titleEn: "Massive Evasion in Wholesale, Retail, Real Estate & Agriculture",
    titleUr: "ہول سیل، ریٹیل، برائے فروخت جائیداد اور زراعت میں بڑے پیمانے پر ٹیکس چوری",
    category: "Economic",
    severity: "Critical",
    metric: "Estimated PKR 3.5 Trillion Uncollected",
    descriptionEn: "Wholesale/retail trade accounts for ~18% of GDP but pays under 2% of total direct tax. Agricultural income tax collection by provinces remains under PKR 3 Billion nationwide due to political concessions.",
    descriptionUr: "ہول سیل اور ریٹیل سیکٹر جی ڈی پی کا 18 فیصد ہے لیکن ڈائریکٹ ٹیکس میں اس کا حصہ 2 فیصد سے کم ہے۔ زرعی شعبے سے سالانہ نام برائے نام ٹیکس ملتا ہے۔",
    impactEn: "Blatant inequality where wealthy traders and feudals evade tax while salaried staff bear the government's operational bill.",
    impactUr: "غیر منصفانہ ٹیکس نظام جہاں تاجر اور بڑے زمینداد فارغ رہتے ہیں اور ملازمین تمام مالیاتی بوجھ اٹھاتے ہیں۔",
    affectedSectors: ["Agriculture", "Retail Markets", "Real Estate Speculators"]
  }
];

// AI-Powered Solutions & Reform Framework for Pakistan 2026
export const PAKISTAN_AI_SOLUTIONS: AiSolution[] = [
  {
    id: "S1",
    problemId: "P1",
    titleEn: "AI Cross-Verification Audit Engine (NADRA + Bank + Telecom)",
    titleUr: "نادرا، بینکنگ اور ٹیلی کام ڈیٹا کے لیے اے آئی آڈٹ انجن",
    techEn: "Multi-Modal Graph ML & Automated Anomaly Detection",
    techUr: "مشین لرننگ اور آٹومیٹڈ اینوملی ڈیٹیکشن",
    descriptionEn: "Connects NADRA asset profiles, bank account cash flows, vehicle registrations, international travel records, and high-value credit card spending via an AI Engine. Automatically identifies high-wealth individuals living outside the tax net.",
    descriptionUr: "نادرا، بینکنگ ریکارڈز، نئی گاڑیوں کی خرید، بیرونی اسفار اور کریڈٹ کارڈ سپینڈنگ کو اے آئی کے ذریعے ملا کر غیر رجسٹرڈ امیر افراد کی شناخت کی جائے۔",
    expectedOutcomeEn: "Adds 2.5 Million new high-value taxpayers within 18 months, boosting tax base by ~45%.",
    expectedOutcomeUr: "18 ماہ میں 25 لاکھ نئے امیر ٹیکس دہندگان کا اضافہ۔",
    readinessYear: "2026 Active Rollout",
    keyFeatures: [
      "Automated Wealth Profiling based on spending habits",
      "No human inspector discretion (Prevents bribery/harassment)",
      "Instant automated AI notice generation in IRIS"
    ]
  },
  {
    id: "S2",
    problemId: "P2",
    titleEn: "Salaried Tax Indexation & AI Exemption Optimizer",
    titleUr: "تنخواہ دار طبقے کے لیے اے آئی ایڈجسٹمنٹ اور ٹیکس میں چھوٹ کا نظام",
    techEn: "Inflation-Indexed Dynamic Slab Algorithms & GenAI Return Pre-Filling",
    techUr: "ڈائنامک ٹیکس سلیبز اور جنریٹو اے آئی فائلنگ اسسٹنٹ",
    descriptionEn: "Dynamic tax slab calculator that adjusts for CPI inflation in real time. Features an AI tax optimizer that scans provident fund deposits, health insurance, and Zakat receipts to auto-calculate maximum legal tax deductions for employees.",
    descriptionUr: "مہنگائی کے تناسب سے خودکار ٹیکس سلیبز ایڈجسٹمنٹ اور زکوۃ، ہیلتھ انشورنس اور پراویڈنٹ فنڈ سے ٹیکس بچانے کے لیے اے آئی رہنمائی۔",
    expectedOutcomeEn: "Reduces net tax squeeze on middle-class tech and medical workforce by 15-20%, halting brain drain.",
    expectedOutcomeUr: "مڈل کلاس اور آئی ٹی شعبے پر ٹیکس کا بوجھ 20 فیصد تک کم۔",
    readinessYear: "2026 Proposed",
    keyFeatures: [
      "1-Click Pre-filled Tax Returns for Salaried Workers",
      "Automated deduction matching with employer withholding tax (Sec 149)",
      "Brain-Drain Mitigation rebate for registered IT exporters"
    ]
  },
  {
    id: "S3",
    problemId: "P3",
    titleEn: "AI POS Invoicing & Real-Time Retail Digital Ledger",
    titleUr: "ریٹیل اسٹورز کے لیے پورٹل ریئل ٹائم اے آئی پوائنٹ آف سیل نظام",
    techEn: "Computer Vision Receipt Audit & PRAL Blockchain QR Settlement",
    techUr: "کمپیوٹر ویژن اور بلاک چین پر مبنی رسیدوں کی تصدیق",
    descriptionEn: "Mandates AI-connected POS receipt printers across Tier-1 & Tier-2 retail stores. Shoppers get instant lottery cashbacks (Inam Scheme) via smartphone app by scanning QR codes, ensuring retailers don't bypass Sales Tax.",
    descriptionUr: "ہر خوردہ دکان پر بلاک چین اور اے آئی والی رسید پرنٹر سسٹم۔ گاہک کو کیو آر کوڈ اسکین کرنے پر انعامی اسکیم۔",
    expectedOutcomeEn: "Increases Retail Sales Tax capture from PKR 120 Billion to PKR 650 Billion annually.",
    expectedOutcomeUr: "سالانہ ریٹیل سیلز ٹیکس کی وصولی میں 400 ارب روپے سے زائد کا اضافہ۔",
    readinessYear: "2026 In Execution",
    keyFeatures: [
      "Fraudulent receipt detection using Computer Vision",
      "Consumer cashback incentives driving compliance from the demand side",
      "Zero manual audit friction for compliant shopkeepers"
    ]
  },
  {
    id: "S4",
    problemId: "P4",
    titleEn: "Elimination of 'Non-Filer' Status via AI Digital Onboarding",
    titleUr: "اے آئی بائیو میٹرک آن بورڈنگ کے ذریعے غیر فائلر کیٹگری کا مکمل خاتمہ",
    techEn: "Instant Bio-Metric Mobile Filings & Micro-Tax Deductions",
    techUr: "موبائل فون ایپ سے 2 منٹ میں بائیومیٹرک انکم ٹیکس اندراج",
    descriptionEn: "Phases out the punitive 'Non-Filer' surcharge by introducing a 2-minute mobile e-filing flow inside banking apps (Easypaisa, JazzCash, Commercial Banks). Uses AI natural language chat to create zero-asset simplified returns.",
    descriptionUr: "'نان فائلر' کی اصطلاح ختم کر کے جاز کیش اور ایزی پیسہ ایپ کے اندر ہی صرف 2 منٹ میں آسان ٹیکس گوشوارہ جمع کرنے کی سہولت۔",
    expectedOutcomeEn: "Brings 12+ Million informal micro-merchants into the formal banking system.",
    expectedOutcomeUr: "ایک کروڑ سے زائد افراد کا فوری قانونی بینکنگ نیٹ میں شمولیت۔",
    readinessYear: "2026 Standard Strategy",
    keyFeatures: [
      "Zero tax lawyer cost for citizens with simple incomes",
      "Conversational Urdu & Regional language AI audio filing",
      "Automatic removal of punitive withholding tax on bank transactions"
    ]
  },
  {
    id: "S5",
    problemId: "P5",
    titleEn: "Automated AI Refund Processing & FASTER 2.0 Engine",
    titleUr: "ایکسپورٹرز کے لیے اے آئی کے ذریعے 72 گھنٹوں میں خودکار ٹیکس ریفنڈ",
    techEn: "Predictive Claims Risk Model & Instant SBP Clearing",
    techUr: "خودکار رسک اسسمنٹ اور ایس بی پی اکاؤنٹ میں فوری منتقلی",
    descriptionEn: "Upgrades FBR's FASTER export refund system with an AI claim-verification model. Verified exporter sales tax claims are automatically risk-scored and refunded into State Bank accounts within 72 hours without human intervention.",
    descriptionUr: "برآمد کنندگان (ٹیکسٹائل، آئی ٹی) کے سیلز ٹیکس ریفنڈز کو اے آئی چیک کر کے صرف 72 گھنٹوں کے اندر سٹیٹ بینک کے ذریعے اکاؤنٹ میں بھیجے گا۔",
    expectedOutcomeEn: "Unlocks PKR 150 Billion in stalled liquidity for Pakistan's export industry.",
    expectedOutcomeUr: "برآمدی صنعت کے لیے 150 ارب روپے کا روکا ہوا سرمایہ فوری آزاد۔",
    readinessYear: "2026 Ready",
    keyFeatures: [
      "72-Hour Refund Guarantee for trusted exporters",
      "AI cross-checking of input invoices against raw material purchases",
      "Transparent status tracking dashboard for businesses"
    ]
  },
  {
    id: "S6",
    problemId: "P6",
    titleEn: "Geospatial AI & Mandi Agriculture Yield Mapping",
    titleUr: "سیٹلائٹ اور اے آئی کے ذریعے زرعی اور ہول سیل مارکیٹ ٹیکس تخمینہ",
    techEn: "Satellite Land Use Analytics + Wholesale Electronic Mandi Ledgers",
    techUr: "سیٹلائٹ امیجری اور الیکٹرانک منڈی ڈیٹا اینالیٹکس",
    descriptionEn: "Combines high-resolution satellite imagery (crop yield & land acreage) with electronic Mandi arrival records to calculate fair agricultural income tax for large landlords. Digitizes wholesale market transactions.",
    descriptionUr: "سیٹلائٹ کی مدد سے فصلوں کی پیداوار کا تخمینہ اور غلہ منڈیوں کے الیکٹرانک ڈیٹا سے بڑے جاگیرداروں پر جائز زرعی ٹیکس کا نفاذ۔",
    expectedOutcomeEn: "Collects PKR 250+ Billion in equitable agricultural & wholesale trade taxes.",
    expectedOutcomeUr: "زرعی اور ہول سیل سیکٹر سے 250 ارب روپے سے زائد کا ٹیکس کلیکشن۔",
    readinessYear: "2026 Pilot Stage",
    keyFeatures: [
      "Satellite-verified land productivity assessment",
      "Exemption safeguards for small subsistence farmers (<12.5 acres)",
      "Federal-Provincial tax harmonized digital repository"
    ]
  }
];

// FBR Overview Statistics (2025-2026 Tax Year)
export const PAKISTAN_TAX_STATS_2026 = {
  totalCollectionTarget: "PKR 12.97 Trillion",
  taxToGdpRatio: "10.2%",
  activeFilers: "5.3 Million",
  nonFilersPenaltyRate: "Up to 300% WHT Surcharge",
  directTaxPercentage: "35%",
  indirectTaxPercentage: "65%",
  salariedClassContribution: "PKR 530+ Billion",
  retailTradeTaxContribution: "PKR 85 Billion (~0.8% of GDP)",
  aiAuditAccuracyRate: "94.2% Anomaly Detection"
};
