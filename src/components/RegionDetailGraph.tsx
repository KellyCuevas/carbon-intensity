import Plot from "react-plotly.js";
import { RegionIntensityData } from "../types";

const RegionDetailGraph = ({ data }: { data: RegionIntensityData }) => {
  console.log(data?.data?.length);
  //every 48 items in the array is one day on the graph
  //iterate over the intensity data array using a counter to keep track of the days
  //while count <= array.length / 48 => if there are two days, there will be 96 items, and count will be 2
  //const start = count * 48
  //array.slice(start, start + 49).reduce((a, b) => (a.intensity + b.intensity) / 48)
  //count++
  let days = [];
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

  days = days.map((date: string) => date.slice(0, 10));
  console.log("days", days, "avgIntensity", avgIntensity);
  return (
    <div className="graph-container">
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
          width: 500,
          height: 400,
          title: "Daily Average Carbon Intensity",
        }}
      />
    </div>
  );
};

export default RegionDetailGraph;
