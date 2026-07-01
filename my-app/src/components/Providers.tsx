"use client";

import { RecordsProvider } from "@/context/RecordsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RecordsProvider>{children}</RecordsProvider>;
}
