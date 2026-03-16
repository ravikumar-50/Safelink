"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldX, 
  AlertTriangle, 
  Search, 
  Globe, 
  Database, 
  Cpu, 
  ChevronRight,
  RefreshCw,
  Copy,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CyberCard } from "@/components/ui/CyberCard";
import { toast } from "react-hot-toast";

export default function Analyzer() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [inputText, setInputText] = useState(query);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (query) {
      handleAnalyze(query);
    }
  }, [query]);

  const handleAnalyze = async (text: string = inputText) => {
    if (!text) return;
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "SAFE": return "green";
      case "SUSPICIOUS": return "blue";
      case "DANGEROUS": return "red";
      default: return "green";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "SAFE": return <ShieldCheck className="w-12 h-12 text-cyber-green" />;
      case "SUSPICIOUS": return <AlertTriangle className="w-12 h-12 text-cyber-blue" />;
      case "DANGEROUS": return <ShieldX className="w-12 h-12 text-cyber-red" />;
      default: return <ShieldCheck className="w-12 h-12 text-cyber-green" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Search Header */}
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-2xl relative group">
          <Input
            placeholder="Paste suspicious URL or message here..."
            className="py-6 pr-32"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <Button 
            className="absolute right-2 top-2"
            size="sm"
            onClick={() => handleAnalyze()}
            disabled={isScanning || !inputText}
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Scan"}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isScanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 space-y-8"
          >
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-cyber-green/20 animate-pulse" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-4 border-cyber-green rounded-full shadow-neon-green"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="w-12 h-12 text-cyber-green animate-bounce" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black italic uppercase tracking-[0.5em] text-cyber-green animate-pulse">
                Scanning...
              </h2>
              <p className="text-white/40 text-sm uppercase tracking-widest">
                Multi-layer threat intelligence check in progress
              </p>
            </div>
          </motion.div>
        ) : result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Result Panel */}
            <CyberCard variant={getRiskColor(result.riskLevel)} className="lg:col-span-2 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-8 gap-6">
                <div className="flex items-center space-x-6">
                  {getRiskIcon(result.riskLevel)}
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                      Risk Level: <span className={result.riskLevel === 'DANGEROUS' ? 'text-cyber-red' : result.riskLevel === 'SUSPICIOUS' ? 'text-cyber-blue' : 'text-cyber-green'}>
                        {result.riskLevel}
                      </span>
                    </h2>
                    <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
                      Scan ID: {result._id || 'LIVE_SCAN'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-black text-white">{result.riskScore}%</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-black">Threat Score</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-cyber-green uppercase tracking-widest font-black text-xs mb-4">AI Analysis Report</h4>
                  <p className="text-white/80 leading-relaxed font-mono text-sm bg-white/5 p-4 rounded border border-white/10">
                    {result.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.reasons?.map((reason: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-white/5 rounded border border-white/5">
                      <ChevronRight className="w-4 h-4 text-cyber-green mt-0.5" />
                      <span className="text-xs text-white/60 uppercase tracking-wide">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" size="sm" className="space-x-2">
                  <Copy className="w-4 h-4" /> <span>Copy Report</span>
                </Button>
                <Button variant="outline" size="sm" className="space-x-2">
                  <Download className="w-4 h-4" /> <span>Download</span>
                </Button>
              </div>
            </CyberCard>

            {/* Sidebar Details */}
            <div className="space-y-8">
              <CyberCard variant="blue" title="Domain Intelligence">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Registrar</span>
                    <span className="text-white font-mono">{result.domainInfo?.registrar || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Domain Age</span>
                    <span className="text-white font-mono">{result.domainInfo?.age || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Created</span>
                    <span className="text-white font-mono">{result.domainInfo?.creationDate || 'N/A'}</span>
                  </div>
                </div>
              </CyberCard>

              <CyberCard variant="blue" title="Server Reputation">
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded">
                    <Globe className="w-4 h-4 text-cyber-blue" />
                    <span className="text-white/60 uppercase tracking-widest">IP:</span>
                    <span className="text-white">{result.serverInfo?.ip || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded">
                    <Database className="w-4 h-4 text-cyber-blue" />
                    <span className="text-white/60 uppercase tracking-widest">ISP:</span>
                    <span className="text-white">{result.serverInfo?.isp || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded">
                    <Cpu className="w-4 h-4 text-cyber-blue" />
                    <span className="text-white/60 uppercase tracking-widest">Country:</span>
                    <span className="text-white">{result.serverInfo?.country || 'N/A'}</span>
                  </div>
                </div>
              </CyberCard>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/20">
            <ShieldAlert className="w-16 h-16 mb-4 opacity-10" />
            <p className="uppercase tracking-widest font-black text-xs italic">Awaiting threat input for analysis...</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
