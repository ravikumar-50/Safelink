"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Zap } from "lucide-react";
import { CyberCard } from "@/components/ui/CyberCard";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 space-y-20">
      <div className="text-center space-y-6">
        <motion.div 
          initial={{ rotate: -10, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          className="inline-block"
        >
          <Shield className="w-20 h-20 text-cyber-green shadow-neon-green mx-auto" />
        </motion.div>
        <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
          Our <span className="text-cyber-green">Mission</span>
        </h1>
        <p className="text-white/60 leading-relaxed text-lg font-medium italic">
          SafeLink AI is an AI-powered cybersecurity platform designed to help users detect phishing attacks, 
          scam messages, and malicious websites before they cause harm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CyberCard variant="blue" title="Vision">
          <p className="text-sm text-white/50 leading-relaxed font-mono">
            Empowering every user with the collective intelligence of AI to navigate the digital world safely and securely.
          </p>
        </CyberCard>
        <CyberCard variant="green" title="Technology">
          <p className="text-sm text-white/50 leading-relaxed font-mono">
            Utilizing state-of-the-art LLMs and multi-layer threat database integration for real-time protection.
          </p>
        </CyberCard>
        <CyberCard variant="blue" title="Ethics">
          <p className="text-sm text-white/50 leading-relaxed font-mono">
            Prioritizing privacy and accuracy, ensuring our detection methods are unbiased and highly effective.
          </p>
        </CyberCard>
      </div>

      <div className="space-y-12">
        <h2 className="text-3xl font-black uppercase italic text-center tracking-widest">Core Values</h2>
        <div className="space-y-4">
          {[
            { label: "Transparency", detail: "We explain exactly why a link or message is flagged.", icon: Target },
            { label: "Speed", detail: "Near-instant analysis using optimized Groq infrastructure.", icon: Zap },
            { label: "Community", detail: "Building a safer web through collective intelligence.", icon: Users },
          ].map((val, idx) => (
            <div key={idx} className="flex items-center space-x-6 p-6 bg-white/5 border border-white/10 rounded-lg group hover:border-cyber-green transition-colors">
              <val.icon className="w-8 h-8 text-cyber-green group-hover:scale-125 transition-transform" />
              <div>
                <h4 className="text-lg font-black uppercase tracking-widest text-white">{val.label}</h4>
                <p className="text-white/40 text-sm font-mono">{val.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
