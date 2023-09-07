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