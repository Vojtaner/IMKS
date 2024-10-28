import IconButton from "@mui/material/IconButton";

export const AccordionActionTypeIcon = (props: { channelId: number }) => {
  {
    /* tady na základě channelId vyberu ikonu pro channelAcitonType REDUX/REACT HOOK FORM*/
  }

  return (
    <IconButton sx={{ p: "10px" }} aria-label="lightbulb" color="primary">
      {"ChannelIcons[channelAction]"}
      {props.channelId}
    </IconButton>
  );
};
