"use client";

import { useRouter } from "next/navigation";
import RecordForm from "@/components/RecordForm";
import { useRecords } from "@/context/RecordsContext";

export default function AddPage() {
  const router = useRouter();
  const { addRecord } = useRecords();

  return (
    <main className="min-h-screen bg-theme-page px-4 py-6 pb-24">
      <RecordForm
        editingRecord={null}
        onSubmit={(value) => {
          addRecord(value);
          router.push("/");
        }}
      />
    </main>
  );
}
