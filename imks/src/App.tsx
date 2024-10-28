import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ChannelAccordion } from "../components/Channel/ChannelAccordion";
import HeaderBarMenu from "../components/HeaderBarMenu";
import LightChart from "../components/LightChart";
import { LightPaperCard } from "../components/LightPaperCard";
import { panelList } from "../api/mockdata";
import { useState } from "react";

function App() {
  const [panels, setPanels] = useState(panelList);

  const handleChange = (channelId: string) => {
    setPanels((prevState) =>
      prevState.map((panel) =>
        panel.id === channelId ? { ...panel, expanded: !panel.expanded } : panel
      )
    );
  };

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
      <LightChart />
      {panels.map((panel) => {
        return (
          <ChannelAccordion
            channelData={panel}
            handleChangeExpnaded={handleChange}
            key={panel.id}
          >
            <ChannelAccordion.ButtoBar />
            <LightPaperCard />
            <LightPaperCard />
            <LightPaperCard />
          </ChannelAccordion>
        );
      })}

      {/* {panels.map((panel) => {
        return <ImksAccordion />;
      })} */}
    </ThemeProvider>
  );
}
export default App;
