import IconButton from "@mui/material/IconButton";
import { useAppSelector } from "../../../store/storeRedux";
import { selectChannelActionType } from "../../../store/selectors/channelSelectors";
import { ChannelIcons } from "../../../entity/entity";

export const AccordionActionTypeIcon = (props: { channelId: number }) => {
  const channelActionType = useAppSelector((state) =>
    selectChannelActionType(state, props.channelId)
  );

  return (
    <IconButton sx={{ p: "10px" }} aria-label="lightbulb" color="primary">
      {ChannelIcons[channelActionType]}
    </IconButton>
  );
};
