import axios, {AxiosResponse,} from 'axios'

// api에서 내려주는 응답구조

interface DataItem {
    period: string;
    group: string;
    ratio: number;
}
  
interface Result {
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
    startDate: String;
    endDate: String;
    timeUnit: "date" | "week" | "month";
    category: String;
    keyword: String;
    device?: "" | "pc"  | "mo";
    gender?: "" | "m"  | "f";
    ages?: String[];
}