"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import EditHeader from "@/components/EditHeader";
import RecordForm from "@/components/RecordForm";
import { useRecords } from "@/context/RecordsContext";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const { records, editRecord, isInitialized } = useRecords();

  const record = records.find((r) => r.id === id);

  useEffect(() => {
    if (!isInitialized) return;
    if (!records.find((r) => r.id === id)) {
      router.replace("/manage");
    }
  }, [isInitialized, records, id, router]);

  if (!isInitialized || !record) return null;

  return (
    <main className="min-h-screen bg-theme-page px-4 py-6">
      <EditHeader onClose={() => router.push("/manage")} />
      <RecordForm
        editingRecord={record}
        onSubmit={(value) => {
          editRecord(id, value);
          router.push("/manage");
        }}
      />
    </main>
  );
}
