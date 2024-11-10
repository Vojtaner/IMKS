import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

export type ImksState = {
  settings: {
    language: keyof LanguagesType;
    channelColors: typeof ChanellColors;
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
} & (LightFormType | FertilizeFormType | NotSelectedActionTypeForm);

export type LightFormType = {
  channelActionType: ChannelActionType.Light;
  allIds: number[];
  lastIncrementedId: number;
  slidersData: Record<number, SliderData>;
};

export type SliderData = { sliderId: number; intensity: number; time: string };

export type FertilizeFormType = {
  channelActionType: ChannelActionType.Fertilize;
  time: Date;
  fertilizerAmount: number;
  calibrationCoeficient: number;
  fertilizeCalendar: FertilizeCalendar;
};

export type NotSelectedActionTypeForm = {
  channelActionType: ChannelActionType.NotSelected;
};

export type ChannelColorsType = (typeof ChanellColors)[number];

export const enum ChannelActionType {
  Fertilize = "fertilize",
  Light = "light",
  NotSelected = "notSelected",
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

export type LanguagesType = typeof Languages;

export const Languages = {
  "cs-CZ": "Čeština",
  "en-US": "English",
} as const;

export const ChannelIcons = {
  fertilize: <WaterDropIcon />,
  light: <EmojiObjectsIcon />,
  notSelected: <QuestionMarkIcon />,
};

export type LineChartIntensityData = Record<
  number,
  { color: string; legendTitle: string; series: number[] }
>;
