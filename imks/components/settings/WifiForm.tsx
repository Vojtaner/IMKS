import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import FieldInput from "../app/FieldInput";
import SelectField from "../app/SelectField";
import { accessibleWifiList, wifiRegime } from "../../api/mockdata";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { cyan } from "@mui/material/colors";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const WifiForm = () => {
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
        Datum z kontroleru: <strong>01.01.2025</strong>
      </Typography>
      <FormControlLabel
        control={
          <Checkbox defaultChecked sx={{ padding: "0px 10px 0px 0px " }} />
        }
        label="Automatický čas/datum"
      />
      <FieldInput
        changeTitle={(value) => console.log(value)}
        placeholder="Kontroler - obyvák"
        label="Nazev zařízení"
      />
      <FieldInput
        changeTitle={(value) => console.log(value)}
        value="heslo value"
        label="Heslo WIFI"
        type="password"
      />
      <SelectField
        options={wifiRegime}
        label={"Vyberte režim WIFI"}
        id="select-wifi-operating-mode"
      />
      <SelectField
        options={accessibleWifiList}
        label={"Vyberte vaše připojení WIFI"}
        id="select-wifi-network"
      />
      <Stack direction={"row"} spacing={2}>
        <Button>Uložit/Restartovat zařízení</Button>
        <Button>Test připojení</Button>
      </Stack>
      <Stack>
        <Typography fontWeight={600}>Stav Wifi sítě: </Typography>
        <Typography fontWeight={600}>Síla Wifi sítě: </Typography>
        <Typography fontWeight={600}>IP adresa v domácí síti: </Typography>
        <Typography fontWeight={600}>ID zařízení: </Typography>
        <Typography fontWeight={600}>MAC adresa zařízení: </Typography>
        <Typography fontWeight={600}>FW aktuální: </Typography>
        <Typography fontWeight={600}>FW budoucí: </Typography>
        <Typography fontWeight={600}>FW UI: </Typography>
        <Typography fontWeight={600}>49: </Typography>
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
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    sx={{ padding: "0px 10px 0px 0px " }}
                  />
                }
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
