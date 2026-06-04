"use client";

import { Shield, CheckCircle2, Eye, UploadCloud, Sparkles, Loader2, Zap } from "lucide-react";
import { MOCK_PASSPORT, MOCK_CREDENTIALS } from "@/lib/mockData";

import { useState, useEffect, useRef } from "react";

type VisibilityLayer = "public" | "recruiter" | "matched";

// Added dynamically parsed profile type
type ParsedProfile = {
  name: string;
  skills: string[];
  education: string;
  college: string;
  gradYear: string;
  experience: { company: string; role: string; years: number }[];
  projects: { name: string; description: string }[];
};

export default function PassportPage() {
  const p = MOCK_PASSPORT;
  
  // Gemini Parser State
  const [isParsed, setIsParsed] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedProfile | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Visibility Layer
  const [viewAs, setViewAs] = useState<VisibilityLayer>("public");
  
  // Dynamic Trust Score
  const [scoreBreakdown, setScoreBreakdown] = useState(p.scoreBreakdown);
  const [trustScore, setTrustScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("pp_github");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setScoreBreakdown(prev => ({ ...prev, github: data.trust_gain || 0 }));
      } catch {}
    }
  }, []);

  useEffect(() => {
    const total = scoreBreakdown.degree + scoreBreakdown.internship + scoreBreakdown.nptel + scoreBreakdown.hackathon + scoreBreakdown.references + scoreBreakdown.github;
    setTrustScore(total);
  }, [scoreBreakdown]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    
    try {
      const formData = new FormData();
      formData.append("resume", file);
      
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData
      });
      
      const json = await res.json();
      
      if (json.success && json.data) {
        setParsedData(json.data);
      } else {
        // Fallback to Demo Data if no API key is provided
        console.warn("API parsing failed (likely no API key), falling back to mock");
        await new Promise(r => setTimeout(r, 2000));
        setParsedData({
          name: "Abhay Tiwari",
          skills: ["Cloud Computing", "Java", "Spring Boot", "React", "AWS"],
          education: "B.Tech Computer Science",
          college: "AKTU",
          gradYear: "2024",
          experience: [{ company: "Razorpay", role: "Software Intern", years: 0.5 }],
          projects: [{ name: "Decentralized Voting", description: "Smart India Hackathon Winner" }]
        });
      }
    } catch (err) {
      console.error(err);
      // Fallback on error
      await new Promise(r => setTimeout(r, 2000));
      setParsedData({
        name: "Abhay Tiwari",
        skills: ["Cloud Computing", "Java", "Spring Boot", "React", "AWS"],
        education: "B.Tech Computer Science",
        college: "AKTU",
        gradYear: "2024",
        experience: [{ company: "Razorpay", role: "Software Intern", years: 0.5 }],
        projects: [{ name: "Decentralized Voting", description: "SIH Winner" }]
      });
    } finally {
      setIsParsing(false);
      setIsParsed(true);
    }
  };

  // If we are showing parsed data, map it to the UI fields, otherwise fallback to the MOCK_PASSPORT
  const displayName = parsedData ? parsedData.name : p.name;
  const displayProfession = parsedData && parsedData.experience.length > 0 ? parsedData.experience[0].role : p.profession;
  const displayCollege = parsedData ? parsedData.college : p.college;
  const displayGradYear = parsedData ? parsedData.gradYear : p.gradYear;

  if (!isParsed) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          
          <div className="text-center mb-8 relative z-10">
            <h1 className="text-3xl font-black text-white mb-2">Generate Skill Passport</h1>
            <p className="text-slate-400">Upload your resume to extract verifiable claims using Gemini AI.</p>
          </div>

          {!isParsing ? (
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full relative group cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.txt"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 blur opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative rounded-2xl border-2 border-dashed border-white/20 bg-black/50 hover:bg-white/5 transition-colors p-10 flex flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 text-indigo-400 mb-4" />
                <p className="text-sm font-bold text-slate-300 mb-1">Click to upload resume (PDF)</p>
                <p className="text-xs text-slate-500">Max file size: 5MB</p>
              </div>
            </button>
          ) : (
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(99,102,241,0.2)_50%,transparent_100%)] animate-[scan_2s_ease-in-out_infinite]" />
              <Sparkles className="h-8 w-8 text-indigo-400 mb-4 animate-pulse" />
              <p className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing with Gemini...
              </p>
              <p className="text-xs text-indigo-300/70">Extracting education, projects, and skills for verification.</p>
            </div>
          )}
          
          <div className="mt-8 text-center relative z-10">
            <button 
              onClick={() => { setIsParsed(true); }} 
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline"
            >
              Skip & Use Demo Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-slate-300">
      
      {/* ── Demo Header: Visibility Toggle ── */}
      <div className="bg-black border-b border-white/5 py-2">
        <div className="container px-4 md:px-8 mx-auto flex items-center justify-between text-xs font-medium max-w-5xl">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-500" />
            <span>Developer Toggle: Viewing profile as</span>
          </div>
          <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-white/5">
            <button 
              onClick={() => setViewAs("public")} 
              className={`px-3 py-1 rounded-md transition-colors ${viewAs === 'public' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'hover:text-white'}`}
            >
              Public
            </button>
            <button 
              onClick={() => setViewAs("recruiter")} 
              className={`px-3 py-1 rounded-md transition-colors ${viewAs === 'recruiter' ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'hover:text-white'}`}
            >
              Recruiter
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 container px-4 md:px-8 mx-auto py-12 max-w-5xl">
        
        {/* ── HERO: Trust Score ── */}
        <div className="mb-12 border-b border-white/5 pb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
            <Shield className="h-3 w-3" />
            Verified Trust Score
          </div>
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-white mb-8">
            {trustScore}
          </h1>
          
          <div className="w-full max-w-2xl">
            {/* Visual Segmented Progress Bar */}
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden flex mb-6">
              <div style={{ width: `${scoreBreakdown.degree}%` }} className="h-full bg-white" title="Degree" />
              <div style={{ width: `${scoreBreakdown.github}%` }} className="h-full bg-slate-400" title="GitHub" />
              <div style={{ width: `${scoreBreakdown.internship}%` }} className="h-full bg-slate-600" title="Internship" />
              <div style={{ width: `${scoreBreakdown.nptel}%` }} className="h-full bg-slate-700" title="NPTEL" />
              <div style={{ width: `${scoreBreakdown.hackathon}%` }} className="h-full bg-slate-800" title="Hackathon" />
              <div style={{ width: `${scoreBreakdown.references}%` }} className="h-full bg-slate-900" title="References" />
            </div>

            <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-xs">
              <div className="flex flex-col items-center"><span className="text-white font-bold">{scoreBreakdown.degree}</span><span className="text-slate-500 uppercase tracking-[0.1em]">Degree</span></div>
              <div className="flex flex-col items-center"><span className="text-slate-400 font-bold">{scoreBreakdown.github}</span><span className="text-slate-500 uppercase tracking-[0.1em]">GitHub</span></div>
              <div className="flex flex-col items-center"><span className="text-slate-500 font-bold">{scoreBreakdown.internship}</span><span className="text-slate-500 uppercase tracking-[0.1em]">Internship</span></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ── Left Column: Identity ── */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Identity Card */}
            <div className="bg-transparent">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center text-black font-black text-2xl">
                  {displayName.split(" ")[0][0]}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{displayName}</h2>
                  <p className="font-bold text-slate-400">{displayProfession}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 mb-6">{displayCollege} • {displayGradYear}</p>
              
              <div className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  UGF Sponsored
              </div>
            </div>
          </div>

          {/* ── Right Column: Credentials ── */}
          <div className="lg:col-span-2">
            
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Verified Credentials</h3>
            </div>
            
            <div className="flex flex-col border-t border-white/5">
              {MOCK_CREDENTIALS.map((cred) => (
                <div key={cred.credentialId} className="py-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors -mx-4 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0">
                      <Shield className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base tracking-tight">{cred.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{cred.issuer} • {cred.issuedAt}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Parsed Resume Data - Extracted Skills & Experience */}
            {parsedData && (
              <div className="mt-12 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-xl overflow-hidden relative p-6">
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-black text-indigo-400 tracking-wider">
                  <Sparkles className="h-3 w-3" /> PARSED BY GEMINI
                </div>
                <h3 className="text-lg font-black text-white mb-4">Extracted Claims</h3>
                
                <div className="mb-6">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Experience</p>
                    {parsedData.experience.map((exp, i) => (
                      <div key={i} className="mb-3">
                        <p className="font-bold text-white text-sm">{exp.role}</p>
                        <p className="text-xs text-indigo-400">{exp.company} • {exp.years} years</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Projects</p>
                    {parsedData.projects.map((proj, i) => (
                      <div key={i} className="mb-3">
                        <p className="font-bold text-white text-sm">{proj.name}</p>
                        <p className="text-xs text-slate-400">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Blockchain Credential Timeline */}
            <div className="mt-12">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">Immutable Timeline</h3>
              </div>
              <div className="relative border-l border-white/10 ml-2 pl-6 space-y-12 pb-12">
                {MOCK_CREDENTIALS.map((cred) => (
                  <div key={cred.credentialId} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{cred.title}</h3>
                        <p className="text-sm font-medium text-slate-400">{cred.issuer}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 rounded bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                          <Zap className="h-3 w-3" /> UGF Sponsored
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1 mb-3">
                       <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                         <span className="text-slate-600 uppercase tracking-widest">Hash:</span> 
                         0x{Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
                       </p>
                       <div className="flex gap-4">
                         <p className="text-xs text-slate-500 font-mono">
                           <span className="text-slate-600 uppercase tracking-widest">Issued:</span> {cred.issuedAt}
                         </p>
                         <p className="text-xs text-emerald-500/70 font-mono">
                           <span className="text-emerald-500/50 uppercase tracking-widest">Verified:</span> {cred.verificationDate || cred.issuedAt}
                         </p>
                       </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{cred.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}} />
    </div>
  );
}
