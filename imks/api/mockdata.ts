import dayjs from "dayjs";
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
      expanded: true,
      color: "error",
    },
    channelActionType: ChannelActionType.Light,
    allIds: [1],
    lastIncrementedId: 1,
    slidersData: {
      1: { sliderId: 1, intensity: 40, time: "19:00" },
      2: { sliderId: 2, intensity: 40, time: "23:00" },
    },
  },
};
export const accessibleWifiList = [
  {
    id: "TP-Link_Mocal",
    name: "TP-Link_Mocal",
  },
  {
    id: "HomeWifi",
    name: "HomeWifi",
  },
  {
    id: "Filip339",
    name: "Filip339",
  },
];

export const settingsInitialState: ImksState["settings"] = {
  channelColors: ChanellColors,
  language: "cs-CZ",
  wifi: {
    accessibleWifiList,
    controllerDate: dayjs(),
    controllerName: "Obývák",
    formDate: dayjs(),
    ipAddress: "2001:4860:7:60a::fa",
    isAutomaticConnectionChecked: true,
    isAutomaticTimeChecked: true,
    operatingMode: "ClientMode",
    password: "heslohesloano",
    wifiName: "TP-Link_Mocal",
  },
};

export const wifiRegime = [
  {
    id: "ClientMode",
    name: "Client Mode",
  },
  {
    id: "APMode",
    name: "Ap Mode",
  },
];
