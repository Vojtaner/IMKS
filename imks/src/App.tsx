import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { getAppState, useAppSelector } from "../store/storeRedux";
import { cyan } from "@mui/material/colors";
import {
  ChannelActionType,
  ImksState,
  LineChartIntensityData,
  SliderData,
} from "../entity/entity";
import { useEffect, useState } from "react";
import { isLightChannel } from "../utils/typeGuards";

const getData = (imksChannels: ImksState["channels"]) => {
  const data: Record<number, SliderData[]> = {};
  Object.entries(imksChannels).forEach(([channelId, { channelActionType }]) => {
    const convertedChannelId = parseInt(channelId, 10);
    if (channelActionType === ChannelActionType.Light) {
      if (!data[convertedChannelId]) {
        data[convertedChannelId] = [];
      }
      if (isLightChannel(imksChannels[convertedChannelId])) {
        Object.entries(imksChannels[convertedChannelId].slidersData).forEach(
          ([, entry]) => data[convertedChannelId].push(entry)
        );
      }
    }
  });
  return data;
};

const getAllTimes = (data: Record<number, SliderData[]>) => {
  const allTimes = Array.from(
    new Set(
      Object.values(data)
        .flat()
        .map((entry) => entry.time.getTime())
    )
  )
    .map((time) => new Date(time))
    .sort((a, b) => a.getTime() - b.getTime());

  return allTimes;
};

const getLineChartData = (
  allTimes: Date[],
  data: Record<number, SliderData[]>
) => {
  const lineChartData: LineChartIntensityData = {
    2: { color: cyan[500], legendTitle: "Světlo", series: [] },
    3: { color: "#b6cf55", legendTitle: "Hnojení", series: [] },
  };

  allTimes.forEach((time) => {
    Object.entries(data).forEach(([channelId, slidersData]) => {
      const dataPoint = slidersData.find(
        (entry) => entry.time.getTime() === time.getTime()
      );
      const intensity = dataPoint
        ? dataPoint.intensity
        : lineChartData[+channelId].series.slice(-1)[0] || 0;

      lineChartData[+channelId].series.push(intensity);
    });
  });
  return lineChartData;
};

const useUpdateChart = () => {
  const appstate2 = getAppState();
  return appstate2;
};

function App() {
  const app = useUpdateChart();
  const channels = useAppSelector((state) => state.channels);

  const [data, setData] = useState(getData(channels));
  const [allTimes, setAlltimes] = useState(getAllTimes(data));
  const [lineChartData, setLineChartData] = useState(
    getLineChartData(allTimes, data)
  );

  useEffect(() => {
    const newData = getData(channels);
    setData(newData);

    const newAllTimes = getAllTimes(newData);
    setAlltimes(newAllTimes);

    const newLineChartData = getLineChartData(newAllTimes, newData);
    setLineChartData(newLineChartData);
    console.log({ app });
  }, [channels]);

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
      <LightChart timeData={allTimes} intensityData={lineChartData} />
      <ImksChannels />
    </ThemeProvider>
  );
}
export default App;
