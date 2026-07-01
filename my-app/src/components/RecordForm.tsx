import {useEffect, useState} from "react";
import {FormData, RecordItem} from "@/types/record";
import { Button } from "@/components/ui/button";
import { ButtonGroup} from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

type SubmitProps = {
    onSubmit:(value:FormData) => void;
    editingRecord: RecordItem | null;
}

export default function RecordForm({ onSubmit, editingRecord }:SubmitProps){
    const [formData, setFormData] = useState<FormData>({
        type:"expense",
        amount:"",
        category:"",
        date:"",
    }
    );

    useEffect(()=> {
        if (editingRecord !== null) {
            setFormData({
                type:editingRecord.type,
                amount:String(editingRecord.amount),
                category:editingRecord.category,
                date:editingRecord.date,
            });
        } else {
        setFormData({
        type:"expense",
        amount:"",
        category:"",
        date:"",
        })
    }},[editingRecord]);

    return(
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <ButtonGroup className="mx-auto mb-4 w-full max-w-xs bg-theme-muted rounded-md">
                <Button
                    className={cn(
                        "flex-1",
                        formData.type === "expense" ? "bg-theme-page text-foreground hover:bg-theme-page"
                        : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
                    )}
                    type="button"
                    onClick={(e) => setFormData({
                        ...formData,
                        type: "expense",
                    })}
                >
                    支出
                </Button>

                <Button
                    className={cn(
                        "flex-1",
                        formData.type === "income" ? "bg-theme-page text-foreground hover:bg-theme-page"
                        : "bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
                    )}
                    type="button"
                    onClick={(e) => setFormData({
                        ...formData,
                        type: "income",
                    })}
                >
                    收入
                </Button>
            </ButtonGroup>

            <div className="flex flex-col">
            <label>日期
            <Input
            className="w-full"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({
                ...formData,
                date:e.target.value})}
            />     
            </label>
            </div>
            <div className="flex flex-col">
            <label>金额
            <Input
            className="w-full"
            placeholder="请输入金额"
            value={formData.amount}
            onChange={(e) => setFormData({
                ...formData,
                amount:e.target.value})}
            />
            </label>
            </div>
            <div className="flex flex-col">
            <label>种类
            <Select
                key={formData.type}
                value={formData.category || undefined}
                onValueChange={(value) => setFormData({
                    ...formData,
                    category: value,
                })}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={
                        formData.type === "expense" ? "请选择消费种类" : "请选择收入种类"
                    } />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {(formData.type === "expense"
                            ? ["餐饮", "交通", "购物", "娱乐", "其他"]
                            : ["工资", "奖金", "红包", "其他"]
                        ).map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            </label>
            </div>
            <Button
             className="bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
              type="button"
              onClick={() => onSubmit(formData)}>
              保存
            </Button>
            <Button
            className="bg-theme-muted text-theme-muted-foreground hover:bg-theme-muted"
            type="button"
            onClick={()=>setFormData({
                type:"expense",
                amount:"",
                category:"",
                date:"",
            })}
            >清空</Button>
        </div>
    )
}

