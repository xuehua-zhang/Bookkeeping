"use client";

import BottomNav from "@/components/BottomNav";
import RecordForm from "@/components/RecordForm";
import RecordList from "@/components/RecordList";
import SummaryCard from "@/components/SummaryCard";
import{RecordItem} from "@/types/record"
import { useState, useEffect } from "react";
import {FormData} from "@/types/record";
import { Button } from "@/components/ui/button";
import { ButtonGroup} from "@/components/ui/button-group";
import { cn } from "@/lib/utils";


export default function Home() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "add" | "manage">("home");
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [manageType, setManageType] = useState<"income" | "expense">("expense")

  //增
  const AddRecord = (value:FormData) =>{
    const amount = Number(value.amount);
    setRecords((prev)=>[ 
      ...prev, 
      {
        id:Date.now(), 
        type:value.type, 
        amount, 
        category:value.category,
        date:value.date 
      } ])
  };
  //删
  const RemoveRecord = (id: number) => {
    setRecords(prev =>prev.filter((record) => record.id !== id));
}; 
  //改
  const EditRecord = (id: number, value:FormData) =>{
    const amount = Number(value.amount);
    setRecords(prev=>
    prev.map(record=>
      record.id === id
     ? {...record, 
        type:value.type, 
        amount, 
        category:value.category,
        date:value.date }
     :record)
  );
};
  //存
  const handleSave = (value:FormData) =>{
    if(editingRecord !== null){
      EditRecord(editingRecord.id, value);
      setEditingRecord(null);
    }else{
      AddRecord(value);
    };
    setActiveTab("home")
  };
  //初始化
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("records", JSON.stringify(records));
  }, [records, isInitialized]);

  useEffect(() => {
    const data = localStorage.getItem("records");
    if (!data) {
      setIsInitialized(true);
      return;
    }

    try {
      const parsed: RecordItem[] = JSON.parse(data);
      setRecords(parsed);
    } catch {
      localStorage.removeItem("records");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const manageRecords = records.filter((record)=>record.type === manageType);

  return (
    <main className="min-h-screen  bg-theme-page px-4 py-6 pb-24">
      {activeTab === "home" ? (
        <div>
          <h1 className="mb-4 text-center text-2xl font-medium text-shadow-sm">个人记账本</h1>
          <SummaryCard 
          records={records}
          />
          <RecordList 
          records={records}
          />
        </div>
      ) : null}

      {activeTab === "add" ? 
      <div>
        <RecordForm 
        editingRecord = {editingRecord}
        onSubmit={ handleSave }/>
      </div> : null}

      {activeTab === "manage" ? 
      <div>
      <ButtonGroup className="mx-auto mb-4 w-full max-w-xs bg-theme-muted rounded-md">
      <Button className={cn(
      "flex-1",
      manageType === "expense" ? "bg-theme-page text-foreground hover:bg-theme-page"
        : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
    )} type="button" onClick={()=>setManageType("expense")}>支出</Button>
      <Button className={cn(
      "flex-1",
      manageType === "income" ? "bg-theme-page text-foreground hover:bg-theme-page"
      : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
      )} type="button" onClick={()=>setManageType("income")}>收入</Button>
      </ButtonGroup>
      <RecordList 
      records={manageRecords}
      onEdit={(id) => {
        const record = records.find((record)=>record.id === id);
        if(record){
        setEditingRecord(record);
        setActiveTab("add");
      }
      }}
      onRemove={RemoveRecord}
      />
      </div> : null}

      <BottomNav
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      />
    </main>
  )
}
