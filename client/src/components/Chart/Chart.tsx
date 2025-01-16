import { useEffect, useState } from "react";
import { getSeriesSearchCount } from "../../api/chart/seriesChart.api";
import { BarChart } from "@mui/x-charts";

interface Props {
  title: string | null;
}

export default function Chart({ title }: Props) {
  const [data, setData] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState<string | boolean>(false);

  useEffect(() => {
    if (!title) return;
    const fetchDataChart = async () => {
      setLoading(true);
      const dataChart = await getSeriesSearchCount();
      if (dataChart) {
        setData(dataChart); // Directly set the fetched data
        setLoading(false);
      } else {
        setLoading("Error loading data");
      }
    };
    fetchDataChart();
  }, [title]);

  console.log("data chart:", data);
  if (loading) return <div>{loading}</div>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />
    </div>
  );
}
