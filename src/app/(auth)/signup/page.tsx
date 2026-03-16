"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldPlus, User, Mail, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CyberCard } from "@/components/ui/CyberCard";
import { toast } from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Credential created. Redirecting...");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to create account.");
      }
    } catch (error) {
      toast.error("Critical error during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <CyberCard variant="blue" title="Operator Registration">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="flex flex-col items-center space-y-2 mb-8">
                <ShieldPlus className="w-12 h-12 text-cyber-blue" />
                <h3 className="text-xl font-black uppercase tracking-[0.2em] italic">New Account</h3>
              </div>

              <Input 
                label="Full Name" 
                placeholder="Cypher Neo"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input 
                label="Email Address" 
                placeholder="user@encrypted.com"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input 
                label="Set Access Key" 
                placeholder="••••••••"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <Button 
                variant="secondary" 
                className="w-full space-x-2" 
                type="submit"
                disabled={isLoading}
              >
                <span>Initialize Identity</span>
                <Zap className="w-4 h-4" />
              </Button>

              <div className="text-center pt-4">
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                  Already Verified? <Link href="/login" className="text-cyber-blue hover:underline">Access Gateway</Link>
                </p>
              </div>
            </form>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
}
