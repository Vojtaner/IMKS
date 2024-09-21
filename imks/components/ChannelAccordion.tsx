import { IconButton, Paper, TextField } from "@mui/material";
import { imksTheme } from "../theme/customeTheme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactNode, useState } from "react";
import { AccordionLightType, ChannelIcons, ChannelType } from "./entity";
import React from "react";

export const ChannelAccordion = (props: {
  channelData: AccordionLightType;
  children: ReactNode;
}) => {
  const { channelData, children } = props;

  const handleChangeExpand = (panelId: string) => {
    // setPanels((prevState) =>
    //   prevState.map((panel) =>
    //     panel.id === panelId ? { ...panel, expanded: !panel.expanded } : panel
    //   )
    // );
  };

  return (
    <Accordion
      expanded={channelData.expanded}
      key={channelData.id}
      sx={{
        margin: "0px 0.2rem 1rem 0.2rem",
        borderRadius: "10px",
        "::before": {
          content: "none",
        },
      }}
    >
      <AccordionSummary
        aria-controls={`${channelData.id} ${channelData.title}`}
        id={channelData.id}
        sx={{
          "& .MuiAccordionSummary-content": {
            justifyContent: "space-between",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "white", // Example style when focused
          },
        }}
      >
        <AccordionInput channelType={channelData.channelType} />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="expand-arrow"
          onClick={() => handleChangeExpand(channelData.id)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const AccordionInput = (props: { channelType: ChannelType }) => {
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
        {ChannelIcons[props.channelType]}
      </IconButton>
      <TextField
        disabled={active}
        focused={!active}
        placeholder="ahoj"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: "2rem",
            color: imksTheme.palette.secondary.main,
            textTransform: "uppercase",
            fontWeight: "500",
            "&::placeholder": {
              opacity: 1,
            },
          },
          "& .MuiInputBase-input.Mui-disabled": {
            "&::placeholder": {
              "-webkit-text-fill-color": imksTheme.palette.secondary.main,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "0px",
            opacity: 1,
          },
        }}
      ></TextField>
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
