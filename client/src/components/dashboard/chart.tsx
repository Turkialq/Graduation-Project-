import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
export const options = {
  plugins: {
    title: {
      display: true,
      text: "الجهات الاكثر على الطلب",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const labels = [
  "ارامكو السعودية",
  "سدايا",
  "بنك الراجحي",
  "وزارة التعليم",
  "مكتبة جرير",
  "الهيئة العامة للترفيه",
  "صندوق التنمية العقاري السعودي",
];

const dataOne = {
  labels,
  datasets: [
    {
      label: "النساء",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },

    {
      label: "الرجال",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1",
    },
  ],
};

export const optionsTwo = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function lineChart() {
  return (
    <>
      <Line width="500%" options={optionsTwo} data={data} />
    </>
  );
}

export function BarChart() {
  return (
    <>
      <Bar width="650%" options={options} data={dataOne} />
    </>
  );
}
