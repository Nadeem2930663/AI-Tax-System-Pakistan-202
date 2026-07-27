import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google GenAI
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    system: "Pakistan AI Tax Engine 2026",
    fbrTaxYear: "2025-2026",
  });
});

// AI Tax Advisor Endpoint
app.post("/api/tax-advisor", async (req, res) => {
  try {
    const { query, userContext, language } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Query parameter is required." });
      return;
    }

    const ai = getAiClient();

    const systemInstruction = `You are "FBR AI Smart Tax Advisor 2026" - Pakistan's official AI tax policy and compliance intelligence assistant.
Your expertise covers:
1. Income Tax Ordinance 2001 (as amended up to Finance Act 2025/2026).
2. Salaried, Non-Salaried, AOP, Business, and Corporate Tax Slabs for Tax Year 2025-2026.
3. Export & IT/Freelancer Tax Regimes (1% Final Tax / 0.25% digital export registration with PSEB).
4. Advance Withholding Tax (WHT) rates under Section 236C, 236K, 231AB, Section 236A, Section 153 for Active Taxpayers (ATL) vs Late Filers vs Non-Filers.
5. FBR IRIS e-filing, Wealth Statements, Reconciliation, POS Invoicing, PRAL integrations.
6. Pakistan Tax System Problems (Narrow Tax Base, Indirect Tax Weight (~65%), Cash Economy, FBR Bureaucratic friction, Brain Drain on Salaried Class) & AI Solutions (AI Automated Audits, NADRA Cross-Verification, Real-Time POS Blockchain/AI, Geospatial Mandi/Agri Mapping).

Instructions:
- Provide accurate, precise, professional, and actionable tax insights based on Pakistan Tax Laws for 2025-2026.
- If the user selects Urdu or asks in Urdu/Roman Urdu, respond in clear Urdu (or Roman Urdu if requested).
- Format responses clearly using markdown bullet points, clear headings, and structured numerical calculations when tax estimates are requested.
- State relevant legal provisions (e.g., Section 236C, First Schedule Rate Slabs) when applicable.
- Remind users that official tax filings must be submitted via FBR IRIS (iris.fbr.gov.pk).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `[Language Context: ${language || "English"}]
User Query: ${query}
${userContext ? `User Context/Profile: ${JSON.stringify(userContext)}` : ""}`,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    res.json({
      answer: response.text,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Error in /api/tax-advisor:", err);
    res.status(500).json({
      error: "Failed to generate AI tax advisory.",
      details: err.message || "Unknown error",
    });
  }
});

// AI Risk & Audit Simulator Endpoint
app.post("/api/audit-simulation", async (req, res) => {
  try {
    const { declaredIncome, bankTransactions, assetsAcquired, utilityBills, taxPaid, profileType } = req.body;

    const ai = getAiClient();

    const systemInstruction = `You are FBR's AI Automated Tax Risk Analysis Engine (PRAL / NADRA Integrated 2026).
Analyze the provided financial indicators against Pakistan's tax laws and cross-data matching algorithms.

Calculate and return JSON with:
1. "riskScore": integer 0-100 (where 0 is low risk, >60 is high risk for FBR Audit under Section 214C / 177).
2. "riskCategory": "Low" | "Medium" | "High" | "Critical".
3. "discrepancies": array of string observations (e.g., "Declared income PKR X vs Asset acquisitions PKR Y indicates unexplained wealth").
4. "estimatedTaxExposure": estimated additional tax liability or penalty in PKR.
5. "recommendations": array of actionable compliance steps to avoid audit flags in IRIS.
6. "summary": brief analytical overview.`;

    const prompt = `Analyze this taxpayer profile for Tax Year 2026:
- Profile Type: ${profileType || 'Individual'}
- Annual Declared Income: PKR ${declaredIncome || 0}
- Total Annual Bank Credits: PKR ${bankTransactions || 0}
- Value of Assets Acquired/Purchased this year: PKR ${assetsAcquired || 0}
- Annual Electricity/Utility Bills: PKR ${utilityBills || 0}
- Total Tax Paid/Deducted (WHT): PKR ${taxPaid || 0}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    let resultJson = {};
    try {
      resultJson = JSON.parse(response.text || "{}");
    } catch {
      resultJson = {
        summary: response.text,
        riskScore: 45,
        riskCategory: "Medium",
        discrepancies: ["Analysis generated in text format."],
        estimatedTaxExposure: 0,
        recommendations: ["Ensure wealth statement reconciliation matches bank statements."],
      };
    }

    res.json(resultJson);
  } catch (err: any) {
    console.error("Error in /api/audit-simulation:", err);
    res.status(500).json({
      error: "Failed to execute audit risk simulation.",
      details: err.message || "Unknown error",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pakistan AI Taxation Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
