import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import DataClass from "../models/data.model";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Bar Chart",
    },
  },
};

export function BarChart() {
  const annualyData: DataClass[] =
    (useSelector<any>((state) => state.data.climateData) as DataClass[]) || [];

  const labels = annualyData.map((item) => item.gcm);

  let op = {
    labels,
    datasets: [
      {
        label:
          annualyData[0].variable === "tas" ? "temperature" : "precipitation",
        data: annualyData?.map((item) => item?.climateData?.[0]),
        backgroundColor:
          annualyData[0].variable === "tas"
            ? "rgba(157, 17, 112, 0.5)"
            : "rgba(255, 99, 12, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={op} />;
}
