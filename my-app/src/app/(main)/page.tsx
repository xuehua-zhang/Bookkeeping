"use client";

import RecordList from "@/components/RecordList";
import SummaryCard from "@/components/SummaryCard";
import { useRecords } from "@/context/RecordsContext";

export default function HomePage() {
  const { records } = useRecords();

  const now = new Date();
  const currentMonthRecords = records.filter((r) => {
    const d = new Date(r.date);
    return (
      d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
    );
  });

  return (
    <main className="min-h-screen bg-theme-page px-4 py-6 pb-24">
      <h1 className="mb-4 text-center text-2xl font-medium text-shadow-sm">
        个人记账本
      </h1>
      <SummaryCard records={records} />
      <RecordList records={currentMonthRecords} />
    </main>
  );
}
