import { IconButton, Paper, TextField } from "@mui/material";
import { imksTheme } from "../../../theme/customeTheme";
import EditIcon from "@mui/icons-material/Edit";
import { AccordionActionTypeIcon } from "./AccordionActionTypeIcon";
import { useState } from "react";
import { selectChannelTitle } from "../../../store/selectors/channelSelectors";
import { useAppDispatch, useAppSelector } from "../../../store/storeRedux";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { saveChannelTitle } from "../../../store/slices/channelsSlice";

export const AccordionHeaderInput = (props: { channelId: number }) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("Pojmenujte kanál");
  const dispatch = useAppDispatch();

  const channelTitle = useAppSelector((state) =>
    selectChannelTitle(state, props.channelId)
  );

  const handleEditTitle = () => {
    dispatch(saveChannelTitle({ title, channelId: props.channelId }));
    setDisabled((prev) => !prev);
  };

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
        disabled={disabled}
        focused={!disabled}
        defaultValue={channelTitle}
        onChange={(event) => setTitle(event.target.value)}
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
      <IconButton color="primary" sx={{ p: "10px" }} onClick={handleEditTitle}>
        {disabled ? (
          <EditIcon color="inherit" />
        ) : (
          <SaveAsIcon color="inherit" />
        )}
      </IconButton>
    </Paper>
  );
};
