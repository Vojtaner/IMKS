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
      title: "Test barva",
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
    allIds: [1, 2],
    lastIncrementedId: 1,
    slidersData: {
      1: { sliderId: 1, intensity: 40, time: "19:00" },
      2: { sliderId: 2, intensity: 40, time: "23:00" },
    },
  },
  4: {
    id: 4,
    channelSettings: {
      title: "Poslední barva barva",
      expanded: true,
      color: "error",
    },
    channelActionType: ChannelActionType.Light,
    allIds: [1, 2],
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
    controllerDate: dayjs().format(" DD.MM.YYYY HH:MM"),
    controllerName: "Obývák",
    formDate: dayjs().format(" DD.MM.YYYY HH:MM"),
    ipAddress: "2001:4860:7:60a::fa",
    isAutomaticConnectionChecked: true,
    isAutomaticTimeChecked: true,
    operatingMode: "ClientMode",
    password: "heslohesloano",
    wifiName: "TP-Link_Mocal",
    deviceId: "deviceId tetx",
    FWCurrent: "DFAL232N",
    FWFuture: "KLOIOÉÁSĚ",
    isClientModeConnected: true,
    MACAddress: "223.323:E2:DD:00",
    wifiSignalStrength: 67,
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
