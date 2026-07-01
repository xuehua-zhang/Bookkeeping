import {type RecordItem} from "@/types/record";
import { Button } from "@/components/ui/button";

type RecordItemProps={
    record:RecordItem;
    onEdit?: (id: number) => void;
    onRemove?: (id: number) => void;
}

export default function RecordItem({record,onEdit,onRemove}:RecordItemProps){
    return(
        <li className="flex items-center gap-2 py-2 text-sm">
            <span className="text-muted-foreground">{record.date}</span>
            <span className="flex-1">{record.category}</span>
            <span>
                {record.type === "income" ? "+" : "-"}
                {record.amount}
            </span>
            {onEdit ? 
            <Button
            variant="ghost" className="text-theme-muted"
            type="button"
            onClick={()=>onEdit?.(record.id)}
            >
            编辑
            </Button>
            : null}
            {onRemove ?
            <Button
            variant="ghost" className="text-theme-muted"
            type="button"
            onClick={()=>onRemove?.(record.id)}
            >
            删除
            </Button>
            : null}
        </li>
    )
}