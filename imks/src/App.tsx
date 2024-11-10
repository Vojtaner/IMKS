import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { getAppState } from "../store/storeRedux";
import { cyan } from "@mui/material/colors";
// import { LightPaperCard } from "../components/channels/light/LightPaperCard";
// import { panelList } from "../api/mockdata";
// import { useState } from "react";

function App() {
  const appState = getAppState();

  console.log({ appState });

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
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
      />
      <ImksChannels />
    </ThemeProvider>
  );
}
export default App;
