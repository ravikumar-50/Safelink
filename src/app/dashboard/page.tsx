"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, History, ExternalLink, Calendar, AlertTriangle } from "lucide-react";
import { CyberCard } from "@/components/ui/CyberCard";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
  const [scans, setScans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock scans for demonstration
    const mockScans = [
      {
        _id: "1",
        inputText: "https://secure-login-bank.xyz",
        riskLevel: "DANGEROUS",
        riskScore: 92,
        scanDate: new Date().toISOString(),
      },
      {
        _id: "2",
        inputText: "Congratulations! You won a $1000 Amazon Gift Card. Click here to claim.",
        riskLevel: "SUSPICIOUS",
        riskScore: 78,
        scanDate: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        _id: "3",
        inputText: "https://github.com",
        riskLevel: "SAFE",
        riskScore: 4,
        scanDate: new Date(Date.now() - 172800000).toISOString(),
      }
    ];

    setTimeout(() => {
      setScans(mockScans);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex justify-between items-center border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
            Operator <span className="text-cyber-green">Dashboard</span>
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-bold">Registry of recent threat intelligence</p>
        </div>
        <div className="hidden md:flex space-x-4">
          <div className="px-4 py-2 bg-white/5 border border-white/10 rounded flex items-center space-x-2">
            <Shield className="w-4 h-4 text-cyber-green" />
            <span className="text-[10px] uppercase tracking-widest text-white/60 font-black">Score: 880 XP</span>
          </div>
        </div>
      </div>

      <CyberCard variant="blue" title="Scan History Log">
        {isLoading ? (
          <div className="py-20 flex justify-center text-cyber-blue animate-pulse font-mono tracking-widest uppercase italic">
            Fetching Secure Logs...
          </div>
        ) : scans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                  <th className="pb-4 pt-2 font-black">Target / Message</th>
                  <th className="pb-4 pt-2 font-black">Verdict</th>
                  <th className="pb-4 pt-2 font-black">Score</th>
                  <th className="pb-4 pt-2 font-black text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {scans.map((scan) => (
                  <tr key={scan._id} className="group hover:bg-white/5 transition-colors cursor-pointer">
                    <td className="py-4 pr-4">
                      <div className="max-w-xs md:max-w-md truncate text-white/80 group-hover:text-white">
                        {scan.inputText}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-sm text-[10px] font-black tracking-tighter uppercase ${
                        scan.riskLevel === 'DANGEROUS' ? 'bg-cyber-red/20 text-cyber-red border border-cyber-red/50' : 
                        scan.riskLevel === 'SUSPICIOUS' ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/50' : 
                        'bg-cyber-green/20 text-cyber-green border border-cyber-green/50'
                      }`}>
                        {scan.riskLevel}
                      </span>
                    </td>
                    <td className="py-4 text-white font-black">{scan.riskScore}%</td>
                    <td className="py-4 text-right text-white/40">
                      {new Date(scan.scanDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-white/20 uppercase tracking-widest italic text-xs">
            No threat data recorded in your history.
          </div>
        )}
      </CyberCard>
    </div>
  );
}
