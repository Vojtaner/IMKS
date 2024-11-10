import { LineSeriesType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const LightChart = (props: {
  timeData: Date[];
  intensityData: Record<
    number,
    { color: string; legendTitle: string; series: number[] }
  >;
}) => {
  const intesityDataParams: MakeOptional<LineSeriesType, "type">[] =
    Object.entries(props.intensityData).map(
      ([id, { color, legendTitle, series }]) => {
        return {
          data: series,
          curve: "linear",
          color,
          // zde dát pryč očekávaný null parametr jen na number
          valueFormatter: (value: number | null) => {
            return `${value} %`;
          },
          label: legendTitle,
          id,
        };
      }
    );

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
          data: props.timeData,
        },
      ]}
      series={intesityDataParams}
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
