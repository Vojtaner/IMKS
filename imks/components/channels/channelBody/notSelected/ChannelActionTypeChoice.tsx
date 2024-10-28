import { Stack, Button } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export const ChannelActionTypeChoice = () => {
  return (
    <Stack
      alignItems={"stretch"}
      direction={"column"}
      spacing={"1rem"}
      marginTop={"1rem"}
    >
      <Button startIcon={<WaterDropIcon />}>Řízení hnojení</Button>
      <Button startIcon={<EmojiObjectsIcon />}>Řízení světel</Button>
    </Stack>
  );
};
