import { useState } from "react";
import { DialogWindow } from "./app/DialogWindow";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { imksTheme } from "../theme/customeTheme";

export const DeleteIcon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));

  const handleOk = () => {
    alert("delete value form fieldarray");
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={() => setOpen(true)}
        sx={{ padding: "0px" }}
      >
        <DeleteSweepOutlinedIcon
          fontSize={isExtraSmallScreen ? "small" : "large"}
          sx={{
            strokeWidth: 1,
            color: " #ce5252",
          }}
        />
      </IconButton>
      <DialogWindow
        onClose={() => setOpen(false)}
        id={"deleteDialog"}
        keepMounted={false}
        value={"primary"}
        title={"Odstranit posuvník"}
        open={open}
        handleOk={handleOk}
      >
        <Typography id="deleteLightSliderSetting">
          Přejete si vymazat toto nastavení?
        </Typography>
      </DialogWindow>
    </>
  );
};

export default DeleteIcon;
