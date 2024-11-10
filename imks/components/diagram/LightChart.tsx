import cyan from "@mui/material/colors/cyan";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const LightChart = () => {
  return (
    <LineChart
      tooltip={{}}
      xAxis={[
        {
          scaleType: "time",
          valueFormatter: (value) => {
            const [hours, minutes] = String(value).split(" ")[4].split(":");
            return `${hours}:${minutes}`;
          },
          data: [
            new Date("2023-12-12T10:00:00"),
            new Date("2023-12-12T11:00:00"),
            new Date("2023-12-12T12:00:00"),
            new Date("2023-12-12T13:00:00"),
            new Date("2023-12-12T14:00:00"),
            new Date("2023-12-12T15:00:00"),
            new Date("2023-12-12T16:00:00"),
            new Date("2023-12-12T17:00:00"),
            new Date("2023-12-12T18:00:00"),
          ],
        },
      ]}
      series={[
        {
          curve: "linear",
          color: cyan[500],
          label: "Světlo",
          id: "1",
          data: [20, 10, 40, 10, 10, 90, 90, 100, 30],
          valueFormatter: (value) => {
            return `${value} %`;
          },
        },
        {
          curve: "linear",
          color: "#b6cf55",
          label: "Hnojení",
          id: "2",
          data: [10, 10, 40, 40, 90, 30, 30, 30, 30],
          valueFormatter: (value) => {
            return `${value} %`;
          },
        },
      ]}
      sx={{
        [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
          strokeWidth: 1,
        },
        ".MuiChartsLegend-series .MuiChartsLegend-mark": {
          rx: "10",
          strokeWidth: 1,
        },
        ".MuiLineElement-series-1": {},
        ".MuiLineElement-series-2": {},
        [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
          {
            fill: "#fff",
          },
        [`& .${markElementClasses.highlighted}`]: {
          stroke: "none",
        },
      }}
      height={300}
    />
  );
};

export default LightChart;
