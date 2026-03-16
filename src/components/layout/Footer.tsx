import Link from "next/link";
import { Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-cyber-green" />
              <span className="text-xl font-black text-white italic uppercase tracking-tighter">
                SafeLink <span className="text-cyber-green">AI</span>
              </span>
            </div>
            <p className="text-white/40 text-sm max-w-xs text-center md:text-left">
              AI-Powered Cybersecurity Protection Against Phishing and Malicious Links.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm uppercase tracking-widest font-bold">
            <div className="flex flex-col space-y-4">
              <h4 className="text-cyber-green">Platform</h4>
              <Link href="/analyzer" className="text-white/60 hover:text-white">Analyzer</Link>
              <Link href="/how-it-works" className="text-white/60 hover:text-white">How It Works</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-cyber-green">Resources</h4>
              <a href="#" className="text-white/60 hover:text-white">GitHub</a>
              <a href="#" className="text-white/60 hover:text-white">API Docs</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-cyber-green">Company</h4>
              <Link href="/about" className="text-white/60 hover:text-white">About</Link>
              <Link href="/contact" className="text-white/60 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
          <p>© 2026 SAFELINK AI. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <p>Cybersecurity Hackathon Project</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
