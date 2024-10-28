import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

export type ImksState = {
  settings: {
    language: Languages;
    channelColors: ChannelColorsType;
  };
  channels: Record<number, ChannelForm>;
};

export type ChannelForm = {
  id: number;
  channelSettings: {
    color: ChannelColorsType;
    title: string;
    expanded: boolean;
  };
} & (LightFormType | FertilizeFormType);

type LightFormType = {
  channelActionType: ChannelActionType.Light;
  id: number;
  slidersData: Record<number, SliderData>;
};

type SliderData = { sliderId: number; intensity: number; time: string };

type FertilizeFormType = {
  channelActionType: ChannelActionType.Fertilize;
  id: number;
  time: Date;
  fertilizerAmount: number;
  calibrationCoeficient: number;
  fertilizeCalendar: FertilizeCalendar;
};

export type ChannelColorsType = (typeof ChanellColors)[number];

export const enum ChannelActionType {
  Fertilize = "fertilize",
  Light = "light",
}
type FertilizeCalendar = {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
};

export const ChanellColors = [
  "primary",
  "secondary",
  "error",
  "default",
] as const;

const enum Languages {
  "cs-CZ/Čeština",
  "en-US/English",
}

export const ChannelIcons = {
  fertilize: <WaterDropIcon />,
  light: <EmojiObjectsIcon />,
};
