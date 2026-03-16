"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldAlert, Search, Zap, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    if (!inputValue) return;
    router.push(`/analyzer?query=${encodeURIComponent(inputValue)}`);
  };

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-4xl w-full text-center space-y-12">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
        >
          <ShieldAlert className="w-4 h-4 text-cyber-green" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/50">
            Advanced Phishing Detection Active
          </span>
        </motion.div>

        {/* Hero Content */}
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white"
          >
            SafeLink <span className="text-cyber-green glow-text-green">AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-cyber-blue font-bold tracking-widest uppercase italic"
          >
            AI-powered protection against phishing links and scam messages.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-white/40 text-sm md:text-base tracking-wide"
          >
            Paste any suspicious URL or message and let SafeLink AI instantly analyze its risk using 
            advanced artificial intelligence and real-time cybersecurity intelligence.
          </motion.p>
        </div>

        {/* Analyzer Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mx-auto space-y-6"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-green to-cyber-blue rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Input
              placeholder="Paste suspicious URL or message here..."
              className="py-6 text-lg border-white/20 relative"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>
          
          <Button 
            size="lg" 
            className="w-full"
            onClick={handleAnalyze}
            disabled={!inputValue}
          >
            Analyze Threat
          </Button>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-12"
        >
          {[
            { icon: Search, label: "URL Scan" },
            { icon: Zap, label: "AI Analysis" },
            { icon: Lock, label: "Secure Link" },
            { icon: ShieldCheck, label: "Verified" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-2 group">
              <item.icon className="w-5 h-5 text-white/30 group-hover:text-cyber-green transition-colors" />
              <span className="text-[10px] uppercase tracking-widest text-white/20 font-bold group-hover:text-white/60">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
