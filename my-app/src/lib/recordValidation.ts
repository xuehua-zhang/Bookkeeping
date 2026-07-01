import { FormData, RecordItem } from "@/types/record";

export type FormErrors = {
    date?: string;
    amount?: string;
    category?: string;
}; 

export type ValidationResult = {
    valid: boolean;
    errors: FormErrors
};

