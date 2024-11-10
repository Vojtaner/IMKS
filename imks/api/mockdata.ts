import { ChanellColors, ChannelActionType, ImksState } from "../entity/entity";

export const initialChannelState: ImksState["channels"] = {
  1: {
    id: 1,
    channelActionType: ChannelActionType.NotSelected,
    channelSettings: {
      title: "Modrá barva",
      expanded: true,
      color: "primary",
    },
  },
  2: {
    id: 2,
    channelActionType: ChannelActionType.Light,
    channelSettings: {
      title: "Zelená barva",
      expanded: true,
      color: "secondary",
    },
    allIds: [1, 2, 3, 4, 5, 6],
    lastIncrementedId: 6,
    slidersData: {
      1: { sliderId: 1, intensity: 40, time: new Date("2023-12-12T10:00:00") },
      2: { sliderId: 2, intensity: 40, time: new Date("2023-12-12T11:00:00") },
      3: { sliderId: 3, intensity: 60, time: new Date("2023-12-12T12:00:00") },
      4: { sliderId: 4, intensity: 60, time: new Date("2023-12-12T13:00:00") },
      5: { sliderId: 5, intensity: 20, time: new Date("2023-12-12T14:00:00") },
      6: { sliderId: 6, intensity: 20, time: new Date("2023-12-12T15:00:00") },
    },
  },
  3: {
    id: 3,
    channelSettings: {
      title: "Červená barva",
      expanded: true,
      color: "error",
    },
    channelActionType: ChannelActionType.Light,
    allIds: [1],
    lastIncrementedId: 1,
    slidersData: {
      1: { sliderId: 1, intensity: 20, time: new Date("2023-12-12T16:00:00") },
      2: { sliderId: 2, intensity: 20, time: new Date("2023-12-12T16:00:00") },
    },
  },
};

export const settingsInitialState: ImksState["settings"] = {
  channelColors: ChanellColors,
  language: "cs-CZ",
};
