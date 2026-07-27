export type Language = 'en' | 'ur';

export type TaxCategory = 'salaried' | 'non-salaried' | 'company' | 'it_export' | 'rental' | 'capital_gains';

export interface TaxSlab {
  min: number;
  max: number | null;
  baseTax: number;
  rate: number; // percentage e.g. 5 for 5%
  descriptionEn: string;
  descriptionUr: string;
}

export interface TaxCalculationResult {
  annualIncome: number;
  taxableIncome: number;
  deductions: number;
  annualTax: number;
  monthlyTax: number;
  effectiveTaxRate: number;
  netMonthlyIncome: number;
  slabDescription: string;
  surcharge: number;
  taxCategory: TaxCategory;
  aiRecommendations: string[];
}

export interface TaxProblem {
  id: string;
  titleEn: string;
  titleUr: string;
  category: 'Structural' | 'Policy' | 'Administrative' | 'Economic';
  severity: 'Critical' | 'High' | 'Medium';
  metric: string;
  descriptionEn: string;
  descriptionUr: string;
  impactEn: string;
  impactUr: string;
  affectedSectors: string[];
}

export interface AiSolution {
  id: string;
  problemId: string;
  titleEn: string;
  titleUr: string;
  techEn: string;
  techUr: string;
  descriptionEn: string;
  descriptionUr: string;
  expectedOutcomeEn: string;
  expectedOutcomeUr: string;
  readinessYear: string;
  keyFeatures: string[];
}

export interface WhtComparisonItem {
  transactionType: string;
  section: string;
  atlRate: string;
  nonAtlRate: string;
  impactNote: string;
}

export interface AuditRiskInput {
  declaredIncome: number;
  bankTransactions: number;
  assetsAcquired: number;
  utilityBills: number;
  taxPaid: number;
  profileType: 'Salaried' | 'Business' | 'AOP' | 'Freelancer' | 'Real Estate';
}

export interface AuditRiskResult {
  riskScore: number;
  riskCategory: 'Low' | 'Medium' | 'High' | 'Critical';
  discrepancies: string[];
  estimatedTaxExposure: number;
  recommendations: string[];
  summary: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isError?: boolean;
}
