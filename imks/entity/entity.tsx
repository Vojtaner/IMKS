import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export type AccordionExpandList = {
  [key: string]: boolean;
};

type LightSettingType = {
  intensity: number;
  time: Date;
};

export type ChannelType = "fertilize" | "light";

export type AccordionLightType = {
  id: string;
  title: string;
  expanded: boolean;
  channelType: ChannelType;
  lightSetting: LightSettingType[];
  color: ChannelColorsType;
  channelIndex: string;
};

export const ChannelIcons = {
  fertilize: <WaterDropIcon />,
  light: <EmojiObjectsIcon />,
};

export type ChannelColorsType = (typeof ChanellColors)[number];

export const ChanellColors = [
  "primary",
  "secondary",
  "error",
  "default",
] as const;
