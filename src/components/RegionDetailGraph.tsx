import Plot from "react-plotly.js";
import { RegionIntensityData } from "../types";

const RegionDetailGraph = ({ data }: { data: RegionIntensityData }) => {
  console.log(data?.data?.length);
  //*every 48 items in the array is one day on the graph, so we need to slice the array into days and reduce each slice to calculate the daily average

  const days = [];
  const avgIntensity = [];

  let count = 0;
  const totalDays = data?.data?.length / 48;
  while (count < totalDays) {
    const start = count * 48;
    days.push(data?.data[start].from);
    const total = data?.data
      ?.slice(start, start + 49)
      .reduce((acc, curr) => acc + curr.intensity.forecast, 0);
    avgIntensity.push(Math.round(total / 48));
    count++;
  }

  return (
    <div className="graph-container">
      <div className="graph">
        <Plot
          data={[
            {
              x: days,
              y: avgIntensity,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "green" },
            },
          ]}
          layout={{
            width: 475,
            height: 400,
            title: "Daily Average Carbon Intensity",
          }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default RegionDetailGraph;
