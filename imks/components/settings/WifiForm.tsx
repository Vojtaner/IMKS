import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import FieldInput from "../app/FieldInput";
import SelectField from "../app/SelectField";
import { wifiRegime } from "../../api/mockdata";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { cyan } from "@mui/material/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { getWifiIcon } from "../../src/websocket/formatWebSocketData";
import { CheckBoxButton } from "../app/CheckBoxButton";
import { useAppSelector } from "../../store/storeRedux";
import { selectWifiDeviceSettings } from "../../store/selectors/settingsSelectors";

const WifiForm = () => {
  const wifiSettings = useAppSelector((state) =>
    selectWifiDeviceSettings(state)
  );

  const {
    FWCurrent,
    FWFuture,
    MACAddress,
    accessibleWifiList,
    controllerDate,
    controllerName,
    deviceId,
    ipAddress,
    isAutomaticConnectionChecked,
    isAutomaticTimeChecked,
    isClientModeConnected,
    operatingMode,
    wifiName,
    wifiSignalStrength,
  } = wifiSettings;

  return (
    <Stack spacing={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Vyberte datum a čas"
          ampm={false}
          value={dayjs()}
        />
      </LocalizationProvider>
      <Typography>
        Datum z kontroleru:
        <strong> {controllerDate}</strong>
      </Typography>
      <CheckBoxButton
        isChecked={isAutomaticTimeChecked}
        onChange={() => alert("implementovat")}
        label="Automatický čas/datum"
      />

      <FieldInput
        changeTitle={(value) => console.log(value)}
        placeholder="Kontroler - obyvák"
        value={controllerName}
        label="Nazev zařízení"
      />
      <FieldInput
        changeTitle={(value) => console.log(value)}
        value="nezměněno"
        label="Heslo WIFI"
        type="password"
      />
      <SelectField
        options={wifiRegime}
        label={"Vyberte režim WIFI"}
        id="select-wifi-operating-mode"
        selectedValue={operatingMode}
      />
      <SelectField
        options={accessibleWifiList}
        label={"Vyberte vaše připojení WIFI"}
        id="select-wifi-network"
        selectedValue={wifiName}
      />
      <Stack direction={"row"} spacing={2}>
        <Button>Uložit/Restartovat zařízení</Button>
        <Button>Test připojení</Button>
      </Stack>

      <Stack gap={1}>
        <TableRow
          rowTitle={"Stav Wifi sítě"}
          rowValue={isClientModeConnected ? "Připojeno" : "Nepřipojeno"}
        />
        <Stack direction={"row"}>
          <Typography fontWeight={600}>Síla Wifi sítě: </Typography>
          {getWifiIcon(wifiSignalStrength)}
          <Typography>{`(${wifiSignalStrength})`}</Typography>
        </Stack>
        <TableRow rowTitle={"IP adresa v domácí síti"} rowValue={ipAddress} />
        <TableRow rowTitle={"Název připojené sítě"} rowValue={wifiName} />
        <TableRow rowTitle={"ID zařízení"} rowValue={deviceId} />
        <TableRow rowTitle={"MAC adresa zařízení"} rowValue={MACAddress} />
        <TableRow rowTitle={"FW aktuální"} rowValue={FWCurrent} />
        <TableRow rowTitle={"FW budoucí"} rowValue={FWFuture} />
      </Stack>

      <Accordion
        sx={{
          margin: "0px 0.2rem 1rem 0.2rem",
          borderRadius: "4px",
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: "0px",
          },
          "& .MuiAccordionSummary-content": {
            margin: "0px",
          },
          "::before": {
            content: "none",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="advanced-settings"
          id="advanced-settings"
          sx={{
            fontWeight: 600,
            color: cyan[500],
            fontFamily: "Helvetica",
            fontSize: "1.2rem",
          }}
        >
          Pokročilé nastavení
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={6}>
            <Stack spacing={1}>
              <Typography fontWeight={600}>Obnovení nastavení</Typography>
              <Button>Obnovit nastavení</Button>
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={600}>Aktualizace systému</Typography>
              <Typography>Zde nahrajte soubor s aktualizací: </Typography>
              <Stack spacing={1} direction={"row"}>
                <Button component="label" startIcon={<CloudUploadIcon />}>
                  Zde soubor
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
                <Button>Aktualizovat</Button>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={600}>
                Změna IP adresy komunikace
              </Typography>
              <FieldInput
                changeTitle={(value) => console.log(value)}
                placeholder="2001:4860:7:60a::ff"
                label="IP adresa"
                value={ipAddress}
              />
              <CheckBoxButton
                isChecked={isAutomaticConnectionChecked}
                onChange={() => alert("implementovat")}
                label="Automaticky připojit"
              />
              <Button>Připojit</Button>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default WifiForm;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const TableRow = (props: { rowTitle: string; rowValue: string }) => {
  const { rowTitle, rowValue } = props;

  return (
    <Stack direction={"row"} gap={1}>
      <Typography fontWeight={600}>{`${rowTitle}:`}</Typography>
      <Typography>{rowValue}</Typography>
    </Stack>
  );
};
