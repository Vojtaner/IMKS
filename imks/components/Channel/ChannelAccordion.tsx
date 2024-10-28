import { IconButton, Paper, TextField } from "@mui/material";
import { imksTheme } from "../../theme/customeTheme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode, useState } from "react";
import {
  AccordionLightType,
  ChannelIcons,
  ChannelType,
} from "../../entity/entity";
import { EditableChip } from "./EditableChip";
import { ButtonBar } from "./ButtonBar";

export function ChannelAccordion(props: {
  channelData: AccordionLightType;
  children: ReactNode;
  handleChangeExpnaded: (channelId: string) => void;
}) {
  const { channelData, children, handleChangeExpnaded } = props;

  return (
    <Accordion
      expanded={channelData.expanded}
      key={channelData.id}
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
        aria-controls={`${channelData.id} ${channelData.title}`}
        id={channelData.id}
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
        <EditableChip
          channelIndex={channelData.channelIndex}
          color={channelData.color}
        />

        <AccordionInput
          channelType={channelData.channelType}
          channelTitle={channelData.title}
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="expand-arrow"
          onClick={() => handleChangeExpnaded(channelData.id)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

const AccordionInput = (props: {
  channelType: ChannelType;
  channelTitle: string;
}) => {
  const { channelTitle, channelType } = props;
  const [active, setActive] = useState(true);

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "auto",
        border: "0px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="lightbulb" color="primary">
        {ChannelIcons[channelType]}
      </IconButton>
      <TextField
        disabled={active}
        focused={!active}
        defaultValue={channelTitle}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            "&::placeholder": {
              WebkitTextFillColor: imksTheme.palette.secondary.main,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "0px",
            opacity: 1,
          },
          "& .MuiOutlinedInput-input.Mui-disabled": {
            WebkitTextFillColor: imksTheme.palette.secondary.main,
          },
        }}
      />

      <IconButton
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
        onClick={() => setActive((prev) => !prev)}
      >
        <EditIcon color="inherit" />
      </IconButton>
    </Paper>
  );
};

ChannelAccordion.ButtoBar = ButtonBar;
