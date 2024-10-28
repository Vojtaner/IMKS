import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { LightPaperCard } from "../components/channels/light/LightPaperCard";
import { panelList } from "../api/mockdata";
import { useState } from "react";

function App() {
  // const [panels, setPanels] = useState(panelList);

  // const handleChange = (channelId: number) => {
  //   setPanels((prevState) =>
  //     prevState.map((panel) =>
  //       panel.id === channelId ? { ...panel, expanded: !panel.expanded } : panel
  //     )
  //   );
  // };

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
      <LightChart />
      <ImksChannels />
    </ThemeProvider>
  );
}
export default App;
