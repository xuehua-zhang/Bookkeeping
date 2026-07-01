"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { FormData, RecordItem } from "@/types/record";

type RecordsContextValue = {
  records: RecordItem[];
  addRecord: (value: FormData) => void;
  editRecord: (id: number, value: FormData) => void;
  removeRecord: (id: number) => void;
  isInitialized: boolean;
};

const RecordsContext = createContext<RecordsContextValue | null>(null);

export function RecordsProvider({ children }: { children: React.ReactNode }) {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const addRecord = (value: FormData) => {
    const amount = Number(value.amount);
    setRecords((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: value.type,
        amount,
        category: value.category,
        date: value.date,
      },
    ]);
  };

  const editRecord = (id: number, value: FormData) => {
    const amount = Number(value.amount);
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              type: value.type,
              amount,
              category: value.category,
              date: value.date,
            }
          : r
      )
    );
  };

  const removeRecord = (id: number) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  useEffect(() => {
    const data = localStorage.getItem("records");
    if (!data) {
      setIsInitialized(true);
      return;
    }

    try {
      setRecords(JSON.parse(data));
    } catch {
      localStorage.removeItem("records");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("records", JSON.stringify(records));
  }, [records, isInitialized]);

  return (
    <RecordsContext.Provider
      value={{ records, addRecord, editRecord, removeRecord, isInitialized }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

export function useRecords() {
  const ctx = useContext(RecordsContext);
  if (!ctx) throw new Error("useRecords 必须在 RecordsProvider 内使用");
  return ctx;
}
