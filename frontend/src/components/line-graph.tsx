import { IPopulationData } from "@/app/page";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "United States Population Chart",
    },
  },
  maintainAspectRatio: false,
};

interface IProps {
  populationData: IPopulationData[];
}

export default function LineGraph({ populationData }: IProps) {
  const labels = populationData.map((population) => population["Year"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Population Data",
        data: populationData.map((population) => population["Population"]),
        borderColor: "#10b981",
        backgroundColor: "#0e7855",
      },
    ],
  };

  return (
    <div>
      <Line height="300px" options={options} data={data} />
    </div>
  );
}
