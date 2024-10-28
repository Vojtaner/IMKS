import cyan from "@mui/material/colors/cyan";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const LightChart = () => {
  return (
    <LineChart
      xAxis={[
        {
          data: [0, 1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 23, 24],
        },
      ]}
      yAxis={[{ data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }]}
      series={[
        {
          curve: "linear",
          color: cyan[500],
          label: "Hnojení",
          id: "1",

          data: [
            10, 10, 40, 40, 40, 90, 90, 90, 30, 30, 30, 30, 30, 30, 30, 30,
          ],
        },
        {
          curve: "linear",
          color: "#b6cf55",
          label: "Světlo",
          id: "2",
          data: [
            30, 30, 60, 60, 60, 25, 25, 25, 50, 50, 50, 50, 50, 70, 70, 70,
          ],
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
