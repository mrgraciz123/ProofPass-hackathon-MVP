"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { MOCK_PASSPORT } from "@/lib/mockData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>(null);

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  const [userRole, setUserRoleState] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem("pp_role");
      if (stored) setUserRoleState(stored);
      
      const auth = localStorage.getItem("pp_auth");
      if (auth === "true") setAuthenticated(true);
    }
  }, []);

  const setRole = (role: string) => {
    setUserRoleState(role);
    if (typeof window !== 'undefined') localStorage.setItem("pp_role", role);
  };

  const login = () => {
    setAuthenticated(true);
    if (typeof window !== 'undefined') localStorage.setItem("pp_auth", "true");
  };

  const logout = () => {
    setAuthenticated(false);
    setRole("");
    if (typeof window !== 'undefined') {
      localStorage.removeItem("pp_auth");
      localStorage.removeItem("pp_role");
    }
  };

  const mockState = {
    ready: true,
    authenticated,
    user: authenticated ? { id: "mock-user", wallet: { address: MOCK_PASSPORT.walletAddress } } : null,
    login,
    logout,
    wallets: authenticated ? [{
      address: MOCK_PASSPORT.walletAddress,
      switchChain: async () => {},
      getEthereumProvider: async () => ({})
    }] : [],
    isMock: true,
    userRole,
    setRole
  };

  return (
    <AuthContext.Provider value={mockState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProviderWrapper");
  }
  return context;
}
