"use client";

import { MOCK_MATCHES } from "@/lib/mockData";
import { MessageCircle, MoreHorizontal, Building2, User } from "lucide-react";

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container px-4 md:px-8 mx-auto py-8 max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Matches</h1>
          <p className="text-slate-500 mt-2">Mutual interest between your verified profile and top opportunities.</p>
        </div>

        {/* Matches List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {MOCK_MATCHES.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {MOCK_MATCHES.map((match) => (
                <div key={match.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-5 hover:bg-slate-50 transition-colors">
                  
                  {/* Avatar / Logo */}
                  <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold ${
                    match.entityType === 'job' 
                      ? 'bg-blue-100 text-primary' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {match.entity.image}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-slate-900 truncate">{match.entity.name}</h3>
                      {match.status === 'new' && (
                        <span className="shrink-0 inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                          New Match
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 mb-2 truncate">
                      {match.entityType === 'job' ? <Building2 className="h-4 w-4 shrink-0" /> : <User className="h-4 w-4 shrink-0" />}
                      {match.entity.subtitle}
                    </div>
                    <p className="text-xs text-slate-400">Matched {match.matchedAt}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </button>
                    <button className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No matches yet</h3>
              <p className="text-slate-500">Keep browsing on the Discover page to find top talent.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
