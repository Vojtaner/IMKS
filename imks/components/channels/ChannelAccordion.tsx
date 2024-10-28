import { imksTheme } from "../../theme/customeTheme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { EditableChip } from "./channelHeader/EditableChip";
import { ButtonBar } from "./channelButtonMenu/ButtonBar";
import { AccordionHeaderInput } from "./channelHeader/AccordionHeaderInput";
import { ExpandMoreButton } from "./channelHeader/ExpandMoreButton";
import { LightSettingsList } from "./light/LightSettingsList";
import { FertilizeSettingForm } from "./fertilize/FertilizeSettingForm";

export function ChannelAccordion(props: { channelId: number }) {
  // vybrat channelActionType z reduxu a zvolit správnou komponentu do accordion detailu
  // vyrequestovat expanded z REDUXU
  // select title z reduxu
  const x = true;
  const expanded = false;
  const title = "červená barva";

  return (
    <Accordion
      expanded={expanded}
      key={props.channelId}
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
        aria-controls={`${props.channelId} ${title}`}
        id={`${props.channelId}`}
        sx={{
          position: "relative",
          padding: "0.5rem 0rem",
          marginTop: "2rem",
          "& .MuiAccordionSummary-content": {
            justifyContent: "space-between",
          },
          "& .MuiAccordionSummary-content .MuiInputBase-input": {
            height: "0px",

            fontSize: "1rem",
            color: imksTheme.palette.secondary.main,
            textTransform: "uppercase",
            fontWeight: "500",
            "&::placeholder": {
              opacity: 1,
            },
          },
          "& .MuiAccordionSummary-content .MuiInputBase-input.Mui-disabled": {
            "&::placeholder": {
              WebkitTextFillColor: imksTheme.palette.secondary.main,
            },
          },
          "&.Mui-focusVisible": {
            backgroundColor: "white",
          },
        }}
      >
        <EditableChip channelId={props.channelId} />
        <AccordionHeaderInput channelId={props.channelId} />
        <ExpandMoreButton channelId={props.channelId} />
      </AccordionSummary>
      <AccordionDetails>
        <ChannelAccordion.ButtoBar />
        {x ? <LightSettingsList /> : <FertilizeSettingForm />}
      </AccordionDetails>
    </Accordion>
  );
}

ChannelAccordion.ButtoBar = ButtonBar;
