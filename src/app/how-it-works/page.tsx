"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Database, ShieldCheck, Search, Zap } from "lucide-react";
import { CyberCard } from "@/components/ui/CyberCard";

const STEPS = [
  {
    title: "AI Semantic Analysis",
    description: "Our LLM-powered engine analyzes the linguistic patterns of the message to detect urgency, manipulation, and phishing intent.",
    icon: Cpu,
    variant: "green" as const,
  },
  {
    title: "Domain Intelligence",
    description: "We verify URL structures, check domain age, registrar reputation, and SSL certification status in real-time.",
    icon: Globe,
    variant: "blue" as const,
  },
  {
    title: "Threat Intelligence",
    description: "SafeLink AI queries global threat databases including Google Safe Browsing and VirusTotal to check for known malicious fingerprints.",
    icon: Database,
    variant: "blue" as const,
  },
  {
    title: "Risk Scoring",
    description: "A final threat score is calculated based on multi-layer data points, providing a clear Safe, Suspicious, or Dangerous verdict.",
    icon: ShieldCheck,
    variant: "green" as const,
  }
];

export default function HowItWorks() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-20">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
          System <span className="text-cyber-green">Architecture</span>
        </h1>
        <p className="text-white/40 uppercase tracking-[0.2em] text-sm font-bold">
          Multi-Layer Threat Detection Workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {STEPS.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <CyberCard variant={step.variant} className="h-full flex flex-col space-y-4 group">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-8 h-8 ${step.variant === 'green' ? 'text-cyber-green' : 'text-cyber-blue'}`} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest italic">{step.title}</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed font-mono">
                {step.description}
              </p>
            </CyberCard>
          </motion.div>
        ))}
      </div>

      {/* Visual Flow Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-12">
        <h2 className="text-2xl font-black uppercase tracking-widest italic text-cyber-blue">The Scanning Process</h2>
        <div className="flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent -translate-y-1/2 opacity-20" />
          
          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-white/40">1</div>
            <span className="text-[10px] uppercase tracking-widest font-black text-white/60">Input Received</span>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-cyber-green flex items-center justify-center text-cyber-green shadow-neon-green">2</div>
            <span className="text-[10px] uppercase tracking-widest font-black text-cyber-green">API Extraction</span>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-cyber-blue flex items-center justify-center text-cyber-blue shadow-neon-blue">3</div>
            <span className="text-[10px] uppercase tracking-widest font-black text-cyber-blue">AI Logic</span>
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-white/40">4</div>
            <span className="text-[10px] uppercase tracking-widest font-black text-white/60">Final Verdict</span>
          </div>
        </div>
      </div>
    </div>
  );
}
