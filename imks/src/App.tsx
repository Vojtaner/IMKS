import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { useUpdateLineChart } from "../hooks/sliderHooks";

function App() {
  const { datesData, intensitySeries } = useUpdateLineChart();

  return (
    <ThemeProvider theme={imksTheme}>
      <HeaderBarMenu />
      <LightChart timeData={datesData} intensityData={intensitySeries} />
      <ImksChannels />
    </ThemeProvider>
  );
}
export default App;
