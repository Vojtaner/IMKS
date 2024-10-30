import { useState } from "react";
import { DialogWindow } from "../app/DialogWindow";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { imksTheme } from "../../theme/customeTheme";
import { useSliderActionsContext } from "../../contextAPI/sliderActionsContext";

export const SliderDeleteIcon = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));
  const {
    actions: { deleteSliderBySliderId },
  } = useSliderActionsContext();

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
        handleOk={() => deleteSliderBySliderId()}
      >
        <Typography id="deleteLightSliderSetting">
          Přejete si vymazat toto nastavení?
        </Typography>
      </DialogWindow>
    </>
  );
};

export default SliderDeleteIcon;
