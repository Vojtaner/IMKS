import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { getAppState } from "../store/storeRedux";
import { cyan } from "@mui/material/colors";

function App() {
  const appState = getAppState();

  console.log({ appState });

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
      <LightChart timeData={allTimes} intensityData={lineChartData} />
      {/* <HeaderBarMenu />
      <LightChart
        timeData={[
          new Date("2023-12-12T10:00:00"),
          new Date("2023-12-12T11:00:00"),
          new Date("2023-12-12T12:00:00"),
          new Date("2023-12-12T13:00:00"),
          new Date("2023-12-12T14:00:00"),
          new Date("2023-12-12T15:00:00"),
          new Date("2023-12-12T16:00:00"),
          new Date("2023-12-12T17:00:00"),
          new Date("2023-12-12T18:00:00"),
        ]}
        intensityData={{
          1: {
            color: cyan[500],
            legendTitle: "Světlo",
            series: [20, 10, 40, 10, 10, 90, 90, 100, 30],
          },
          2: {
            color: "#b6cf55",
            legendTitle: "Hnojení",
            series: [10, 10, 40, 40, 90, 30, 30, 30, 30],
          },
        }}
      /> */}
      <ImksChannels />
    </ThemeProvider>
  );
}
export default App;

const data = {
  1: [
    { sliderId: 1, intensity: 40, time: new Date("2023-12-12T10:00:00") },
    { sliderId: 2, intensity: 40, time: new Date("2023-12-12T11:00:00") },
    { sliderId: 3, intensity: 60, time: new Date("2023-12-12T13:00:00") },
    { sliderId: 4, intensity: 60, time: new Date("2023-12-12T16:00:00") },
    { sliderId: 5, intensity: 20, time: new Date("2023-12-12T18:00:00") },
    { sliderId: 6, intensity: 20, time: new Date("2023-12-12T20:00:00") },
  ],
  2: [
    { sliderId: 1, intensity: 20, time: new Date("2023-12-12T11:00:00") },
    { sliderId: 2, intensity: 10, time: new Date("2023-12-12T23:00:00") },
  ],
};

//  Step 1: Extract and sort all unique times
const allTimes = Array.from(
  new Set(
    Object.values(data)
      .flat()
      .map((entry) => entry.time.getTime())
  )
)
  .map((time) => new Date(time))
  .sort((a, b) => a.getTime() - b.getTime());

console.log("Unique Times Sorted:", allTimes);

const lineChartData: LineChartData = {
  1: { color: cyan[500], legendTitle: "Světlo", series: [] },
  2: { color: "#b6cf55", legendTitle: "Hnojení", series: [] },
};

allTimes.forEach((time) => {
  Object.entries(data).forEach(([sliderId, sliderData]) => {
    const dataPoint = sliderData.find(
      (entry) => entry.time.getTime() === time.getTime()
    );
    const intensity = dataPoint
      ? dataPoint.intensity
      : lineChartData[+sliderId].series.slice(-1)[0] || 0;
    lineChartData[+sliderId].series.push(intensity);
  });
});

console.log("Formatted Line Chart Data:", lineChartData);
