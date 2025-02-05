import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getSeriesSearchCount } from "../../api/chart/seriesChart.api";
import style from "./Chart.module.css";
import Notification from "../Notifications/Notification";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  title: string | null;
}

export default function Chart({ title }: Props) {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState<string | boolean>(false);
  const [alert, setAlert] = useState<{
    type: "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchDataChart = async () => {
      setLoading(true);
      try {
        const dataChart = await getSeriesSearchCount();
        if (dataChart) {
          setData(dataChart.data);
          setLoading(false);
        } else {
          setLoading("Error loading data");
          setAlert({ type: "error", message: "Failed to show data" });
        }
      } catch (error) {
        setLoading("Error loading data");
        setAlert({ type: "error", message: "Error loading data" });
      }
    };

    fetchDataChart();
  }, [title]);

  const chartLabels = data.map((item) => item.name);
  const chartValues = data.map((item) => item.count);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Search Count",
        data: chartValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Series Name",
        },
      },
      y: {
        title: {
          display: true,
          text: "Search Count",
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div>{loading}</div>;

  return (
    <div className={style["chart"]}>
      <div className={style["chart-container"]}>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <Notification alert={alert} setAlert={setAlert} />
    </div>
  );
}
