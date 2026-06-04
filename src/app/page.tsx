import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Shield,
  GraduationCap, Building, Zap, UploadCloud, Database, Target
} from "lucide-react";
import React from "react";

const TRUSTED_BY = [
  "IIT Delhi", "TCS", "IIT Bombay", "Infosys", "NIT Trichy",
  "Zoho", "IIIT Hyderabad", "PhonePe", "Razorpay", "CRED",
  "IIT Delhi", "TCS", "IIT Bombay", "Infosys", "NIT Trichy",
  "Zoho", "IIIT Hyderabad", "PhonePe", "Razorpay", "CRED",
];

const AUDIENCES = [
  {
    icon: <GraduationCap className="h-6 w-6 text-indigo-400" />,
    title: "Students",
    desc: "Generate an On-Chain Skill Passport and prove your worth to top startups."
  },
  {
    icon: <Building className="h-6 w-6 text-indigo-400" />,
    title: "Recruiters",
    desc: "Hire verified talent with 0% noise. Every credential and internship is on-chain."
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-400" />,
    title: "Colleges",
    desc: "Issue gasless, verifiable degrees and NPTEL certifications to students instantly."
  },
  {
    icon: <Zap className="h-6 w-6 text-indigo-400" />,
    title: "Startups",
    desc: "Discover hackers and builders by filtering verified GitHub activity and Hackathon wins."
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-100 font-sans selection:bg-indigo-500/30">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-24 border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />

        <div className="relative container px-4 md:px-8 mx-auto max-w-5xl text-center pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold text-white mb-8 uppercase tracking-[0.2em] border-b border-indigo-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Sponsored by Universal Gas Framework (UGF)
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
            India&apos;s First <br/>
            On-Chain Skill Passport
          </h1>

          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Verify skills. Discover talent. Hire with trust. Say goodbye to fake resumes and keyword filtering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/passport"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-slate-200"
            >
              Generate Passport
            </Link>
            <Link
              href="/discover"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/5"
            >
              Hire Verified Talent
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUSTED BY MARQUEE
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 border-b border-white/5 bg-white/[0.01] overflow-hidden">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-6">
          Credentials verified across the ecosystem
        </p>
        <div className="flex flex-nowrap gap-14" style={{ animation: "marquee 35s linear infinite", width: "200%" }}>
          {TRUSTED_BY.map((name, i) => (
            <span key={i} className="shrink-0 text-sm font-bold text-slate-400 hover:text-white transition-colors whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          THE UGF ADVANTAGE & HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 border-b border-white/5 relative overflow-hidden bg-black">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
        
        <div className="container px-4 md:px-8 mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">The UGF Advantage</h2>
             <p className="text-lg text-slate-400 max-w-2xl mx-auto">
               We completely abstracted the blockchain. No wallets. No gas fees. No crypto jargon. Just instant, verifiable trust.
             </p>
          </div>

          {/* Before vs After */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
             <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 relative overflow-hidden">
               <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6">Before UGF</h3>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-slate-300 font-medium">
                   <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">✕</div>
                   Need a Crypto Wallet
                 </li>
                 <li className="flex items-center gap-3 text-slate-300 font-medium">
                   <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">✕</div>
                   Pay Gas Fees
                 </li>
                 <li className="flex items-center gap-3 text-slate-300 font-medium">
                   <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">✕</div>
                   Understand Blockchain Tech
                 </li>
               </ul>
             </div>
             <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
               <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4" /> After UGF
               </h3>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3 text-white font-black text-lg">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">1</div>
                   Upload
                 </li>
                 <li className="flex items-center gap-3 text-white font-black text-lg">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">2</div>
                   Verify
                 </li>
                 <li className="flex items-center gap-3 text-white font-black text-lg">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">3</div>
                   Done
                 </li>
               </ul>
             </div>
          </div>

          {/* How UGF Works Flow */}
          <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12 text-center transition-all duration-300 hover:border-white/10">
            <h3 className="text-xl font-black text-white mb-12 tracking-tighter">How UGF Works Under the Hood</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative">
               {/* Connecting lines for desktop */}
               <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-indigo-500/20 -z-10 -translate-y-1/2" />
               
               <div className="bg-black border border-indigo-500/20 rounded-2xl p-4 w-full md:w-40 relative shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-500/40">
                 <UploadCloud className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                 <p className="text-xs font-bold text-white">Student Uploads</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1">Credential</p>
               </div>

               <ArrowRight className="h-4 w-4 text-indigo-500/50 md:hidden" />

               <div className="bg-black border border-indigo-500/20 rounded-2xl p-4 w-full md:w-40 relative shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-500/40">
                 <Shield className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                 <p className="text-xs font-bold text-white">Verification</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1">Requested</p>
               </div>

               <ArrowRight className="h-4 w-4 text-indigo-500/50 md:hidden" />

               <div className="bg-indigo-600 border border-indigo-400/50 rounded-2xl p-4 w-full md:w-40 relative shadow-[0_0_25px_rgba(79,70,229,0.3)] transition-all duration-300 hover:scale-110">
                 <Zap className="h-6 w-6 text-white mx-auto mb-2" />
                 <p className="text-xs font-black text-white tracking-tight">UGF Sponsors</p>
                 <p className="text-[10px] text-indigo-200 uppercase tracking-[0.2em] mt-1">Transaction</p>
               </div>

               <ArrowRight className="h-4 w-4 text-indigo-500/50 md:hidden" />

               <div className="bg-black border border-indigo-500/20 rounded-2xl p-4 w-full md:w-40 relative shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-500/40">
                 <Database className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
                 <p className="text-xs font-bold text-white">Credential Stored</p>
                 <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1">On-Chain</p>
               </div>

               <ArrowRight className="h-4 w-4 text-indigo-500/50 md:hidden" />

               <div className="bg-black border border-indigo-500/20 rounded-2xl p-4 w-full md:w-40 relative shadow-lg transition-all duration-300 hover:scale-105 hover:border-emerald-500/40">
                 <Target className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                 <p className="text-xs font-bold text-white">Trust Score</p>
                 <p className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] mt-1">Updated</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AUDIENCE GRID
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-black">
        <div className="container px-4 md:px-8 mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
              Built for the ecosystem.
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">Everything you need to discover and prove talent with complete cryptographic certainty.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {AUDIENCES.map((a, i) => (
              <div key={i} className="bg-black p-10 hover:bg-white/[0.02] transition-colors">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded bg-white/5 border border-white/10">
                  {a.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{a.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="container px-4 md:px-8 mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white font-bold text-[10px]">PP</div>
            <span className="font-bold text-white tracking-tight">ProofPass</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            Powered by the Universal Gas Framework
          </p>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
