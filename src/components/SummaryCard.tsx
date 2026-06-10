import { RecordItem } from "@/types/record"

type SummaryCardProps = {
    records:RecordItem[];
}

const now = new Date()
const currentMonth = now.getMonth() + 1 + "月"

export default function SummaryCard({records}:SummaryCardProps){
    const currentMonthRecords = records.filter((record)=>{
        const recordDate = new Date(record.date);

        return (
            recordDate.getFullYear() === now.getFullYear() &&
            recordDate.getMonth() === now.getMonth()
        )
    })

    const incomeTotal = currentMonthRecords
    .filter((record)=>record.type === "income")
    .reduce((sum,record)=>{
        return sum + record.amount},0)

    const expenseTotal = currentMonthRecords
    .filter((record)=>record.type === "expense")
    .reduce((sum,record)=>{
        return sum + record.amount},0)

    const total = incomeTotal - expenseTotal;

    return(
        <div className="mb-6 flex gap-3">
            <div className="text-2xl flex  w-1/4 items-center justify-center rounded-lg border bg-card px-4 py-6">
            <span>{ currentMonth }</span>
            </div>
        <div className="rounded-lg border bg-card p-4 w-3/4">
            <div className="flex justify-between">
            <span>收入</span>
            <span>{incomeTotal}</span>
            </div>
            <div className="flex justify-between">
            <span>支出</span>
            <span>{expenseTotal}</span>
            </div>
            <div className="flex justify-between">
            <span>总计</span>
            <span>{total}</span>
            </div>
        </div>
        </div>
    )
}