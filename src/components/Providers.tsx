"use client";

import { AuthProviderWrapper } from "@/lib/auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProviderWrapper>
      {children}
    </AuthProviderWrapper>
  );
}
