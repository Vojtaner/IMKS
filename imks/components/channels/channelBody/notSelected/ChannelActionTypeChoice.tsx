import { Stack, Button } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useDispatch } from "react-redux";
import { setChannelActionType } from "../../../../store/slices/channelsSlice";
import { ChannelActionType } from "../../../../entity/entity";

export const ChannelActionTypeChoice = (props: { channelId: number }) => {
  const dispatch = useDispatch();

  const setFertilizer = () => {
    dispatch(
      setChannelActionType({
        channelId: props.channelId,
        channelActionType: ChannelActionType.Fertilize,
      })
    );
  };

  const setLight = () => {
    dispatch(
      setChannelActionType({
        channelId: props.channelId,
        channelActionType: ChannelActionType.Light,
      })
    );
  };

  return (
    <Stack
      alignItems={"stretch"}
      direction={"column"}
      spacing={"1rem"}
      marginTop={"1rem"}
    >
      <Button startIcon={<WaterDropIcon />} onClick={setFertilizer}>
        Řízení hnojení
      </Button>
      <Button startIcon={<EmojiObjectsIcon />} onClick={setLight}>
        Řízení světel
      </Button>
    </Stack>
  );
};
