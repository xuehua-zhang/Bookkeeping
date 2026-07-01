"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecordList from "@/components/RecordList";
import { useRecords } from "@/context/RecordsContext";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { cn } from "@/lib/utils";

export default function ManagePage() {
  const router = useRouter();
  const { records, removeRecord } = useRecords();
  const [manageType, setManageType] = useState<"income" | "expense">("expense");

  const manageRecords = records.filter((r) => r.type === manageType);

  return (
    <main className="min-h-screen bg-theme-page px-4 py-6 pb-24">
      <ButtonGroup className="mx-auto mb-4 w-full max-w-xs bg-theme-muted rounded-md">
        <Button
          className={cn(
            "flex-1",
            manageType === "expense"
              ? "bg-theme-page text-foreground hover:bg-theme-page"
              : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
          )}
          type="button"
          onClick={() => setManageType("expense")}
        >
          支出
        </Button>
        <Button
          className={cn(
            "flex-1",
            manageType === "income"
              ? "bg-theme-page text-foreground hover:bg-theme-page"
              : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
          )}
          type="button"
          onClick={() => setManageType("income")}
        >
          收入
        </Button>
      </ButtonGroup>
      <RecordList
        records={manageRecords}
        onEdit={(id) => router.push(`/manage/${id}/edit`)}
        onRemove={removeRecord}
      />
    </main>
  );
}
