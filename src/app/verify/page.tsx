"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, Shield, GitBranch, Loader2, Zap, Database } from "lucide-react";
import { MOCK_CREDENTIALS } from "@/lib/mockData";
import { fetchGithubStats, GithubStats } from "@/lib/github";

export default function VerifyPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "integrations" | "status">("upload");
  const [submitted, setSubmitted] = useState(false);
  
  // GitHub Integration State
  const [githubUsername, setGithubUsername] = useState("");
  const [githubStatus, setGithubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [githubData, setGithubData] = useState<GithubStats | null>(null);

  // Form State
  const [credType, setCredType] = useState("");
  const [credTitle, setCredTitle] = useState("");
  const [credIssuer, setCredIssuer] = useState("");

  const autofillDemo = (type: string, title: string, issuer: string) => {
    setCredType(type);
    setCredTitle(title);
    setCredIssuer(issuer);
  };

  const handleGithubConnect = async () => {
    if (!githubUsername) return;
    setGithubStatus("loading");
    
    try {
      const data = await fetchGithubStats(githubUsername);
      setGithubData(data);
      setGithubStatus("success");
      localStorage.setItem("pp_github", JSON.stringify(data));
    } catch {
      setGithubStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 flex flex-col">
      
      {/* ── Header ── */}
      <div className="bg-zinc-950 border-b border-white/10">
        <div className="container px-4 md:px-8 mx-auto py-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400 mb-6 uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            Sponsored Verification • Zero Gas Fees
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">On-Chain Verification</h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Submit your credentials to be verified and permanently recorded on the blockchain via Universal Gas Framework.
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 mx-auto py-10 max-w-4xl flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-6 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-4 text-sm font-bold transition-colors relative ${
              activeTab === "upload" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Manual Upload
            {activeTab === "upload" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
          </button>
          <button
            onClick={() => setActiveTab("integrations")}
            className={`pb-4 text-sm font-bold transition-colors relative ${
              activeTab === "integrations" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Live Integrations
            {activeTab === "integrations" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`pb-4 text-sm font-bold transition-colors relative ${
              activeTab === "status" ? "text-indigo-400" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            Verification Timeline
            {activeTab === "status" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500" />}
          </button>
        </div>

        {activeTab === "upload" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {submitted ? (
                <div className="bg-black border border-white/5 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 rounded bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Credential Verified</h3>
                  
                  {/* Explorer-Style Transaction Receipt */}
                  <div className="w-full max-w-xl mx-auto bg-black border border-white/10 overflow-hidden mb-8 shadow-2xl font-mono">
                    
                    {/* Header */}
                    <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Transaction Receipt</span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        Success
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4 text-sm text-left">
                      
                      <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                        <div className="col-span-1 text-slate-500 font-medium">Verification ID</div>
                        <div className="col-span-2 text-slate-300 font-mono text-xs break-all">
                          {Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                        <div className="col-span-1 text-slate-500 font-medium">Credential Hash</div>
                        <div className="col-span-2 flex items-center gap-2">
                          <span className="text-indigo-400 font-mono text-xs truncate w-48">
                            0x{Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                          </span>
                          <button 
                            className="p-1 hover:bg-white/10 rounded transition-colors text-slate-500 hover:text-white"
                            onClick={(e) => {
                              const target = e.currentTarget;
                              target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                              setTimeout(() => {
                                target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
                              }, 2000);
                            }}
                            title="Copy Hash"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                        <div className="col-span-1 text-slate-500 font-medium">Block Number</div>
                        <div className="col-span-2 text-slate-300 font-mono text-xs flex items-center gap-2">
                          {Math.floor(Math.random() * 1000000) + 18000000}
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                        <div className="col-span-1 text-slate-500 font-medium">Timestamp</div>
                        <div className="col-span-2 text-slate-300 flex items-center gap-2 text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          Just now (Confirmed)
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 border-b border-white/5 pb-4">
                        <div className="col-span-1 text-slate-500 font-medium">Network</div>
                        <div className="col-span-2 text-slate-300 text-xs flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-[#13111C] flex items-center justify-center border border-[#3A3353]">
                            <svg className="w-2.5 h-2.5 text-[#8A71F6]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l-12 24 12-7 12 7-12-24z"/></svg>
                          </div>
                          Polygon POS
                        </div>
                      </div>

                      {/* Financials / UGF block */}
                      <div className="bg-white/[0.02] border-t border-white/10 p-4 mt-4 text-xs font-mono">
                        <div className="grid grid-cols-3 gap-4 mb-2">
                          <div className="col-span-1 text-slate-500 uppercase tracking-widest">Est. Network Fee</div>
                          <div className="col-span-2 text-slate-400 line-through">0.0042 MATIC (₹24.50)</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-3">
                          <div className="col-span-1 text-slate-500 uppercase tracking-widest">Sponsored By</div>
                          <div className="col-span-2 text-indigo-400 font-bold flex items-center gap-1">
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                            </span> UGF
                          </div>
                        </div>
                        <div className="border-t border-dashed border-white/20 pt-3 flex items-center justify-between mt-3">
                          <span className="text-white font-bold uppercase tracking-widest">User Cost</span>
                          <span className="text-white font-bold">₹0.00</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <button 
                    onClick={() => setSubmitted(false)}
                    className="rounded bg-white px-6 py-3 text-sm font-bold text-black hover:bg-slate-200 transition-colors uppercase tracking-widest"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <div className="bg-black p-6 relative overflow-hidden transition-all duration-300">
                  <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase">
                    USER COST = ₹0.00
                  </div>
                  
                  <form className="space-y-6 pt-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                    {/* Fast Demo Mode */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6 transition-colors hover:border-indigo-500/40">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3">Fast Demo Autofill</p>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => autofillDemo("Degree (B.Tech / M.Tech)", "B.Tech Computer Science", "AKTU")} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white hover:bg-white/10 transition-colors">
                          Demo Degree
                        </button>
                        <button type="button" onClick={() => autofillDemo("Internship Record", "Software Engineering Intern", "Razorpay")} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white hover:bg-white/10 transition-colors">
                          Demo Internship
                        </button>
                        <button type="button" onClick={() => autofillDemo("Certification (NPTEL)", "Cloud Computing", "NPTEL")} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded text-xs font-bold text-white hover:bg-white/10 transition-colors">
                          Demo NPTEL
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Credential Type</label>
                      <select 
                        value={credType}
                        onChange={(e) => setCredType(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 [&>option]:bg-zinc-900"
                      >
                        <option value="">Select type...</option>
                        <option value="Degree (B.Tech / M.Tech)">Degree (B.Tech / M.Tech)</option>
                        <option value="Certification (NPTEL)">Certification (NPTEL)</option>
                        <option value="Internship Record">Internship Record</option>
                        <option value="Hackathon Winner">Hackathon Winner</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                        <input 
                          type="text" 
                          value={credTitle}
                          onChange={(e) => setCredTitle(e.target.value)}
                          placeholder="e.g. B.Tech Computer Science" 
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Issuer</label>
                        <input 
                          type="text" 
                          value={credIssuer}
                          onChange={(e) => setCredIssuer(e.target.value)}
                          placeholder="e.g. IIT Delhi" 
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Supporting Document</label>
                      <div className="rounded-xl border-2 border-dashed border-white/10 p-8 text-center hover:bg-white/5 transition-colors cursor-pointer bg-white/[0.02]">
                        <UploadCloud className="mx-auto h-10 w-10 text-slate-600 mb-3" />
                        <p className="text-sm font-bold text-slate-300 mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500">PDF, PNG, or JPG (max. 10MB)</p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button type="submit" className="rounded-xl bg-indigo-600 px-8 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.2)] flex items-center gap-2">
                        Mint to Blockchain
                        <span className="inline-flex items-center gap-1 rounded bg-black/30 border border-black/10 px-1.5 py-0.5 text-[10px] font-extrabold text-white uppercase tracking-wider">UGF Sponsored</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-zinc-950 shadow-xl overflow-hidden relative">
                <div className="bg-white/5 px-5 py-4 border-b border-white/5">
                  <h3 className="font-black text-white text-sm">Trust Mechanics</h3>
                </div>
                <div className="p-5 space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    ProofPass abstract away all gas fees. When an institution approves your credential, they sign a transaction that is forwarded and paid for by the <strong className="text-white">Universal Gas Framework</strong>.
                  </p>
                  <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
                     <p className="text-xs font-bold text-indigo-400 mb-1">Impact</p>
                     <p className="text-sm text-indigo-200 leading-relaxed">
                       Highly verified credentials directly impact your Match % on Recruiter Dashboards.
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "integrations" && (
          <div className="max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-xl mb-6 relative">
              <div className="absolute top-4 right-4 bg-indigo-500/10 border border-indigo-500/30 px-2 py-1 rounded text-[10px] font-black text-indigo-400 tracking-wider">
                UGF SPONSORED
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
                  <GitBranch className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    GitHub Connect
                  </h3>
                  <p className="text-sm text-slate-400">Verify your open source contributions entirely on-chain.</p>
                </div>
              </div>
              
              {githubStatus === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                    <h4 className="font-black text-white text-lg">GitHub Verified On-Chain</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black/50 rounded-lg border border-emerald-500/20 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Repos</p>
                      <p className="text-xl font-black text-white">{githubData?.public_repos}</p>
                    </div>
                    <div className="bg-black/50 rounded-lg border border-emerald-500/20 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Stars</p>
                      <p className="text-xl font-black text-white">{githubData?.total_stars}</p>
                    </div>
                    <div className="bg-black/50 rounded-lg border border-emerald-500/20 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Age</p>
                      <p className="text-xl font-black text-white">{githubData?.account_age_years} yrs</p>
                    </div>
                    <div className="bg-black/50 rounded-lg border border-emerald-500/20 p-3 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Trust Gain</p>
                      <p className="text-xl font-black text-white">+{githubData?.trust_gain}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {setGithubStatus("idle"); setGithubUsername(""); setGithubData(null); localStorage.removeItem("pp_github");}}
                    className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    Disconnect & Burn Identity
                  </button>
                </div>
              ) : (
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">GitHub Username</label>
                    <input 
                      type="text" 
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="e.g. torvalds" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600" 
                    />
                  </div>
                  <button 
                    onClick={handleGithubConnect}
                    disabled={githubStatus === "loading" || !githubUsername}
                    className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  >
                    {githubStatus === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                    Gasless Connect
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="bg-zinc-950 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-black text-white">Immutable Timeline</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Powered by UGF</span>
            </div>
            <div className="divide-y divide-white/5">
              {MOCK_CREDENTIALS.map((cred) => (
                <div key={cred.credentialId} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-black text-white">{cred.title}</h4>
                      <p className="text-sm font-bold text-slate-400 mb-1">{cred.issuer}</p>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[10px] font-mono text-slate-500">Hash: 0x{(Math.random() * 0xffffffff).toString(16).padEnd(8, '0')}...{(Math.random() * 0xffffffff).toString(16).padEnd(8, '0')}</p>
                        <p className="text-[10px] font-mono text-slate-500">Verified: {cred.issuedAt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:text-right flex items-center md:flex-col gap-3">
                    <span className="inline-flex rounded bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                      Verified
                    </span>
                    <span className="text-xs font-bold text-indigo-400">
                      + {cred.trustScoreImpact.replace('+', '')} Score
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
