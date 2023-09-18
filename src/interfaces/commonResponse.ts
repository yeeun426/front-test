// api에서 내려주는 응답구조
export interface DataItem {
    period: string;
    group: string;
    ratio: number;
}
  
export interface Result {
    title: string;
    keyword: string[];
    data: DataItem[];
}

export interface APIResponse {
    startData: String;
    endData: String;
    timeUnit: "date" | "week" | "month";
    results: Result[];
}

export interface ShoppingData {
    startDate: string;
    endDate: string;
    timeUnit: string;
    category: string;
    keyword: string;
    device?: string;
    gender?: string;
    ages?: string[];
    trend?: DataItem[];
}