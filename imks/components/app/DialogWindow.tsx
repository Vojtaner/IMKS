import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

export type ConfirmationDialogRawProps = {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  title: string;
  children: React.ReactNode;
  handleEntering?: () => void;
  handleOk: () => void;
};

export const DialogWindow = (props: ConfirmationDialogRawProps) => {
  const {
    onClose,

    open,
    handleEntering,
    handleOk,
    title,
    children,
    ...other
  } = props;

  const handleCancel = () => {
    onClose();
  };

  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValue((event.target as HTMLInputElement).value);
  //   };

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Zavřít
        </Button>
        <Button onClick={handleOk}>Potvrdit</Button>
      </DialogActions>
    </Dialog>
  );
};
