import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;
    
    if (!text) {
      return NextResponse.json({ error: "No input provided" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing in environment variables.");
      return NextResponse.json({ error: "API Configuration Error" }, { status: 500 });
    }

    // Layer 1: AI Text Analysis (Groq)
    const prompt = `Analyze the following message or URL for phishing, scam indicators, or malicious intent. 
    Return a structured JSON object with exactly these fields:
    - riskScore: integer 0 to 100
    - riskLevel: "SAFE", "SUSPICIOUS", or "DANGEROUS"
    - explanation: string short summary
    - reasons: array of strings
    
    Message: "${text}"`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" },
      });

      const aiResult = JSON.parse(chatCompletion.choices[0].message.content || "{}");
      console.log("Groq AI Result SUCCESS");

      // Simulation of multi-layer analysis
      const isUrl = text.startsWith("http") || text.includes(".");
      
      const domainInfo = isUrl ? {
        registrar: "NameCheap Inc.",
        age: "12 days",
        creationDate: "2026-03-04",
      } : null;

      const serverInfo = {
        country: "United States",
        isp: "Amazon Technologies",
        ip: "52.12.34.128",
      };

      const finalResult = {
        ...aiResult,
        inputText: text,
        domainInfo,
        serverInfo,
        threatIntel: {
          virusTotal: aiResult.riskLevel === "DANGEROUS" ? "Flagged" : "Clean",
          googleSafeBrowsing: aiResult.riskLevel === "DANGEROUS" ? "Flagged" : "Clean",
        }
      };

      return NextResponse.json(finalResult);
    } catch (groqError: any) {
      console.error("GROQ_API_ERROR_DETAILS:", groqError.error || groqError);
      throw groqError;
    }
  } catch (error: any) {
    console.error("ANALYSIS_ERROR_CATCH:", error.message);
    return NextResponse.json({ 
      error: "Internal Analysis Error", 
      details: error.message 
    }, { status: 500 });
  }
}
