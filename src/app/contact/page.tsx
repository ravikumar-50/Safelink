"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter, MessageSquare, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CyberCard } from "@/components/ui/CyberCard";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
              Get in <span className="text-cyber-blue">Touch</span>
            </h1>
            <p className="text-white/40 uppercase tracking-widest font-black text-sm">
              Cybersecurity Hackathon Project Support
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Github className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-cyber-green">GitHub Repository</h4>
                <a href="#" className="text-white/40 font-mono hover:text-white transition-colors">github.com/hackathon/safelink-ai</a>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-cyber-green">Email Support</h4>
                <p className="text-white/40 font-mono">1krish1618@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-cyber-green">API Status</h4>
                <p className="text-cyber-green font-mono text-xs uppercase tracking-widest animate-pulse">All Systems Operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <CyberCard variant="blue" title="Secure Message Channel">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Handle" placeholder="anon_0x1" />
              <Input label="Email" placeholder="user@encrypted.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-cyber-blue text-sm uppercase tracking-widest font-bold">Message</label>
              <textarea 
                className="w-full bg-black/50 border-2 border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyber-blue focus:shadow-neon-blue transition-all duration-300 min-h-[150px]"
                placeholder="Transmission details..."
              />
            </div>
            <Button variant="secondary" className="w-full space-x-2">
              <MessageSquare className="w-4 h-4" /> <span>Send Signal</span>
            </Button>
          </form>
        </CyberCard>
      </div>
    </div>
  );
}
