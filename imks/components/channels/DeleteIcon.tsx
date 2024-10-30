import { useState } from "react";
import { DialogWindow } from "../app/DialogWindow";
import { IconButton, Typography, useMediaQuery } from "@mui/material";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { imksTheme } from "../../theme/customeTheme";
import { useAppDispatch } from "../../store/storeRedux";
import { deleteSlider } from "../../store/slices/channelsSlice";

export const DeleteIcon = (props: { channelId: number; sliderId: number }) => {
  const { channelId, sliderId } = props;
  const [open, setOpen] = useState<boolean>(false);
  const isExtraSmallScreen = useMediaQuery(imksTheme.breakpoints.up("xs"));
  const dispatch = useAppDispatch();

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
        handleOk={() => dispatch(deleteSlider({ channelId, sliderId }))}
      >
        <Typography id="deleteLightSliderSetting">
          Přejete si vymazat toto nastavení?
        </Typography>
      </DialogWindow>
    </>
  );
};

export default DeleteIcon;
