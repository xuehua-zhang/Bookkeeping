export type RecordItem = {
    id:number;
    type:"income" | "expense";
    amount:number;
    category:string;
    date:string;
}

export type FormData = {
    type:"income" | "expense";
    amount:string;
    category:string;
    date:string;
}