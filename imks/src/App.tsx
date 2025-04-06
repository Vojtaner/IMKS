import { ThemeProvider } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import { ImksChannels } from "../components/channels/ImksChannels";
import HeaderBarMenu from "../components/headerMenu/HeaderBarMenu";
import LightChart from "../components/diagram/LightChart";
import { useUpdateLineChart } from "../hooks/sliderHooks";
import WebSocketComponent from "./websocket/webSocket";
import { WebSocketProvider } from "../contextAPI/webSocketContext";

//přidání nového posuvníku...má se přesunou v rámci pořadí ostaních posuvníků dle času?

// umožnit editovat barvy

// umožnit přidávání sliders ke všem kanálů viz   const lineChartData: LineChartIntensityData = {
//   2: { color: cyan[500], legendTitle: "Světlo", series: [] },
//   3: { color: "#b6cf55", legendTitle: "Hnojení", series: [] },
// };

// dodělat překlady

//přidat návod

//kouknout na efektivitu renderů
function App() {
  const { datesData, intensitySeries } = useUpdateLineChart();
  return (
    <ThemeProvider theme={imksTheme}>
      <WebSocketProvider>
        <WebSocketComponent />
        <HeaderBarMenu />
        <LightChart timeData={datesData} intensityData={intensitySeries} />
        <ImksChannels />
      </WebSocketProvider>
    </ThemeProvider>
  );
}
export default App;
