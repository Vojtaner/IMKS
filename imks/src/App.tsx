import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ChannelAccordion } from "../components/ChannelAccordion";
import { ChannelButtonTopBar } from "../components/ChannelButtonTopBar";
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
      {panels.map((panel) => {
        return (
          <ChannelAccordion
            channelData={panel}
            handleChangeExpnaded={handleChange}
          >
            <ChannelButtonTopBar />
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
