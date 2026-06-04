"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";


export default function Navbar() {
  const { login, authenticated } = useAuth();

  const getNavLinks = () => {
    return [
      { href: "/passport", label: "Passport" },
      { href: "/discover", label: "Discover Talent" },
      { href: "/verify", label: "Verify Credential" },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 w-full bg-black border-b border-white/5 text-slate-300">
      <div className="container px-4 md:px-8 mx-auto h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(79,70,229,0.5)]">
            PP
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Proof<span className="text-indigo-400">Pass</span>
          </span>
        </Link>
        
        {/* Global UGF Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>UGF Active</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-bold text-slate-400 rounded-md hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {!authenticated ? (
            <button
              onClick={() => login()}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              Connect
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-slate-300">
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-md">
                AT
              </div>
              <span className="hidden md:block text-white">Abhay Tiwari</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
