"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CyberCard } from "@/components/ui/CyberCard";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Invalid credentials. Access denied.");
      } else {
        toast.success("Identity verified. Welcome back.");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("Authentication system failure.");
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
          <CyberCard variant="green" title="Secure Access Gateway">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="flex flex-col items-center space-y-2 mb-8">
                <Shield className="w-12 h-12 text-cyber-green" />
                <h3 className="text-xl font-black uppercase tracking-[0.2em] italic">Encrypted Login</h3>
              </div>

              <Input 
                label="Identity (Email)" 
                placeholder="0x... or user@domain.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                label="Access Key (Password)" 
                placeholder="••••••••"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button 
                variant="primary" 
                className="w-full space-x-2" 
                type="submit"
                disabled={isLoading}
              >
                <span>Authorize</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="text-center pt-4">
                <p className="text-white/30 text-[10px] uppercase tracking-widest font-bold">
                  New Operator? <Link href="/signup" className="text-cyber-green hover:underline">Request Credentials</Link>
                </p>
              </div>
            </form>
          </CyberCard>
        </motion.div>
      </div>
    </div>
  );
}
