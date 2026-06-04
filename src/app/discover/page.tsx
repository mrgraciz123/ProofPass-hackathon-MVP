"use client";

import { useState, useEffect } from "react";
import { Shield, Code2, Search, CheckCircle2, Users, Loader2, MapPin, ExternalLink } from "lucide-react";
import { MOCK_PROFESSIONALS } from "@/lib/mockData";
import { TalentProfile } from "@/lib/matching";
import { GithubStats, fetchGithubStats } from "@/lib/github";

type Tab = "talent" | "opportunities";

type Job = {
  slug: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: number;
};

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<Tab>("talent");
  
  // Talent State
  const [profiles] = useState<TalentProfile[]>(MOCK_PROFESSIONALS);
  const [githubCache, setGithubCache] = useState<Record<string, GithubStats>>({});

  // Jobs State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  
  // Filters
  const [skillFilter, setSkillFilter] = useState("");
  const [minTrustScore, setMinTrustScore] = useState(0);

  useEffect(() => {
    const fetchAllGithub = async () => {
      const newCache = { ...githubCache };
      for (const p of MOCK_PROFESSIONALS) {
        if (p.githubUsername && !newCache[p.githubUsername]) {
          try {
            const data = await fetchGithubStats(p.githubUsername);
            newCache[p.githubUsername] = data;
          } catch {}
        }
      }
      setGithubCache(newCache);
    };
    if (activeTab === "talent") fetchAllGithub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "opportunities" && jobs.length === 0) {
      setJobsLoading(true);
      fetch("https://www.arbeitnow.com/api/job-board-api")
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setJobs(data.data.slice(0, 20)); // Just first 20 for demo
          }
        })
        .catch(console.error)
        .finally(() => setJobsLoading(false));
    }
  }, [activeTab, jobs.length]);

  const filteredProfiles = profiles.filter(p => {
    if (skillFilter && !p.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))) return false;
    if (p.score < minTrustScore) return false;
    return true;
  });

  const getRequiredTrustScore = (jobTitle: string) => {
    const title = jobTitle.toLowerCase();
    if (title.includes("senior") || title.includes("lead") || title.includes("staff")) return 85;
    if (title.includes("engineer") || title.includes("developer")) return 75;
    return 60;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col text-slate-300 selection:bg-indigo-500/30">
      
      {/* ── Demo Header ── */}
      <div className="bg-[#0a0a0a] border-b border-white/5 py-3">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-black text-white flex items-center gap-2">
               <Search className="h-5 w-5 text-indigo-400" />
               Discovery Network
             </h1>
             <span className="inline-flex items-center gap-1 rounded bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 text-[10px] font-extrabold text-indigo-400 uppercase tracking-[0.2em] hidden md:flex">
                UGF Active
             </span>
          </div>

          <div className="flex items-center bg-[#111111] border border-white/5 p-1 rounded-xl">
             <button 
               onClick={() => setActiveTab("talent")}
               className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-colors ${activeTab === "talent" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
             >
               <Users className="h-4 w-4" /> Recruiter View
             </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl flex-1 flex flex-col md:flex-row gap-8">
        
        {/* ── Left Sidebar: Filters ── */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-5 shadow-xl transition-all duration-300 hover:border-white/10">
            <h2 className="font-black text-white mb-6 uppercase tracking-[0.2em] text-xs">
              Filter {activeTab === "talent" ? "Talent" : "Jobs"}
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Code2 className="h-3 w-3" /> Skill</label>
                <input 
                  type="text" 
                  placeholder="e.g. React, Java" 
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full text-sm rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-600 transition-colors"
                />
              </div>

              {activeTab === "talent" && (
                <div>
                  <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Min Trust</span>
                    <span>{minTrustScore}</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={minTrustScore}
                    onChange={(e) => setMinTrustScore(parseInt(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Main Area: Results ── */}
        <div className="flex-1 space-y-4">
          
          {activeTab === "talent" ? (
            <>
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-white">Candidates <span className="text-slate-500 font-normal">({filteredProfiles.length})</span></h2>
              </div>

              <div className="flex flex-col gap-4">
                {filteredProfiles.map(p => {
                  const gh = p.githubUsername ? githubCache[p.githubUsername] : null;
                  
                  return (
                    <div key={p.id} className="bg-black border-b border-white/5 p-6 hover:bg-white/[0.02] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                      
                      {/* Left: Identity */}
                      <div className="flex items-center gap-6 md:w-1/3">
                        <div className="w-12 h-12 rounded bg-white flex items-center justify-center font-black text-xl text-black shrink-0">
                          {gh ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={`https://avatars.githubusercontent.com/${p.githubUsername}`} alt={p.name} className="w-full h-full object-cover rounded" />
                          ) : p.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white leading-tight mb-0.5">{p.name}</h3>
                          <p className="text-xs font-bold text-slate-400">{p.role}</p>
                        </div>
                      </div>

                      {/* Middle: Metrics */}
                      <div className="flex items-center gap-12 md:w-1/3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Trust Score</p>
                          <p className="text-xl font-black text-white flex items-center gap-1.5">{p.score}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Verified</p>
                          <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" /> {p.credentials} Orgs
                          </p>
                        </div>
                      </div>

                      {/* Right: GitHub & Skills */}
                      <div className="flex flex-col md:items-end gap-3 md:w-1/3">
                        <div className="flex gap-2">
                          {p.skills.slice(0, 3).map(s => (
                            <span key={s} className="px-2 py-1 bg-white/5 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded border border-white/10">
                              {s}
                            </span>
                          ))}
                        </div>
                        {gh ? (
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <Code2 className="h-3 w-3" /> {gh.total_stars} GitHub Stars
                          </div>
                        ) : (
                          <div className="text-xs font-bold text-slate-600">Unverified GitHub</div>
                        )}
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
               <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-white">Live Opportunities <span className="text-slate-500 font-normal">({jobsLoading ? '...' : jobs.length})</span></h2>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                   Powered by Arbeitnow API
                </span>
              </div>

              {jobsLoading ? (
                <div className="flex flex-col items-center justify-center p-20 text-slate-500 space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                  <p>Fetching real job postings...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 text-slate-500 space-y-4">
                  <p>No jobs found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.filter(j => {
                    if (skillFilter && !j.title.toLowerCase().includes(skillFilter.toLowerCase()) && !j.description.toLowerCase().includes(skillFilter.toLowerCase())) return false;
                    return true;
                  }).map(job => (
                    <div key={job.slug} className="bg-zinc-950 rounded-2xl border border-white/10 p-6 shadow-xl hover:border-indigo-500/50 transition-colors group flex flex-col md:flex-row gap-6">
                       
                       <div className="flex-1">
                         <div className="flex flex-wrap items-center gap-2 mb-3">
                           <span className="inline-flex rounded bg-white/10 px-2 py-1 text-[10px] font-black text-white uppercase tracking-wider border border-white/10">
                             {job.company_name}
                           </span>
                           {job.remote && (
                             <span className="inline-flex rounded bg-emerald-500/10 px-2 py-1 text-[10px] font-black text-emerald-400 uppercase tracking-wider border border-emerald-500/20">
                               Remote
                             </span>
                           )}
                         </div>

                         <h3 className="text-xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                         <p className="text-sm font-medium text-slate-400 flex items-center gap-1.5 mb-4">
                           <MapPin className="h-4 w-4" /> {job.location || "Global"}
                         </p>

                         <div className="flex flex-wrap gap-2">
                           {job.tags.slice(0, 5).map(tag => (
                             <span key={tag} className="px-2 py-1 bg-white/5 text-slate-300 text-xs font-bold rounded border border-white/10">
                               {tag}
                             </span>
                           ))}
                         </div>
                       </div>

                       <div className="md:w-48 shrink-0 flex flex-col justify-between items-start md:items-end md:text-right gap-4 md:border-l border-white/10 md:pl-6">
                         <div>
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center md:justify-end gap-1"><Shield className="h-3 w-3" /> Required Trust</p>
                           <p className="text-3xl font-black text-indigo-400">
                             {getRequiredTrustScore(job.title)}
                           </p>
                           <p className="text-xs text-slate-500 mt-1">out of 100</p>
                         </div>
                         
                         <a href={job.url} target="_blank" rel="noreferrer" className="w-full text-center inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-600 transition-colors group-hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                           Apply <ExternalLink className="h-3.5 w-3.5" />
                         </a>
                       </div>

                    </div>
                  ))}
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  );
}
