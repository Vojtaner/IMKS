import { IconButton, Paper, TextField } from "@mui/material";
import { imksTheme } from "../../../theme/customeTheme";
import EditIcon from "@mui/icons-material/Edit";
import { AccordionActionTypeIcon } from "./AccordionActionTypeIcon";
import { useState } from "react";

export const AccordionHeaderInput = (props: { channelId: number }) => {
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
      <AccordionActionTypeIcon channelId={props.channelId} />
      <TextField
        disabled={active}
        focused={!active}
        // tady na základě channelId vyberu titel nebo default
        defaultValue={"channelTitle"}
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
        onClick={() => setActive((prev) => !prev)}
      >
        <EditIcon color="inherit" />
      </IconButton>
    </Paper>
  );
};
