import { RecordItem } from "@/types/record"
import RecordItemRow from "@/components/RecordItem"

type RecordListProps={
    records:RecordItem[];
    onEdit?: (id: number) => void;
    onRemove?: (id: number) => void;
}

export default function RecordList({records,onEdit,onRemove}:RecordListProps){
    return(
        <div className="rounded-lg border bg-card p-4">
        <ul>
            {records.length === 0 ? "暂无记录，先添加一条账目吧" : null}
            {records.map((record)=>
            <RecordItemRow
            key={record.id}
            record={record}
            onEdit={onEdit}
            onRemove={onRemove}
            />
        )}
        </ul>
        </div>
    )
}