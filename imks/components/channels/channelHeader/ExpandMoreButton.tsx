import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch } from "../../../store/storeRedux";
import { toggleExpandChannel } from "../../../store/slices/channelsSlice";

export const ExpandMoreButton = (props: { channelId: number }) => {
  const dispatch = useAppDispatch();

  return (
    <IconButton
      sx={{ p: "10px" }}
      aria-label="expand-arrow"
      onClick={() => dispatch(toggleExpandChannel(props.channelId))}
    >
      <ExpandMoreIcon />
    </IconButton>
  );
};
