export const allCategory: {
  [key: string]: {
    title: string;
    label: string;
    options: { value: string; label: string }[];
  };
} = {
  timeUnit: {
    title: "timeUnit",
    label: "구간 단위",
    options: [
      { value: "date", label: "date" },
      { value: "week", label: "week" },
      { value: "month", label: "month" },
    ],
  },
  gender: {
    title: "gender",
    label: "성별",
    options: [
      { value: "", label: "설정 안 함" },
      { value: "m", label: "남성" },
      { value: "f", label: "여성" },
    ],
  },
  device: {
    title: "device",
    label: "기기",
    options: [
      { value: "", label: "설정 안 함" },
      { value: "pc", label: "PC" },
      { value: "mo", label: "모바일" },
    ],
  },
};

export const agelist = [
  { value: "10", label: "10대", color: "red" },
  { value: "20", label: "20대", color: "blue" },
  { value: "30", label: "30대", color: "orange" },
  { value: "40", label: "40대", color: "pink" },
  { value: "50", label: "50대", color: "black" },
];
