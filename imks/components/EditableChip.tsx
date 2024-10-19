import { AccordionLightType, ChanellColors } from "../entity/entity";
import Chip from "@mui/material/Chip/Chip";
import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useRef, useState } from "react";

export const EditableChip = (
  props: Pick<AccordionLightType, "channelIndex" | "color">
) => {
  const { channelIndex, color } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("default");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <Chip
        label={channelIndex}
        sx={{
          position: "absolute",
          top: "-18%",
          left: "2%",
          maxWidth: "7%",
          minWidth: "100px",
          height: "35%",
          border: "1.5px dotted white",
          color: "white",
          opacity: 1,
        }}
        onClick={handleClickListItem}
        color={color}
      />
      {open && (
        <ChannelColorsDialog
          id="channel-colors"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      )}
    </>
  );
};

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ChannelColorsDialog(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{
        onEntering: handleEntering,
      }}
      open={open}
      {...other}
    >
      <DialogTitle>Barva kanálu</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="channelColors"
          name="channelColors"
          value={value}
          onChange={handleChange}
        >
          {ChanellColors.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio color={option} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Zavřít
        </Button>
        <Button onClick={handleOk}>Potvrdit</Button>
      </DialogActions>
    </Dialog>
  );
}
