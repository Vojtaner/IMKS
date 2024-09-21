import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import React from "react";

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
};

export const panelList: AccordionLightType[] = [
  {
    id: "panel1",
    title: "červená barva",
    expanded: false,
    channelType: "light",
    lightSetting: [{ intensity: 40, time: new Date() }],
  },
  {
    id: "panel2",
    title: "modrá barva",
    expanded: false,
    channelType: "fertilize",
    lightSetting: [{ intensity: 90, time: new Date() }],
  },
  {
    id: "panel3",
    title: "modrá barva",
    expanded: false,
    channelType: "fertilize",
    lightSetting: [{ intensity: 90, time: new Date() }],
  },
];

export const ChannelIcons = {
  fertilize: <WaterDropIcon />,
  light: <EmojiObjectsIcon />,
};
