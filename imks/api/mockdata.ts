import { ChannelAction, ImksControllerStore } from "../entity/entity";

export const panelList: ImksControllerStore["channels"] = {
  1: {
    id: 1,
    channelAction: ChannelAction.Light,
    channelSettings: {
      title: "Modrá barva",
      expanded: false,
      color: "primary",
    },
    slidersData: {
      1: { sliderId: 1, intensity: 40, time: "1:00" },
      2: { sliderId: 2, intensity: 40, time: "4:00" },
      3: { sliderId: 3, intensity: 60, time: "9:00" },
      4: { sliderId: 4, intensity: 60, time: "12:00" },
      5: { sliderId: 5, intensity: 20, time: "17:00" },
      6: { sliderId: 6, intensity: 20, time: "20:00" },
    },
  },
  2: {
    id: 2,
    channelAction: ChannelAction.Light,
    channelSettings: {
      title: "Zelená barva",
      expanded: false,
      color: "secondary",
    },
    slidersData: {
      1: { sliderId: 1, intensity: 40, time: "9:00" },
      2: { sliderId: 2, intensity: 40, time: "10:00" },
      3: { sliderId: 3, intensity: 60, time: "15:00" },
      4: { sliderId: 4, intensity: 60, time: "17:00" },
      5: { sliderId: 5, intensity: 20, time: "19:00" },
      6: { sliderId: 6, intensity: 20, time: "22:00" },
    },
  },
  3: {
    id: 3,
    channelSettings: {
      title: "Červená barva",
      expanded: false,
      color: "error",
    },
    channelAction: ChannelAction.Light,
    slidersData: {
      1: { sliderId: 1, intensity: 20, time: "9:00" },
      2: { sliderId: 2, intensity: 20, time: "10:00" },
      3: { sliderId: 3, intensity: 20, time: "15:00" },
      4: { sliderId: 4, intensity: 40, time: "17:00" },
      5: { sliderId: 5, intensity: 90, time: "19:00" },
      6: { sliderId: 6, intensity: 90, time: "22:00" },
    },
  },
};
